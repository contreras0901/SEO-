# Deliverable 8: Technical architecture and development specification

## 1. Stack and build-versus-buy decisions

| Layer | Choice | Why | Buy alternative considered |
|---|---|---|---|
| Frontend and backend | Next.js 15 (App Router, React 19, TypeScript), server components and server actions | One codebase, SEO-friendly server rendering, incremental static regeneration for programmatic pages, large hiring pool | Separate SPA plus API: more surface, slower SEO pages |
| Styling | Tailwind CSS 4 with design tokens in CSS variables | Fast, consistent, small CSS | Component libraries: unnecessary weight for a custom brand |
| Database | PostgreSQL in production (Neon or Supabase), SQLite for local development, Prisma 6 ORM | Relational data with many joins (credits, inquiries, budgets); Prisma keeps schema and types in one place | Firebase or Mongo: poor fit for relational marketplace data |
| Auth | Own email-and-password sessions (bcrypt, httpOnly cookie, server-side session table), magic-link and Google sign-in in phase 3 | Simple, auditable, no vendor lock; sessions revocable | Clerk or Auth0: fine later; cost and lock-in not justified at launch |
| Payments | Stripe Checkout and Billing (subscriptions) plus one-time payments for inquiry unlocks; webhooks update plan state | Industry default; hosted checkout keeps PCI scope minimal | Paddle: fewer US wedding vendors know it |
| Email | Resend (transactional) with React Email templates; marketing automation via Loops or Customer.io in phase 3 | Cheap, developer-friendly | SendGrid: fine but heavier |
| SMS verification | Twilio Verify | Reliable, per-use pricing | None |
| Search | PostgreSQL full-text and trigram indexes behind a scoring query at launch; Typesense or Meilisearch when listings exceed ~20k | Avoid a search cluster at 300 listings | Algolia: cost at scale |
| AI | Claude API (claude-sonnet-5-5 for drafting, claude-haiku-5-5 for classification) behind `lib/ai.ts` with feature flags and daily cost caps | Quality, prompt caching, tool use for structured output | OpenAI: equivalent; pick one and abstract it |
| Analytics and events | First-party `AnalyticsEvent` table for product events, PostHog for product analytics and session replay (self-hosted later), Google Search Console and GA4 for SEO | Own the funnel data; PostHog is cheap at this scale | Mixpanel or Amplitude: more cost, no need |
| CRM and lifecycle | HubSpot free tier for vendor sales pipeline at launch; lifecycle email from the app itself | The founder's group already uses HubSpot | |
| Hosting | Vercel for the app, Neon for Postgres, Cloudflare R2 or Vercel Blob for images, Cloudflare in front for caching and WAF | Minimal ops; scale by paying | AWS: more control, more ops burden; revisit at ~$5k/mo hosting |
| Images | Upload to object storage, transform with Next Image (AVIF/WebP, explicit sizes) | Core Web Vitals | Cloudinary: fine, more cost |
| Admin | In-app admin routes gated by role | Keeps one codebase | Retool: adds a tool; maybe later |
| Monitoring and backups | Sentry (errors), Vercel analytics (vitals), Better Stack (uptime), Neon point-in-time recovery, nightly logical dumps to R2 with 30-day retention | Standard | |
| CI | GitHub Actions: lint, typecheck, unit tests, Prisma migrate check, Lighthouse budget on three pages | Keep CI green before every push | |

## 2. System architecture

```
Browser (couple / vendor / admin)
   |
Cloudflare (DNS, cache for public pages, WAF, rate limits)
   |
Vercel: Next.js app
   |- Public pages (ISR, revalidate 10 to 60 min; on-demand revalidate on vendor/wedding publish)
   |- Server actions (auth, inquiries, profile edits, billing)
   |- Route handlers: /api/stripe/webhook, /api/health, /api/cron/*
   |- lib/: auth, db, stripe, notify (email, sms), ai, ranking, analytics
   |
Neon Postgres (Prisma)        Stripe (Checkout, Billing, webhooks)
Resend (email)                Twilio Verify (SMS)
R2 / Blob (images)            Claude API (drafting, classification)
PostHog (events)              Sentry (errors)
```

Scheduled jobs (Vercel Cron): nightly price-staleness flags, 7-day unlock refund check, 14-day quote-match prompts, monthly vendor analytics digest, weekly price-guide regeneration.

## 3. Data model (Prisma schema in `app/prisma/schema.prisma`)

Core entities and the reason each exists:

- **User** (email, passwordHash, role COUPLE | VENDOR | ADMIN, phone, verification timestamps). One login per person.
- **Session** (hashed token, expiry). Server-side sessions, revocable.
- **VerificationCode** (channel EMAIL | SMS, code hash, expiry, consumedAt).
- **Metro** (slug, name, state). All public pages key off a metro.
- **Category** (slug, name, singular, priceUnit, questionsJson). Category-specific inquiry questions live here, so adding a category is a data change.
- **Vendor** (owner, metro, category, slug, name, description, service area, startingPrice, typicalLow, typicalHigh, priceConfirmedAt, pledgeSignedAt, plan FREE | PRO | PREFERRED, status DRAFT | PENDING | LIVE | SUSPENDED, Stripe ids, styleTags, cached stats). Venues are vendors in the venue category with extra fields (siteFeeFrom, perGuestFrom, capacity).
- **VendorImage**, **Package** (name, price, description).
- **Couple** (userId, partnerA and partnerB names and pronouns, date, metro, guestCount, budgetTotal). No gendered roles anywhere.
- **BudgetItem** (couple, category, planned, actual).
- **SavedVendor**.
- **Inquiry** (couple, vendor, category, eventDate, venueName, guestCount, budgetLow, budgetHigh, needsJson, message, status DELIVERED | UNLOCKED | REPLIED | CLOSED, unlockedAt, unlockPaymentId, verifiedEmail, verifiedPhone, firstReplyAt). The product's central object.
- **InquiryMessage** (inquiry, senderRole, body). Threaded replies.
- **QuoteFeedback** (inquiry, matched, quotedPrice). Feeds Price-Honest.
- **RealWedding** (slug, title, metro, venue vendor or venue name, date, partner names, story, status, cover, submittedBy, publishedAt), **RealWeddingImage**, **RealWeddingCredit** (wedding, vendor, role). The credit graph.
- **Review** (vendor, couple, rating, body, status). Only from couples with a completed inquiry.
- **SpotlightSlot** (metro, category, vendor, start, end). Capped at 3 per metro-category in code.
- **AnalyticsEvent** (name, user, vendor, propsJson). First-party funnel events.
- **AuditLog** (actor, action, entity, diffJson). Admin accountability.

Indexes: vendors by (metroId, categoryId, status, startingPrice); inquiries by (vendorId, status, createdAt) and (coupleId, createdAt); real weddings by (metroId, status, publishedAt); unique slugs; unique (coupleId, vendorId) on saved vendors; unique (realWeddingId, vendorId, role) on credits.

## 4. Key server actions and route handlers (API surface)

| Action or route | Role | Purpose |
|---|---|---|
| `signUp`, `signIn`, `signOut` | public | Sessions |
| `completeCoupleOnboarding` | couple | Create Couple and default budget |
| `saveVendor`, `unsaveVendor` | couple | Saved list |
| `createInquiry` | couple | Validates with zod, verifies account, writes Inquiry, notifies vendor, logs event |
| `replyToInquiry` | couple or vendor | Appends message; sets firstReplyAt and response stats |
| `submitQuoteFeedback` | couple | Price-Honest signal |
| `claimVendor`, `createVendor`, `updateVendorProfile`, `updateVendorPricing`, `signPledge` | vendor | Profile lifecycle; price or category changes return status to PENDING |
| `unlockInquiry` | vendor | Creates a Stripe one-time Checkout session (or uses a saved payment method); webhook marks UNLOCKED |
| `startProCheckout`, `openBillingPortal` | vendor | Stripe subscription lifecycle |
| `submitRealWedding` | vendor | Creates wedding with credits (creates unclaimed vendors for new credits) |
| `adminSetVendorStatus`, `adminPublishWedding`, `adminSetPlan` | admin | Review queues; manual plan override when Stripe is not configured |
| `POST /api/stripe/webhook` | Stripe | checkout.session.completed, customer.subscription.updated and deleted, payment refunds |
| `GET /api/health` | ops | DB connectivity |
| `GET /api/cron/*` | scheduler (secret header) | Jobs listed above |
| `GET /sitemap.xml`, `/robots.txt` | public | SEO |

## 5. Roles and permissions

| Capability | Couple | Vendor | Admin |
|---|---|---|---|
| Browse, search, read real weddings and guides | yes | yes | yes |
| Send inquiries, save vendors, budget | yes | no | yes (impersonation logged) |
| See inquiry contact details | own | after unlock or on Pro/Preferred | yes |
| Edit vendor profile, pricing, packages | no | own, subject to review | all |
| Submit real weddings | no (phase 3: couples can) | yes | yes |
| Approve vendors and weddings, set plans, manage Spotlight | no | no | yes |
| Export own data, delete account | yes | yes | yes |

## 6. Integrations

Stripe (billing), Resend (email), Twilio Verify (SMS), Claude API (drafting), PostHog (analytics), Sentry (errors), Google Search Console API (phase 3, SEO reporting), HubSpot (vendor sales pipeline, via the group's existing account), Instagram Graph API (phase 4, portfolio import).

## 7. Security, privacy, and compliance

- Passwords hashed with bcrypt (cost 12). Sessions in httpOnly, Secure, SameSite=Lax cookies; server-side revocation.
- CSRF: server actions are POST-only with origin checks (Next default); the Stripe webhook verifies signatures.
- Rate limits at Cloudflare and in-app (sign-in, inquiries per couple per day, verification codes per phone).
- PII minimization: couples' phone numbers are shown to a vendor only after unlock or on a paid plan; never exported in bulk; never sold. Clear privacy policy in plain English.
- California: CCPA/CPRA applies to the business once thresholds are met; build data export and deletion from day one. Vendor terms state that published prices are the vendor's representation; Clearvow is not a party to contracts.
- TCPA: SMS only for verification and transactional notices with explicit opt-in checkbox; no marketing SMS.
- CAN-SPAM: unsubscribe in every marketing email; transactional email separated.
- Accessibility (ADA Title III risk for public accommodations): WCAG 2.2 AA target.
- Content: real-wedding submissions require the submitter to confirm they hold rights and have the couple's consent; takedown process on `/trust`.
- Fraud: inquiry verification (email + SMS), disposable-domain blocklist, velocity limits, admin monitor; refund rule for unanswered unlocks removes the incentive to tolerate junk.
- Backups: Neon PITR plus nightly dumps; restore drill quarterly.

## 8. Performance and SEO implementation requirements

- Public pages are server-rendered and cached (ISR) with on-demand revalidation when a vendor or wedding is published.
- Structured data: Organization, WebSite with SearchAction, BreadcrumbList, LocalBusiness with priceRange on profiles, ItemList on category pages, Article on real weddings, FAQPage on price guides.
- Canonicals, metro-aware titles, pagination with `rel=next/prev` equivalents in links, `sitemap.xml` generated from live data, `robots.txt` excluding dashboards.
- Image `alt` text required on upload; filenames slugified from vendor and venue names (a lesson from the Bella Mia SEO audit in this repository).
- Lighthouse CI budgets: performance 90+, accessibility 95+, SEO 100 on home, category, profile.

## 9. Environment and configuration

`DATABASE_URL`, `SESSION_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_PRO_ANNUAL`, `STRIPE_PRICE_UNLOCK`, `RESEND_API_KEY`, `EMAIL_FROM`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SID`, `ANTHROPIC_API_KEY`, `AI_DAILY_BUDGET_USD`, `APP_URL`, `CRON_SECRET`. The app runs locally with only `DATABASE_URL` and `SESSION_SECRET`; every integration degrades to a logged no-op with a visible "not configured" message rather than a silent failure.

## 10. Path to scale

- To 20k vendors and 500k monthly visitors: same architecture; add Typesense, move images to a CDN with on-the-fly transforms, add read replicas.
- To multi-region: Postgres primary in one region with edge caching of public pages is sufficient for a US business for the whole 36-month horizon.
- Vendor tools (proposals, contracts, payments) in year 2 to 3 add e-signature (Dropbox Sign or DocuSign API), Stripe Connect for deposits, and a document store. They attach to the existing Inquiry object, which becomes a Booking.
