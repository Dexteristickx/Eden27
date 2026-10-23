import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { siteConfig } from '@/config/site-config';
import {
  registerGuestInStore,
  triggerGoogleSheetWebhook,
} from '@/lib/guest-store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      eventsAttending,
      plusOnes,
      dietaryNote,
      guestType,
      vipCode,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Full name and phone number are required.' },
        { status: 400 }
      );
    }

    // 1. Allocate Reception Seat from the 300-guest pool
    let registration;
    try {
      registration = registerGuestInStore({
        fullName,
        phone,
        email,
        guestType: guestType === 'vip' ? 'vip' : 'general',
        eventsAttending: eventsAttending || [],
        plusOnes: plusOnes || [],
        dietaryNote,
        vipCode: vipCode || null,
      });
    } catch (allocErr: any) {
      return NextResponse.json(
        { error: allocErr.message || 'Could not allocate reception seat.' },
        { status: 400 }
      );
    }

    const { guest, alreadyRegistered, totalSeatsAllocated, maxSeats } =
      registration;

    // 2. Also sync to Supabase if a real Supabase instance is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (supabaseUrl && !supabaseUrl.includes('placeholder')) {
      try {
        const { supabase } = await import('@/lib/supabase');
        await supabase.rpc('register_guest', {
          p_full_name: guest.full_name,
          p_phone: guest.phone,
          p_email: guest.email,
          p_guest_type: guest.guest_type,
          p_events_attending: guest.events_attending,
          p_plus_ones: guest.plus_ones,
          p_dietary_note: guest.dietary_note,
          p_vip_code_used: guest.vip_code_used,
        });
      } catch (sbErr) {
        console.warn('Optional Supabase sync skipped:', sbErr);
      }
    }

    // 3. Generate QR Code for Reception Door Check-In
    const qrData = JSON.stringify({
      id: guest.id,
      name: guest.full_name,
      seat: guest.seat_number,
      tier: guest.guest_type,
    });
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 360,
      margin: 2,
      color: {
        dark: '#2c241b',
        light: '#ffffff',
      },
    });

    // 4. Fire Google Sheet Webhook (appends row to Google Sheet + triggers Gmail E-Ticket email)
    if (!alreadyRegistered) {
      await triggerGoogleSheetWebhook({
        action: 'register',
        id: guest.id,
        seatNumber: guest.seat_number,
        seatCount: guest.seat_count,
        totalSeatsAllocated,
        remainingSeats: maxSeats - totalSeatsAllocated,
        maxSeats,
        fullName: guest.full_name,
        phone: guest.phone.startsWith('+') ? `'${guest.phone}` : guest.phone,
        email: guest.email,
        guestType: guest.guest_type.toUpperCase(),
        eventsAttending: guest.events_attending.join(', '),
        plusOnesCount: guest.plus_ones.length,
        plusOnesNames: guest.plus_ones.map((p) => p.name).join(', '),
        dietaryNote: guest.dietary_note || '',
        vipCodeUsed: guest.vip_code_used || '',
        registeredAt: guest.registered_at,
        qrCodeDataUrl,
        coupleNames: siteConfig.coupleNames,
        weddingDate: 'December 30–31, 2026',
        weddingLocation: siteConfig.weddingLocation,
      });
    }

    // 5. Also send via Resend if a real RESEND_API_KEY is configured
    const resendKey = process.env.RESEND_API_KEY || '';
    if (
      !alreadyRegistered &&
      guest.email &&
      resendKey &&
      !resendKey.includes('placeholder')
    ) {
      try {
        const { Resend } = await import('resend');
        const { render } = await import('@react-email/components');
        const TicketEmail = (await import('@/emails/TicketEmail')).default;

        const resend = new Resend(resendKey);
        const emailHtml = await render(
          TicketEmail({
            fullName: guest.full_name,
            seatNumber: guest.seat_number,
            guestType: guest.guest_type,
            qrCodeUrl: qrCodeDataUrl,
          })
        );

        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL || 'EDEN27 Wedding <onboarding@resend.dev>',
          to: guest.email,
          subject: `Your Reception Seat Pass (${guest.seat_number}) — ${siteConfig.coupleNames} Wedding`,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error('Resend email error (non-fatal):', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      alreadyRegistered,
      guestId: guest.id,
      fullName: guest.full_name,
      guestType: guest.guest_type,
      seatNumber: guest.seat_number,
      seatCount: guest.seat_count,
      eventsAttending: guest.events_attending,
      totalSeatsAllocated,
      maxSeats,
      qrCode: qrCodeDataUrl,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to register. Please try again.' },
      { status: 500 }
    );
  }
}
