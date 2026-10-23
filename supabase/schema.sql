-- Event-level settings (single row for this couple, but designed cleanly)
create table event_settings (
  id uuid primary key default gen_random_uuid(),
  couple_names text not null,
  wedding_date date not null,
  theme text not null default 'classic',
  general_seat_capacity int not null,
  vip_seat_capacity int not null,
  registration_open boolean not null default true,
  created_at timestamptz default now()
);

-- VIP access codes
create table vip_codes (
  code text primary key,
  label text, -- e.g. 'Bride''s Family', 'Groomsmen'
  max_uses int not null,
  used_count int not null default 0,
  expires_at timestamptz
);

-- Guest registrations
create table guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  guest_type text not null check (guest_type in ('general', 'vip')),
  seat_number text unique, -- e.g. 'A-014' or 'V-007'
  events_attending text[], -- e.g. ['traditional', 'reception']
  plus_ones jsonb default '[]', -- [{name: '...'}]
  dietary_note text,
  vip_code_used text references vip_codes(code),
  checked_in boolean default false,
  registered_at timestamptz default now()
);

-- Sequences for seat allocation
create sequence general_seat_seq start 1;
create sequence vip_seat_seq start 1;

-- Function for atomic seat assignment
create or replace function register_guest(
  p_full_name text,
  p_phone text,
  p_email text,
  p_guest_type text,
  p_events_attending text[],
  p_plus_ones jsonb,
  p_dietary_note text,
  p_vip_code_used text
) returns jsonb as $$
declare
  v_capacity int;
  v_current_count int;
  v_seat_number text;
  v_guest_id uuid;
  v_new_seat_val int;
begin
  -- Validate guest type
  if p_guest_type not in ('general', 'vip') then
    raise exception 'Invalid guest type';
  end if;

  -- Lock event settings to prevent concurrent capacity changes during check
  perform id from event_settings limit 1 for update;

  -- Check capacity
  if p_guest_type = 'general' then
    select general_seat_capacity into v_capacity from event_settings limit 1;
    select count(*) into v_current_count from guests where guest_type = 'general';
    if v_current_count >= v_capacity then
      raise exception 'General registration is full';
    end if;
    
    v_new_seat_val := nextval('general_seat_seq');
    v_seat_number := 'A-' || lpad(v_new_seat_val::text, 3, '0');
  else
    -- VIP logic
    select vip_seat_capacity into v_capacity from event_settings limit 1;
    select count(*) into v_current_count from guests where guest_type = 'vip';
    if v_current_count >= v_capacity then
      raise exception 'VIP registration is full';
    end if;
    
    if p_vip_code_used is not null then
      update vip_codes set used_count = used_count + 1 where code = p_vip_code_used and used_count < max_uses;
      if not found then
        raise exception 'VIP code is invalid or usage limit reached';
      end if;
    end if;
    
    v_new_seat_val := nextval('vip_seat_seq');
    v_seat_number := 'V-' || lpad(v_new_seat_val::text, 3, '0');
  end if;

  -- Insert guest
  insert into guests (
    full_name, phone, email, guest_type, seat_number,
    events_attending, plus_ones, dietary_note, vip_code_used
  ) values (
    p_full_name, p_phone, p_email, p_guest_type, v_seat_number,
    p_events_attending, p_plus_ones, p_dietary_note, p_vip_code_used
  ) returning id into v_guest_id;

  return jsonb_build_object(
    'id', v_guest_id,
    'seat_number', v_seat_number,
    'guest_type', p_guest_type
  );
end;
$$ language plpgsql security definer;

-- Admin RPCs (invoked only from PIN-authenticated Next.js server routes)
create or replace function admin_list_guests()
returns setof guests as $$
  select * from guests order by registered_at desc;
$$ language sql security definer;

create or replace function admin_search_guest(p_query text)
returns guests as $$
  select * from guests
  where seat_number ilike p_query
     or full_name ilike ('%' || p_query || '%')
  limit 1;
$$ language sql security definer;

create or replace function admin_checkin_guest(p_guest_id uuid)
returns void as $$
  update guests set checked_in = true where id = p_guest_id;
$$ language sql security definer;

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -------------------------------------------------------------

-- 1. GUESTS TABLE
alter table guests enable row level security;

-- Block public anonymous reads (prevents downloading full guest list via anon key)
create policy "Block anon select on guests" on guests
  for select using (false);

-- Direct client inserts blocked; all inserts must go through register_guest RPC (security definer)
create policy "Block anon insert on guests" on guests
  for insert with check (false);

create policy "Block anon update on guests" on guests
  for update using (false);

create policy "Block anon delete on guests" on guests
  for delete using (false);

-- 2. VIP CODES TABLE
alter table vip_codes enable row level security;

-- Allow reading active VIP codes for verification
create policy "Allow select on active vip codes" on vip_codes
  for select using (true);

create policy "Block anon mutation on vip_codes" on vip_codes
  for insert with check (false);

-- 3. EVENT SETTINGS TABLE
alter table event_settings enable row level security;

create policy "Allow public read on event_settings" on event_settings
  for select using (true);

create policy "Block anon mutation on event_settings" on event_settings
  for insert with check (false);
