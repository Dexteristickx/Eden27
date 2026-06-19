import { Html, Head, Preview, Body, Container, Section, Text, Img, Heading } from '@react-email/components';
import { siteConfig } from '@/config/site-config';

interface TicketEmailProps {
  fullName: string;
  seatNumber: string;
  guestType: string;
  qrCodeUrl: string;
}

export default function TicketEmail({ fullName, seatNumber, guestType, qrCodeUrl }: TicketEmailProps) {
  const isVip = guestType === 'vip';
  
  return (
    <Html>
      <Head />
      <Preview>Your Wedding Invitation & Seat Ticket</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>{siteConfig.coupleNames}</Heading>
            <Text style={h2}>Wedding Celebration</Text>
          </Section>

          <Section style={content}>
            <Text style={text}>Dear {fullName},</Text>
            <Text style={text}>
              Thank you for RSVPing to our wedding! We are thrilled to have you celebrate with us.
            </Text>

            <Section style={ticketContainer}>
              <Text style={label}>YOUR E-TICKET</Text>
              
              <div style={ticketDetails}>
                <div style={ticketRow}>
                  <Text style={ticketLabel}>NAME</Text>
                  <Text style={ticketValue}>{fullName}</Text>
                </div>
                
                <div style={ticketRow}>
                  <Text style={ticketLabel}>SEAT NUMBER</Text>
                  <Text style={{...ticketValue, fontSize: '32px', color: '#B38B3E'}}>{seatNumber}</Text>
                </div>

                <div style={ticketRow}>
                  <Text style={ticketLabel}>TIER</Text>
                  <Text style={{...ticketValue, textTransform: 'uppercase'}}>{guestType}</Text>
                </div>
              </div>

              <div style={qrContainer}>
                <Img src={qrCodeUrl} width="150" height="150" alt="Ticket QR Code" />
                <Text style={qrText}>Present this QR code at the entrance</Text>
              </div>
            </Section>

            {isVip && (
              <Section style={vipNotice}>
                <Text style={vipText}>
                  <strong>VIP Access:</strong> Your ticket includes exclusive access to our pre-wedding family gathering and priority parking at the venue.
                </Text>
              </Section>
            )}

            <Text style={text}>
              For event details, schedule, and dress code, please visit our wedding website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 0',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  maxWidth: '600px',
};

const header = {
  padding: '0 40px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #eaeaea',
  paddingBottom: '30px',
};

const h1 = {
  color: '#333',
  fontSize: '32px',
  fontWeight: '300',
  margin: '0',
  fontFamily: 'Georgia, serif',
};

const h2 = {
  color: '#666',
  fontSize: '16px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  margin: '10px 0 0',
};

const content = {
  padding: '30px 40px',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
};

const ticketContainer = {
  backgroundColor: '#fcfaf6',
  border: '2px solid #eaddcf',
  borderRadius: '12px',
  padding: '30px',
  margin: '30px 0',
  textAlign: 'center' as const,
};

const label = {
  color: '#B38B3E',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
  margin: '0 0 20px',
};

const ticketDetails = {
  textAlign: 'left' as const,
  marginBottom: '30px',
};

const ticketRow = {
  marginBottom: '15px',
};

const ticketLabel = {
  color: '#888',
  fontSize: '10px',
  margin: '0 0 4px',
};

const ticketValue = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const qrContainer = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  display: 'inline-block',
  border: '1px solid #eaeaea',
};

const qrText = {
  color: '#888',
  fontSize: '12px',
  marginTop: '10px',
  marginBottom: '0',
};

const vipNotice = {
  backgroundColor: '#fffbeb',
  borderLeft: '4px solid #f59e0b',
  padding: '16px',
  margin: '0 0 30px',
  borderRadius: '4px',
};

const vipText = {
  color: '#92400e',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};
