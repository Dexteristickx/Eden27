import { NextResponse } from 'next/server';
import { verifyLocalVipCode } from '@/lib/guest-store';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // 1. Check local VIP code registry first
    const localCheck = verifyLocalVipCode(code);
    if (localCheck.valid) {
      return NextResponse.json({ success: true, label: localCheck.label });
    }

    // 2. Fallback to Supabase if a real Supabase URL is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('vip_codes')
        .select('*')
        .eq('code', code.trim().toUpperCase())
        .single();

      if (!error && data) {
        if (data.used_count >= data.max_uses) {
          return NextResponse.json(
            { error: 'This VIP code has reached its maximum usage limit' },
            { status: 400 }
          );
        }
        if (data.expires_at && new Date(data.expires_at) < new Date()) {
          return NextResponse.json(
            { error: 'This VIP code has expired' },
            { status: 400 }
          );
        }
        return NextResponse.json({ success: true, label: data.label });
      }
    }

    return NextResponse.json(
      { error: localCheck.error || 'Invalid VIP code' },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('VIP verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
