# Wedding Website Progress Tracking (EDEN27)

## Project Goal & Scope
A modern, luxury, mobile-responsive wedding invitation and event website for Oluwadunsin & Ololade ("EDEN27"). Includes RSVP management, schedule, dress code, wedding party, travel details, gift registry, VIP category, story, and gallery. Features an editorial, cinematic warm champagne and terracotta aesthetic.

## Tech Stack & Architectural Decisions
- **Framework**: Next.js (App Router, React 19)
- **Styling**: Tailwind CSS v4 (with `@theme` custom palette in `globals.css`)
- **Typography**: Google Font *Cormorant Garamond* (Editorial Serif) + Inter/Sans
- **Animations**: Framer Motion (animated splash screen, hero crossfade carousel, mobile menu transitions)
- **Database/Backend**: Supabase with lazy-initialization Proxy to ensure clean static builds on Vercel
- **Hosting/Repo**: GitHub (`Dexteristickx/Eden27`) with automatic Vercel deployment

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
- [x] P0 Security: Gated `/admin` and `/admin/checkin` behind PIN authentication middleware (`src/middleware.ts`) and `/admin/login` page
- [x] P0 Security: Defined strict Row Level Security (RLS) policies in `supabase/schema.sql`
- [x] P1 UX: Added `sessionStorage` caching to `AppShell.tsx` and a "Skip →" button in `SplashScreen.tsx`
- [x] P1 UX/a11y: Fixed RSVP container width (`max-w-2xl`) and added accessible IDs and `htmlFor` label connections
- [x] Nigerian Wedding Layer: Floating WhatsApp button with coordinator direct chat & group invite (`WhatsAppFloat.tsx`)
- [x] Nigerian Wedding Layer: Dual ceremony countdown timer for Dec 30 (Traditional) and Dec 31 (Church) with WAT offset (`CountdownTimer.tsx`)
- [x] Nigerian Wedding Layer: Add to Calendar integration (.ics download + Google Calendar links) on schedule cards (`AddToCalendar.tsx`)
- [x] Nigerian Wedding Layer: Multi-currency Bank Transfer / Cash Gift cards with copy-to-clipboard on registry page (`BankTransferCard.tsx`)
- [x] Nigerian Wedding Layer: WhatsApp community invite card on FAQ page
- [/] Ready for Phase 3: Photo lightbox, Aso-Ebi order tracking, or OpenGraph sharing banner
- [ ] Implement Phase 3 items

## Key Files & Recent Modifications
- `src/components/WhatsAppFloat.tsx`: Floating action button with coordinator chat and WhatsApp community modal
- `src/components/CountdownTimer.tsx`: Dual ceremony countdown timer with glass-morphic cards
- `src/components/AddToCalendar.tsx`: Dropdown generating `.ics` files and Google Calendar links
- `src/components/BankTransferCard.tsx`: Multi-currency account display with instant clipboard copy
- `src/components/AppShell.tsx`: Mounted `WhatsAppFloat` delayed after splash
- `src/app/page.tsx`: Integrated dual countdown timer below welcome section
- `src/app/schedule/page.tsx`: Integrated `AddToCalendar` into Traditional, Church, and Reception cards
- `src/app/registry/page.tsx`: Integrated `BankTransferCard` alongside store wishlist
- `src/app/faq/page.tsx`: Added official WhatsApp community banner

## Next Immediate Action
Review live functionality with the user, commit and push to GitHub (`Dexteristickx/Eden27`), and plan Phase 3 (OpenGraph preview image, photo lightbox, or Aso-Ebi tracker).
