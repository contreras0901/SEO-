# Showit runbook: Bella Mia website fixes (v2, merged with the Atlas package)

**For:** a Claude session running on the Founder's computer with browser control, or the Founder by hand.
**Platform:** Showit (VERIFIED by screenshot 2026-09-28) with a WordPress blog at `/blog` (Atlas, 17–18 Sep 2026).
**Pages known to exist (Atlas):** `/`, `/about`, `/services`, `/full-service-wedding-planning`, `/partial-wedding-planning`, `/floral-designs-and-more`, `/contact`, `/blog` (2 posts, both set in France), `/erica-and-patrick-sieben`. Known 404s: `/portfolio`, `/delete-this-demo-single-post`. Indexed but unread: `/untitled-c1izt`.
**Founder decisions (2026-09-28):** city San Diego; office shown, 8885 Rio San Diego Dr, Suite 237, San Diego, CA 92108 (confirm ZIP, 92107 was typed); email info@bellamiaexclusiveevents.com; services = full-service planning, partial planning, floral design, event styling, rental packages, no selfie mirror; hotel line softened; no hotel named as a relationship.
**Rules:** publish once at the end. Record every "before" value in section 10 before overwriting it. Delete nothing before reading it. Anything marked ASK goes to the Founder first. Atlas's observations are ten days old; re-verify each before acting.

---

## 0. Orientation in the Showit editor

- Top-left tabs: **SITE** (all pages, site settings) and **PAGE** (the open page's canvases).
- Right panel on a page: **PAGE INFO** (name, URL), **SEO SETTINGS** (page title, meta description, share image, hide-from-search toggle), **ADVANCED SETTINGS**.
- Site-level settings sit behind the gear on the SITE tab.
- A text element's HTML tag (paragraph, H1, H2…) is a setting on the element, usually labeled Tag or Text Tag.
- Links on buttons and text are set in the element's Click Action / Link panel.
- **PUBLISH** is top right. Nothing is live until it is clicked.

## 1. The untitled page

1. SITE → Pages. Find the page named "Untitled" or whose URL ends in `untitled-c1izt`. Open it. Record name, URL, nav status, and content in section 10.
2. Decide:
   - Duplicate of Home or Services → delete it (page menu ⋯ → Delete), then SITE → Site Settings → Advanced → Redirects: `/untitled-c1izt` → `/` (or `/services`). No redirects feature → keep the page, turn on **Hide from search engines** in its SEO SETTINGS, note it.
   - Unique content worth keeping → rename page and URL, title it per section 5, add a redirect from the old URL. **ASK** before keeping any hotel or vendor language.
   - Empty or test → delete, no redirect.

## 2. Capture before-values

For every page in the list above: SEO SETTINGS → copy Page Title, Meta Description, hide-from-search state into section 10. On Home, also record the text of the "Recent Features" module and the "Meet …" section.

## 3. Stopgaps for the two dead links (Atlas 2.1, 2.2)

1. **Portfolio CTAs.** On Home, find the button "Explore the Galleries". On `/full-service-wedding-planning`, find "View More Weddings". Record their current link. Change both to `/erica-and-patrick-sieben` (a real gallery) or, if that page is not presentable, to `/services`. When `/portfolio` is built later, point them back to `/portfolio`.
2. **Recent Features module on Home.** Find the two items linking to `/delete-this-demo-single-post` (one is titled "Loews Coronado Resort Wedding"). Remove both. If the module then has one real item, keep one; do not leave a placeholder. If every item is a placeholder, hide the whole module until real posts exist.
3. Verify on the canvas that no other element links to `/portfolio` or `/delete-this-demo-single-post` (check the footer and the mobile canvas).

## 4. Template names (Atlas 2.5)

On Home, find "Meet Erika & Julio Ramirez" and "Read My Story". **ASK the Founder for the confirmed planner name and spelling** (site testimonials and the Showit account say "Yvanna"; BBB says "Ivanna"). Replace with `Meet [Name]` and make "Read My Story" link to `/about`. Check `/about` uses the same name and spelling. Record the before-text.

## 5. Titles and meta descriptions

SEO SETTINGS on each page. Paste exactly. Character counts are approximate; if Showit caps the description, trim from the end.

**Home**
- Page Title: `San Diego Wedding Planner & Designer | Bella Mia Exclusive Events`
- Meta Description: `Full-service and partial wedding planning, floral design, styling, and rentals in San Diego. Bella Mia takes a limited number of weddings each year.`

**Services** and **Full-Service Wedding Planning**: Atlas found the existing title and meta well built. Leave them. Record them.

**Partial Wedding Planning**
- Page Title: `Partial Wedding Planning San Diego | Bella Mia Exclusive`
- Meta Description: `Already started planning? Partial wedding planning for San Diego couples who need expert guidance, vendor management, and flawless day-of execution.`

**Floral Designs and More**
- Page Title: `Wedding Floral Design & Styling San Diego | Bella Mia`
- Meta Description: `Wedding florals, event styling, and rental packages for San Diego weddings. Bouquets, ceremony installations, and tablescapes designed around your aesthetic.`

**About**
- Page Title: `Meet [Name] | Bella Mia Exclusive Events, San Diego`
- Meta Description: `Meet the planner behind Bella Mia Exclusive Events and learn how we plan and design weddings in San Diego from first consultation to send-off.`

**Contact**
- Page Title: `Contact Bella Mia Exclusive Events | San Diego Wedding Planner`
- Meta Description: `Tell us your date, venue, and vision. Call or text 619.248.0786, email info@bellamiaexclusiveevents.com, or meet us by appointment in Mission Valley.`

**Erica & Patrick gallery**
- Page Title: `[Venue] Wedding | Erica & Patrick | Bella Mia Exclusive Events` — **ASK** the venue.
- Meta Description: `A [style] wedding at [Venue], [City], planned and designed by Bella Mia Exclusive Events. See the full gallery.`

Do not mention La Jolla or Coronado in any title or description until the Founder confirms them as service areas. Do not use "Luxury" until the Founder confirms that positioning. If the "limited number of weddings each year" claim is not true, delete that sentence.

## 6. Headings (Atlas 2.4)

One H1 per page, sentence or title case, no random capitals.

| Page | H1 text | Tag |
|---|---|---|
| Home | `Wedding Planning & Design in San Diego` (replace the hero "SAN DIEGO wEDDING PLANNER" text; the small-caps styling can stay, the text changes) | H1 |
| Full-Service Wedding Planning | `Full-Service Wedding Planning in San Diego` (replace "San diego wedding planner") | H1 |
| Services | fix `Southern cALIFORNIA Weddings, Engagements, and intimate EVENTS.` to `Southern California weddings, engagements, and intimate events.` | H1 if it is the main heading |
| Partial Wedding Planning | `Partial Wedding Planning in San Diego` | H1 |
| Floral Designs and More | `Wedding Floral Design, Styling & Rentals` | H1 |
| About | `About Bella Mia Exclusive Events` or `Meet [Name]` | H1 |
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
4. **Services page.** Ensure Event Styling and Rental Packages appear with two or three sentences each. **ASK** for the sentences if none exist. Remove any "selfie mirror" text.
5. **"INC. EST. 2012"** in the hero: **ASK**. BBB says 2014. Change only on the Founder's answer.

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
   - Title: `San Diego Wedding Blog & Venue Guides | Bella Mia Exclusive`
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
| "Meet Erika & Julio Ramirez" text | | Meet [Name] | ASK spelling |
| Home: title / meta / hide / H1 text and tag | | | |
| Services: title / meta / hide / H1 | | keep title+meta | |
| Full-Service: title / meta / hide / H1 | | keep title+meta | |
| Partial: title / meta / hide / H1 | | | |
| Floral: title / meta / hide / H1 | | | |
| About: title / meta / hide / H1 / name used | | | |
| Contact: title / meta / hide / H1 / address / email / phone | | | |
| Erica & Patrick: title / meta / venue | | | ASK venue |
| "exclusive connections" sentence: pages | | replaced | |
| Selfie mirror text: pages | | removed | |
| Est. year in hero | 2012 | | ASK: BBB says 2014 |
| Site Title | | | |
| Redirects added | | | |
| Domain: primary host | | | |
| Blog: post count / SEO plugin / title | | | |
| Published at (date/time) | | | |
