# Real Weddings card redesign (Founder request 2026-10-06)

**Status:** SPEC, ready for the Mac session to build in Showit. FOUNDER CONFIRMED 2026-10-06: every Real Weddings card on the site gets this design, with the couple's first names and the venue on each card.
**Reference:** the Founder's screenshot of a Serene-style card: couple names in large serif caps, `WEDDING GALLERY` in letterspaced caps, the venue in small grey letterspaced caps, and a full-width dusty-rose button reading `VIEW THE GALLERY` in white italic letterspaced caps. Structure is copied; fonts and colors are Bella Mia's (see `../posts/layout-spec-real-weddings.md` section C).
**Where it applies:** every place a Real Weddings card appears: the three-card row under the Château feature (the row in the Founder's screenshot showing La Valencia, Loews, Westgate), the homepage "Recent Features" cards, the `/blog/` listing cards, and the Real Weddings category template. One Showit card design, reused.

## 1. Card anatomy (top to bottom)

1. **Photo**, 4:5 portrait, the post's featured image, no overlay, no caption. Kept from the current cards.
2. **Text block** on the page background (cream `#f6f2ec` or the section's existing off-white), left-aligned, 32 px top padding.
   - **Line 1, couple:** `ROBERTA & SID`. Site heading serif, all caps, about 40 px desktop / 30 px mobile, near-black `#1f1f1f`, letterspacing 0.02 em. This is the card's heading (H3 in WordPress cards).
   - **Line 2:** `WEDDING GALLERY`. Same serif or the site's small-caps face, 16 px, letterspacing 0.3 em, near-black.
   - **Line 3, venue:** `LA VALENCIA HOTEL`. 13 px, letterspacing 0.25 em, grey `#6b6b6b`.
   - **Line 4, role (required on the Westgate card, consistent on all):** `PLANNING · DESIGN · FLORALS · RENTALS`. Same style as line 3. This keeps the FOUNDER CONFIRMED rule (2026-09-28) that no wedding reads as planned by Bella Mia unless it was. If the Founder wants the cleaner four-line look, drop it on the four planned weddings only; the Westgate card keeps `FLORALS & RENTALS`.
3. **Button**, full width of the text block, 24 px above, 36 px vertical padding: background dusty rose `#c9a39f` (sampled from the reference; swap for Bella Mia's accent if one is defined in Showit's site colors), text `VIEW THE GALLERY` in white, italic, letterspacing 0.3 em, 13 px. Whole card and the button link to the post. Hover: background darkens to `#b8908c`.

Replace, do not keep: the italic `Real Weddings` label above the divider, the divider line, and the all-caps venue-only title.

## 2. Card content (all five, in display order)

| Order | Line 1 | Line 3 (venue) | Line 4 (role) | Link |
|---|---|---|---|---|
| 1 | `ROBERTA & SID` | `LA VALENCIA HOTEL` | `PLANNING · DESIGN · FLORALS · RENTALS` | `/2026/10/02/la-valencia-hotel-wedding-la-jolla-roberta-and-sid/` |
| 2 | `JULIANNE & DAVID` | `LOEWS CORONADO BAY RESORT` | `PLANNING · DESIGN · FLORALS · RENTALS` | `/2026/10/01/loews-coronado-bay-wedding-julianne-and-david/` |
| 3 | `CHERINE & ANDY` | `THE WESTGATE HOTEL` | `FLORALS & RENTALS` | `/2026/10/01/westgate-hotel-wedding-florals-cherine-and-andy/` |
| 4 | `ERICA & PATRICK` | `PARK HYATT AVIARA` | `PLANNING · DESIGN · FLORALS` | `/2026/09/29/park-hyatt-aviara-wedding-erica-and-patrick/` |
| 5 | `ERIKA & JULIO` | `PRIVATE ESTATE, SAN DIEGO` | `PLANNING · DESIGN · FLORALS · CATERING` | `/2026/10/01/private-estate-wedding-san-diego-erika-and-julio/` |

Line 2 is `WEDDING GALLERY` on every card. The Château post is not a Real Wedding card and keeps its feature block.

Alt text on each card photo: `[Couple] wedding at [Venue]`, e.g. `Roberta and Sid wedding at La Valencia Hotel, La Jolla`.

## 3. Showit build (Mac session)

1. In the Showit blog templates, open the card design used by the Real Weddings row (the row under the Château feature) and by the Category and Blog listing templates. If they are separate designs, build it once and copy to the others.
2. Delete the italic `Real Weddings` text, the divider, and the venue title. Add four text elements bound to WordPress fields: couple → post title (so the post titles must read `Roberta & Sid`; see step 5), `WEDDING GALLERY` static, venue and role → the post's excerpt split on ` | ` (Showit binds one field, so put venue and role in the excerpt as `LA VALENCIA HOTEL | PLANNING · DESIGN · FLORALS · RENTALS` and bind the excerpt to a single text element; if two lines are needed, use two static text elements per card on the homepage row, which is hand-built).
3. Add a Showit button element below, bound to the post link, styled per section 1.3.
4. Mobile: stack identically, photo full width, text block 24 px padding.
5. WordPress: set each post's **title** to the couple's names (`Roberta & Sid`) and each post's **excerpt** to `VENUE | ROLE` as in the table. Keep the Yoast SEO title and H1 unchanged (the SEO title still carries the venue and city; the H1 inside the post is the Showit template's own heading). Check that changing the post title does not change the slug (uncheck slug regeneration; the permalinks in the table must stay).
6. The homepage Recent Features row is hand-built: paste the table content directly.
7. Publish once. Verify each card links to its post, the Westgate card shows `FLORALS & RENTALS`, and no card still shows the stationery placeholder photo.
8. Record before/after in `../06-baseline-and-change-log.md`.
