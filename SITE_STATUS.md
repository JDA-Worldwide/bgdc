# Bargersville Microsite — Current Status & Remaining Work

**Date:** April 13, 2026

---

## Build Status: Feature-Complete — Content & Launch Remaining

All structural development is done. All 7 new modules are built and registered. All 5 inner pages are live. GSAP scroll animations are implemented across all modules and homepage sections. Per-section dark color scheme theming is available in Studio. What remains is **Sanity content entry**, **client-supplied assets**, and **launch configuration**.

---

## ✅ Completed Dev Work

### Core Structure
- All 7 page builder modules built, registered, and schema'd
- All 5 inner pages live (`/who-we-are`, `/ongoing-growth`, `/development-areas`, `/business-incentives`, `/get-in-touch`)
- Homepage migrated to PageBuilder with all sections registered
- Mapbox interactive map live on homepage
- Per-section dark color scheme (`colorScheme: "dark"`) available in Studio for all modules

### UI / Theming
- All emojis removed from FeatureGrid, ResourceHub, IncentiveCards
- FeatureGrid changed to 2×2 grid on tablet/desktop
- DetailedStats checkerboard background pattern (alternating white/surface)
- Dark color scheme system: `.scheme-dark` utility, `@theme` CSS variables, PageBuilder wrapper
- `whyPillars`, `projectsGrid`, `incentivesGrid` added to `fullBleedModules` (prevents double padding)

### Animations
- `AnimateIn` client wrapper component created (`src/components/ui/AnimateIn/index.tsx`)
- All 15 inner page modules have scroll-triggered entrance animations:
  - `Hero` — heading/subheading/CTA fade up on load (direct `useGsap`)
  - `TextBlock`, `TIFSection`, `ContactInfo` — container fade up
  - `FeatureGrid`, `DetailedStats`, `IncentiveCards`, `ResourceHub`, `TeamGrid`, `LogoBar` — stagger grid
  - `ProjectShowcase`, `DevelopmentAreaShowcase` — per-item fade up with delay
  - `Testimonials`, `FAQ`, `ContactForm` — direct `useGsap` (already client components)
- All 7 remaining homepage sections now have scroll animations:
  - `WhySection`, `GrowthSection`, `IncentivesSection`, `IndustriesSection`, `MomentumSection`, `LocationSection`, `CtaBanner`

### Footer / Social
- Footer social URLs updated to real Bargersville accounts:
  - Facebook: `facebook.com/bargersvilletown`
  - Instagram: `instagram.com/bargersvilletown/`
  - LinkedIn: `linkedin.com/company/town-of-bargersville/`
  - X/Twitter: `x.com/BargersvilleIN`

### SEO / Technical
- `generateMetadata` on all pages (driven by Sanity `seo` field)
- `buildMetadata` utility for consistent OG/Twitter cards
- `sitemap.ts` — dynamic XML sitemap (all pages + blog posts)
- `robots.ts` — disallows `/studio/`, references sitemap
- JSON-LD: Organization schema in root layout, WebPage schema on pages, FAQ schema on FAQ modules
- Skip-to-content link in root layout
- Keyboard-accessible navigation with Escape key, focus management, ARIA attributes

---

## Open Issues

### 1. Homepage — Broken Images (Sanity assets not loading)

The **Community Section** has 4 broken images and the **Value Props Section** has 3 broken icon images. Images are referenced in Sanity but assets aren't resolving — likely not uploaded to the dataset or references are malformed.

**Fix:** Verify Sanity dataset has the referenced image assets uploaded. Re-upload or migrate if needed.

### 2. Homepage — Stats Counter Showing Zeros

"Bargersville by the Numbers" displays "0+" for residents, "0.0%" for growth, "$0" for median home value. Sanity is returning data but `number` fields are 0 or null.

**Fix:** Populate correct `number` values in the `statsBar` module in Sanity Studio.

### 3. Ongoing Growth — Only 1 of 5 Projects Entered

Only **Downtown Bargersville Redevelopment Plan** is in Sanity. Still needed:

- [ ] The Jefferson (Mixed-Use Development)
- [ ] Bellingham — New Homes by Lennar (Residential)
- [ ] SR 135 & Smokey Row Road Mixed-Use Development (Commercial)
- [ ] Meadowbrook (Coming Soon)
- [ ] Closing CTA section ("Interested in Being Part of What's Next?")

### 4. Contact Page — Map Placeholder

Shows "Map coming soon" — depends on confirmed physical office address.

### 5. Homepage — Momentum Section Content Mismatch

"Momentum in Motion" shows generic town plans instead of the development projects from the content doc (Downtown Redevelopment, SR 135 Commercial, Bellingham/Lennar). Needs content update in Sanity.

---

## Content Still Needed from Client (Jane / Town of Bargersville)

### Must-Have for Launch

| # | Page | Item Needed |
|---|------|-------------|
| 1 | Business Incentives | Development incentive program details (names, eligibility, how to apply) |
| 2 | Business Incentives | TIF district names, boundaries, eligible uses, how to apply |
| 3 | Business Incentives | Small business support resources and local programs |
| 4 | Business Incentives | Links for all 6 Town Resources (GIS, Zoning, Water/Sewer, Stormwater, Electric, Tax Rates) |
| 5 | Development Areas | Parcel details for I-69/SR 144 corridor (acreage, zoning, utilities, ownership) |
| 6 | Development Areas | Parcel details for Downtown district |
| 7 | Development Areas | Parcel details for South SR 135 corridor |
| 8 | Ongoing Growth | The Jefferson — project specs (unit count, size, timeline, rendering) |
| 9 | Ongoing Growth | Meadowbrook — project details (type, location, timeline, image) |
| 10 | Ongoing Growth | Confirm active URL for Downtown Redevelopment Plan PDF |
| 11 | Ongoing Growth | Confirm active URL for The Jefferson news link |
| 12 | Contact | Physical office address and office hours |
| 13 | Contact | Confirm contact form routing inbox + auto-response preference |
| 14 | All Pages | Confirm project status labels (Planning / In Progress / Under Construction, etc.) |
| 15 | Who We Are | Household income data (median, per capita, % earning $100K+) |

### Needed from Design/GIS Team

| # | Page | Asset Needed |
|---|------|-------------|
| 16 | Home | Branded regional map graphic (Bargersville relative to Indy, Bloomington, airport, etc.) |
| 17 | Development Areas | Parcel map — I-69/SR 144 interchange corridor |
| 18 | Development Areas | Parcel map — Downtown Bargersville district |
| 19 | Development Areas | Parcel map — South SR 135 industrial/commercial corridor |
| 20 | Business Incentives | TIF district boundary map |
| 21 | All Pages | Hero images/photography for each inner page (currently using stock photos) |
| 22 | Ongoing Growth | Downtown Redevelopment Plan renderings (confirm usage rights with Browning Day) |
| 23 | Ongoing Growth | SR 135/Smokey Row site image or tenant logo bar |

---

## Pre-Launch Checklist (Dev / DevOps)

| # | Item | Status |
|---|------|--------|
| 1 | Set `NEXT_PUBLIC_SITE_URL` in Vercel env vars (production) | ❌ Pending |
| 2 | Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` in Vercel | ❌ Pending |
| 3 | Set `NEXT_PUBLIC_MAPBOX_TOKEN` in Vercel | ❌ Pending |
| 4 | Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` in Vercel (contact form spam protection) | ❌ Pending |
| 5 | Register `/api/revalidate` webhook in Sanity Studio → pointed at production URL | ❌ Pending |
| 6 | Confirm domain and DNS cutover plan | ❌ Pending |
| 7 | Verify `/sitemap.xml` generates correctly in production | ❌ Pending |
| 8 | Verify `/robots.txt` is not blocking crawlers | ❌ Pending |
| 9 | End-to-end contact form test: submission → Sanity `formSubmission` doc → email delivered | ❌ Pending |
| 10 | SEO metadata: confirm meta titles/descriptions on all 6 pages match content doc | ❌ Pending |

---

## Remaining Dev Work (Content-Dependent)

1. **Fix broken homepage images** — diagnose whether Sanity assets are missing or references are bad
2. **Fix homepage stats** — populate correct number values in Sanity
3. **Enter remaining 4 projects** in Sanity for the Ongoing Growth page
4. **Add closing CTA** to Ongoing Growth page in Sanity
5. **Update Momentum section** content to match approved copy (development projects, not town plans)
6. **SEO content** — populate `seo` object on each page in Sanity Studio (meta title, description, OG image)
