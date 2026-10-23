import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  searchGuestInStore,
  checkInGuestInStore,
  triggerGoogleSheetWebhook,
} from '@/lib/guest-store';

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
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const guest = searchGuestInStore(rawQuery);
    if (!guest) {
      return NextResponse.json({ error: 'Guest not found.' }, { status: 404 });
    }

    return NextResponse.json({ guest });
  } catch (error: any) {
    console.error('Check-in search error:', error);
    return NextResponse.json(
      { error: 'Failed to search guest.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { guestId } = await request.json();
    if (!guestId) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      );
    }

    const updated = checkInGuestInStore(guestId);
    if (!updated) {
      return NextResponse.json({ error: 'Guest not found.' }, { status: 404 });
    }

    // Notify Google Sheet that guest has checked in at the reception door
    await triggerGoogleSheetWebhook({
      action: 'checkin',
      id: updated.id,
      seatNumber: updated.seat_number,
      fullName: updated.full_name,
      checkedInAt: updated.checked_in_at,
    });

    return NextResponse.json({ success: true, guest: updated });
  } catch (error: any) {
    console.error('Check-in update error:', error);
    return NextResponse.json(
      { error: 'Failed to check in guest.' },
      { status: 500 }
    );
  }
}
