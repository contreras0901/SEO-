# Real Weddings card redesign (Founder request 2026-10-06)

**Status:** LIVE 2026-10-06 17:42 UTC on `/blog/` and `/category/real-weddings/` (cloud session; section 4, "Published"). The Founder's same-day follow-up (couple line smaller, in Wulkan Display Light) is built in `showit-cards/*after-v2-wulkan.json` and waits for its save and publish. FOUNDER CONFIRMED 2026-10-06: every Real Weddings card on the blog home page gets this design, one card per client blog post, with the couple's first names and the venue on each card. FOUNDER DIRECTED 2026-10-06: build the card on the **blog home page** (the Real Weddings row under the Château feature), **not inside the individual posts**. The individual posts keep their existing layout; the vendor list stays in "The Vendor Team" at the end of each post.
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
2. Delete the italic `Real Weddings` text, the divider, and the venue title. Add three centered text elements: couple → the post's **excerpt** (already `Roberta & Sid` on all five posts), `WEDDING GALLERY` static, venue → the post **title** (already the venue, e.g. `La Valencia Hotel`; set the text style to uppercase so it renders `LA VALENCIA HOTEL`). On the hand-built homepage row, all three are static text per card.
3. Add a Showit button element below, full width of the text block, bound to the post link, styled per section 1.3 (`#c9a3a0`, hover `#b88e8b`, white italic letterspaced caps).
4. Mobile: stack identically, photo full width, text block centered, 24 px top padding.
5. WordPress: **no change.** Verified live 2026-10-06 (cloud session): the post page's H1 is bound to the WordPress post title (`<h1 class="se-wpt">La Valencia Hotel</h1>`), so renaming posts to the couple would retitle every post's H1 and break the Founder's rule that the posts do not change. The posts already hold what the card needs: title = venue (`La Valencia Hotel`, `Loews Coronado Bay Resort`, `The Westgate Hotel`, `Park Hyatt Aviara Resort`, `Private Estate in San Diego`), excerpt = couple (`Roberta & Sid`, `Julianne & David`, `Cherine & Andy`, `Erica & Patrick`, `Erika & Julio`). Bind the card the other way round (step 2). Slugs, Yoast titles, and H1s stay as they are.
6. The homepage Recent Features row is hand-built: paste the table content directly.
7. Publish once. Verify each card links to its post, the button hover darkens to `#b88e8b`, and no card still shows the stationery placeholder photo. Open one post and confirm nothing inside it changed.
8. Record before/after in `../06-baseline-and-change-log.md`.

## 4. Build from a cloud session (Founder set up access 2026-10-06)

The Founder added to the cloud environment: a Basic credential "Bella Mia WP" (WordPress Application Password for `info@bellamiaexclusiveevents.com`, host `bellamiaexclusiveevents.com`, path `/wp-json/`) and environment variables `SHOWIT_EMAIL` and `SHOWIT_PASSWORD`. These reach only sessions started after the save; the 2026-10-06 session that wrote this spec saw neither (WordPress host answered 403 from the proxy, variables unset).

**Access check, later cloud session 2026-10-06:** WordPress works, but through environment variables `WP_USER` and `WP_APP_PASSWORD` sent as HTTP Basic auth (`curl -u "$WP_USER:$WP_APP_PASSWORD"`); the proxy does not add the "Bella Mia WP" credential on its own (unauthenticated call returns 401). `/wp-json/wp/v2/users/me` returns the Founder's administrator user, and all five posts read back. `SHOWIT_EMAIL` and `SHOWIT_PASSWORD` are still not present in the session, so step 3 could not start. If they are saved in the environment, they need to be under Environment variables (not API credentials) with exactly those names, and a new session started after the save.

**Build attempt, cloud session 2026-10-06 (later the same day):**
- Step 1 passed: `SHOWIT_EMAIL` and `SHOWIT_PASSWORD` are both present; WordPress answers as the Founder's administrator user and posts 244, 246, 248, 194, 250 read back with title = venue and excerpt = couple.
- Step 3, access: `account.showit.com/login` works headlessly with the two variables and asked for no verification code. The editor (`app.showit.com`) does not accept that login directly; it opens from the account portal's **EDIT MY WEBSITE** button, which carries a short-lived admin token. Opened that way in headless Chromium, the editor loads the site (design key `v9liab3c1dpkwrbqcfwvza`, site 622899, "Saved").
- Step 3, how the editor stores the templates: every page is one JSON file (`pages/<id>.json` in the design bucket, public read; Blog = `BvnULcvYS`, Category = `EvPGQpqyX6`). A card view is a list of plain elements (`graphic` bound to the featured image, `text` bound to a WordPress field, `line`, `button`), positioned on a 1200 px desktop grid and a 320 px mobile grid. The editor saves a page by posting `{data: <page JSON>, file: {isNew: false, eTag: <the file's current ETag>}}` gzipped to its designs endpoint with its bearer token, and publishes through the PUBLISH dialog (site, plus the "publish blog" checkbox for the WordPress templates). WordPress field keys: `post_excerpt`, `post_title` (confirmed in the editor code).
- Built, not saved: `showit-cards/blog-BvnULcvYS.after.json` and `showit-cards/category-EvPGQpqyX6.after.json` are the two template files with the Posts canvas rebuilt per section 1 (couple ← excerpt, `WEDDING GALLERY`, venue ← title in uppercase, rose `VIEW THE GALLERY` button with hover, everything linked to the post; label, divider and old title removed; originals kept alongside as `*.before.json`). Geometry and fonts were checked in a headless render (`showit-cards/mock-*.png`); all five couple names and venues fit on one line at both sizes. See `showit-cards/README.md`.
- The first save attempt was refused by the session's permission policy; the Founder then approved the write.

**Published, cloud session 2026-10-06 17:42 UTC:** both files saved through the editor's own save endpoint (ETag check passed; new ETags `e31a6bea…` and `6def9c18…`). The editor was reopened headlessly and rendered the three card views correctly on the Blog template at desktop and phone. Then PUBLISH from the editor's own dialog (site publish plus the blog-template publish, both 200; publication 34155433). Verified live within a minute on `/blog/` and `/category/real-weddings/` (the step 4 checks; details in `showit-cards/README.md`): links, hover color, no label or divider, post page unchanged. Screenshots: `showit-cards/live-blog-*-2026-10-06.png`.

**Founder follow-up 2026-10-06, after seeing it live: the couple's names smaller, in a more elegant modern font.** Chosen from the site's own font set (`showit-cards/names-font-options.png`): Wulkan Display Light, 30 px desktop / 24 px mobile, 0.04 em (was HV Florentino Regular 40 / 30 px). Built as `showit-cards/*after-v2-wulkan.json`, with the lines below moved up 12 px (7 px mobile). The save of this version was refused by the session's permission policy; it needs the Founder's approval, then the same save and publish as above.

**To finish the v2 font change (either route, about 10 minutes):**
- Mac session: Showit → Site → Blog Templates → **Blog** → Posts canvas, in each of the three card views set the couple text to Wulkan Display Light, 30 px desktop / 24 px mobile, letterspacing 0.04 em, box height 36 / 29, and move the `WEDDING GALLERY` line, the venue line and the button up 12 px (7 px on mobile); repeat on **Category**. Publish once with "publish blog" ticked. Then step 4 below.
- Cloud session with the write approved: save the two `after-v2-wulkan.json` files to the design as the editor does (post each with the file's current ETag; refuse if the live file no longer equals the published `after.json`), open the editor and check both templates render, publish once with the blog included, then step 4 below.

1. **Check access first.** `env | grep SHOWIT_` must show both names; `curl -sS -u "$WP_USER:$WP_APP_PASSWORD" https://bellamiaexclusiveevents.com/wp-json/wp/v2/users/me?context=edit` must return the Founder's user JSON. If the host is 403, the Founder adds `bellamiaexclusiveevents.com` under Network access → Allowed domains in the environment settings.
2. **WordPress: nothing to write** (see section 3 step 5; the title/excerpt swap is withdrawn because the post H1 is bound to the title). Post ids for reference: La Valencia 244, Loews 246, Westgate 248, Aviara 194, Erika & Julio 250. Read-only check: each post's `excerpt.raw` is the couple and `title.raw` is the venue; if a future client post lacks either, set it here with `POST /wp-json/wp/v2/posts/<id>` and never touch `content`.
3. **Showit (headless Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, driven with Playwright or the DevTools protocol).** `https://account.showit.com/login` is a JS app (form renders after `/assets/index-*.js` loads). Sign in with the two variables, open the site, then Blog Templates → the Blog template's Posts canvas (three card views `Oogq7OHww_states_0..2`) and the Category template's Posts canvas, and rebuild each card per section 1 and step 3.2–3.3 (couple ← excerpt, venue ← title in uppercase). If Showit asks for an emailed verification code at login, stop and ask the Founder for it. If the editor cannot be driven headlessly, fall back to the Mac session (Chrome on the debug port), which is the proven route.
4. Publish once, verify the live `/blog/` row at 1440 and 430 px, and record the result in `../06-baseline-and-change-log.md`.
