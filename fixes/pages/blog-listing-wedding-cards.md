# Blog listing: wedding gallery cards (Founder request 2026-10-06)

**Status 2026-10-06 (cloud session, branch `claude/magical-meitner-f8abvq`): Showit part NOT BUILT, nothing published.** The environment's network policy denies every Showit host (`app.showit.co`, `app.showit.com`, `showit.co`, `showit.com`: proxy CONNECT 403) and no Showit login is stored, so the Category and Blog templates could not be opened from the cloud. Done from the cloud instead: the five excerpts (step 5, 16:22 UTC), the current Posts-canvas baseline of both templates (step 1, recorded below and in the change log), and the element-by-element build sheet (section "Build sheet"). To let a cloud session do the Showit steps, add `app.showit.co` and `showit.co` to the environment's allowed domains (cloud environment menu in the session title bar → Edit → Network access; steps at https://code.claude.com/docs/en/cloud-environments#network-access) and store a Showit login as environment secrets; otherwise the build sheet is for the Mac session.

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

## Baseline: Posts canvas as it renders live (captured 2026-10-06 16:10 UTC, logged out)

Both templates render the same Posts canvas (live ids `posts_view-1..3`, elements `_0.._3`; editor ids `Oogq7OHww_states_0..2_elements_0..3`). Background `#f6f6f3`; canvas height 873 desktop / 1953 phone. Per view (desktop X 39 / 427 / 815, W 347; phone X 20, W 280):

| Element | Desktop Y (H) | Phone Y view 1 / 2 / 3 (H) | Content and style today |
|---|---|---|---|
| `_0` image | 68 (508) | 37 / 687 / 1336 (396) | Featured Image, object-fit cover, click → the post (title attribute = post title) |
| `_1` category label | 617 (35) | 471 / 1121 / 1774 (27) | `Real Weddings`, tag p, bound to Post Category (links to `/category/real-weddings/`), HV Florentino Italic 24 / 18 px, left, `#242424` |
| `_2` rule | 664 (1) | 506 / 1161 / 1814 (1) | 155 / 125 px line, stroke `#a39e94` |
| `_3` title | 692 (114) | 536 / 1186 / 1839 (85) | venue name, tag **H2**, bound to Post Title, links to the post, HV Florentino Regular 32 / 24 px, uppercase, left, line-height 1.2 |

Fonts the templates already load: HV Florentino Regular and Italic (site display faces), EB Garamond and Questrial (Google). Post order on both pages today: 244 La Valencia, 246 Loews, 248 Westgate, 250 Private Estate, 194 Aviara, 116 Château. The Blog template's header canvas (`featured-post`) carries the Château feature card and the H1 "San Diego Wedding Blog"; the Category template's carries "Filed under" + the category name as H1. Neither changes here.

## Build sheet (Showit editor; same values in the Category and the Blog template, all three views)

Rebind and restyle the two text elements that exist rather than deleting them, so the H2 and the post links survive; add two elements; delete the rule. Fonts are the site's own (layout spec section C): HV Florentino Regular for the names, EB Garamond for the small-caps lines, EB Garamond italic for the button. Reference look: `../posts/la-valencia-title-card.html`.

| Element | What to do | Desktop (W 347 at X 39 / 427 / 815) | Phone (W 280 at X 20) view 1 / 2 / 3 |
|---|---|---|---|
| `_0` image | keep: Featured Image, click `wp_post` | Y 68, H 508 (unchanged) | Y 37 / 687 / 1336, H 396 (unchanged) |
| `_1` → **Names** | keep the element; change its WordPress binding from Post Category to **Post Excerpt**; text style HV Florentino Regular, 34 px desktop / 26 px phone, title case as typed (text-transform none), letter-spacing 0.02em, line-height 1.15, **centered**, `#242424`, tag p | Y 600, H 42 | Y 452 / 1102 / 1751, H 32 |
| new **Kicker** | add a text element, static text `WEDDING GALLERY`; EB Garamond, 15 px desktop / 13 px phone, uppercase, letter-spacing 0.3em, centered, `#242424`, tag p | Y 660, H 20 | Y 500 / 1150 / 1799, H 17 |
| `_3` → **Venue** | keep the element and its binding (Post Title) and tag (H2); restyle to EB Garamond, 11 px desktop / 10 px phone, uppercase, letter-spacing 0.3em, centered, `#6b6b6b`, line-height 1.4 | Y 698, H 18 | Y 532 / 1182 / 1831, H 16 |
| new **Button** | add a text element (or Showit button) with text `VIEW THE GALLERY`; EB Garamond italic, 12 px, uppercase, letter-spacing 0.3em, centered, white on `#c9a3a0`, hover `#b88e8b`; click action **WordPress Post** | Y 746, H 50, W 260 → X 83 / 471 / 859 | Y 576 / 1226 / 1875, H 46, W 220 → X 50 |
| `_2` rule | delete (nothing to hide it per view; the element is recorded above, deletion needs the Founder's OK per the project rule) | | |
| Posts canvas height | keep | 873 (stack ends at 796; the old title ended at 806) | 1953 (view 1 stack ends at 622; the old title ended at 621) |

Spacing is the reference card's (names → 18 px → kicker → 18 px → venue → 30 px → button), which fits in the same height as the old label + rule + title, so the images, the card pitch (phone 650 px) and the canvas heights stay as they are. Treat the Y values as a starting point and check them in the Showit preview. If `Julianne & David` wraps at 34 px in a 347 px box, use 30 px in all three views rather than widening one card.

Checks before Publish: desktop and phone of each of the three views; every card still links to its post (image, names, venue, button); the venue is the only H2 per card; the Château card (116) shows an empty names line until its excerpt is set (see the table above; the Founder can also give it the venue excerpt and leave the title as is). Then Publish once and verify `/blog/` and `/category/real-weddings/` logged out at 1440 and 430 px. Two earlier cloud sessions diagnosed the same canvases without a Showit login: runbook section 9b on branch `claude/exciting-darwin-f811rx` (an uppercase variant of this card with positions) and section 12 on branch `claude/relaxed-fermat-e4eamt` (phone dead space under the card titles, the phone label row, the Blog template's missing menu and footer). Neither is merged here; section 12's fixes can ride the same editor session if the Founder wants, but they are a separate decision.

