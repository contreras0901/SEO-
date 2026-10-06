# Real Weddings card redesign (Founder request 2026-10-06)

**Status:** SPEC, ready for the Mac session to build in Showit. FOUNDER CONFIRMED 2026-10-06: every Real Weddings card on the blog home page gets this design, one card per client blog post, with the couple's first names and the venue on each card. FOUNDER DIRECTED 2026-10-06: build the card on the **blog home page** (the Real Weddings row under the Château feature), **not inside the individual posts**. The individual posts keep their existing layout; the vendor list stays in "The Vendor Team" at the end of each post.
**Reference:** the Serene "Joyce & Elliot" card the Founder shared on 2026-10-03: couple names in large serif, `WEDDING GALLERY` in letterspaced caps, the venue in small grey letterspaced caps, and a full-width rose button reading `VIEW THE GALLERY` in white italic letterspaced caps. Structure is copied; fonts and colors are Bella Mia's (see `../posts/layout-spec-real-weddings.md` section C). Button color: soft vintage rose `#c9a3a0`, hover `#b88e8b`, per the Founder, 2026-10-03.
**Preview:** `blog-home-cards-preview.html` in this folder, all five cards, gray blocks where the featured photos go.
**Where it applies:** the blog home page Real Weddings row (the three-column row in the Founder's screenshot showing La Valencia, Loews, Westgate), and the same card design wherever that row is reused (`/blog/` listing, Real Weddings category template, homepage "Recent Features"). One Showit card design, reused. It does **not** go inside the post pages.

## 1. Card anatomy (top to bottom)

1. **Photo**, 4:5 portrait, the post's featured image, no overlay, no caption. Kept from the current cards.
2. **Text block**, centered, on the section's existing off-white background, 36 px top padding (24 px on mobile).
   - **Line 1, couple:** `Roberta & Sid`. Site heading serif, title case (not all caps), about 40 px desktop / 30 px mobile, near-black `#1f1f1f`, letterspacing 0.01 em, weight regular. This is the card's heading (H3 in WordPress cards).
   - **Line 2:** `WEDDING GALLERY`. Same serif, 16 px, letterspacing 0.3 em, all caps, near-black.
   - **Line 3, venue:** `LA VALENCIA HOTEL`. 13 px, letterspacing 0.25 em, all caps, grey `#6b6b6b`.
   - No vendor or role line on the card (per the Founder's 2026-10-03 reference). The card claims nothing about Bella Mia's role, so the FOUNDER CONFIRMED rule (2026-09-28) that no wedding reads as planned by Bella Mia unless it was is still met; the Westgate post itself keeps `Florals & Rentals` in its Vendor Team.
3. **Button**, full width of the text block, 24 px below the venue line, 24 px vertical padding: background vintage rose `#c9a3a0`, text `VIEW THE GALLERY` in white, italic, all caps, letterspacing 0.3 em, 13 px. Whole card and the button link to the post. Hover: background `#b88e8b`.

Replace, do not keep: the italic `Real Weddings` label above the divider, the divider line, and the all-caps venue-only title.

## 2. Card content (all five, in display order)

| Order | Line 1 | Line 3 (venue) | Link |
|---|---|---|---|
| 1 | `Roberta & Sid` | `LA VALENCIA HOTEL` | `/2026/10/02/la-valencia-hotel-wedding-la-jolla-roberta-and-sid/` |
| 2 | `Julianne & David` | `LOEWS CORONADO BAY RESORT` | `/2026/10/01/loews-coronado-bay-wedding-julianne-and-david/` |
| 3 | `Cherine & Andy` | `THE WESTGATE HOTEL` | `/2026/10/01/westgate-hotel-wedding-florals-cherine-and-andy/` |
| 4 | `Erica & Patrick` | `PARK HYATT AVIARA` | `/2026/09/29/park-hyatt-aviara-wedding-erica-and-patrick/` |
| 5 | `Erika & Julio` | `PRIVATE ESTATE, SAN DIEGO` | `/2026/10/01/private-estate-wedding-san-diego-erika-and-julio/` |

Line 2 is `WEDDING GALLERY` on every card. The Château post is not a Real Wedding card and keeps its feature block. Every future client post gets a card in this row, same three lines and button.

Alt text on each card photo: `[Couple] wedding at [Venue]`, e.g. `Roberta and Sid wedding at La Valencia Hotel, La Jolla`.

## 3. Showit build (Mac session)

1. In Showit, open the blog home page and select the card design used by the Real Weddings row (the row under the Château feature). If the Blog listing and Category templates use a separate card design, build it once there and copy to the others. Do not open the post templates; the posts do not change.
2. Delete the italic `Real Weddings` text, the divider, and the venue title. Add three centered text elements: couple → post title (so the post titles must read `Roberta & Sid`; see step 5), `WEDDING GALLERY` static, venue → the post's excerpt. On the hand-built homepage row, all three are static text per card.
3. Add a Showit button element below, full width of the text block, bound to the post link, styled per section 1.3 (`#c9a3a0`, hover `#b88e8b`, white italic letterspaced caps).
4. Mobile: stack identically, photo full width, text block centered, 24 px top padding.
5. WordPress: set each post's **title** to the couple's names (`Roberta & Sid`) and each post's **excerpt** to the venue in caps as in the table. Keep the Yoast SEO title and H1 unchanged (the SEO title still carries the venue and city; the H1 inside the post is the Showit template's own heading). Check that changing the post title does not change the slug (uncheck slug regeneration; the permalinks in the table must stay).
6. The homepage Recent Features row is hand-built: paste the table content directly.
7. Publish once. Verify each card links to its post, the button hover darkens to `#b88e8b`, and no card still shows the stationery placeholder photo. Open one post and confirm nothing inside it changed.
8. Record before/after in `../06-baseline-and-change-log.md`.

## 4. Build from a cloud session (Founder set up access 2026-10-06)

The Founder added to the cloud environment: a Basic credential "Bella Mia WP" (WordPress Application Password for `info@bellamiaexclusiveevents.com`, host `bellamiaexclusiveevents.com`, path `/wp-json/`) and environment variables `SHOWIT_EMAIL` and `SHOWIT_PASSWORD`. These reach only sessions started after the save; the 2026-10-06 session that wrote this spec saw neither (WordPress host answered 403 from the proxy, variables unset).

1. **Check access first.** `env | grep SHOWIT_` must show both names; `curl -sS https://bellamiaexclusiveevents.com/wp-json/wp/v2/users/me?context=edit` must return the Founder's user JSON (the proxy adds the Basic header). If the host is still 403, the Founder adds `bellamiaexclusiveevents.com` under Network access → Allowed domains in the environment settings.
2. **WordPress (REST, no Showit publish needed).** For each post in section 2, `POST /wp-json/wp/v2/posts/<id>` with `{"title": "<Couple>", "excerpt": "<VENUE>"}`; post ids: La Valencia 244, Loews 246, Westgate 248, Aviara 194, Erika & Julio 250. Read each post back and confirm `slug` and the Yoast fields did not change. Do not touch `content`.
3. **Showit (headless Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, driven with Playwright or the DevTools protocol).** `https://account.showit.com/login` is a JS app (form renders after `/assets/index-*.js` loads). Sign in with the two variables, open the site, then Blog Templates → the Blog template's Posts canvas (three card views `Oogq7OHww_states_0..2`) and the Category template's Posts canvas, and rebuild each card per section 1 and step 3.2–3.3. If Showit asks for an emailed verification code at login, stop and ask the Founder for it. If the editor cannot be driven headlessly, fall back to the Mac session (Chrome on the debug port), which is the proven route.
4. Publish once, verify the live `/blog/` row at 1440 and 430 px, and record the result in `../06-baseline-and-change-log.md`.
