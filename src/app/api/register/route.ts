import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import QRCode from 'qrcode';
import { siteConfig } from '@/config/site-config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, eventsAttending, plusOnes, dietaryNote, guestType, vipCode } = body;

    // Call the Supabase RPC function for atomic seat assignment
    const { data: result, error } = await supabase.rpc('register_guest', {
      p_full_name: fullName,
      p_phone: phone,
      p_email: email,
      p_guest_type: guestType || 'general',
      p_events_attending: eventsAttending || [],
      p_plus_ones: plusOnes || [],
      p_dietary_note: dietaryNote,
      p_vip_code_used: vipCode || null
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Generate QR code
    const qrData = JSON.stringify({
      id: result.id,
      name: fullName,
      seat: result.seat_number
    });
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    // Send email with Resend
    if (email) {
      try {
        const { Resend } = await import('resend');
        const { render } = await import('@react-email/components');
        const TicketEmail = (await import('@/emails/TicketEmail')).default;
        
        const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
        
        const emailHtml = await render(
          TicketEmail({
            fullName: fullName,
            seatNumber: result.seat_number,
            guestType: result.guest_type,
            qrCodeUrl: qrCodeDataUrl
          })
        );

        await resend.emails.send({
          from: 'Wedding <onboarding@resend.dev>', // In production, use verified domain
          to: email,
          subject: `Your E-Ticket: ${siteConfig.coupleNames} Wedding`,
          html: emailHtml,
        });
      } catch (emailError) {
        console.error("Failed to send email, but registration succeeded:", emailError);
        // Continue, don't fail registration if email fails
      }
    }

    return NextResponse.json({
      success: true,
      guestId: result.id,
      seatNumber: result.seat_number,
      qrCode: qrCodeDataUrl
    });

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: 'Failed to register. Please try again.' }, { status: 500 });
  }
}
