import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('eden27_admin_session')?.value;
    const validPin = process.env.ADMIN_PIN || '2727';

    if (!adminToken || adminToken !== validPin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Try direct table query first (works when SUPABASE_SERVICE_ROLE_KEY is set),
    // fallback to SECURITY DEFINER RPC if using anon key with RLS enabled
    const { data, error } = await supabaseAdmin
      .from('guests')
      .select('*')
      .order('registered_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json({ guests: data });
    }

    const { data: rpcData, error: rpcError } = await supabaseAdmin.rpc('admin_list_guests');
    if (!rpcError && rpcData) {
      return NextResponse.json({ guests: rpcData });
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ guests: data || [] });
  } catch (error: any) {
    console.error('Error fetching admin guests:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to load guests' },
      { status: 500 }
    );
  }
}
