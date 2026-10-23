# Wedding Website Progress Tracking (EDEN27)

## Project Goal & Scope
A modern, luxury, mobile-responsive wedding invitation and event website for Oluwadunsin & Ololade ("EDEN27"). Includes RSVP management, schedule, dress code, wedding party, travel details, gift registry, VIP category, story, and gallery. Features an editorial, cinematic warm champagne and terracotta aesthetic.

## Tech Stack & Architectural Decisions
- **Framework**: Next.js (App Router, React 19)
- **Styling**: Tailwind CSS v4 (with `@theme` custom palette in `globals.css`)
- **Typography**: Google Font *Cormorant Garamond* (Editorial Serif) + Inter/Sans
- **Animations**: Framer Motion (animated splash screen, hero crossfade carousel, mobile menu transitions, interactive photo lightbox)
- **Database/Backend**: Supabase with lazy-initialization Proxy + PIN-protected Admin API routes (`getSupabaseAdmin` + `SECURITY DEFINER` RPCs)
- **Hosting/Repo**: GitHub (`Dexteristickx/Eden27`) with automatic Vercel & VPS deployment

## Task Checklist
- [x] Initial website layout and pages (Story, Schedule, Party, Travel, Dress Code, Registry, Gallery, FAQ, VIP, RSVP)
- [x] Warm champagne and terracotta theme update with custom palette
- [x] Animated "EDEN27" splash screen with smooth exit transitions
- [x] Fixed navbar overlap & header collisions
- [x] VIP category added to navigation and dedicated route
- [x] Supabase build-time lazy client initialization fix for Vercel
- [x] Custom EDEN27 browser favicon (`icon.png`) and `apple-icon.png`
- [x] Styled "EDEN27" wordmark logo in the navbar
- [x] Hero banner image carousel (6 images, seamless crossfade, 8s interval)
- [x] Responsive mobile hamburger navigation menu with smooth dropdown
- [x] Contrast & typography improvements over cinematic hero carousel
- [x] P0 Security: Gated `/admin`, `/admin/checkin`, and `/api/admin/*` behind PIN authentication middleware (`src/middleware.ts`) and `/admin/login` page
- [x] P0 Security: Defined strict Row Level Security (RLS) policies in `supabase/schema.sql`
- [x] P0 Admin RLS Fix: Created protected server-side API routes (`/api/admin/guests` and `/api/admin/checkin`) + `SECURITY DEFINER` RPCs (`admin_list_guests`, `admin_search_guest`, `admin_checkin_guest`) so Admin Dashboard and Door Check-In work with RLS enabled
- [x] P1 UX: Added `sessionStorage` caching to `AppShell.tsx` and a "Skip →" button in `SplashScreen.tsx`
- [x] P1 UX/a11y: Fixed RSVP container width (`max-w-2xl`) and added accessible IDs and `htmlFor` label connections
- [x] Nigerian Wedding Layer: Floating WhatsApp button with coordinator direct chat & group invite (`WhatsAppFloat.tsx`)
- [x] Nigerian Wedding Layer: Dual ceremony countdown timer for Dec 30 (Traditional, 1:00 PM) and Dec 31 (Church, 10:00 AM) with WAT offset (`CountdownTimer.tsx`)
- [x] Nigerian Wedding Layer: Add to Calendar integration (.ics download + Google Calendar links) on schedule cards (`AddToCalendar.tsx`)
- [x] Nigerian Wedding Layer: Multi-currency Bank Transfer / Cash Gift cards with copy-to-clipboard on registry page (`BankTransferCard.tsx`)
- [x] Nigerian Wedding Layer: WhatsApp community invite card on FAQ page
- [x] VPS Deployment: Cloned `Dexteristickx/Eden27` to `/var/www/eden27.com` on VPS (`145.239.78.148`)
- [x] VPS PM2: Launched Next.js production build (`eden27`) on port `3027` under PM2 (saved to startup dump)
- [x] VPS Nginx: Configured reverse proxy `/etc/nginx/sites-available/eden27.com.conf` with gzip, caching, and SSL fallback
- [x] VPS Connectivity Test: Confirmed `HTTP/1.1 200 OK` from external requests to `145.239.78.148` for `eden27.com`
- [x] Cloudflare DNS: Successfully pointing `eden27.com` and `www.eden27.com` to VPS IP `145.239.78.148` with active Cloudflare edge SSL
- [x] VPS Let's Encrypt SSL & HTTP→HTTPS Redirect: Issued trusted Certbot SSL certificate (`/etc/letsencrypt/live/eden27.com/`) and enabled automatic `301 Moved Permanently` redirect from `http://eden27.com` to `https://eden27.com` for mobile and desktop browsers
- [x] Phase 3 Polish:
  - Interactive photo lightbox in `src/app/gallery/page.tsx` using `hero-1.png`..`hero-6.png` with keyboard & arrow navigation
  - Synced event schedule times across `site-config.ts`, `page.tsx`, and `schedule/page.tsx`
  - Added one-click "Download E-Ticket QR" button on `/register` and `/vip` confirmation screens
  - Added OpenGraph & Twitter card metadata (`metadataBase: https://eden27.com`) in `src/app/layout.tsx`
- [x] Deployed Phase 3 updates to GitHub (`Dexteristickx/Eden27`) and rebuilt on production VPS (`/var/www/eden27.com`) under PM2 (`eden27`)
- [x] Phase 4 Proposal Media Curation & Editorial Cinema Integration:
  - Curated 14 couple-only & proposal-detail portraits from the 99 raw photos (excluding crowd/group shots) and converted to WebP (`public/images/proposal/`)
  - Trimmed & transcoded the 140.84 MB `.MOV` proposal video into a 79s upright couple-only highlight film (`public/videos/proposal-film.mp4`) and 16s silent loop (`public/videos/proposal-teaser.mp4`)
  - Built the Proposal Cinema Showcase + alternating photo chapters on `/story`, categorized masonry gallery + film modal on `/gallery`, and Proposal Showcase section on `/`
- [x] Phase 5 Ibadan Location Update, 300-Seat Reception Engine, Google Sheets Webhook & Branded E-Ticket Pass:
  - Updated location from Lagos to Ibadan, Oyo State across `site-config.ts`, `page.tsx`, `layout.tsx`, `story/page.tsx`, and `/travel` (with interactive Ibadan Google Map + Ibadan Airport & Lagos–Ibadan NRC Train guide)
  - Implemented 300-guest Reception Seat Allocation engine (`src/lib/guest-store.ts`) with persistent VPS storage (`data/guests.json`), Supabase fallback, and automatic Google Sheets Webhook (`GOOGLE_SHEET_WEBHOOK_URL`) + Gmail/Resend email trigger
  - Built Branded Luxury Reception E-Ticket Card generator (`src/components/TicketCardDownload.tsx`) on `/register` and `/vip`
  - Upgraded `/admin` (showing `X / 300` Reception Seats Allocated) and `/admin/checkin` (adding Live Camera QR Scanner + instant check-in sync)
  - Created `google-sheets-webhook.gs` script for 1-minute Google Sheet & automatic Gmail E-Ticket integration

## Key Files & Recent Modifications
- `src/app/api/admin/guests/route.ts`: Protected server-side endpoint for Admin guest listing
- `src/app/api/admin/checkin/route.ts`: Protected server-side endpoint for Door Check-In search & status update
- `src/app/admin/page.tsx` & `src/app/admin/checkin/page.tsx`: Migrated from direct client-side `supabase` calls to protected `/api/admin/*` routes
- `supabase/schema.sql`: Added `admin_list_guests`, `admin_search_guest`, and `admin_checkin_guest` `SECURITY DEFINER` RPCs
- `src/app/gallery/page.tsx`: Upgraded to use all 6 couple portraits (`hero-1.png`..`hero-6.png`) with a full-screen Framer Motion lightbox
- `src/app/register/page.tsx` & `src/app/vip/page.tsx`: Added "Download E-Ticket QR" button on registration confirmation
- `src/app/layout.tsx`: Added OpenGraph and Twitter card metadata for WhatsApp/social sharing

## Next Immediate Action
Verify TypeScript build, then optionally deploy the Phase 3 updates to GitHub and the production VPS (`/var/www/eden27.com`).
