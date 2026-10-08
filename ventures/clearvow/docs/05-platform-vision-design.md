# Deliverable 5: Full website and platform vision

## 1. Brand positioning and identity direction

**Name (working):** Clearvow. "Clear" for published prices and verified inquiries; "vow" for the promise both sides make. Open tasks: USPTO and state trademark search, domain availability (clearvow.com or a two-word alternative), social handle check. Fallback names if blocked: Plainvow, Openvow, Trueaisle.

**Brand promise:** See the price before you ask.

**Tone:** direct, warm, unfussy. Short sentences. No "dream wedding," no "big day," no "bride" as a default. We say "couple," "partner," "your wedding," "your people."

**Personality:** a well-connected friend who used to work in the industry and tells you what things really cost.

**Visual identity:**
- Palette: ivory paper background (#FAF7F2), ink (#1B1A17), a single accent of deep teal (#0F6E68) for actions and trust marks, warm clay (#C96A47) for prices and highlights, soft sage (#DCE5DE) for surfaces. Dark mode inverts paper to charcoal (#161513) with the same accents.
- Type: a high-contrast serif for headlines (Fraunces or Instrument Serif via Google Fonts; a system serif fallback), a humanist sans for UI and body (Inter or Geist). Prices always in the sans, tabular numerals, never in the serif.
- Imagery: real weddings only, credited. No stock. Couples of every kind in hero rotation; never a token.
- Trust marks: "Price-Honest" (published prices and quote-match feedback above 90%), "Verified Inquiries," "Welcomes Every Couple" (signed pledge), "Responds in under 24h."

## 2. Experience principles

1. **Price is a first-class field.** Every card, every profile, every search result shows a starting price. If a vendor has no price, they are not in the directory.
2. **Inquiries are structured.** Couples never write a blank "tell me more" email. They pick a date, venue or city, guest count, budget band, and up to three questions. The vendor sees a complete brief.
3. **Both sides are customers.** Vendor pages are as polished as couple pages. The vendor dashboard is a product, not an afterthought.
4. **Inclusive by construction.** Two partner records. Pronoun fields. Vendor pledge. No gendered copy.
5. **One metro done well.** Every page is location-aware. The homepage asks for a city first.

## 3. Desktop and mobile specifications

**Layout grid:** 12 columns at 1200px max width desktop; 4 columns, 16px gutters on mobile. Cards are 3-up on desktop, 2-up on tablet, 1-up on mobile.

**Navigation (desktop):** Logo | Find vendors | Venues | Real weddings | Price guides | For vendors || Sign in | Start planning (primary button).

**Navigation (mobile):** Logo and a search icon in a sticky top bar; a bottom tab bar for signed-in couples: Search, Saved, Inquiries, Budget, Account. Vendors get: Inquiries, Profile, Analytics, Billing.

**Performance budgets:** Largest Contentful Paint under 2.0s on 4G for directory and profile pages; total JavaScript under 180kB gzipped on public pages; images served as AVIF or WebP with explicit sizes; no layout shift on price badges.

**Accessibility:** WCAG 2.2 AA. All interactive elements keyboard reachable with visible focus. Color contrast 4.5:1 minimum. Form errors announced via aria-live. Price badges carry text, not color alone. Pronoun and partner fields are optional and never required to proceed.

## 4. Homepage, section by section

1. **Hero.** Headline: "See the price before you ask." Subhead: "Wedding vendors in San Diego with published prices, verified inquiries, and a promise to welcome every couple." Inline search: category select, city (defaulted to the detected metro), budget band. Primary button "Find vendors." Secondary link "Are you a vendor? List for free." Objective: search starts. Metric: hero search rate.
2. **Trust strip.** Three marks with one-line explanations: Published prices, Verified inquiries, Welcomes every couple. Objective: reduce bounce.
3. **Browse by category.** Twelve category tiles, each with the metro's median starting price ("Photographers from $2,400"). Objective: category page clicks. The medians are computed from live listings.
4. **Real weddings from San Diego.** Four cards with couple names, venue, and a "see the full vendor team and prices" label. Objective: content engagement that leads to vendor profiles.
5. **How it works for couples.** Three steps: search by budget, send one structured inquiry to several vendors, track replies in one place. Button "Start planning (free)."
6. **For vendors.** "Inquiries, not leads." Three bullets: see the full inquiry before you pay, no contracts, cancel anytime. Button "Claim your profile." Objective: vendor sign-ups.
7. **Price guides.** Links to "What a San Diego wedding photographer costs," "Park Hyatt Aviara wedding cost," etc. Objective: SEO internal linking.
8. **Footer.** Categories by city, company, pledge, vendor resources, legal.

## 5. Major user journeys

**Couple: from search to a sent inquiry (target under 4 minutes).**
Search -> results with prices -> filter by budget, availability month, pledge -> profile -> "Send inquiry" -> if not signed in, a two-field account creation (email, password) inside the inquiry modal -> structured inquiry form prefilled from onboarding -> email and SMS verification (one time) -> sent; inquiry appears in the dashboard with a status.

**Couple: planning dashboard.**
Onboarding captures partner names, pronouns (optional), date or month, city, guest count, total budget. Dashboard shows: budget by category with the metro medians as guidance, the vendor team board (one slot per category: none, saved, inquired, booked), inquiry inbox with vendor replies, saved vendors.

**Vendor: claim to first inquiry.**
"Claim your profile" -> search by business name -> claim (or create) -> email verification -> required fields: category, service area, starting price, typical range, one package, inclusivity pledge checkbox with the pledge text, three portfolio images -> submitted for review -> approved (admin) -> live in the directory -> first inquiry notification -> see the full brief -> unlock ($15) or, on Pro, reply immediately.

**Vendor: upgrade.** From any inquiry: "Pro vendors reply to every inquiry free. $59/mo, cancel anytime." -> Stripe Checkout -> webhook flips plan -> badge and placement update.

**Vendor: submit a real wedding.** Title, venue, date, couple names (with consent checkbox), gallery, credits for every vendor (searchable; uncredited vendors become "unclaimed profiles" that we invite). Admin review -> published -> each credited vendor gets an email with their profile link.

## 6. Dashboard and account experience

**Couple dashboard panels:** Vendor team (grid by category), Inquiries (table: vendor, sent, status, last reply, quoted price vs published range), Budget (allocations and actuals), Saved, Settings (partners, pronouns, date, guest count, budget, notifications, delete account).

**Vendor dashboard panels:** Inquiries (new, replied, unlocked, archived; each with the structured brief), Profile editor (live preview, completeness score), Pricing and packages, Real weddings (submit, status), Analytics (profile views, search impressions, inquiries, response time, quote-match rate), Billing (plan, invoices, cancel), Team (year 2).

**Admin:** Vendor review queue, real-wedding review queue, inquiry verification monitor, pricing anomalies (a $0 or $99,999 starting price), flags and reports, metro configuration, Spotlight slot management.

## 7. Conversion funnel architecture

| Stage | Couple | Vendor |
|---|---|---|
| Awareness | Price guides and real weddings ranking for "[venue] wedding cost," "[city] wedding [category] prices" | Credited in a real wedding; vendor community posts; founder outreach |
| Acquisition | Search with prices; account created inside the inquiry flow | Claim flow with starting price required |
| Activation | First verified inquiry sent | Profile approved and first inquiry received |
| Revenue | n/a (free) | First unlock or Pro checkout |
| Retention | Inquiry replies, budget tracker, email digests with new real weddings at their venue | Monthly analytics email: inquiries received, response time, rank |
| Referral | "Share your vendor team" after the wedding (becomes a real-wedding submission) | "Credit your team" on submissions invites uncredited vendors |

## 8. Design system

- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- **Radii:** 6px controls, 12px cards, 999px pills.
- **Elevation:** one soft shadow for cards on hover only.
- **Components:** Button (primary, secondary, ghost, destructive; sizes sm, md, lg), Input, Select, Textarea, Checkbox with label, Radio group, Pill filter, Price badge, Trust mark, Vendor card, Venue card, Real-wedding card, Inquiry status chip, Empty state, Toast, Modal, Tabs, Table, Stat tile, Progress bar (profile completeness), Avatar pair (two partners), Breadcrumbs, Pagination, Skeleton.
- **Content rules:** headline case for H1 and H2, sentence case for everything else. Prices shown as "from $2,400" on cards and "$2,400 to $4,800 typical" on profiles.

## 9. Wireframe descriptions for critical pages

**Directory results (`/san-diego/photographers`).** Left rail (desktop) or sheet (mobile) with filters: budget band, month available, pledge, style tags, neighborhood. Top: H1 "San Diego wedding photographers with published prices," count, metro median. Cards: image, name, trust marks, "from $X," response time, two style tags, Save and Inquire buttons. Below results: a price guide summary with a chart of the price distribution and FAQ schema.

**Vendor profile (`/vendors/[slug]`).** Hero gallery (5 images). Title block: name, category, service area, trust marks, "from $X · $X to $Y typical," response time, pledge mark. Sticky right card (desktop) or bottom bar (mobile): "Send inquiry" and "Save." Sections: About, Packages (name, price, what is included), Real weddings featuring this vendor, Reviews with quote-match feedback, FAQ, Map of service area. JSON-LD LocalBusiness with priceRange.

**Inquiry modal.** Step 1: your wedding (prefilled). Step 2: what you need (category-specific: hours, headcount, style). Step 3: message (optional, 500 chars). Verify once by SMS code. Confirmation with "Send the same inquiry to 2 more vendors?"

**Vendor inquiry detail.** Left: the brief (date, venue, guests, budget band, needs, message). Right: couple's first names and pronouns if provided, verification marks, and the reply composer. Free tier: brief shown, contact details blurred, "Unlock for $15" button with the refund rule stated.

## 10. Trust, accessibility, and performance standards

- Every inquiry verified by email and phone before delivery; verification status shown on the vendor side.
- Every published price timestamped; vendors reminded every 90 days to confirm prices; stale prices (180 days) flagged on the profile.
- Quote-match feedback asked of couples 14 days after a vendor replies: "Did the quote fall within the published range?" Rates below 80% remove the Price-Honest mark pending review.
- Reviews only from couples with a completed inquiry on the platform or a verified real-wedding credit (reduces fake reviews).
- Report button on every profile and real wedding.
- Accessibility audit with axe and manual keyboard pass before each release.
- Core Web Vitals monitored in production; budgets above enforced in CI with Lighthouse.
