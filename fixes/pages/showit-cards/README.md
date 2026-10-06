# Real Weddings card: Showit template JSON (cloud session 2026-10-06)

Built from `../real-weddings-card-spec.md` section 1, for section 4 step 3. Nothing here has been saved to Showit or published: the session's permission policy blocked the write to the live design (see the spec, section 4, "Build attempt").

| File | What |
|---|---|
| `blog-BvnULcvYS.before.json`, `category-EvPGQpqyX6.before.json` | The live Blog and Category template page files as downloaded (ETags `bf7b5bf380004c1c0b63418e1a00e6fa` and `f7b72c36a1bcd411ed69117672bf4015`, last modified 2026-10-02). Undo = save these back. |
| `blog-BvnULcvYS.after.json`, `category-EvPGQpqyX6.after.json` | The same files with the Posts canvas (`Oogq7OHww`, three card views) rebuilt. Everything outside that canvas is unchanged. |
| `build_cards.py` | Generates the `after` files from the `before` files: `python3 build_cards.py before.json after.json`. |
| `mock-desktop.png`, `mock-phone.png` | Headless Chromium render of one card at the exact geometry and in the site's own fonts (HV Florentino Regular / Italic, Questrial), 1200 px and 320 px design grids. |

Card per view (desktop 1200 grid; mobile 320 grid), all centered in the photo's 347 px (280 px) column:

| Element | Binding | Desktop | Mobile |
|---|---|---|---|
| Photo | featured image, links to post | unchanged (347×508 at y 68) | unchanged (280×396) |
| Couple (H3) | `post_excerpt` (= `Roberta & Sid`), links to post | HV Florentino Regular 40 px, title case, `#1f1f1f`, 0.01 em, y = photo bottom + 36 | 30 px, y = photo bottom + 24 |
| `WEDDING GALLERY` | static | HV Florentino Regular 16 px, caps, 0.3 em | 13 px |
| Venue | `post_title` (= `La Valencia Hotel`), uppercase, links to post | Questrial 13 px, 0.25 em, `#6b6b6b` | 11 px |
| `VIEW THE GALLERY` | Showit button, links to post | 347×61, fill `#c9a3a0`, hover `#b88e8b` (0.3 s), HV Florentino Italic 13 px white caps 0.3 em, padding 24 px | 280×48, 12 px, padding 18 px |

Removed per view: the `post_category` text (the italic `Real Weddings`/`Weddings` label), the divider line, the all-caps venue-only title. Card bottoms: desktop 807 of the canvas's 873; mobile 609 / 1259 / 1908 of 1953, so nothing overlaps the Pagination canvas. Measured in the real fonts: every couple name and venue fits on one line at both sizes (longest: `Julianne & David` 327 of 347 px desktop, 246 of 280 px mobile).
