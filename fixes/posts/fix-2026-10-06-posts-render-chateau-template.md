# Fix: every Real Weddings post renders the Château de Bouthonvilliers template

**Found:** 2026-10-06, by reading the live HTML of every post from the cloud session (no CMS access from there).
**Founder report:** "none of my blog posts are correct nor showing what happened."
**Status:** FIXED AND PUBLISHED 2026-10-06 (cloud session, app.showit.com, three Showit publishes, the last at 12:30 PDT). All four posts verified live on desktop and mobile: own hero, vendor list, story, photos, vendor team and CTA; Erika and Château posts unchanged; blog, category and home pages unchanged. The Château post is now a Custom template matched by slug, and "Real Wedding Post" is the default Single Post template with the WordPress body rendered through a Post Content element, so a post can no longer fall back to the Château text. See "What was done" below.

## What is wrong

Four of the five Real Weddings posts are served with the wrong Showit design. Their WordPress bodies are intact (full text, photos, vendor team, CTA, all matching the approved drafts in this folder), but the Showit template wrapped around them is the **Château de Bouthonvilliers single-post design**, whose text is hard-coded in Showit. So each page shows the Château story (H1 "a Wedding at Château de Bouthonvilliers", "yVANNA & aLEJANDRO", "Destination wedding in Paris, France", the Château vendor credits) and none of the post's own content.

| Post | URL | WordPress body | What the live page renders |
|---|---|---|---|
| 194 Erica & Patrick | `/2026/09/29/park-hyatt-aviara-wedding-erica-and-patrick/` | intact: 9 photos, full story | Château template, Château text |
| 248 Cherine & Andy | `/2026/10/01/westgate-hotel-wedding-florals-cherine-and-andy/` | intact: 11 photos, full story | Château template, Château text |
| 246 Julianne & David | `/2026/10/01/loews-coronado-bay-wedding-julianne-and-david/` | intact: 2 photos, full story | Château template, Château text |
| 244 Roberta & Sid | `/2026/10/02/la-valencia-hotel-wedding-la-jolla-roberta-and-sid/` | intact: 17 photos, full story | Château template, Château text |
| 250 Erika & Julio | `/2026/10/01/private-estate-wedding-san-diego-erika-and-julio/` | intact | **Correct**: its own "Erika Batiz & Julio Ramirez" design, body rendered |
| 116 Château | `/2025/07/27/garden-wedding-at-chateau-de-bouthonvilliers/` | empty (text lives in Showit) | Correct |

Evidence from the live HTML (fetched 2026-10-06, cache-busted):

- The Showit `init_data` block on posts 194, 248, 246 and 244 lists the same nine canvases as the Château post (`menu, hero, intro, details, full-gallery, vendor-credits, vendor-credits-1, footer, mobile-menu`) with the same 65 elements. The Erika post lists its own canvases (`menu, hero, title, content, about, blog-contact, footer, mobile-menu`).
- On the four broken pages the post's own text appears only in the `<head>` (Yoast title, description, schema). The visible page has zero occurrences of the couple's names, venue rooms, or vendors.
- `<title>`, meta description and the featured image are still correct on every post, which is why the blog listing and category cards look fine while the pages behind them do not.
- Every one of the five posts carries `modified = 2026-10-06T16:22:42–43Z` (09:22 PDT): the card-redesign run that set the post titles to the venue names and the excerpts to the couples' names. The template assignment was lost at or around that same run. The Château post was not touched (modified 2026-09-29).

## Why it happened (two candidates, check in this order)

The Showit WordPress plugin picks a design per post from the **Showit Template** selector in the post editor, or, for a template typed Custom, by matching the WordPress template name (`single-post-<slug>`). When neither matches, it falls back to the site's default **Single Post** template. On this site the default Single Post template is the Château design, whose body text is static, so any post that loses its assignment turns into the Château wedding.

1. **The per-post template assignment was cleared or re-pointed** when the posts were updated on 2026-10-06 (title and excerpt changes). The Erika post kept its assignment, so the posts were not all reset the same way; check each one.
2. **The post templates were renamed, retyped or recreated in Showit** while the Real Weddings card was rebuilt on the Blog and Category templates. A recreated template has a new id, so the posts' saved selection no longer resolves. Templates in play per the change log: "Erica & Patrick post template" (Aviara; the Loews post was also published on it), "Westgate post template", "La Valencia post template".

## Fix (Mac session, in the Founder's Chrome)

### A. Re-point each post to its template (fast, do first)

1. WordPress admin → Posts → open post 194 (Erica & Patrick). Do **not** accept "Attempt recovery" if the block editor offers it (it rewrites the HTML blocks; see the Aviara post file). Use the Code editor or the Classic/HTML view if prompted.
2. In the post sidebar, find the **Showit Template** (or "Showit Blog Template") dropdown. Select **Erica & Patrick post template**. Update.
3. Repeat: 248 → **Westgate post template**; 244 → **La Valencia post template**; 246 → **Erica & Patrick post template** (as published 2026-10-01) unless a Loews template exists.
4. Reload each URL logged out with a cache-buster (`?v=2`) and confirm the page shows the couple's hero, the vendor list, the story and the photos. Cloudflare caches for 10 minutes; a hard reload or the cache-buster gets past it.

If the dropdown does not list those templates, go to B.

### B. Check the templates in Showit

1. Showit → Site → **Blog Templates**. Confirm the three post templates still exist. For each, open Template Settings and note the **Template Type**. They must be a Single Post type (or Custom with the exact `single-post-<slug>` name of their post). If a template was renamed, retyped, or is missing:
   - Missing: restore from Showit's **Site History** (Site Settings → Site History, or the Design History panel) to the version published before 2026-10-06 09:22 PDT, copy the template out, then re-apply the card redesign; or duplicate the Erika template and rebuild from `layout-spec-real-weddings.md`.
   - Retyped: set it back and **Publish**.
2. After publishing, return to A and re-select the templates on each post (ids change when a template is recreated).

### C. Stop it from happening again (do in the same session)

The default Single Post template must never carry one wedding's text. Either:

- Make the Château design a **Custom** template named `single-post-garden-wedding-at-chateau-de-bouthonvilliers` (or select it only on post 116 via the Showit Template dropdown), and
- Make the default **Single Post** template a generic one: duplicate the Erika template, keep the `title` canvas bound to **WordPress Post Title** and the `content` canvas bound to **WordPress Post Content**, remove the Erika-specific hero photo, and set it as the Single Post default. Then any post that loses its assignment still shows its own text and photos instead of the Château story.

Alternatively move the Château text and photos into post 116's WordPress body and let the generic template render it; then the Château Showit design can be deleted.

### D. Verify and log

Run from any terminal (no login needed):

```
for u in 2026/09/29/park-hyatt-aviara-wedding-erica-and-patrick 2026/10/01/westgate-hotel-wedding-florals-cherine-and-andy 2026/10/01/loews-coronado-bay-wedding-julianne-and-david 2026/10/02/la-valencia-hotel-wedding-la-jolla-roberta-and-sid; do
  printf '%s  Chateau:%s  own-text:%s\n' "$u" \
    "$(curl -s "https://bellamiaexclusiveevents.com/$u/?v=$RANDOM" | grep -c Bouthonvilliers)" \
    "$(curl -s "https://bellamiaexclusiveevents.com/$u/?v=$RANDOM" | grep -c 'Scroll for full gallery')"
done
```

Pass: `Chateau:0` and `own-text:1` on all four lines. Then add a row to `../06-baseline-and-change-log.md` with the cause found (A or B) and the publish time.

## Confirmed in the Showit editor (2026-10-06, cloud session)

- Site → Blog Templates now lists only: Home-1, Blog, Garden Wedding at Château de Bouthonvilliers, BLACK TIE PARISIAN AFFAIR CHERINE & ANDYS WEDDING, Erika Batiz & Julio Ramirez, Category, Wedding & Event Advice, Search Results, 404. **"Erica & Patrick post template", "Westgate post template" and "La Valencia post template" are gone.** That is cause 2 above; there is nothing to re-select on the posts (cause 1) because the templates no longer exist.
- Template Info of "Garden Wedding at Château de Bouthonvilliers": WordPress Template = **Single Post**. It is the site's default for every post, and all of its text is static, which is why every post without its own template reads as the Château wedding.
- Template Info of "Erika Batiz & Julio Ramirez": WordPress Template = **Custom**, Template Name `single-post-private-estate-wedding-san-diego-erika-and-julio`. That is why the Erika post still renders correctly.
- The Erika template's Content canvas is **WordPress: Static Content**. No template on the site currently renders WordPress Post Content; the Erika page shows Showit text, not post 250's body (post body and Showit text happen to match).
- The WordPress Template dropdown offers: Post List (Default), Single Post, Category, Tag, Archive, Search, Page, Front Page, Home, Taxonomy, Author, Attachment, Image, 404, Global Template, Custom.

## State of the Showit editor (unpublished, saved in the editor only)

- A duplicate of the Erika template was created and renamed **"Real Wedding Post"** (row menu → Duplicate, then Rename → Save). It still carries the Erika template's settings: WordPress Template **Custom**, Template Name `single-post-private-estate-wedding-san-diego-erika-and-julio`. **Two templates now share that Custom name. Change it before the next Publish**, or the Erika post may pick the wrong one.
- Nothing else was changed. Live site unchanged (verified by HTTP fetch after the edits).

## Remaining steps (3 settings changes, then canvas edits, then Publish)

1. **Château template → Custom.** Site → "Garden Wedding at Château de Bouthonvilliers" → TEMPLATE tab → TEMPLATE INFO (expand the accordion if PAGE BACKGROUND is open) → WordPress Template: **Custom** → Template Name: `single-post-garden-wedding-at-chateau-de-bouthonvilliers`. The Château post keeps its design through WordPress' template hierarchy, the same way the Erika post does.
2. **Real Wedding Post → Single Post.** Site → "Real Wedding Post" → TEMPLATE → TEMPLATE INFO → WordPress Template: **Single Post**. It becomes the default for every post, including the four broken ones and any future post.
3. **Make it generic.** In "Real Wedding Post": Hero canvas → hide on desktop and mobile (the post bodies carry their own hero). Content canvas → right panel WordPress: **Post Content** (instead of Static Content), then delete the Erika-specific elements (the graphics, "All the Details:", "Modern Estate Wedding", "When a Grammy-winning performer…", "We had the incredible honor…") so the canvas holds only the WordPress content, sized to the 1100 px measure. Leave Title (the "Weddings" label), About and Blog Contact.
4. **Publish**, then run the check in section D. Expected after publish: the four posts show their own hero, vendor list, story and photos; Erika and Château unchanged.

## What was done (2026-10-06, cloud session)

1. Template "Garden Wedding at Château de Bouthonvilliers": WordPress Template Single Post → **Custom**, Template Name `single-post-garden-wedding-at-chateau-de-bouthonvilliers`.
2. New template **"Real Wedding Post"** (duplicate of the Erika template): WordPress Template → **Single Post** (the site default). Hero canvas hidden on desktop and mobile. Content canvas: every Erika-specific element deleted; the one remaining text element has WordPress Placeholder **Post Content**, desktop 1100 × auto at x 50 / y 40, mobile 280 wide at x 20 / y 40; canvas type Grow with Content on both devices, initial height 600. Title ("Weddings" label), About and Blog Contact canvases unchanged.
3. Published with the legacy Publish Engine (the Beta Publish Engine toggle was switched on by a mis-click and switched back off before publishing).
4. Lesson for scripted Showit sessions: Showit autosaves with a delay. Wait for the header to read "Saved" before closing the browser, then reload and re-check; three edits were lost that way before the wait was added.

Known small item: the WordPress body of each post carries its own hero block, so the H1 on these four posts is now the body's names block inside the Post Content area rather than a Showit heading; the Yoast title and meta still carry the venue and couple.

## Also seen while checking (not part of this fix)

- The homepage "Recent Features" row still reads `Loews Coronado Resort Wedding`, `Garden Wedding at Château de Bouthonvilliers`, `Erica & Patrick's Wedding` and has not received the card redesign; the card spec says it is hand-built and gets the table content pasted in.
- The `/blog/` listing and `/category/real-weddings/` cards are correct: couple names, "Wedding Gallery", venue, and each links to the right post.
