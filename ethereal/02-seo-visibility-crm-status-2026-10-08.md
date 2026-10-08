# Ethereal Luxury Restrooms: SEO, Google visibility, and CRM status

**Prepared by:** Rank (AI), with Elevate's website-integrity lens, 2026-10-08
**Asset:** `etherealluxuryrestrooms.com` (Showit) plus whatever Google Business Profile, Search Console, Google Ads, HoneyBook, and HubSpot hold for Ethereal.
**Status:** PROVISIONAL SEO RECOMMENDATION, NOT YET ATELIER POLICY. Internal CEG project work, not client work. Nothing here has been changed on the live site or any listing.

**Fact Register note.** CEG Context in this session holds no Ethereal facts (fleet, prices, service area, relationships). Everything observed on the public site is **PUBLIC CLAIM, NOT YET INTERNAL CEG FACT** and is listed in section 5 as Fact Register update candidates. POTENTIAL OUTSIDE CONTEXT (the Bella Mia repo's mention that the Ethereal Google account is etherealluxuryrestrooms@gmail.com) was used only to say which login probably owns the Showit site; it set no target, claim, or copy.

---

## 1. The short answer to "what is my ranking?"

**No Google ranking position can be stated for Ethereal today, because no Google data was available to this session.** Rank cannot see Search Console, Business Profile performance, or the local pack as a San Diego searcher sees it. What follows is what could be observed, labeled.

| Question | Answer | Label |
|---|---|---|
| Does Ethereal appear for its core buying queries in the search tool available here? | No. For "luxury restroom trailer rental san diego", "luxury portable restroom rental wedding san diego", and "restroom trailer rental san diego" the tool returned thelavatory.com, rentnational.com, The Knot (Finest City Events), WeddingWire (Loos of Luxury, VIP Rentals), Posh Privy, and trade articles. etherealluxuryrestrooms.com was not in any returned set. | OBSERVED SEARCH SIGNAL, 2026-10-08, session web-search tool, US, no city set. **Not a Google position.** |
| Does the brand name find the site? | Partly. Two brand searches returned nothing for the business. An extended search returned the Instagram account and three site URLs: the homepage under its old share title, and two **dead** legacy URLs (`/home/`, `/an-elegant-stylish-theme/`, both 404 today). | OBSERVED SEARCH SIGNAL, 2026-10-08 |
| Is there a Google Business Profile? | UNKNOWN. No listing for the name or the phone number 619-248-0786 surfaced; the one business.google.com result was a competitor (IE Sanitation Suites, 5.0, 11 reviews). Absence in this tool is not absence on Google. | UNKNOWN; needs Founder screenshot |
| Measured search data (clicks, impressions, calls)? | None supplied. | MEASURED SEARCH DATA: none. NO BASELINE, capture first. |

**INFERENCE.** For local service queries like these, Google's local pack (Business Profile) and the wedding directories (The Knot, WeddingWire) are where the competitors observed here get seen. Ethereal's organic pages are well-titled, but a site alone rarely enters the local pack. The Business Profile question in section 7 is the single most important unknown.

---

## 2. Standard SEO output

```
BUSINESS OBJECTIVE        Qualified Ethereal inquiries (weddings, corporate, construction, emergency) from
                          San Diego / Southern California search, owner: Founder, with Elevate. Date: ongoing.
SEARCH OBJECTIVE          Local intent + transactional queries: "luxury restroom trailer rental san diego",
                          "wedding restroom trailer san diego", "restroom trailer rental [city]", brand.
                          Outcome level targeted: VISIBILITY -> CONVERSION.
BASELINE                  NO BASELINE. Search Console, Business Profile, HoneyBook inquiry counts: none supplied.
CURRENT VISIBILITY        OBSERVED only (section 1). MEASURED: none. TOOL ESTIMATE: none (no tool used).
TECHNICAL FINDINGS        BLOCKING 0, HIGH 3, MEDIUM 4, LOW 3, IGNORE FOR NOW 3 (section 3).
CONTENT / PAGE FINDINGS   Titles and metas good; H1s weak on the money pages; city pages near-duplicate and orphaned.
LOCAL FINDINGS            Profile status UNKNOWN; NAP present in LocalBusiness schema on Home and Contact;
                          service area stated five different ways across the site (section 4).
COMPETITOR OBSERVATIONS   Section 6, dated.
PRIORITIES                Section 8.
MEASUREMENT               Section 9.
RISKS / LIMITATIONS       Section 10.
NEXT ACTION               Founder: send a Business Profile screenshot (or confirm none exists) and the
                          ELR Showit login as environment secrets; Rank applies the hero fix and captures baseline.
FOUNDER DECISION REQUIRED Yes (section 11).
```

---

## 3. Technical and on-page findings (all VERIFIED 2026-10-08 by fetching every URL in the sitemap and rendering Home and Book Now in headless Chromium)

What is right, so it is not re-done:

- All 20 sitemap URLs return 200. `http` and `www` both 301 to `https://etherealluxuryrestrooms.com`. Canonicals are self-referencing. Sitemap is clean.
- Every page has a unique, specific title and meta description with the service and the place in it. Example: Home `Luxury Restroom Trailer Rentals San Diego | Ethereal Luxury`. This is better than most competitors observed.
- Structured data is thorough: LocalBusiness on Home (name, street address 8885 Rio San Diego Dr. Suite 237, San Diego 92108, phone, email, URL, `areaServed` four counties, `sameAs` Instagram, `foundingDate` 2021) and on Contact; a `Service` block plus BreadcrumbList on every service page and every city page.
- GA4 (`G-CK2PFHNV7J`) and a Google Ads tag (`AW-339469736`) with phone-call conversion tracking are installed on every page.
- The inquiry form on `/book-now` is an embedded HoneyBook contact form; it loads on a phone (name, email, phone, address, two radio questions, reCAPTCHA, Send).

Findings, prioritized:

| ID | Finding | Evidence | Priority | Business exposure | Fix | Owner | Approval |
|---|---|---|---|---|---|---|---|
| E1 | Home hero fills the whole phone screen; wordmark cut off; no headline or call to action on the first screen | `screenshots/home-mobile-hero-before-after.png`; `#hero` class `sb-nm-wH`, inline height 844 | HIGH | Homepage, every phone visitor (most local-service traffic is phone) | `01-home-hero-mobile-fix.md`: phone height 520, focal point lower-center, publish | Founder (or Rank once ELR Showit login is in the environment) | No (layout only) |
| E2 | Phone number is never a tap-to-call link. Home, Contact, Book Now, footer: zero `tel:` links; Contact shows "619. 248. 0786" as plain text. Email is Cloudflare-obfuscated text, no `mailto:`. | grep of all fetched HTML | HIGH | Conversion. A phone visitor must copy the number by hand. Also undercuts the Ads call-conversion tag. | Make every phone number a `tel:+16192480786` link (Showit: text element, click action, phone). Add `mailto:`. Same number everywhere. | Founder / Rank | No |
| E3 | Seven city pages (`/la-jolla`, `/carlsbad`, `/encinitas`, `/rancho-santa-fe`, `/del-mar`, `/coronado`, `/chula-vista`) are 79 to 86% identical in text, ~237 words each, H1 is the city name alone, and **no page on the site links to any of them** (sitemap only). | difflib similarity against La Jolla; link grep across all pages | HIGH | These are the pages meant to win "[city] restroom trailer" searches. Orphaned pages get little crawl or link value, and near-duplicate city pages are the pattern Google's spam policy calls doorway abuse (policy source, section 10). | Two-step: (a) link them now from the Service Area page and footer; (b) rewrite each with true, location-specific content or consolidate into Service Area (section 8, NEXT). No new city pages. | Elevate decides which cities stay (profitable area); Founder supplies facts; Rank drafts | Yes for (b) |
| E4 | Orphaned money pages: `/pricing-guide` and `/why-a-trailer` are linked from nowhere on the site | link grep | MEDIUM | Pricing page answers the top pre-call question and is invisible to visitors | Add both to nav or footer and to the Restrooms page | Founder / Rank | No |
| E5 | Home H1 is "Organic, Refined, Designed for Luxury": brand voice, no service, no place | fetched HTML | MEDIUM | Homepage relevance for the core query | Keep the line as styled text; make the H1 a plain statement such as `Luxury Restroom Trailer Rentals in San Diego & Southern California` (wording waits on the claimed service area) | Founder approves wording | Yes (public claim: area) |
| E6 | Book Now has two H1s ("Inquire form", "iNQUIRE HERE"); Contact H1 is "Office Location"; city H1s are the city name only; About H1 "About us" | fetched HTML | MEDIUM | Hygiene on conversion pages | One H1 per page: Book Now `Book a Luxury Restroom Trailer`, Contact `Contact Ethereal Luxury Restrooms`, cities `Luxury Restroom Trailer Rentals in La Jolla` etc. | Rank drafts, Founder applies | No |
| E7 | Legacy WordPress URLs still in the search index now 404 with no redirect: `/home/`, `/an-elegant-stylish-theme/` (a template-demo title). Showit also 404s every trailing-slash variant (`/about/`). | OBSERVED SEARCH SIGNAL 2026-10-08 + curl | MEDIUM | Brand searchers can land on "File Not Found"; the demo-title URL is a credibility leak | Showit site settings, redirects: `/home/` and `/home` to `/`; `/an-elegant-stylish-theme/` to `/`; `/about/` etc. to the non-slash page if Showit allows pattern redirects. Then request removal of the demo URL in Search Console. | Founder / Rank | No |
| E8 | Schema `areaServed` says four counties (Ventura, Los Angeles, Orange, San Diego) while the visible copy says five other things (section 4); schema `foundingDate` 2021 and the venue strip are unconfirmed claims encoded as data | JSON-LD on Home and service pages | LOW (until the area is decided) | Search engines read schema as current fact | Align `areaServed` with the single approved service-area sentence; keep schema only for confirmed facts | Rank, after Elevate's decision | Yes (public claim) |
| E9 | Hero image `alt` empty (1 of 4 images on Home) | DOM dump | LOW | Hygiene | Set alt text | Founder | No |
| E10 | `robots.txt` returns 404 (Showit) | curl | LOW / IGNORE FOR NOW | None: a missing robots file blocks nothing | Nothing | | |
| E11 | `/?p=1` returns the homepage (200) without redirect | curl | IGNORE FOR NOW | Canonical tag already points to `/` | Nothing | | |
| E12 | Page weight and field performance not measured (cross-origin sizes hidden to the test; no CrUX data supplied) | | IGNORE FOR NOW | Unknown; Showit pages are generally acceptable | Revisit only if Search Console Core Web Vitals flags it | | |

---

## 4. Local findings

- **Configuration.** The site publishes a street address (Rio San Diego Dr., Mission Valley) and says "Our office is available only by appointment. Our units are not on site." A business that visits customers and does not serve them at the address is normally configured as a service-area business on Google (address hidden, service area set). CURRENT PLATFORM POLICY NOT YET VERIFIED in this session; the dated snapshot in Rank's policy file says the same. Whether the profile exists and how it is configured is UNKNOWN.
- **Consistency of the service-area claim across the site** (all PUBLIC CLAIM):
  - Home meta: "Serving all of Southern California"
  - Book Now meta: "from Thousand Oaks to Chula Vista"
  - Service Area title: "Ventura to San Diego"
  - Contact meta: "San Diego, LA, and Orange County"
  - Instagram bio (THIRD-PARTY CLAIM via search snippet): "300+ events from LA to San Diego"
  - City pages: seven San Diego County cities only
  - Schema `areaServed` (Home and service pages): Ventura, Los Angeles, Orange, and San Diego counties
  Elevate's rule: keep the publicly claimed area, the profitable area, and the operationally servable area separate. The public one is currently five different sentences. Decide one, then every title, meta, schema `areaServed`, and the Business Profile say the same thing.
- **NAP.** Name, address, phone, email are consistent on Home and Contact schema. Email in schema is `etherealluxuryrestrooms@gmail.com`. Whether the Business Profile, Yelp, The Knot, or WeddingWire carry the same: UNKNOWN (no listings found by the tool; see section 6).
- **Reviews.** None observed anywhere by this session. Count, rating, recency: UNKNOWN.
- **Local pages.** Fail the location-page test (section 3, E3). The one location-specific sentence per page ("fits tighter coastal driveways", "race-season events") is not enough to justify a page per city.
- **Conversion path.** Book Now form works on phone. Phone is not tappable (E2). Response time: UNKNOWN. Lead source capture: the HoneyBook form shows two radio questions whose labels could not be read from outside; whether one is "How did you find us?" is UNKNOWN.

---

## 5. Public claims flagged (FACT REGISTER UPDATE CANDIDATES, all observed 2026-10-08 on the live site)

| Claim | Where | Why it matters |
|---|---|---|
| "You may have seen us in: BRICK, Sheraton San Diego Resort, Porsche, Shady Canyon Golf Course, Liberty Station, Stone Mountain estates" | Home | Venue and brand relationship claims. Each needs VERIFIED or FOUNDER CONFIRMED status, or removal. Do not add schema or copy around them until confirmed. |
| Prices: 2-stall $1,150, 3-stall $1,350, 4-stall $1,450, 5-stall ADA $2,150, "plus delivery" | Pricing Guide + its meta | Public price list. Ledger owns whether these are current and profitable; Elevate owns whether they stay public. If wrong, this is FIX BEFORE TRAFFIC. |
| "We are fully insured. Certificate of insurance can be provided upon request." | Pricing Guide, every city page | Insurance statement; confirm. |
| "Same-day delivery is often available" / "same-day availability" | Pricing Guide, city metas | Availability promise; confirm with Forge capacity. |
| "Five-Stall ADA Trailer... Wheelchair-accessible with a dedicated ADA suite" | Pricing Guide, Restrooms | Accessibility claim with legal meaning; Elevate's external-claim rule requires confirmation. |
| "Since 2021", "family-owned", "the family duo" | About | Years-in-business and ownership. |
| Units: 2 to 5-stall trailers, "Cortessa and Standard design lines", solar-powered single units for construction | Restrooms, Design Options, Construction | Fleet description. |
| Service area, five versions | see section 4 | Pick one. |
| "300+ events from LA to San Diego" | Instagram bio (THIRD-PARTY CLAIM) | Statistic; confirm before it appears on the site. |

Website integrity tiering (Elevate, "Scout lens performed by Rank/Elevate", 2026-10-08): **FIX BEFORE TRAFFIC:** E2 (no tappable phone), any price or claim above that is not current, the service-area contradiction. **FIX SOON:** E1 hero, E7 dead legacy URLs, E3 orphan city pages. **IMPROVE LATER:** H1 copy, schema breadth, alt text. **Traffic go / no-go:** no paid or campaign traffic to the site until FIX BEFORE TRAFFIC items are resolved. The Google Ads tag is installed; whether Ads is spending today is UNKNOWN and should be checked first.

---

## 6. Competitor observations (OBSERVED SEARCH SIGNAL, 2026-10-08, session web-search tool, US, no location set; one look, not market share)

| Who appears | How they appear | Note |
|---|---|---|
| The Lavatory (thelavatory.com) | Multiple San Diego and SoCal pages, phone in title, 2/5/9-station trailers, ADA, 24/7 line | Pages are inconsistent about where units are based (LA, Phoenix listed); national-style site |
| National Construction Rentals (rentnational.com) | City pages: San Diego, Escondido, Carlsbad | Construction-first, 2/4/8-station |
| Loos of Luxury (Oceanside) | WeddingWire profile, 5.0 | Wedding-focused, "since 2021", decor extras included |
| Posh Privy | Love Inc vendor page | "family-owned, 30 years" |
| Finest City Events | The Knot | Wedding restrooms, solar/battery units, wallpaper styling |
| VIP Rentals (Fallbrook) | WeddingWire | 4 and 5-station trailers |
| Golden Coast Restrooms | Trade article mention only | Not verified from its own site |
| IE Sanitation Suites | Google Business Profile, 5.0, 11 reviews, service area "Southern California" | 2-stall suites; posts about fire-rebuild service |

INFERENCE: for wedding queries the directories (The Knot, WeddingWire) are visible surfaces; for generic "restroom trailer rental san diego" the national-style sites with city pages are. Ethereal's differentiator in copy (styled interiors, boutique, design lines) is not claimed by the generic players; it is claimed by Loos of Luxury and Finest City Events. Scout owns the fuller competitive read.

---

## 7. CRM status

| System | Status (2026-10-08) | Label |
|---|---|---|
| HubSpot | Portal "Bella Mia Exclusive Events" (ID 247566644), created 2026-09-30, currency USD, **time zone US/Eastern** (should be US/Pacific). Contacts: **2, both HubSpot sample contacts** (Brian Halligan, Maria Johnson). Deals: **0**. No Ethereal record of any kind. The marketing-plugin HubSpot connector failed to connect; the direct HubSpot connector worked. | MEASURED (HubSpot API via connector) |
| HoneyBook | The site's only inquiry form posts to HoneyBook. HoneyBook is therefore Ethereal's de facto CRM and inquiry log. Not connected to this session: inquiry count, response time, source field, pipeline: UNKNOWN. | OBSERVED (form embed) + UNKNOWN |
| Google Ads | Conversion tag with phone-call tracking installed. Spend, campaigns, call volume: UNKNOWN. | OBSERVED + UNKNOWN |
| Google Analytics 4 | Installed. No report supplied. | OBSERVED + UNKNOWN |
| Search Console | Property for Ethereal: UNKNOWN. (The Bella Mia property was created 2026-10-01 while signed in as etherealluxuryrestrooms@gmail.com, so that Google account exists.) | UNKNOWN |
| Google Business Profile | UNKNOWN (section 1). | UNKNOWN |

Plainly: **Ethereal has no working CRM in HubSpot.** Its inquiries live in HoneyBook, and nothing reported here says how many there are, where they came from, or how fast they were answered. Elevate's Gate D (every inquiry records source, stage, outcome) cannot be assessed until the HoneyBook inquiry list is exported or shared. The HubSpot portal is a Bella Mia shell with sample data; using it for Ethereal would need a decision on company separation first (Elevate's cross-company rule: separate brands, contact lists, and records).

---

## 8. Priorities

**DO NOW (this week, Founder plus Rank where access exists)**
1. **E1 hero fix** on the phone layout, per `01-home-hero-mobile-fix.md`. Founder: 10 minutes in Showit, or add `ELR_SHOWIT_EMAIL` / `ELR_SHOWIT_PASSWORD` to the environment and Rank applies and verifies it.
2. **E2 tap-to-call** on every phone number; `mailto:` on the email. Same session as item 1.
3. **Confirm the Business Profile.** Founder: open business.google.com signed in as the Ethereal account; screenshot the profile (name, category, service area, phone, website, review count) and the Performance page (last 6 months: calls, website clicks, direction requests). If there is no profile, that becomes the first local SEO task and a Tier 3 decision (service-area configuration).
4. **Add a Search Console property** for `sc-domain:etherealluxuryrestrooms.com` if none exists (same DNS TXT method the Bella Mia change log records), and export last 3 months: queries, pages, clicks, impressions. That is the baseline.
5. **Export HoneyBook inquiries** since 2026-01-01 (date, source if captured, event type, city, outcome). That is Elevate's pipeline baseline and the only way to say whether search produces inquiries.
6. **Link the orphans** (E3a, E4): Service Area page links to each city page; nav or footer links to Pricing Guide and Why a Trailer.

**NEXT (after the baseline exists)**
7. Decide the one public service-area sentence (Elevate, with Ledger's profitable-radius input). Then align Home meta, Book Now meta, Service Area title, Contact meta, schema, and the Business Profile.
8. Confirm or remove each public claim in section 5. Removing an unverifiable claim is faster than proving it.
9. City pages: keep only cities inside the profitable area; rewrite each with real local content (venues actually served there, access or permit notes, delivery zone and fee, event photos from that city, a client line if confirmed). Pages that cannot be made genuinely local are consolidated into Service Area with 301 redirects (Tier 3: Founder approval, URL disposition table).
10. H1s (E5, E6) and redirects for the dead legacy URLs (E7).
11. Directory presence: decide The Knot / WeddingWire / Yelp listings (Vanguard for channel priority, Elevate for the Ethereal view). Competitors for wedding queries are visible through them.
12. Compliant review-request process (Rank template 11) once the profile is confirmed. No incentives, no gating.

**LATER**
13. Alt text; a review of the existing schema against confirmed facts; an Advice section answering the pre-call questions (how many stalls for N guests, power and water needs, placement); AI-feature visibility only measured, never promised.

**STOP / DO NOT**
- No more city pages until item 9 is decided.
- No paid or campaign traffic until E2 and the price and claim checks are done (Elevate Gate C). Check whether Google Ads is currently spending; if it is, that is an Atlas/Ledger question today.
- No keywords added to the Business Profile name; no second profile; no incentivized reviews.

---

## 9. Measurement (PROVISIONAL)

Baseline to capture before the DO NOW changes publish (date, property, who captured):
- Search Console: clicks, impressions, top 20 queries, top pages, last 3 months. Page indexing report: indexed count and the "not indexed" reasons.
- Business Profile performance: calls, website clicks, direction requests, messages, searches, last 6 months.
- HoneyBook: inquiries per month, by source where captured, and quote-to-booking count.
- Google Ads: spend and call conversions, last 3 months, if active.
Change log: every live change goes in `../fixes/06-baseline-and-change-log.md` style (date, asset, before, after, who). Recheck date for the hero and tel-link changes: 2026-11-08 (phone inquiries and calls vs the prior month, read as directional, small numbers).
Lead source: add "How did you find us?" to the HoneyBook form if it is not already one of the two radio questions.

## 10. Risks and limitations

- Rank saw no Google data. Every visibility statement here is a one-time observation from a non-Google search tool with no location set; it is evidence of absence in that tool, not a Google ranking.
- The Business Profile may exist and be fine; it may not exist; it may be suspended. All three are consistent with what was observed.
- Public claims (prices, insurance, ADA, venues, since 2021, 300+ events) were not verified. Any of them being wrong is a customer-experience and credibility risk now, independent of SEO.
- The HubSpot finding is measured and unambiguous: it holds nothing for Ethereal.
- Correlation warning: October to December is a seasonal shift for events; do not read any inquiry change after the hero and phone fixes as caused by them without the baseline.

## 11. Founder decisions required

1. Approve the hero change (layout only; recommended: yes). Decide whether to add the ELR Showit login to the environment so Rank can apply it (recommended: yes, as secrets, never in chat).
2. Confirm the Business Profile and Search Console status, and supply the screenshots and exports in section 8 items 3 to 5.
3. Decide the single public service-area sentence (with Elevate and Ledger).
4. Confirm or remove the "You may have seen us in" venue and brand names and the other claims in section 5.
5. Decide whether the seven city pages are rewritten with real local content or consolidated (recommended: consolidate all but the two or three cities with the most actual jobs, after the HoneyBook export shows where the jobs are).
6. Decide whether Ethereal gets its own CRM record system (HoneyBook stays as is, or a separate HubSpot portal; not the Bella Mia portal).
