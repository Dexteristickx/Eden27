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
- [/] Ready to push changes or proceed to Nigerian Wedding Layer
- [ ] Implement Nigerian Wedding Layer (WhatsApp button, countdown timer, Add to Calendar, bank transfer details)

## Key Files & Recent Modifications
- `src/middleware.ts`: Next.js middleware enforcing `eden27_admin_session` cookie for `/admin/*`
- `src/app/admin/login/page.tsx`: Organizer PIN entry page with luxury glass-card design
- `src/app/api/admin/login/route.ts` & `src/app/api/admin/logout/route.ts`: Secure cookie management
- `src/app/admin/page.tsx` & `src/app/admin/checkin/page.tsx`: Header navigation, door check-in link, and logout
- `supabase/schema.sql`: RLS policies blocking anonymous reads/mutations on `guests`, `vip_codes`, and `event_settings`
- `src/components/AppShell.tsx`: Session-based splash screen display check
- `src/components/SplashScreen.tsx`: Added `onSkip` button
- `src/app/register/page.tsx` & `src/app/vip/page.tsx`: Full-width responsive container and accessible form controls

## Next Immediate Action
Commit and push P0 security & P1 quick win fixes to GitHub, then proceed to the Nigerian Wedding Layer (WhatsApp floating button, Countdown timer, Add to Calendar, and Bank transfer details).
