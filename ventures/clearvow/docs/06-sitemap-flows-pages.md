# Deliverable 6: Complete sitemap, user flows, and page specifications

## 1. Sitemap

```
/                                      Home (metro-aware)
/vendors                               Directory search (query params: category, city, budget, month, pledge)
/vendors/[slug]                        Vendor profile
/venues                                Venue directory (venues are vendors with category=venue, plus venue fields)
/venues/[slug]                         Venue profile (site fee from, per-guest from, capacity, real weddings here)
/[city]/[category]                     Programmatic SEO: "San Diego wedding photographers with prices"
/[city]/[category]/[neighborhood]      Phase 2 programmatic pages (La Jolla, Coronado, North County)
/real-weddings                         Feed with filters (venue, style, budget band, metro)
/real-weddings/[slug]                  Real wedding: story, gallery, full credited vendor team with prices
/price-guides                          Index of price guides
/price-guides/[city]/[category]        "What a San Diego wedding photographer costs" (data-driven from listings)
/price-guides/venues/[slug]            "Park Hyatt Aviara wedding cost" (venue-specific)
/pledge                                The Welcomes Every Couple pledge, full text, how it is enforced
/for-vendors                           Vendor landing: inquiries not leads, pricing table, FAQ
/for-vendors/pricing                   Plan comparison (Free, Pro, Preferred, Spotlight)
/about                                 Who we are, why prices, founder note
/trust                                 Verification, Price-Honest rules, review rules, reporting
/blog                                  Advice (later; not MVP)
/sign-in, /sign-up, /forgot-password   Auth
/start                                 Couple onboarding (3 steps)
/dashboard                             Couple home: vendor team board
/dashboard/inquiries, /dashboard/inquiries/[id]
/dashboard/budget
/dashboard/saved
/dashboard/settings
/claim                                 Vendor claim or create
/vendor                                Vendor home: inquiries
/vendor/inquiries/[id]
/vendor/profile, /vendor/pricing, /vendor/weddings, /vendor/weddings/new
/vendor/analytics, /vendor/billing
/admin, /admin/vendors, /admin/weddings, /admin/inquiries, /admin/metros
/legal/terms, /legal/privacy, /legal/vendor-terms
/sitemap.xml, /robots.txt
```

## 2. Navigation and information architecture

- Primary nav is task-first: Find vendors, Venues, Real weddings, Price guides. "For vendors" is the only B2B link in the main bar; the vendor funnel lives on its own landing page.
- City is a global context stored in a cookie and reflected in URLs for public pages; the MVP ships with San Diego only, but the routing and data model are metro-aware from day one.
- Category taxonomy (MVP, 14): venues, planners, photographers, videographers, florists, catering, cakes and desserts, DJs and bands, officiants, beauty, rentals and decor, stationery, transportation, restroom trailers (a founder-adjacent category that no directory treats seriously). Each category has a slug, a display name, a singular label, category-specific inquiry questions, and a price unit (per event, per hour, per guest, site fee).
- Breadcrumbs on all public pages: Home > San Diego > Photographers > Studio name.

## 3. User flows (step lists)

**Flow C1: Couple finds and inquires.**
1. Lands on `/san-diego/photographers` from search.
2. Reads H1, scans cards with "from $" prices, applies budget band "$2k to $4k."
3. Opens a profile, reads packages, taps "Send inquiry."
4. Not signed in: modal asks for email and password (or continues as a guest with email only; account is created on verify).
5. Step 1 wedding details, step 2 category questions, step 3 message.
6. SMS code verification (once per account).
7. Inquiry queued; vendor notified; couple sees status "Delivered, awaiting reply."
8. Prompt: "Send this to two similar vendors?" with a pre-selected pair in the same budget band.

**Flow C2: Couple onboarding (`/start`).**
1. Partner A and Partner B: first names, optional pronouns.
2. Wedding: date or month, city, estimated guests, total budget.
3. Done: dashboard with the vendor team board and suggested allocations from metro medians.

**Flow V1: Vendor claims profile.**
1. `/claim` search by business name; if found, "This is my business"; if not, "Create a profile."
2. Email verification.
3. Required profile fields (category, service area, starting price, typical range, one package, three photos, pledge).
4. Submitted; status "In review"; admin approves within 2 business days (SLA shown).
5. Live; first inquiry email: "A verified couple sent you an inquiry: June 2027, Park Hyatt Aviara, 120 guests, $3k to $5k."

**Flow V2: Vendor handles an inquiry (free tier).**
1. Opens `/vendor/inquiries/[id]`; sees the full brief, blurred contact.
2. "Unlock for $15" -> Stripe (saved card after the first) -> contact revealed, reply composer opens.
3. Replies within the app; the couple is emailed; response time recorded.
4. If the couple never replies in 7 days, unlock credit is refunded automatically.

**Flow V3: Vendor upgrades to Pro.** From the inquiry page or billing page; Stripe Checkout subscription; webhook sets plan and renews; cancel from billing page with immediate effect at period end.

**Flow V4: Vendor submits a real wedding.** Form with credits; each credit links an existing vendor or creates an unclaimed profile; admin review; publish; emails to credited vendors.

**Flow A1: Admin review.** Queue with diffs for profile changes affecting price or category; approve, request changes, or reject with a reason; audit log.

## 4. Page specifications

Each public page lists: purpose, primary objective, key metric, required content, SEO elements.

| Page | Purpose | Objective | Metric | SEO |
|---|---|---|---|---|
| Home | Route couples to search; route vendors to claim | Search started | Hero search rate; vendor CTA clicks | Title "Wedding vendors with published prices in San Diego"; Organization and WebSite schema with SearchAction |
| `/[city]/[category]` | Rank for "[city] wedding [category]" and "[category] prices" | Profile clicks and inquiries | Click-through to profiles; inquiries per visit | H1 with city and category; ItemList schema; FAQ schema from the price guide; canonical per city-category; pagination with rel links |
| Vendor profile | Convert to inquiry | Inquiry sent | Inquiry rate per profile view | LocalBusiness schema with priceRange, aggregateRating when reviews exist; breadcrumbs; OpenGraph image from the gallery |
| Real wedding | Rank for venue-name queries; recruit vendors | Clicks to credited vendor profiles | Vendor profile clicks per view | Article schema; venue named in title; every credit linked |
| Price guide | Rank for cost queries | Clicks to directory | Directory clicks per view | Data tables, chart, FAQ schema; refreshed monthly from live listings |
| For vendors | Convert vendors | Claim started | Claim rate | Plain language; pricing table; comparison with "pay-to-play" marketplaces, without naming competitors in a defamatory way |
| Pledge | Trust and inclusivity | Pledge-filter usage; vendor pledge sign rate | | Plain text, quotable |

## 5. Data-driven pages that competitors cannot copy without data

- `/price-guides/[city]/[category]` is generated from published listing prices: count, median starting price, interquartile range, and a histogram. It updates as vendors change prices. The Knot's cost guides use survey data; ours use live, vendor-committed prices.
- `/price-guides/venues/[slug]` combines the venue's published site fee and per-guest minimums with the median prices of vendors credited at real weddings there. Example: "A Park Hyatt Aviara wedding with 120 guests typically runs $X to $Y across venue, catering, photography, florals."
