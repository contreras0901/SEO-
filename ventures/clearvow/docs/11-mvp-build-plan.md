# Deliverable 11: Detailed MVP build plan and implementation package

This is the Phase 10 package: PRD, feature inventory, backlog, user stories with acceptance criteria, permissions, payment flows, analytics plan, SEO requirements, security and performance checklist, QA strategy, and launch checklist. The MVP is implemented in `../app/`. Each feature below is marked **Built** (implemented and exercised by the smoke test or a manual check in this session), **Built, needs keys** (code complete, runs only with third-party credentials), or **Not built** (specified for the next release). Nothing marked Built is a mockup.

## 1. Product requirements (PRD)

**Problem.** Couples cannot see prices before contacting vendors; vendors pay for unverified leads under long contracts. **Users.** Couples (free), vendors (free, Pro, Preferred), admin. **Goal of the MVP.** Prove that vendors will publish prices and pay for verified inquiries in one metro. **Non-goals.** Registry, wedding websites, guest lists, national coverage, vendor CRM.

**Success metrics for the MVP (Stage 1 gate):** 100 live vendors with prices; 20 paying vendors or $1,000 MRR; 100 verified inquiries; cost per verified inquiry under $30; vendor-rated inquiry quality 4 of 5 or better.

## 2. Feature inventory and status

| Area | Feature | Status | Where |
|---|---|---|---|
| Public | Home with live category medians and platform stats | Built | `src/app/page.tsx` |
| Public | Directory search with category, city, budget band, pledge, text filters, pagination | Built | `src/app/vendors/page.tsx`, `src/lib/queries.ts` |
| Public | Programmatic city-category pages with ItemList and FAQ schema | Built (14 pages for San Diego, static-generated) | `src/app/[city]/[category]/page.tsx` |
| Public | Vendor profile with prices, packages, trust marks, credits, reviews, LocalBusiness schema, mobile inquiry bar | Built | `src/app/vendors/[slug]/page.tsx` |
| Public | Real weddings feed and detail with full credited team and prices | Built | `src/app/real-weddings/*` |
| Public | Price guides computed from live listings with histogram and FAQ schema | Built | `src/app/price-guides/*` |
| Public | Pledge, trust and ranking rules, for-vendors, pricing table, about, terms, privacy | Built | respective routes |
| Public | Sitemap, robots, metadata, canonicals | Built | `src/app/sitemap.ts`, `robots.ts` |
| Auth | Email and password sign-up and sign-in, server-side sessions, sign-out | Built | `src/lib/auth.ts`, `src/lib/actions/auth.ts` |
| Auth | Email and SMS verification codes with resend limits | Built (console transport); Built, needs keys (Resend, Twilio) | `src/lib/notify.ts` |
| Couple | Onboarding with two partners, pronouns, date, city, guests, budget; default budget allocation | Built | `src/app/start/page.tsx`, `src/lib/actions/couple.ts` |
| Couple | Structured inquiry with category questions, budget band, message, phone capture | Built | `src/app/inquire/[slug]/page.tsx`, `src/lib/actions/inquiries.ts` |
| Couple | Inquiry held until verified, then auto-delivered | Built | `releasePendingInquiries` |
| Couple | Dashboard: vendor team board, inquiries, thread replies, budget, saved, settings | Built | `src/app/dashboard/*` |
| Couple | Quote-match feedback and reviews gated on replied inquiries | Built | `src/lib/actions/couple.ts` |
| Vendor | Claim unclaimed profile or create new; go-live checklist; submit for review | Built | `src/app/claim/page.tsx`, `src/app/vendor/page.tsx` |
| Vendor | Profile editor with completeness score; pledge signing; image URLs | Built (URL-based images); direct upload Not built | `src/app/vendor/profile/page.tsx` |
| Vendor | Pricing editor with required starting price, range, packages; market stats sidebar; price confirmation | Built | `src/app/vendor/pricing/page.tsx` |
| Vendor | Inquiry inbox with full brief, pronouns, blurred contact on free tier | Built | `src/app/vendor/inquiries/[id]/page.tsx` |
| Vendor | Reply with response-time tracking | Built | `replyToInquiry` |
| Vendor | Inquiry unlock via Stripe Checkout; webhook marks unlocked; 7-day no-reply refund job | Built, needs keys | `unlockInquiry`, `src/app/api/stripe/webhook/route.ts`, `src/lib/billing-jobs.ts` |
| Vendor | Pro subscription via Stripe Checkout and Billing portal; webhook plan sync | Built, needs keys | `src/lib/actions/billing.ts` |
| Vendor | Real-wedding submission with credits creating unclaimed profiles; plan limits | Built | `submitRealWedding` |
| Vendor | Analytics: views, inquiries, saves, rank position, ranking inputs | Built | `src/app/vendor/analytics/page.tsx` |
| Admin | Overview stats and event counts; vendor review queue with status and manual plan; wedding review queue with credited-vendor emails | Built | `src/app/admin/*` |
| Platform | Ranking score (plan excluded), Price-Honest, stale-price flags, Spotlight cap | Built | `src/lib/ranking.ts`, `src/lib/queries.ts` |
| Platform | AI brief drafting with deterministic fallback and daily cost cap | Built (fallback); Built, needs keys (Claude API) | `src/lib/ai.ts` |
| Platform | First-party analytics events and audit log | Built | `src/lib/analytics.ts` |
| Platform | Cron: refunds, 90-day price reminders, 14-day quote-match prompts | Built, needs keys for email and Stripe | `src/app/api/cron/route.ts` |
| Platform | Health endpoint | Built | `src/app/api/health/route.ts` |
| Ops | Seed with 48 labeled sample vendors and 4 sample weddings; demo accounts | Built | `prisma/seed.ts` |
| QA | Lint, typecheck, production build, 15-step Playwright smoke through the real UI | Built, passing | `scripts/smoke.ts`, `.github/workflows/clearvow.yml` |
| Not built | Direct image upload, Google sign-in, Spotlight self-serve billing, Preferred self-serve checkout, data export and deletion self-serve, report button, email digests, Search Console reporting, visual search, vendor tools | Not built | Stage 2 and 3 |

## 3. Prioritized backlog (next release)

1. Direct image upload to R2 or Vercel Blob with alt text required (replaces URL field).
2. Report button on profiles, inquiries, and weddings; admin flags queue.
3. Self-serve data export and account deletion (privacy policy promise).
4. Google sign-in; one-tap SMS verification link.
5. Preferred self-serve checkout; Spotlight slot purchase with cap enforcement in checkout.
6. Email digests (couples: new weddings at your venue; vendors: monthly analytics).
7. Availability month on profiles and a "month" filter.
8. Saved-vendor comparison table (prices, packages, reply time side by side).
9. Review summaries and vendor reply assistant (model-backed, feature-flagged).
10. Lighthouse CI budgets; Sentry; uptime monitoring.
11. Neighborhood pages (`/[city]/[category]/[neighborhood]`).
12. Couple-submitted real weddings.

## 4. User stories and acceptance criteria (selected)

- **As a couple, I can see a vendor's starting price on every search result** so I only contact vendors I can afford. AC: every card shows "from $X per unit"; vendors without a price never appear. Verified by smoke step 1.
- **As a couple, I send one structured inquiry** with date, venue, guests, budget band, category questions, and an optional message. AC: zod validation; duplicate open inquiries blocked; 15 per day limit; brief generated. Verified by smoke steps 5 to 9.
- **As a couple, my inquiry is held until I verify** email and phone. AC: status `PENDING_VERIFICATION` until both verified, then `DELIVERED` and the vendor is emailed. Verified by smoke steps 6 to 9.
- **As a vendor on Free, I read the full brief before paying** and can unlock contact for $15. AC: brief visible, contact blurred, unlock button disabled with a clear message when Stripe is not configured. Verified manually (billing not configured in this session).
- **As a vendor on Pro, I reply without fees** and my response time is recorded. AC: `firstReplyAt` set on first reply; couple emailed; stats recomputed. Verified by smoke step 11.
- **As a couple, I report whether the quote matched** the published range. AC: one feedback per inquiry; only after a reply; vendor quote-match rate recalculated. Verified by smoke step 12.
- **As a vendor, I cannot go live without prices, a package, a pledge, a description, and an image.** AC: checklist blocks "Submit for review." Verified manually on `/vendor`.
- **As an admin, I approve vendors and weddings** and every action is audited. AC: audit log rows written; credited vendors emailed on publish. Verified by smoke step 14 and code review.
- **As anyone, ranking never depends on plan.** AC: `rankScore` has no plan input; Spotlight is a separate, labeled, capped list. Verified by code and `/trust` page.

## 5. Permissions and workflows

See Deliverable 8, section 5. Enforcement points: `requireVendor` (vendor routes), `AdminLayout` (admin routes), ownership checks inside every server action (`inq.vendor.ownerId === user.id`, `inq.coupleId === couple.id`).

## 6. Monetization and payment flows

- **Unlock:** vendor clicks Unlock → `unlockInquiry` creates a Stripe Checkout session (mode payment, price `STRIPE_PRICE_UNLOCK`, metadata inquiryId) → success URL → webhook `checkout.session.completed` marks `UNLOCKED` and stores the payment intent → cron refunds after 7 days with no couple reply → webhook `charge.refunded` records it.
- **Pro:** `startProCheckout` (mode subscription, monthly or annual price) → webhook sets plan `PRO` and subscription id → `customer.subscription.updated` or `deleted` keeps plan and renewal date in sync → Billing portal for cancel and invoices.
- **Manual override:** admin can set plan when Stripe is not configured; audited.
- Stripe products to create: Pro monthly $59, Pro annual $590, Inquiry unlock $15. Webhook events to enable: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `charge.refunded`.

## 7. Analytics measurement plan

First-party events (table `AnalyticsEvent`): `sign_up`, `sign_in`, `verify_email`, `verify_sms`, `couple_onboarded`, `vendor_saved`, `inquiry_created` (status, budget band, category), `vendor_replied`, `quote_feedback`, `vendor_profile_view`, `vendor_claimed`, `vendor_created`, `vendor_pricing_updated`, `pledge_signed`, `vendor_submitted_for_review`, `real_wedding_submitted`, `unlock_started`, `inquiry_unlocked`, `pro_checkout_started`, `pro_activated`. Funnels: couple (sign_up → couple_onboarded → inquiry_created → verify → vendor_replied); vendor (vendor_created → pricing_updated → pledge_signed → submitted → live → first inquiry → unlock or pro). Add PostHog for session-level analysis in Stage 2; GA4 and Search Console for SEO.

## 8. SEO implementation requirements

Built: server-rendered public pages; ISR with 10 to 60 minute revalidation; `generateStaticParams` for city-category pages; canonical URLs; titles and descriptions with live numbers; JSON-LD (WebSite with SearchAction, ItemList, FAQPage, LocalBusiness with priceRange and aggregateRating, Article); breadcrumbs; sitemap from live data; robots excluding private routes; image alt text; internal links between category pages, price guides, profiles, and weddings. Next: on-demand revalidation hooks on publish (currently time-based), neighborhood pages, Search Console integration.

## 9. Security and performance checklist

- [x] bcrypt cost 12; sessions hashed server-side; httpOnly, SameSite=Lax, Secure in production
- [x] Server actions only; Stripe webhook signature verification; cron bearer secret
- [x] Input validation with zod on every action; open-redirect guard on `next`
- [x] Rate limits: inquiries per day, verification codes per 10 minutes
- [x] Contact details hidden until unlock or paid plan; no bulk export
- [x] Audit log for admin and price changes
- [x] Public JS under 110 kB first load (build output); images lazy with explicit sizes
- [ ] Cloudflare WAF and edge rate limits (deployment step)
- [ ] Sentry, uptime, Lighthouse CI (Stage 2)
- [ ] Counsel review of legal pages

## 10. QA and testing strategy

- Static: ESLint (0 errors), TypeScript strict (0 errors), production build.
- End-to-end: `scripts/smoke.ts` drives headless Chromium through sign-up, onboarding, inquiry, verification, vendor reply, feedback, budget, admin pages, and a landmark/heading check on public pages. 15 checks, passing in this session.
- Manual before launch: Stripe test-mode checkout and webhook with the Stripe CLI; Resend and Twilio delivery; cron run; dark mode; keyboard-only pass; screen reader pass on the inquiry form.
- Next: unit tests for `ranking.ts`, `validation.ts`, and `stats.ts`; axe accessibility run in CI; Lighthouse budgets.

## 11. Deployment and launch checklist

1. Create Neon Postgres; set `DATABASE_URL`; change the Prisma datasource provider to `postgresql`; run `prisma migrate deploy`.
2. Vercel project from `ventures/clearvow/app`; set every variable in `.env.example`; add a Vercel Cron hitting `/api/cron` daily with the bearer secret.
3. Stripe: products and prices; webhook endpoint `/api/stripe/webhook`; test with the Stripe CLI; Billing portal configured to allow cancel.
4. Resend domain verification; Twilio number and messaging compliance (A2P 10DLC registration for US SMS).
5. Cloudflare DNS, caching, WAF rules, rate limits.
6. Replace sample data: run the seed only in development; in production, create the metro and categories, then invite vendors.
7. Create the admin user (temporary script or seed subset); rotate the demo password.
8. Submit the sitemap to Google Search Console; verify structured data with the Rich Results test.
9. Legal pages reviewed; takedown and privacy inboxes exist.
10. Monitoring: Sentry DSN, uptime check on `/api/health`.
11. Founding-vendor list prepared; first 30 vendors claimed before the public URL is shared.
