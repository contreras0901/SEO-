# Wedding & Event Advice page

**Built:** 2026-10-07 (cloud session, WordPress REST + app.showit.com). **Founder brief:** a page of her own, separate from the main wedding blog, for advice on what to do and not do at weddings and events, cake advice, and color-palette advice. Page name: **Wedding & Event Advice**.

## Where it lives

| Page | URL | Rendered by | Lists |
|---|---|---|---|
| Wedding & Event Advice | `/category/advice/` | Showit template **Advice Category** (Custom `category-advice`) | posts in the WordPress category *Wedding & Event Advice* (id 5, slug `advice`) only |
| Real Weddings (the main wedding blog) | `/category/real-weddings/` | Showit template **Blog** (now Custom `category-real-weddings`) | posts in *Real Weddings* only |
| `/blog/` | 301 → `/category/real-weddings/` (Redirection rule 6; `/blog/page/N/` → `/category/real-weddings/page/N/`, rule 7) | | |

Why the main blog moved: WordPress' posts index (`/blog/`) always lists every post and cannot exclude a category without code, which this site cannot run. Making the wedding blog a category archive gives each section its own listing, and the Blog design was reassigned to it so nothing changed visually. The site menu's BLOG link still points at `/blog/` and follows the redirect.

## The three first posts (published, category Wedding & Event Advice)

| id | Title (headline) | Excerpt (card name line) | URL | Cover |
|---|---|---|---|---|
| 340 | Wedding Day Do's and Don'ts | Do's & Don'ts | `/2026/10/07/wedding-day-dos-and-donts-san-diego-planner/` | media 278 (El Jardín ceremony from above) |
| 341 | How to Choose Your Wedding Cake | Cake Advice | `/2026/10/07/wedding-cake-advice-how-to-choose-your-cake/` | media 290 (three-tier cream cake) |
| 342 | How to Choose a Wedding Color Palette | Color Palette Advice | `/2026/10/07/how-to-choose-a-wedding-color-palette/` | media 292 (bouquet) |

Each has a Yoast title and description, an H1 at the top of the body, a "Planning advice" kicker, and a closing line linking to `/contact` and `/services`. The copy is drafted in Bella Mia's voice from the real weddings already on the site (La Valencia palette and cake, Loews orchids, the estate's white-taupe-gold, the Westgate's Cool Water roses). **Founder to read and edit**: every "we" sentence is hers to keep or cut. Nothing names a vendor, venue rule or price that is not already on the site, except the 10 PM outdoor-music line at Loews, which is from the resort's published guidance.

## How to add the next advice post

**Layout reference (Founder-approved 2026-10-07):** `../posts/advice-template/` holds the README with the page anatomy, the generator script, and the live HTML of the cake post. New advice posts use that layout.


1. WordPress → Posts → Add New. Title = the headline. Excerpt = a two-to-three word name for the card (it is the big line on the card; keep it under about 18 characters). Category = Wedding & Event Advice. Featured image = a 4:5 photo.
2. Start the body with `<h1>` headline (the post template shows no heading of its own), then the text. Headings as `<h2>`.
3. Yoast title and description. Publish. The card appears on `/category/advice/` automatically; nothing to do in Showit.

## Showit changes made

- **Advice Category** template: duplicate of "Wedding & Event Advice", type Custom `category-advice`. Card slots: second line `Planning Advice` (was Wedding Gallery), button `Read the Post` (was View the Gallery), all three views. Header line `Filed under` → `Planning advice from Bella Mia`; the big title is the category name.
- **Blog** template: type Post List → Custom `category-real-weddings`.
- **Real Wedding Post** template (default for every post): the "Weddings" label above the post is now bound to **Post Top Category**, so wedding posts read "Real Weddings" and advice posts read "Wedding & Event Advice".
- WordPress category 5 renamed Advice → **Wedding & Event Advice** (slug unchanged). Redirection rules 2 and 3 (`/delete-this-demo-single-post`, `/portfolio`) now point straight at `/category/real-weddings/`.

## Open items for the Founder

- **SEO title of the wedding blog.** `/blog/` carried the Yoast title "Real Weddings & Venue Guides | Bella Mia Exclusive Events". The category archive uses Yoast's default "Real Weddings Archives - Bella Mia Exclusive Events". Set it in WordPress → Posts → Categories → Real Weddings → Yoast SEO: title `Real Weddings & Venue Guides | Bella Mia Exclusive Events`, and give Wedding & Event Advice `Wedding & Event Advice | Bella Mia Exclusive Events, San Diego`. (Yoast term settings are not reachable from the API.)
- **Cleaner URLs.** Yoast → Settings → Advanced → Permalinks → "Remove the categories prefix" turns `/category/advice/` into `/advice/` and `/category/real-weddings/` into `/real-weddings/`. If switched on, update redirect rule 6 to the new path.
- **Menu.** Add an ADVICE item to the Showit site menu (Menu and Mobile Menu canvases) linking to the advice page if it should be reachable from the top navigation.
- Two Category-type templates still exist ("Category" and "Wedding & Event Advice"); the second is the one WordPress serves for the Events category. Delete the unused one when convenient.

## Incident note

While repointing redirects 2 and 3 through the API, an update without the `url` field reset their source to `/` for about twenty seconds, which 301-redirected the homepage to the Real Weddings archive. Caught on the next check and fixed at once; the homepage returns 200. Always send the full rule (including `url`) when updating a Redirection rule through the API.
