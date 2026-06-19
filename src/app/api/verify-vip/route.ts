import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('vip_codes')
      .select('*')
      .eq('code', code)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid VIP code' }, { status: 404 });
    }

    if (data.used_count >= data.max_uses) {
      return NextResponse.json({ error: 'This VIP code has reached its maximum usage limit' }, { status: 400 });
    }

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This VIP code has expired' }, { status: 400 });
    }

    return NextResponse.json({ success: true, label: data.label });

  } catch (error: any) {
    console.error("VIP verification error:", error);
    return NextResponse.json({ error: 'Failed to verify code' }, { status: 500 });
  }
}
