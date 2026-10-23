import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabase';

async function isAuthorized() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('eden27_admin_session')?.value;
  const validPin = process.env.ADMIN_PIN || '2727';
  return Boolean(adminToken && adminToken === validPin);
}

export async function GET(request: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const rawQuery = (searchParams.get('q') || '').trim();

    if (!rawQuery) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Try SECURITY DEFINER RPC first if available, else direct query
    const { data: rpcGuest, error: rpcError } = await supabaseAdmin.rpc(
      'admin_search_guest',
      { p_query: rawQuery }
    );

    if (!rpcError && rpcGuest) {
      return NextResponse.json({ guest: rpcGuest });
    }

    const { data, error } = await supabaseAdmin
      .from('guests')
      .select('*')
      .or(`seat_number.ilike.${rawQuery},full_name.ilike.%${rawQuery}%`)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Guest not found.' }, { status: 404 });
    }

    return NextResponse.json({ guest: data });
  } catch (error: any) {
    console.error('Check-in search error:', error);
    return NextResponse.json({ error: 'Failed to search guest.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { guestId } = await request.json();
    if (!guestId) {
      return NextResponse.json({ error: 'Guest ID is required' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Try SECURITY DEFINER RPC first if available, else direct update
    const { error: rpcError } = await supabaseAdmin.rpc('admin_checkin_guest', {
      p_guest_id: guestId,
    });

    if (!rpcError) {
      return NextResponse.json({ success: true });
    }

    const { error } = await supabaseAdmin
      .from('guests')
      .update({ checked_in: true })
      .eq('id', guestId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Check-in update error:', error);
    return NextResponse.json({ error: 'Failed to check in guest.' }, { status: 500 });
  }
}
