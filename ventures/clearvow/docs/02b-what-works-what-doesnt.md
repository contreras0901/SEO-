# Deliverable 2 (addendum): Site-by-site, what works, what does not, what Clearvow adopts and fixes

This is the direct answer to "compare all of the sites and apply what is working and fix what is not." Each row names where the adopted or fixed behavior lives in the MVP code under `../app/` so the claim can be checked.

## The Knot

| What works (adopt) | How Clearvow applies it |
|---|---|
| Category-by-city architecture that ranks for "[city] wedding [category]" | `/[city]/[category]` pages, metro-aware, with ItemList schema (`src/app/[city]/[category]/page.tsx`) |
| Structured inquiry with date, guest count, and budget (used in their ChatGPT app) | Every inquiry is structured; free text is optional (`src/lib/actions/inquiries.ts`) |
| Reviews as a trust signal at scale | Reviews exist, but only from couples with a completed inquiry (`Review` model, `src/lib/actions/reviews.ts`) |
| Planning tools that keep couples returning (checklist, budget) | Budget by category with metro medians, vendor team board (`src/app/dashboard/*`) |
| Annual data study as public relations | Live, data-driven price guides regenerated from listings (`src/app/price-guides/*`) |

| What does not work (fix) | Clearvow's fix |
|---|---|
| No published prices on listings; couples must "request pricing" | Starting price, typical range, and one package are required before a profile can go live (`src/lib/validation.ts`, `vendorGoLiveSchema`) |
| Pay-to-rank placement and unverified, allegedly fake leads (2025 reporting, FTC letter) | Ranking rules exclude plan; published on `/trust`. Inquiries verified by email and SMS before delivery; free-tier vendors see the full brief before paying; unanswered unlocks refunded (`src/lib/ranking.ts`, `src/lib/actions/inquiries.ts`) |
| 12-month contracts and reported cancellation disputes | Monthly or annual, cancel at period end from the billing page; no sales calls required (`src/app/vendor/billing/page.tsx`) |
| Vendor cost opaque until a sales call | Public pricing table (`/for-vendors/pricing`) |
| Gendered defaults in copy and forms | Partner A / Partner B with optional pronouns; no "bride" or "groom" field anywhere (`Couple` model) |

## Loverly

| What works (adopt) | How Clearvow applies it |
|---|---|
| "No Contracts. Ever." and a clear three-tier vendor ladder (Free, Plus $99, Preferred $199) | Free, Pro $59, Preferred $149, each with a public feature list; cancel anytime (`/for-vendors/pricing`) |
| Real-wedding submissions as a tier benefit (3 / 10 / unlimited per year) | Submission limits by plan: Free 3, Pro 10, Preferred unlimited (`src/lib/plans.ts`) |
| Verified badge and profile analytics on paid tiers | Analytics page for every vendor; badges are earned by behavior, not purchased (`/vendor/analytics`) |
| Free vendor account can receive inquiries | Free vendors receive and read every inquiry brief |

| What does not work (fix) | Clearvow's fix |
|---|---|
| "Boosted placement" and "Top placement" sold for money; couples cannot tell why a vendor is first | Only capped, labeled Spotlight slots are sold. Everything below is sorted by response rate, quote-match, completeness, price freshness, and credits (`src/lib/ranking.ts`) |
| No prices on vendor cards | Price badge on every card (`src/components/VendorCard.tsx`) |
| Homepage and vendor pages block automated agents (HTTP 403 for crawlers that are not Google) | Public pages are server-rendered and openly crawlable; `robots.txt` only excludes dashboards (`src/app/robots.ts`) |
| Audience claims ("5M reach") that cannot be checked | Vendor landing shows live numbers from the database: listed vendors, verified inquiries delivered, median response time (`/for-vendors`) |

## Carats + Cake

| What works (adopt) | How Clearvow applies it |
|---|---|
| The credit graph: every real wedding links every vendor to a profile | `RealWeddingCredit` model; each published wedding page lists the full team with prices (`/real-weddings/[slug]`) |
| "Submit a wedding regardless of tier" | Any vendor can submit; paid tiers get higher annual limits and expedited review |
| Low, honest monthly price with no annual contract ($35 / $45) | Pro at $59 is priced near this band, justified by unlimited verified inquiries |
| Curated editorial quality bar | Admin review before publishing (`/admin/weddings`) |
| Visual search over the archive ("Cherry") | Deferred to phase 3 (style tags and filters at launch) |

| What does not work (fix) | Clearvow's fix |
|---|---|
| Free profiles get no inquiry form and are hidden from the directory, so couples cannot reach vendors who have not paid | Free vendors are in the directory and receive every inquiry; they pay only to reveal contact details, with the brief visible first |
| Single location and single category on free; couples outside the vendor's "service location" never see them | Service area is free text plus metro; search is by metro |
| No prices for couples anywhere | Prices required |
| The financing and B2B payments pivot (2022) diluted the consumer product | Vendor tools are a year-2 add-on that attach to inquiries, not a pivot |

## Wedding Sparrow

| What works (adopt) | How Clearvow applies it |
|---|---|
| High editorial standard and venue-named real-wedding titles that rank | Real-wedding titles always include the venue name; stories are human-edited |
| Newsletter capture woven into content | Email capture on real-wedding and price-guide pages (phase 2; event tracked in MVP) |
| Vendor guide as a membership benefit | Real-wedding features are part of Pro and Preferred |

| What does not work (fix) | Clearvow's fix |
|---|---|
| "Created to Inspire Brides," "Mother of the Bride" as the default audience | Inclusive copy standard; pledge page; pronoun support |
| Members-only submissions, film-only, prices hidden, inquiry-form-only advertising | Open submissions, any medium, public pricing |
| No marketplace, no inquiry flow, no planning tools | Clearvow is a marketplace first; editorial serves acquisition |
| Affiliate shop tiles mixed into editorial feed | No affiliate content in the real-wedding feed; partner offers live only in the couple dashboard and are labeled |

## Cross-cutting fixes none of the four made

1. **Published prices everywhere** (cards, profiles, category pages, price guides).
2. **Verified inquiries with the brief visible before payment** and a refund if the couple never answers.
3. **Ranking that money cannot buy**, with the rules published.
4. **Inclusive data model** (two partners, pronouns, pledge filter).
5. **Response-time and quote-match accountability** shown on profiles.
6. **One metro at launch** so density is real, instead of a thin national directory.
