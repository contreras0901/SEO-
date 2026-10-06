# Real Weddings card redesign (Founder request 2026-10-06)

**Status:** BUILT AND TESTED, waiting for one paste + Publish in Showit (section 0). FOUNDER DECISION 2026-10-06 (supersedes the morning's "every card" scope): the card design goes on the **blog home page** (`/blog/`, the Posts canvas of the Showit "Blog" template) and **not inside the individual posts**. The post pages keep their layout; the vendor list stays in "The Vendor Team" at the end of each post. The homepage "Recent Features" row and the category pages are not touched by this build (see section 0.4 for how to extend it if asked).
**Reference:** the Founder's screenshot of a Serene-style card: couple names in large serif caps, `WEDDING GALLERY` in letterspaced caps, the venue in small grey letterspaced caps, and a full-width dusty-rose button reading `VIEW THE GALLERY` in white italic letterspaced caps. Structure is copied; fonts and colors are Bella Mia's (see `../posts/layout-spec-real-weddings.md` section C).
**Founder's preview:** `blog-home-cards-preview.html` (this folder), shared 2026-10-06. The preview uses Cormorant Garamond as a stand-in; the build uses the site's own fonts (HV Florentino Regular for the names, HV Florentino Italic for the button, Questrial for the two small lines), read from the live `/blog/` stylesheet.

## 0. The build (cloud session, 2026-10-06)

### 0.1 What was built
`blog-home-cards.html` (this folder) is a Custom Head HTML block for the Showit **Blog** template: one `<style>` and one `<script>`. On `/blog/` (and `/blog/page/2/` etc.) it turns each post card into the new design without any element-by-element work in the Showit editor:

- hides the italic `Real Weddings` label and the divider line on every card (Showit elements `posts_view-N_1` and `posts_view-N_2`);
- hides the venue-only title (`posts_view-N_3`) and rebuilds the text block under each photo: couple's names, `WEDDING GALLERY`, venue, `VIEW THE GALLERY` button, all centered and linked to the post;
- scopes everything to `body.blog`, so the category pages (`body.archive`), the single posts, and the Home page are unchanged.

Data comes from WordPress as the posts are already set up (VERIFIED 2026-10-06 via the REST API): **post title = venue** (`La Valencia Hotel`), **post excerpt = couple** (`Roberta & Sid`), **featured image = photo**. The venue is the card's H2 (the post title, so the listing keeps its venue keywords); the names are a paragraph. The script reads the excerpts from `/wp-json/wp/v2/posts` (public, one request, cached by the browser); if that request fails or takes over 4 s, the cards still render with the venue and the button.

Phone: Showit scales every element with a per-element transform (320 px design grid to screen width) and switches `<html>` from class `d` to `m` a moment after load; the script re-measures after that switch, on load, and on resize, and applies the same scale to the text block.

### 0.2 Tested
Headless Chromium against the live `/blog/` page with the block injected (not yet published), 1440 px and 430 px: screenshots `blog-home-cards-test-desktop.jpg` and `blog-home-cards-test-phone.jpg` in this folder. All six cards render; the text blocks end inside the Posts canvas (desktop: 169 px blocks, 100 px spare before the pagination canvas; phone: 180 px blocks, 55–90 px spare), so nothing overlaps the next canvas. The Château card, whose post has no excerpt, shows its full title as the big line and no venue line (section 0.3).

### 0.3 To publish (Mac session, about 5 minutes)
1. Showit app → **Site** → **Blog Templates** → open **Blog** (the Post List template that renders `/blog/`).
2. Template settings (gear) → **Advanced Settings** → **Custom Head HTML**. Paste the entire contents of `blog-home-cards.html`. If a Blog template has no Custom Head HTML field, paste it into **Site Settings → Advanced Settings → Custom Head HTML** instead: the block is scoped to `body.blog`, so site-wide placement changes nothing else.
3. **Publish** (Blog design included).
4. Verify logged out at 1440 and 430 px: each card shows names / `WEDDING GALLERY` / venue / rose button; the card, the names, the venue, and the button all open the post; no `Real Weddings` italic label or divider remains; `/category/real-weddings/` and a single post look exactly as before. Hard-refresh if the Cloudflare cache (10 min) still serves the old page.
5. Record the publish in `../06-baseline-and-change-log.md`.

Château card: post 116 has no excerpt, so the card reads `GARDEN WEDDING AT CHÂTEAU DE BOUTHONVILLIERS` as the big line with no venue line. For the four-line look, set post 116's excerpt in WordPress to the couple or to `A Garden Wedding in France` and shorten the post title; Founder's call, no code change needed.

### 0.4 Extending or undoing
- Also on the category pages: change every `body.blog` in the block to `body.blog, body.archive` (the Category template renders the same `posts_view-N_K` elements). Not done: the Founder scoped this to the blog home page.
- Homepage "Recent Features" row: hand-built Showit cards, not WordPress-bound; the native editor build in section 3 still applies there if ever wanted.
- Undo: delete the block from Custom Head HTML and Publish. Nothing in WordPress changes.
- Native alternative: section 3 (editor rebuild with WordPress field bindings) remains valid if the Founder prefers no custom code; bind the big line to **Post Excerpt** and the venue line to **Post Title**, since that is how the posts are already filled.

### 0.5 The role line
The Founder's preview has no role line (section 1 line 4). The card then makes no planning claim for any wedding: it says only names, `WEDDING GALLERY`, venue. The FOUNDER CONFIRMED rule of 2026-09-28 (no wedding reads as planned by Bella Mia unless it was) holds, and the Westgate post itself credits RBCO Events as planner. If the Founder wants the role on the card after all, add it as a fifth line from a WordPress custom field; not built.

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

## 3. Showit build in the editor (alternative to section 0, not needed if the head block is published)

1. In the Showit blog templates, open the card design used by the Real Weddings row (the row under the Château feature) and by the Category and Blog listing templates. If they are separate designs, build it once and copy to the others.
2. Delete the italic `Real Weddings` text, the divider, and the venue title. Add four text elements bound to WordPress fields: couple → post title (so the post titles must read `Roberta & Sid`; see step 5), `WEDDING GALLERY` static, venue and role → the post's excerpt split on ` | ` (Showit binds one field, so put venue and role in the excerpt as `LA VALENCIA HOTEL | PLANNING · DESIGN · FLORALS · RENTALS` and bind the excerpt to a single text element; if two lines are needed, use two static text elements per card on the homepage row, which is hand-built).
3. Add a Showit button element below, bound to the post link, styled per section 1.3.
4. Mobile: stack identically, photo full width, text block 24 px padding.
5. WordPress: the posts are already filled the other way round (VERIFIED 2026-10-06): **title = venue**, **excerpt = couple**. Bind the big line to Post Excerpt and the venue line to Post Title; do not rename the posts (the Yoast titles, H1s, and slugs stay as they are).
6. The homepage Recent Features row is hand-built: paste the table content directly.
7. Publish once. Verify each card links to its post, the Westgate card shows `FLORALS & RENTALS`, and no card still shows the stationery placeholder photo.
8. Record before/after in `../06-baseline-and-change-log.md`.
