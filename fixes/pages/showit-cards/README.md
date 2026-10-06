# Real Weddings card: Showit template JSON (cloud session 2026-10-06)

Built from `../real-weddings-card-spec.md` section 1, for section 4 step 3. **Live since 2026-10-06 17:42 UTC** (site + blog templates, publication 34155433): `blog-BvnULcvYS.after.json` and `category-EvPGQpqyX6.after.json` are what is on the site. `*.after-v2-wulkan.json` is the Founder's same-day follow-up (couple line smaller, in Wulkan Display Light), built and not yet saved to Showit.

| File | What |
|---|---|
| `blog-BvnULcvYS.before.json`, `category-EvPGQpqyX6.before.json` | The live Blog and Category template page files as downloaded (ETags `bf7b5bf380004c1c0b63418e1a00e6fa` and `f7b72c36a1bcd411ed69117672bf4015`, last modified 2026-10-02). Undo = save these back. |
| `blog-BvnULcvYS.after.json`, `category-EvPGQpqyX6.after.json` | The same files with the Posts canvas (`Oogq7OHww`, three card views) rebuilt. Everything outside that canvas is unchanged. **This is the live version** (ETags after the save: `e31a6bea7718d1e4fca24dc702dab711`, `6def9c1826eed8e3d9594f12c72c80ce`). |
| `*.after-v2-wulkan.json` | Same, with the couple line in Wulkan Display Light 30 px desktop / 24 px mobile, 0.04 em (was HV Florentino Regular 40 / 30 px, 0.01 em) and the three lines below moved up 12 px (7 px mobile). Output of the current `build_cards.py`. Waiting to be saved and published (the Category file is final as v2; the Blog file is superseded by v3 below). |
| `blog-BvnULcvYS.after-v3-header.json` | The Blog template with the v2 cards **and** the new header (Founder 2026-10-06, chosen from `header-options.png`): H1 renamed `Weddings & Inspiration`, centered at the top (34 px, 0.08 em; 20 px on phone); the three category links as a centered row of Questrial 12 px grey caps, 0.3 em, with two thin dividers; the featured post card moved down 20 px. Built by `build_header.py` on top of the v2 file. Not saved yet. `header-chosen-mock.png` is the live page with these styles injected. |
| `live-blog-*-2026-10-06.png` | The live `/blog/` card row after the publish, 1440 px (first button in its hover color) and 430 px. |
| `names-font-options.png` | The couple line in the live font, Wulkan Display Light (chosen) and Messina Sans Light. |
| `build_cards.py` | Generates the `after-v2-wulkan` files from the `before` files: `python3 build_cards.py before.json after.json`. The live v1 differs only in the couple line (`NAMES_FONT = 'HV Florentino Regular'`, size 40 / 30, 0.01 em, height 48 / 36) and the three lines below sitting 12 px (7 px) lower. |
| `mock-desktop.png`, `mock-phone.png` | Headless Chromium render of one card at the exact geometry and in the site's own fonts (HV Florentino Regular / Italic, Questrial), 1200 px and 320 px design grids. |

Card per view (desktop 1200 grid; mobile 320 grid), all centered in the photo's 347 px (280 px) column:

| Element | Binding | Desktop | Mobile |
|---|---|---|---|
| Photo | featured image, links to post | unchanged (347×508 at y 68) | unchanged (280×396) |
| Couple (H3) | `post_excerpt` (= `Roberta & Sid`) | live: HV Florentino Regular 40 px, title case, `#1f1f1f`, 0.01 em, y = photo bottom + 36. v2: Wulkan Display Light 30 px, 0.04 em | live 30 px, v2 24 px; y = photo bottom + 24 |
| `WEDDING GALLERY` | static | HV Florentino Regular 16 px, caps, 0.3 em | 13 px |
| Venue | `post_title` (= `La Valencia Hotel`), uppercase | Questrial 13 px, 0.25 em, `#6b6b6b` | 11 px |
| `VIEW THE GALLERY` | Showit button, links to post | 347×61, fill `#c9a3a0`, hover `#b88e8b` (0.3 s), HV Florentino Italic 13 px white caps 0.3 em, padding 24 px | 280×48, 12 px, padding 18 px |

Removed per view: the `post_category` text (the italic `Real Weddings`/`Weddings` label), the divider line, the all-caps venue-only title. Card bottoms: desktop 807 of the canvas's 873; mobile 609 / 1259 / 1908 of 1953, so nothing overlaps the Pagination canvas. Measured in the real fonts: every couple name and venue fits on one line at both sizes (longest: `Julianne & David` 327 of 347 px desktop, 246 of 280 px mobile).

Verified live 2026-10-06 (curl and headless Chromium at 1440 and 430 px, `/blog/` and `/category/real-weddings/`): three cards per page, each with couple, `WEDDING GALLERY`, venue and the rose button; the photo, the gallery line and the button link to the post (Showit emits no link on WordPress-bound text, so the couple and venue lines are plain text); the button hover turns `#b88e8b` on desktop; no `Real Weddings` label or divider is left; the La Valencia post page is unchanged (H1 `La Valencia Hotel`, Vendor Team intact).
