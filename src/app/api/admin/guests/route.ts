import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { listGuestsFromStore } from '@/lib/guest-store';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get('eden27_admin_session')?.value;
    const validPin = process.env.ADMIN_PIN || '2727';

    if (!adminToken || adminToken !== validPin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { guests, totalSeatsAllocated, maxSeats } = listGuestsFromStore();

    return NextResponse.json({
      guests,
      totalSeatsAllocated,
      maxSeats,
    });
  } catch (error: any) {
    console.error('Error fetching admin guests:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to load guests' },
      { status: 500 }
    );
  }
}
