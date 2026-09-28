# Showit runbook: Bella Mia website fixes (v2, merged with the Atlas package)

**For:** a Claude session running on the Founder's computer with browser control, or the Founder by hand.
**Platform:** Showit (VERIFIED by screenshot 2026-09-28) with a WordPress blog at `/blog` (Atlas, 17–18 Sep 2026).
**Pages known to exist (Atlas):** `/`, `/about`, `/services`, `/full-service-wedding-planning`, `/partial-wedding-planning`, `/floral-designs-and-more`, `/contact`, `/blog` (2 posts, both set in France), `/erica-and-patrick-sieben`. Known 404s: `/portfolio`, `/delete-this-demo-single-post`. Indexed but unread: `/untitled-c1izt`.
**Founder decisions (2026-09-28, all FOUNDER CONFIRMED):** city San Diego; office shown, 8885 Rio San Diego Dr, Suite 237, San Diego, CA 92108 (confirm ZIP, 92107 was typed); email info@bellamiaexclusiveevents.com; services = full-service planning, partial planning, floral design, event styling, rental packages, no selfie mirror; hotel line softened, no hotel named as a relationship; **lead planner name is "Yvanna"**; **established 2014** (not 2012); **"Luxury" is the positioning word**; **service area is San Diego, Coronado, La Jolla, and all of Southern California**; the Loews guide's "recommend most often" line is true.
**Rules:** publish once at the end. Record every "before" value in section 10 before overwriting it. Delete nothing before reading it. Anything marked ASK goes to the Founder first. Atlas's observations are ten days old; re-verify each before acting.

---

## 0. Orientation in the Showit editor

- Top-left tabs: **SITE** (all pages, site settings) and **PAGE** (the open page's canvases).
- Right panel on a page: **PAGE INFO** (name, URL), **SEO SETTINGS** (page title, meta description, share image, hide-from-search toggle), **ADVANCED SETTINGS**.
- Site-level settings sit behind the gear on the SITE tab.
- A text element's HTML tag (paragraph, H1, H2…) is a setting on the element, usually labeled Tag or Text Tag.
- Links on buttons and text are set in the element's Click Action / Link panel.
- **PUBLISH** is top right. Nothing is live until it is clicked.

## 1. The untitled page (resolved 2026-09-28)

The Showit Pages list has no page for `untitled-c1izt` (Founder screenshot). Pages present: Home, About, Services, Full Service Wedding Planning, Partial Wedding Planning, Floral Designs & More, Contact, Links. The URL is a ghost in Google's index from a deleted page. **Action:** add a 301 redirect `/untitled-c1izt` → `/` in section 8. Nothing to delete.

## 2. Capture before-values

For every page in the list above: SEO SETTINGS → copy Page Title, Meta Description, hide-from-search state into section 10. On Home, also record the text of the "Recent Features" module and the "Meet …" section.

## 3. Stopgaps for the two dead links (Atlas 2.1, 2.2)

1. **Portfolio CTAs.** On Home, find the button "Explore the Galleries". On `/full-service-wedding-planning`, find "View More Weddings". Record their current link. Change both to `/erica-and-patrick-sieben` (a real gallery) or, if that page is not presentable, to `/services`. When `/portfolio` is built later, point them back to `/portfolio`.
2. **Recent Features module on Home.** Find the two items linking to `/delete-this-demo-single-post` (one is titled "Loews Coronado Resort Wedding"). Remove both. If the module then has one real item, keep one; do not leave a placeholder. If every item is a placeholder, hide the whole module until real posts exist.
3. Verify on the canvas that no other element links to `/portfolio` or `/delete-this-demo-single-post` (check the footer and the mobile canvas).

## 4. The "Meet Erika & Julio Ramirez" block (Atlas 2.5, corrected 2026-09-28)

Erika Batiz and Julio Ramirez were real Bella Mia clients (FOUNDER CONFIRMED), and a blog post template named for them exists. **Do not remove the block.** Fix its labels:
- Heading stays `Erika & Julio` (or `Meet Erika & Julio`). It is a featured real wedding, not the planner introduction.
- Change the button "Read My Story" to `Read their story`, linked to their published post (check the WordPress post URL; if the post is not published yet, link to `/blog` until it is).
- Add a small line above or below: `A real wedding by Bella Mia` **[FOUNDER CONFIRM the role: planning, florals, or both]**.
- Make sure the About page introduces **Yvanna** by name with an H1 `Meet Yvanna`, and that every testimonial spells it "Yvanna". Record before-text.

## 4b. The Links page

`/links` is a link-in-bio page. In its SEO SETTINGS turn **Hide from search engines** on. Check its "The Galleries" button: if it points to `/portfolio`, repoint it with the others in section 3.

## 5. Titles and meta descriptions

SEO SETTINGS on each page. Paste exactly. Character counts are approximate; if Showit caps the description, trim from the end.

**Home**
- Page Title: `Luxury San Diego Wedding Planner | Bella Mia Exclusive Events`
- Meta Description: `Luxury wedding planning, floral design, and styling in San Diego, Coronado, and La Jolla. Bella Mia takes a limited number of weddings each year.`

**Services** and **Full-Service Wedding Planning**: Atlas found the existing title and meta well built. Leave them. Record them.

**Partial Wedding Planning**
- Page Title: `Partial Wedding Planning San Diego | Bella Mia Exclusive`
- Meta Description: `Already started planning? Partial wedding planning for San Diego couples who need expert guidance, vendor management, and flawless day-of execution.`

**Floral Designs and More**
- Page Title: `Wedding Floral Design & Styling San Diego | Bella Mia`
- Meta Description: `Wedding florals, event styling, and rental packages for San Diego weddings. Bouquets, ceremony installations, and tablescapes designed around your aesthetic.`

**About**
- Page Title: `Meet Yvanna | Bella Mia Exclusive Events, San Diego`
- Meta Description: `Meet Yvanna, the planner behind Bella Mia Exclusive Events, and how we design luxury weddings across San Diego and Southern California, consultation to send-off.`

**Contact**
- Page Title: `Contact Bella Mia Exclusive Events | San Diego Wedding Planner`
- Meta Description: `Tell us your date, venue, and vision. Call or text 619.248.0786, email info@bellamiaexclusiveevents.com, or meet us by appointment in Mission Valley.`

**Erica & Patrick gallery** (`/erica-and-patrick-sieben`; venue FOUNDER CONFIRMED 2026-09-28)
- Page Title: `Park Hyatt Aviara Wedding | Erica & Patrick | Bella Mia Events`
- Meta Description: `Erica and Patrick's wedding at Park Hyatt Aviara in Carlsbad, planned and designed by Bella Mia Exclusive Events. See the full gallery.`
- H1 on the page: `A [Style] Wedding at Park Hyatt Aviara` — **ASK** for one word describing the style (e.g., garden, black-tie, coastal), or use `Erica & Patrick at Park Hyatt Aviara`.

Coronado, La Jolla, Southern California, and "Luxury" are all FOUNDER CONFIRMED and may be used. If the "limited number of weddings each year" claim is not true, delete that sentence.

## 6. Headings (Atlas 2.4)

One H1 per page, sentence or title case, no random capitals.

| Page | H1 text | Tag |
|---|---|---|
| Home | `Luxury Wedding Planning in San Diego` (replace the hero "SAN DIEGO wEDDING PLANNER" text; the small-caps styling can stay, the text changes) | H1 |
| Full-Service Wedding Planning | `Full-Service Wedding Planning in San Diego` (replace "San diego wedding planner") | H1 |
| Services | fix `Southern cALIFORNIA Weddings, Engagements, and intimate EVENTS.` to `Southern California weddings, engagements, and intimate events.` | H1 if it is the main heading |
| Partial Wedding Planning | `Partial Wedding Planning in San Diego` | H1 |
| Floral Designs and More | `Wedding Floral Design, Styling & Rentals` | H1 |
| About | `Meet Yvanna` | H1 |
| Contact | `Contact Bella Mia` | H1 |

Section headings under each H1 → H2. If a page already has two H1 elements, demote the second. Check desktop and mobile canvases. Record each element's previous tag.

## 7. Copy edits

1. **Hotel line.** Search Home, About, Services, and the untitled page for "exclusive connections". Replace the sentence with `Experienced with San Diego's hotel and resort wedding venues.`
2. **Contact page.** Add near the form:
   ```
   8885 Rio San Diego Dr, Suite 237
   San Diego, CA 92108
   By appointment
   ```
   Phone `619-248-0786`. Email `info@bellamiaexclusiveevents.com`. Remove any gmail address site-wide.
3. **Footer**, if site-wide: same address, phone, email.
4. **Services page.** Ensure Event Styling and Rental Packages appear as their own sections (H2 each). Use this copy (written by Rank at the Founder's request, 2026-09-28; the one bracket is optional detail):

   **Event Styling**
   `Styling is the layer between a plan and a room that feels finished. We design the tablescapes, ceremony and lounge settings, signage, and the small details guests notice without knowing why, then set and style every piece on the day so nothing is left to chance. Available with our planning packages or on its own for couples who have the logistics handled and want the look elevated.`

   **Rental Packages**
   `Our curated rental collection lets you build the look without sourcing from five vendors. Choose from our inventory of [candlelight, tabletop, ceremony structures, and lounge pieces — edit to match what Bella Mia actually stocks], delivered, set, and collected by our team. Packages are designed to pair with our floral and styling work so every element is chosen to sit together.`

   Remove any "selfie mirror" text anywhere on the site.
5. **Business name in text.** The brand lockup "EXCLUSIVE EVENTS BY BELLA MIA" in the hero is a logo and can stay. In running text, credits, the footer, and the contact page, the name is **Bella Mia Exclusive Events** (FOUNDER CONFIRMED 2026-09-28). If a legal line is wanted in the footer, use `© 2026 Bella Mia Exclusive Events` and put the Inc. name in contracts only.
6. **"INC. EST. 2012"** in the hero → change to `EST. 2014` (FOUNDER CONFIRMED year; dropping "Inc." keeps the public name consistent). Check the footer and About page for any other year and match them.

## 8. Site-level

1. SITE → Site Settings: record the **Site Title**. It should read `Bella Mia Exclusive Events`.
2. **Redirects.** Site Settings → Advanced → Redirects (label may vary). Add:
   - `/untitled-c1izt` → target chosen in section 1
   - `/delete-this-demo-single-post` → `/blog`
   - `/portfolio` → `/erica-and-patrick-sieben` (temporary, remove when `/portfolio` is built)
   If Showit has no redirects feature, note it; the stopgap links in section 3 still remove the dead ends for visitors.
3. **Domain.** In the Showit account dashboard (not the editor) open Domains. Record whether `bellamiaexclusiveevents.com` and `www.bellamiaexclusiveevents.com` are both connected and which is primary. Change only if www is primary; make non-www primary. CURRENT PLATFORM POLICY NOT YET VERIFIED; read Showit's on-screen notes first.
4. **Schema** (later): Site Settings → Advanced → Custom Head HTML takes `fixes/07-localbusiness-schema-draft.json` inside `<script type="application/ld+json">…</script>`, only after every placeholder is filled.

## 9. Blog (WordPress)

1. Open `/blog` and the WordPress admin (Showit dashboard → Blog, or `/wp-admin`). Record: number of posts, their titles, the SEO plugin installed.
2. Set the blog title and description (Yoast or equivalent):
   - Title: `Real Weddings & Venue Guides | Bella Mia Exclusive Events`
   - Description: `Real weddings, venue guides, and planning advice from a San Diego wedding planner.`
3. Create categories **Real Weddings** and **Venue Guides**.
4. Do not publish posts in this run. The posting order is in `../analysis/reconciliation-atlas-package.md` section 4: Westgate (Cherine & Andy) first, Erica & Patrick second, then the Hotel del and Loews guides after their ASK items are answered.

## 10. Publish and verify

1. **PUBLISH** in Showit. Save in WordPress.
2. Verify from the same computer:
   ```
   curl -s https://bellamiaexclusiveevents.com/ | grep -o '<title>[^<]*</title>'
   curl -s https://bellamiaexclusiveevents.com/ | grep -o '<meta name="description"[^>]*>'
   curl -s https://bellamiaexclusiveevents.com/ | grep -o '<h1[^>]*>[^<]*</h1>'
   curl -s https://bellamiaexclusiveevents.com/ | grep -c 'delete-this-demo-single-post'
   curl -sI https://bellamiaexclusiveevents.com/portfolio | grep -iE '^(HTTP|location)'
   curl -sI https://bellamiaexclusiveevents.com/untitled-c1izt | grep -iE '^(HTTP|location)'
   curl -sI https://www.bellamiaexclusiveevents.com/ | grep -iE '^(HTTP|location)'
   ```
   Expected: new title and description; exactly one H1; zero matches for the demo post; `/portfolio` and `/untitled-c1izt` return 301 (or 404 with no inbound links); www returns 301 to non-www.
3. Google Search Console: add the Domain property `bellamiaexclusiveevents.com` if none exists; URL Inspection → Request indexing for `/`, `/services`, `/full-service-wedding-planning`, `/about`, `/contact`.
4. Copy the section 11 table into `fixes/06-baseline-and-change-log.md` with the date, commit, push.

## 11. Before/after record (fill in)

| Item | Before | After | Notes |
|---|---|---|---|
| Untitled page: name / URL / nav / content | | | |
| "Explore the Galleries" link target | | | |
| "View More Weddings" link target | | | |
| Recent Features items and links | | | |
| "Meet Erika & Julio Ramirez" block | "Read My Story" | kept; button "Read their story" → their post | real clients |
| Links page hidden from search | | on | |
| Home: title / meta / hide / H1 text and tag | | | |
| Services: title / meta / hide / H1 | | keep title+meta | |
| Full-Service: title / meta / hide / H1 | | keep title+meta | |
| Partial: title / meta / hide / H1 | | | |
| Floral: title / meta / hide / H1 | | | |
| About: title / meta / hide / H1 / name used | | | |
| Contact: title / meta / hide / H1 / address / email / phone | | | |
| Erica & Patrick: title / meta / H1 | | Park Hyatt Aviara | |
| "exclusive connections" sentence: pages | | replaced | |
| Selfie mirror text: pages | | removed | |
| Est. year in hero | 2012 | 2014 | |
| Site Title | | | |
| Redirects added | | | |
| Domain: primary host | | | |
| Blog: post count / SEO plugin / title | | | |
| Published at (date/time) | | | |
