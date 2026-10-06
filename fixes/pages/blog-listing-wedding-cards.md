# Blog listing: wedding gallery cards (Founder request 2026-10-06)

**Founder, 2026-10-06:** "I want that look in the home blog page, with all the wedding blog posts only." "That look" is the Serene card the Founder sent on 2026-10-03: couple's names in title case, `WEDDING GALLERY` in letterspaced small caps, the venue in smaller small caps, and a `VIEW THE GALLERY` button. The card was first built into the La Valencia post by mistake and is being reverted there; it belongs on the blog listing.

**Where:** the Showit **Blog** template (serves `/blog/`, the WordPress Posts page 147) and the **Category** template (serves `/category/real-weddings/`). Both have a "Posts" canvas with three card views rotated per post (`Oogq7OHww_states_0..2`), each with a featured-image element (already bound to WordPress Featured Image, click action `wp_post`, per the runbook 2026-09-29 / 2026-10-02). Showit editor only; not doable over the WordPress REST API. Showit (app.showit.co) is not reachable from the cloud session, so this is for the session on the Founder's Mac.

## Card design (each of the three views)

Below (or beside, on desktop) the featured photo, centered:

| Element | Text | Binding | Style |
|---|---|---|---|
| Names | e.g. `Roberta & Sid` | **WordPress Post Excerpt** (see data below) | serif title case, ~34px desktop / 26px phone, normal weight |
| Kicker | `WEDDING GALLERY` | static | small caps, letter-spacing 0.3em, ~15px |
| Venue | e.g. `La Valencia Hotel` | **WordPress Post Title** (titles are already the venue names) | small caps, letter-spacing 0.3em, ~11px, muted gray |
| Button | `VIEW THE GALLERY` | click action **WordPress Post** | italic small caps, white on soft vintage rose `#c9a3a0` (hover `#b88e8b`), padding 17px × 60–90px |

Rendered reference and CSS values: `../posts/la-valencia-title-card.html`. The featured image stays as the card photo and keeps its `wp_post` click action.

## WordPress data the cards bind to

The names come from the post **excerpt** so no Showit text is hard-coded per post. Set each excerpt to the couple's names only (the excerpt is not the meta description; Yoast holds that separately, so SEO snippets do not change):

| Post | Title (= venue, unchanged) | Excerpt → |
|---|---|---|
| 244 | La Valencia Hotel | `Roberta & Sid` |
| 246 | Loews Coronado Bay Resort | `Julianne & David` |
| 248 | The Westgate Hotel | `Cherine & Andy` |
| 250 | Private Estate in San Diego | `Erika & Julio` |
| 194 | Park Hyatt Aviara Resort | `Erica & Patrick` |
| 116 | Garden Wedding at Château de Bouthonvilliers | `[FOUNDER: couple's names]` (title is not a venue; rename to the venue if the names are known, or leave it off the listing) |

Current excerpts are one-line summaries ("Roberta and Sid's Mediterranean wedding at La Valencia Hotel…"); record them in `../06-baseline-and-change-log.md` before overwriting. DONE 2026-10-06: the five excerpts above are set (before-values in the change log); 116 is still empty.

## "Wedding blog posts only"

Today every published post is in Real Weddings (category 3, six posts), so `/blog/` already shows only weddings. To keep it that way once Advice (5) and Events (6) posts exist:
- Point the site navigation's blog link and the Home "view more weddings" links to `/category/real-weddings/` (Showit editor, Main Site menu canvases), **or**
- keep `/blog/` as the all-posts page and treat the Category page as the weddings page. The Category template then needs the same card design.

Recommended: build the card design in the Category template first (it is the weddings-only page by definition), copy the same three views into the Blog template, then decide the nav link with the Founder.

## Build order (Founder's Mac session)
1. Record the current Posts-canvas elements of the Blog and Category templates (text, bindings, positions) in the change log.
2. In the Category template's Posts canvas, for each of the three views: add Names (bound to Post Excerpt), Kicker, Venue (bound to Post Title), and the button (click action WordPress Post, rose fill). Keep the featured image.
3. Check desktop and phone; publish.
4. Repeat in the Blog template.
5. Set the six excerpts per the table (REST or WordPress editor).
6. Verify `/blog/` and `/category/real-weddings/` live, logged out, desktop and phone.
