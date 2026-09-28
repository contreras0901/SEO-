# Fix 05 — Real Weddings section (B5)

**Priority:** HIGH IMPACT at the visibility level. This is the structural gap between Bella Mia and Serene Events & Design.
**What Serene does:** one post per venue, titled with the venue, dated, with real photos and specific detail. Roughly 20 such posts since 2021.
**What Bella Mia should do:** the same pattern, only from weddings that are VERIFIED as Bella Mia's work, at a pace the Founder can sustain (one post every one to two weeks is plenty).
**What Bella Mia should not do:** AI-written posts with no real detail, venue pages for venues never worked, mass city pages, or any hotel "preferred vendor" wording without Concierge sign-off.

## Step 1 — Founder inventory (needed before any writing)

List the last 6–10 weddings Bella Mia planned or designed. For each:

| # | Couple (first names, with their permission) | Venue | City | Date (month/year) | What Bella Mia did (full planning / partial / florals / all) | Photographer (name + credit permission) | Photos available? | Couple permission to publish? |
|---|---|---|---|---|---|---|---|---|
| 1 | Cherine & Andy (VERIFIED on homepage copy per Atlas, 17 Sep 2026; FOUNDER CONFIRMED for the portfolio 2026-09-28) | The Westgate Hotel | Downtown San Diego | | **florals + rentals only; planner was RBCO Events** (FOUNDER CONFIRMED vendor list 2026-09-28). Atlas's "planned and designed by Bella Mia" framing is withdrawn | Khoa Photography; video Wildlight Films; HMU Bridal Beauty by Phoebe; officiant Nilou Weddings; Sofreh and desserts Taraneh Ajdar; cake Jenny Wenny Cakes. Draft post: `posts/cherine-and-andy-westgate-hotel.md` | | Couple and photographer: FOUNDER CONFIRMED 2026-09-28 |
| 2 | Erica & Patrick (gallery page `/erica-and-patrick-sieben` exists per Atlas) | Park Hyatt Aviara (FOUNDER CONFIRMED 2026-09-28) | Carlsbad | | planning, design, florals (FOUNDER CONFIRMED) | Audree Belle Photography; video Shutter And Sound; live band PatrickLVB (FOUNDER CONFIRMED). Draft post: `posts/erica-and-patrick-park-hyatt-aviara.md` | | |
| 3 | Julianne & David [UNVERIFIED: the homepage "Loews Coronado Resort Wedding" link was a Showit template placeholder pointing at a 404, per Atlas. Confirm this wedding exists as photos and permissions before it becomes a post] | Loews Coronado Bay Resort | Coronado | | | | | |
| 4 | | | | | | | | |

**Portfolio page launches with two galleries (FOUNDER CONFIRMED 2026-09-28):** Cherine & Andy at The Westgate Hotel (florals and rentals by Bella Mia, planned by RBCO Events), and Erica & Patrick at Park Hyatt Aviara (planning, design, and florals by Bella Mia). **Every portfolio card states Bella Mia's role**, so no wedding reads as planned by Bella Mia unless it was. The portfolio intro from the Atlas package ("celebrations we have planned and designed") becomes "celebrations we have planned, designed, or styled." Add a third card when a third wedding with permissions exists. Both gallery pages follow `posts/layout-spec-real-weddings.md`.

**Order of publication (revised):** Erica & Patrick (Aviara) first, because it is fully approved and Bella Mia planned it; Cherine & Andy (Westgate) second, once its brackets are filled.

**Order of publication (from `../analysis/reconciliation-atlas-package.md`):** Westgate first, Erica & Patrick second, then the Hotel del Coronado and Loews venue guides from the Atlas package. The Loews guide's "recommend most often" line is FOUNDER CONFIRMED true (2026-09-28). The `[FOUNDER FILL — only if true]` personal lines in both guides still need Yvanna's own sentence or get deleted. Atlas's Part 4 image-naming protocol applies to every image before upload.

Rank will write the drafts from this table. Nothing is published without the couple's and photographer's permission.

## Step 2 — Page setup (one time)

- Create a section at `/real-weddings/` (Squarespace: a Blog page titled "Real Weddings"; set its SEO title to `Real Weddings | Bella Mia Exclusive Events, San Diego` and description `Real San Diego weddings planned and designed by Bella Mia Exclusive Events, with the venues, details, and vendor teams behind each one.`).
- Add "Real Weddings" to the main navigation.
- Link to it from the homepage and the services page.

## Step 3 — Post template

**URL:** `/real-weddings/[venue-slug]-wedding-[couple]` (e.g., `/real-weddings/loews-coronado-bay-wedding-julianne-david`)
**Title tag (≤60 chars):** `[Couple]'s [Venue] Wedding | [City] | Bella Mia`
Example: `Julianne & David's Loews Coronado Bay Wedding | Bella Mia`
**Meta description (≤155):** `[Venue], [City]: how Bella Mia planned and designed [Couple]'s [season] wedding, from [one specific detail] to [one specific detail].`
**H1:** `[Couple]'s [Season] Wedding at [Venue]`

**Body (aim for 300–600 words of real detail, not filler). Cover, in this order:**

1. The couple and the brief in two sentences: what they wanted the day to feel like.
2. The venue, named, with one or two things a couple booking that venue needs to know (ceremony site used, reception space, guest count range, anything about logistics Bella Mia handled there).
3. Design: palette, florals (what was built, which flowers, where), tablescape, one signature moment.
4. What Bella Mia did: planning scope, day-of management, florals. Say it plainly.
5. Vendor team: photographer, venue, catering if outside, DJ/band, hair and makeup, paper. Credit and link where the vendor agrees.
6. One sentence closing with a link to `/services/` and to `/contact`.

**Images:** 8–15 real photos, compressed, each with alt text that says what is in it (`Sweetheart table with white roses and taper candles at Loews Coronado Bay Resort`), not keyword strings.

**Internal links:** from the post to `/services/` and `/contact`; from the homepage "Real Weddings" section to the newest 3 posts.

**Claim check before publishing:** every fact (venue, date, scope, vendor names) confirmed by the Founder; no "preferred," "exclusive," or "partner" language about any venue unless Concierge has confirmed it in writing.

## Step 4 — First six posts (proposed order)

1. The Loews Coronado Bay wedding, if confirmed (Coronado is the positioning target).
2–6. From the inventory, prefer venues in La Jolla, Coronado, Del Mar, Rancho Santa Fe, and downtown San Diego hotels, because those are where the luxury-intent searches point. One venue per post; if two weddings were at the same venue, do the second later.

## Step 5 — After six posts exist

- Write one guide post: `Our Favorite San Diego Hotel & Resort Wedding Venues (From Weddings We've Planned)`, linking to each real-wedding post. Only venues actually worked.
- Consider a single Coronado page only if it passes the location-page test in Rank's method (substantive, true, Coronado-specific content a couple there would need).

## Measurement

In Search Console, filter Performance by page prefix `/real-weddings/` and watch impressions and queries; expect venue-name queries first. Small numbers are directional. Log each publish date in `06-baseline-and-change-log.md`.
