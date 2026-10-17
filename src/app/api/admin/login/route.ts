import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const validPin = process.env.ADMIN_PIN || '2727';

    if (!pin || pin !== validPin) {
      return NextResponse.json({ error: 'Invalid organizer PIN' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    
    // Set HTTP-only secure cookie for 7 days
    response.cookies.set({
      name: 'eden27_admin_session',
      value: validPin,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
