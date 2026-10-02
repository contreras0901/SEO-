# Showit runbook: Bella Mia website fixes (v2, merged with the Atlas package)

**For:** a Claude session running on the Founder's computer with browser control, or the Founder by hand.
**Platform:** Showit (VERIFIED by screenshot 2026-09-28) with a WordPress blog at `/blog` (Atlas, 17–18 Sep 2026).
**Pages known to exist (Atlas):** `/`, `/about`, `/services`, `/full-service-wedding-planning`, `/partial-wedding-planning`, `/floral-designs-and-more`, `/contact`, `/blog` (2 posts, both set in France), `/erica-and-patrick-sieben`. Known 404s: `/portfolio`, `/delete-this-demo-single-post`. Indexed but unread: `/untitled-c1izt`.
**Founder decisions (2026-09-28, all FOUNDER CONFIRMED):** city San Diego; street address stays on Google Business Profile and directory listings but **is not shown on the website** (website says "Mission Valley, San Diego · By appointment"); email info@bellamiaexclusiveevents.com; services = full-service planning, partial planning, floral design, event styling, rental packages, no selfie mirror; hotel line softened, no hotel named as a relationship; **lead planner name is "Yvanna"**; **established 2014** (not 2012); **"Luxury" is the positioning word**; **service area is San Diego, Coronado, La Jolla, and all of Southern California**; the Loews guide's "recommend most often" line is true.
**Rules:** publish once at the end. Record every "before" value in section 10 before overwriting it. Delete nothing before reading it. Anything marked ASK goes to the Founder first. Atlas's observations are ten days old; re-verify each before acting.

---

## 0a. Re-verification of the live site (2026-09-28, curl from the Founder's Mac, before any editor change)

Atlas's ten-day-old observations were re-checked against the live HTML of every page. Much of the runbook is **already live**; the remaining work is smaller and two assumptions were wrong.

**Already live, no editor action needed (record only):**
- Section 3.1: "Explore the Galleries" → `/services`; "View More Weddings" (Full-Service, Partial, Floral) → `/blog/`. Zero links to `/portfolio` anywhere.
- Section 3.2: zero links to `/delete-this-demo-single-post`. Recent Features now shows three items: "Loews Coronado Resort Wedding" → `/blog/` (generic link, no Loews post exists), "Garden Wedding at Château de Bouthonvilliers" → its post, "Erika & Julio's Wedding" → `/blog/erika-batiz-julio-ramirez/`.
- Section 4: the block is now "Featured Wedding: Erika & Julio" with button "SEE THEIR WEDDING" → `/blog/erika-batiz-julio-ramirez/` (published WordPress page, 200). Only the role line is missing.
- Section 6: H1s already correct on Home, Services, Full-Service, Partial. Floral H1 is "Wedding Floral Design in San Diego" (close; runbook text optional).
- Section 5: Services, Full-Service, Partial, Floral titles and metas already rewritten (values in section 11). Partial and Floral differ from the runbook text but are sound; treat as optional.
- Section 7: no "selfie mirror", no gmail address, no "2012" or "Inc." text in any page HTML (the hero lockup may be an image; confirm visually).
- Section 8.3: `www` already 301s to non-www. Nothing to change.

**RUN COMPLETE 2026-09-29, published 09:21 PDT.** Everything in the "still to do" list below was done in the editor (text edits via Showit's inline editor driven from the Founder's Chrome after Accessibility permission was granted) and verified live (section 10 results). Left for later: Google Search Console indexing requests (10.3), the Erica & Patrick gallery build, the `/home` duplicate, naming APR Rentals, moving the Château post to Real Weddings, Yoast logo/social profiles.

**Was still to do in the editor at the start of 2026-09-29 (all done):**
- Home title is the bare domain and Home has **no meta description** (section 5).
- About H1 is "Radiant WEDDINGS that stand the test of time"; "Meet YVANNA" is an H2 (section 6).
- Contact H1 is "Inquire"; page shows the email only, no address, no phone (sections 6, 7.2).
- "exclusive connections" sentence is still on Home, in the "Poignant Moments" paragraph (section 7.1).
- Services page has no Event Styling or Rental Packages sections (section 7.4).
- Links page is not hidden from search (no robots meta; Showit pages are not in the sitemap either way) (section 4b).
- Redirects for `/untitled-c1izt`, `/delete-this-demo-single-post`, `/portfolio`: all three still return 404 (section 8.2).
- Erika & Julio role line (section 4, needs FOUNDER answer).

**Found in the editor 2026-09-29:** the live homepage `/` is rendered by WordPress from the Showit **blog template "Home-1"** (Site tab → Blog Templates), not from the Showit page "Home". Home-1's SEO panel says titles and descriptions for blog-rendered pages come from Yoast, so the Yoast homepage title/meta (set 2026-09-29) is what `/` shows. The Showit page "Home" is also live at `/home` (200, same content) and is a duplicate of `/`; not in the runbook, flag for a redirect or hide-from-search later. Home-1 and Home share the same canvases and element ids, so a text edit made on one must be checked on the other.

**Assumptions that were wrong:**
- `/erica-and-patrick-sieben` returns **404**. There is no Erica & Patrick gallery on the live site. FOUNDER 2026-09-28: it is to be built from `posts/layout-preview-erica-and-patrick.html` as a follow-on task. Do not point any CTA or redirect at it until it exists.
- The live About page says **"Since 2011"** (title and "Capturing love stories since 2011" subline) and the meta says "14+ years". FOUNDER RE-CONFIRMED 2026-09-28: the year is **2014**; all three live mentions get corrected (section 7.6).
- WordPress has **no SEO plugin** (only Showit and CleanTalk). Section 9.2 must be done in WordPress Settings → General (Site Title, Tagline) or left for a later plugin decision. WordPress: 1 post (Château, category Uncategorized) plus 4 pages (blog, chateau, erika-batiz-julio-ramirez, black-tie-parisian-affair-cherine-andys-wedding). No Real Weddings or Venue Guides categories.
- Not a Showit editor action: Google Analytics tag G-YYMYRJWHH5 is present on Contact.

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
2. **Recent Features module on Home.** RESOLVED 2026-09-28: no demo-post links remain. The "Loews Coronado Resort Wedding" item links to `/blog/` and has no post behind it; FOUNDER DECISION 2026-09-28: **keep it** until a Loews post is published, then repoint it to that post.
3. Verify on the canvas that no other element links to `/portfolio` or `/delete-this-demo-single-post` (check the footer and the mobile canvas).

## 4. The "Meet Erika & Julio Ramirez" block (Atlas 2.5, corrected 2026-09-28)

Erika Batiz and Julio Ramirez were real Bella Mia clients (FOUNDER CONFIRMED), and a blog post template named for them exists. **Do not remove the block.** Fix its labels:
- Heading stays `Erika & Julio` (or `Meet Erika & Julio`). It is a featured real wedding, not the planner introduction.
- Change the button "Read My Story" to `Read their story`, linked to their published post (check the WordPress post URL; if the post is not published yet, link to `/blog` until it is).
- Add a small line above or below (FOUNDER CONFIRMED 2026-09-28): `A real wedding by Bella Mia: planning, floral design, decor, catering, and bar service`.
- Make sure the About page introduces **Yvanna** by name with an H1 `Meet Yvanna`, and that every testimonial spells it "Yvanna". Record before-text.
- **2026-10-01, the wedding page itself (`/blog/erika-batiz-julio-ramirez/`, WordPress page 142):** the Founder reported the page showed only a title. Verified cause: the page has empty WordPress content and the Showit design "Erika Batiz & Julio Ramirez" was a template of type **Single Post** (the second one, so it served nothing; pages never use single-post templates). WordPress fell back to the blog-listing template, which showed one empty card. The Wayback Machine copies from 2025-09-06, 2025-12-12, and 2026-04-14 render the same empty shell, so the design was never wired to the page; nothing in this project's edits removed it. Fix: template type changed to **Custom** with Template Name `page-erika-batiz-julio-ramirez` (WordPress page hierarchy), and the four post-only canvases (Comments, Comment Form, Pagination, Posts) hidden on desktop and mobile in that template because on a page they showed "Comments will load here", "Post name will populate here", and three empty cards for the page itself. Hero, Title, Content (7 photos, story), About, Blog Contact, Footer untouched. Published twice (once to verify the template switch, once after hiding the four canvases). Verified live at 1440 and 430 px. The two sibling pages `/blog/black-tie-parisian-affair-cherine-andys-wedding/` (page 149) and `/blog/garden-wedding-at-chateau-de-bouthonvilliers/` (page 148) had the same empty-shell problem and are not linked from anywhere on the site. **2026-10-01, Black Tie (Founder: "wire it"):** template "BLACK TIE PARISIAN AFFAIR CHERINE & ANDYS WEDDING" set to Custom `page-black-tie-parisian-affair-cherine-andys-wedding`, Comments / Comment Form / Pagination / Posts hidden on both devices, published 07:05 PDT, live page now renders hero title, story, and 11 photos. Pre-existing gaps in that template: no Menu, Mobile Menu, or Footer site canvases attached; Hero graphic has no image (plain taupe block, very tall on phones); the first text block grows taller than designed so the first photo overlaps the paragraphs on desktop and phone; the opening story text appears twice in the Content canvas; the Blog Contact body was Lorem ipsum. **Later 2026-10-01 (Founder: "attach menu and footer and fix the Lorem ipsum"):** Template Info → Canvas Set changed from None to **Main Site** (that is how Erika's template carries Menu, Mobile Menu, and Footer; no per-canvas work needed), and the Blog Contact body (element `-5BnnONT9_elements_1`) replaced with the same two-line copy as Erika's page ("As a boutique-style company… we'd love to hear your story."). Note: the first attempt inserted a stale scratch string ("Erica & Patrick, Park Hyatt Aviara, Carlsbad") for about a minute in the editor only; corrected before publishing. Published 07:40 PDT; live canvases now menu, hero, title, content, blog-contact, footer, mobile-menu; no Lorem text. **Later 2026-10-01 (Founder: "fix this and the menu bar"):** the overlap and the duplicated text had one cause: the first text box in the Content canvas is bound to WordPress Post Content, and page 149 carried all six story paragraphs while the template's own static text boxes (elements 4 and 7) already hold paragraphs 3–6. WordPress page 149 content trimmed to paragraphs 1–2 via REST (no Showit change, no publish needed); the box now ends above the first photo on desktop and phone and nothing repeats. The "hidden" menu bar was the WordPress toolbar covering the top of the sticky Showit menu while logged in; logged-out visitors always saw the full menu (verified in a cookie-free context on Home and Black Tie). Fixed by unchecking "Show Toolbar when viewing site" on the Founder's WordPress profile (profile.php, reversible). **2026-10-01, Founder: "publish all of them" + convert the two pages to posts:** Erika & Julio and Cherine & Andy are now WordPress **posts** (Real Weddings) so they appear in the blog listing: post 250 `/2026/10/01/private-estate-wedding-san-diego-erika-and-julio/` (Yoast title/meta from the superseded draft; featured image = the Showit hero portrait, media 243; the Erika template's Custom name changed to `single-post-private-estate-wedding-san-diego-erika-and-julio`, design untouched) and post 248 `/2026/10/01/westgate-hotel-wedding-florals-cherine-and-andy/` built from the approved Westgate draft (RBCO Events credited as planner, Bella Mia florals & rentals) in the Serene-style HTML-block layout with 12 Khoa Photography photos from `~/Documents/Bella Mia Exclusive Events/Westgate Hotel Wedding/Cherine & Andy` (media 242, 252–262), served by a new Showit template "Westgate post template" (duplicate of the Aviara one, Custom `single-post-westgate-hotel-wedding-florals-cherine-and-andy`, Canvas Set Main Site, phone content box moved to Y 200 so the three-line title clears the hero). Old page URLs `/blog/erika-batiz-julio-ramirez/` and `/blog/black-tie-parisian-affair-cherine-andys-wedding/` 301 to the posts (Redirection ids 4, 5); pages 142 and 149 set to **draft**, not deleted; the Black Tie Showit template is unused but kept. La Valencia (post 244) and Loews (post 246) exist as WordPress **drafts** with full text, category, and Yoast fields; their photos were supplied only to the cloud session and are not on this Mac, so they stay unpublished until the Founder drops them in a Desktop folder. Known defect found in the blog listing: the Posts canvas's third card view (`Oogq7OHww_states_2_elements_4`, Blog template) carries a leftover static text "ERIKA BATIZ & JULIO RAMIREZ WEDDING" linked to `/erika-batiz-and-julio-ramirez`; it overlaps the third card's title whenever three or more posts exist; element menus have no hide option; Founder approved deletion on 2026-10-01; the element was deleted from the Blog template's Posts canvas, View 3 (the only deletion in this project, approved in chat). **Later 2026-10-01 (Founder: Recent Features links, Westgate card image, delete the stray text):** Home "Recent Features" cards fixed on BOTH the live "Home-1" template and the Site "Home" page (they are separate copies; `/` is served by Home-1): card 1 image (24WsatRmb_elements_2, no link before) and text (elements_6, was `/blog/`) now link to the Loews post; card 3 text (elements_10) and image (elements_12) now link to the Aviara post (the photo is Erica & Patrick's `img_1305.jpg`); card 3 label set to "Erica & Patrick's Wedding"; "SEE THEIR WEDDING" (tORd4KNmO_elements_9) now links to the Erika & Julio post. **Card 1 caveat:** its photo is `walking_eagle_photography_danny_lisa-466.jpg` (Danny & Lisa, Walking Eagle Photography), not Julianne & David; the Founder asked to keep the card as is. Loews post 246 PUBLISHED 2026-10-01 at `/2026/10/01/loews-coronado-bay-wedding-julianne-and-david/` with the only two Julianne & David photos on this Mac (`~/Downloads/Photos/julianne-david-wedding-919.JPG`, `…/untitled folder/julianne-david-wedding-853.JPG`; media 271 featured, 272 hero); the rest of the Chrissa Magno set is still to come. Westgate post featured image changed to the bride portrait (media 253). **2026-10-02, three blog pages (Founder: "a blog page for weddings, one for advice, one for events"):** WordPress categories Advice (id 5, `/category/advice/`) and Events (id 6, `/category/events/`) created beside Real Weddings (id 3, `/category/real-weddings/`); each is served by the Showit "Category" template (type category, Canvas Set Main Site, header "Filed under / <category name>"), which renders even when the category is empty. Category template: the three card images in the Posts canvas (`Oogq7OHww_states_0..2_elements_0`) now have the "WordPress Featured Image" switch on and click action `wp_post` (they showed the design placeholder stationery photo before); a link row was added under the category title by duplicating the "Filed under" label three times (`dIDRqBFiN_elements_2/3/4` = Weddings / Advice / Events, desktop W160 Y340 at X 360/520/680, phone W90 Y350 at X 15/115/215, click action URL to each category). Blog template: same row under "SAN DIEGO WEDDING BLOG" by duplicating the "Destination Wedding" label (`dIDRqBFiN_elements_2/3/4`, desktop W150 Y118 at X 77/237/397, phone W95 Y128 at X 10/110/210). Editor lesson: a double-click on labels near a canvas's top-left lands on the canvas hover tag and opens the canvas background gallery picker; move the element right temporarily, edit, move back. Category name stays "Real Weddings" (slug `real-weddings`); the nav label says "Weddings". Advice and Events show only the header until their first posts exist. Château page (148) still untouched: wire with `page-garden-wedding-at-chateau-de-bouthonvilliers` or redirect to the Château post.

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

**Erica & Patrick gallery** (venue FOUNDER CONFIRMED 2026-09-28)
- STATUS 2026-09-28: `/erica-and-patrick-sieben` does not exist on the live site (404) and is not a WordPress page. The Founder supplied `posts/layout-preview-erica-and-patrick.html` (section A = the Showit gallery page to build; section B = the WordPress post in `posts/erica-and-patrick-park-hyatt-aviara.md`). Building the gallery page is a separate task after this runbook; when it is built, apply these fields:
- Page Title: `Park Hyatt Aviara Wedding | Erica & Patrick | Bella Mia Events`
- Meta Description: `Erica and Patrick's wedding at Park Hyatt Aviara in Carlsbad, planned and designed by Bella Mia Exclusive Events. See the full gallery.`
- H1 on the page: `A Coastal Garden Wedding at Park Hyatt Aviara` (style FOUNDER CONFIRMED via the layout preview; the hero lockup "Erica & Patrick" can stay as styled text, not an H1).
- Until then, no CTA or redirect points at `/erica-and-patrick-sieben`.
- **2026-09-29 build status (afternoon):** How this site really renders posts: every post uses the first Showit blog template of type "Single Post" (the Château design); a post gets its own design only through a template of type **Custom** whose "Template Name" follows WordPress's template hierarchy, e.g. `single-post-<slug>`. Built: WordPress draft post 194 now holds the full body, 4 Founder phone photos (WP media ids 199–202, mirror-booth shot left out) in two image rows, featured image 201, Patrick LVB linked to Instagram, "Photos: Bella Mia Exclusive Events" credit. Showit: duplicated the Erika & Julio single-post template → template "Erika Batiz & Julio Ramirez -1" set to Custom `single-post-park-hyatt-aviara-wedding-erica-and-patrick`, hero bound to Post Title (H1), label bound to Post Top Category, body bound to Post Content, content canvas set to Grow with Content, heading "Erica & Patrick, Park Hyatt Aviara, Carlsbad". **Later on 2026-09-29:** the Founder deleted the duplicate templates in Showit, which removed the custom template too and dropped the live post back to the Château design for a few minutes. Rebuilt from one fresh copy of the Erika template (Custom `single-post-park-hyatt-aviara-wedding-erica-and-patrick`; hero canvas hidden on desktop and mobile; "Erica & Patrick, Park Hyatt Aviara, Carlsbad" heading rebound to Post Title as the H1; body bound to Post Content; content canvas grows). The post body was rebuilt as WordPress blocks that follow `posts/layout-preview-erica-and-patrick.html`: cover hero with the head-table photo desaturated and "ERICA & PATRICK" in the display serif, intro composition (two photos + names, venue, vendor list, "scroll for full gallery"), centered story, photo grid, The Vendor Team, CTA links. Draft page 195 trashed with Founder approval. Live URL: `https://bellamiaexclusiveevents.com/2026/09/29/park-hyatt-aviara-wedding-erica-and-patrick/`. **2026-09-30, layout rebuild (Founder: "poor quality, make it look like the Serene blog"):** the real defect was the template, not the photos: the copy of the Erika & Julio template still carried Erika & Julio's own photos and story as fixed design elements, with the Aviara post squeezed into a 494-px column underneath. Fixed in the template "Erica & Patrick post template": deleted the 10 Erika & Julio elements from the Content canvas (7 photos, 2 paragraphs, 1 empty box), kept only the title (H1, Post Title, centered) and the Post Content box, widened both to 1100 px, set the Content canvas initial height to 360 desktop / 260 mobile (it was 3277 / 2134 from the old photo layout, which produced a ~3000-px blank gap), hid the Hero and Recent Posts canvases, centered the category label. The post body was rebuilt as stable blocks (raw HTML blocks for the hero, date line, subtitle, intro composition, grids, vendor team, and CTA; standard centered paragraphs for the story) so the WordPress editor's "attempt recovery" cannot mangle it again. Verified with headless screenshots at 1440 and 430 px. Driving method from now on: a separate Chrome on a debug port (see memory), which gives trusted clicks and screenshots.

**16:45 PDT:** the custom template was deleted a second time (still named like a duplicate), so the post fell back to the Château design again; rebuilt a third time and renamed in Showit to **"Erica & Patrick post template"** (Site → Blog Templates). Do not delete it: it is the only thing giving the Aviara post its own design. Photos: 5 Audree Belle images (hero veil portrait, intro kiss + reception, stairs, lounge) plus the 4 phone detail shots; featured image = sunset kiss. The duplicate H1 (the hidden hero still emitted one) was fixed by demoting the hidden hero heading to a paragraph; live page has exactly one H1 after the 14:41 PDT publish.

Coronado, La Jolla, Southern California, and "Luxury" are all FOUNDER CONFIRMED and may be used. The "limited number of weddings each year" claim is FOUNDER CONFIRMED true (2026-09-28); keep it in the Home meta, on the Partial page, and in the Contact meta.

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
2. **Contact page.** FOUNDER DECISION 2026-09-28: **no street address on the website.** Show only:
   ```
   Mission Valley, San Diego
   By appointment
   ```
   Phone `619-248-0786`. Email `info@bellamiaexclusiveevents.com`. Remove any gmail address site-wide. If a street address was already added in an earlier pass, remove it.
3. **Footer**, if site-wide: `Mission Valley, San Diego · By appointment`, phone, email. No street address.
4. **Services page.** Ensure Event Styling and Rental Packages appear as their own sections (H2 each). Use this copy (written by Rank at the Founder's request, 2026-09-28; the one bracket is optional detail):

   **Event Styling**
   `Styling is the layer between a plan and a room that feels finished. We design the tablescapes, ceremony and lounge settings, signage, and the small details guests notice without knowing why, then set and style every piece on the day so nothing is left to chance. Available with our planning packages or on its own for couples who have the logistics handled and want the look elevated.`

   **Rental Packages**
   `Our rental packages let you build the look without sourcing from five vendors. Tables, chairs, linens, tabletop, and lounge pieces, plus the full catalog of our rental partner, delivered, set, and collected by our team. Packages are designed to pair with our floral and styling work so every element is chosen to sit together.`

   Inventory FOUNDER CONFIRMED 2026-09-28: tables, chairs, and everything APR Rentals carries. The partner is not named on the site until the Founder confirms APR Rentals agrees to be named; "our inventory" was dropped because the catalog is the partner's, not Bella Mia's.

   Remove any "selfie mirror" text anywhere on the site.
5. **Business name in text.** The brand lockup "EXCLUSIVE EVENTS BY BELLA MIA" in the hero is a logo and can stay. In running text, credits, the footer, and the contact page, the name is **Bella Mia Exclusive Events** (FOUNDER CONFIRMED 2026-09-28). If a legal line is wanted in the footer, use `© 2026 Bella Mia Exclusive Events` and put the Inc. name in contracts only.
6. **Year.** FOUNDER RE-CONFIRMED 2026-09-28: **2014**. The live About page says "Since 2011" twice and "14+ years" once; all three are wrong. Change:
   - About subline `Capturing love stories since 2011` → `Capturing love stories since 2014`
   - About page title and meta: use the section 5 values (no year in either)
   - Hero "INC. EST. 2012", if it is text → `EST. 2014` (dropping "Inc." keeps the public name consistent). If it is an image, leave it and note it. No "2012" text was found in any page HTML on 2026-09-28.
   - Check the footer for any other year and match it.

## 8. Site-level

1. SITE → Site Settings: record the **Site Title**. It should read `Bella Mia Exclusive Events`.
2. **Redirects.** Site Settings → Advanced → Redirects (label may vary). Add:
   - `/untitled-c1izt` → target chosen in section 1
   - `/delete-this-demo-single-post` → `/blog`
   - `/portfolio` → `/blog/` (temporary; the Erica & Patrick gallery does not exist yet, and `/blog/` is where the live CTAs already point. Remove when `/portfolio` is built)
   If Showit has no redirects feature, note it; the stopgap links in section 3 still remove the dead ends for visitors.
   **DONE 2026-09-29:** Showit has no redirects tab on this account, but every unknown path on this domain is answered by WordPress, so the three redirects were added with the WordPress Redirection plugin (Tools → Redirection). They are live and verified. To change them later, edit the rules there, not in Showit.
3. **Domain.** In the Showit account dashboard (not the editor) open Domains. Record whether `bellamiaexclusiveevents.com` and `www.bellamiaexclusiveevents.com` are both connected and which is primary. Change only if www is primary; make non-www primary. CURRENT PLATFORM POLICY NOT YET VERIFIED; read Showit's on-screen notes first.
4. **Schema** (later): Site Settings → Advanced → Custom Head HTML takes `fixes/07-localbusiness-schema-draft.json` inside `<script type="application/ld+json">…</script>`, only after every placeholder is filled.

## 9. Blog (WordPress)

**Steps 1–3 DONE 2026-09-29** (values in section 11). **Blog listing fixed 2026-09-29 (afternoon):** `/blog/` was a plain WordPress page rendered by the Showit "Post List" template, so its post list only showed the page itself and no real posts. Fix: WordPress Settings → Reading now uses a static front page (placeholder page 214 `front-page`, published, Yoast title/meta = homepage values, Yoast canonical override `https://bellamiaexclusiveevents.com/`, and `/front-page/` 301s to `/`) with **Blog (147) as the Posts page**. `/` still renders the Showit Home-1 "Front Page" template; `/blog/` now lists every post with links. Do NOT set "A static page" without a Homepage selected: with none chosen WordPress drops the Front Page template and `/` turns into the blog listing (happened for ~1 minute during this fix, reverted). The featured card on `/blog/` is a static Showit element linking `/garden-wedding-at-chateau-de-bouthonvilliers`, which WordPress 301s to the real post. FOUNDER DECISION 2026-09-29: leave it on the Château post. **Post cards fixed 15:12 PDT:** in the Blog template's "Posts" canvas (three canvas views, rotated per post) the card image was a static stock photo with a hard-coded click action to the Cherine & Andy page; each view's image now has "WordPress Featured Image" on and Click Action = WordPress Post. Château post (116) moved from Uncategorized to Real Weddings and given a featured image (WP media 217, sideloaded from its own Showit gallery, 1600×2400). Verified live: both cards show their own featured photo and link to their post. Yoast was already installed on the Showit multisite, only inactive; it was activated, not installed. Still open from this section: nothing. Later: move the Château post from Uncategorized to Real Weddings when the Real Weddings posts go up; Yoast's logo and social profiles were not set.

1. Open `/blog` and the WordPress admin (Showit dashboard → Blog, or `/wp-admin`). Record: number of posts, their titles, the SEO plugin installed.
2. Set the blog title and description. VERIFIED 2026-09-28: no SEO plugin is installed, and WordPress core writes no meta description at all, so the description below cannot be set without one. FOUNDER asked for the best format (2026-09-28); the recommendation is:
   - **Install Yoast SEO (free)** from Plugins → Add New. It is the plugin Showit's own blog documentation assumes, it adds a title and meta description field to every post (needed for the Real Weddings posts that follow), and it replaces the core `wp-sitemap.xml` with its own. After activating, run its configuration wizard with organization name `Bella Mia Exclusive Events`, then set Search Appearance → the blog page's title and description to the values below.
   - Also set Settings → General: Site Title `Bella Mia Exclusive Events` (currently `bellamiaexclusiveevents.com`, which is why the blog title reads "Blog | bellamiaexclusiveevents.com"), Tagline `Real Weddings & Venue Guides from a San Diego Wedding Planner` (currently empty). Do this even if the plugin decision is deferred.
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
3. Google Search Console: add the Domain property `bellamiaexclusiveevents.com` if none exists; URL Inspection → Request indexing for `/`, `/services`, `/full-service-wedding-planning`, `/about`, `/contact`. **NOT DONE 2026-09-29** (needs the Founder's Google account in Search Console; do by hand).
4. Copy the section 11 table into `fixes/06-baseline-and-change-log.md` with the date, commit, push.

**Results 2026-09-29 09:23 PDT (curl with cache-busting, after publish):**
- `/` title `Luxury San Diego Wedding Planner | Bella Mia Exclusive Events`; meta as section 5; 1 H1; 0 links to the demo post or `/portfolio`; "exclusive connections" 0; new hotel sentence 1; Erika & Julio role line 1.
- `/about` title/meta as section 5; H1 `Meet YVANNA`; "since 2014" 1, "since 2011" 0.
- `/services` title/meta unchanged (kept); H1 unchanged; "Event Styling" and "Rental Packages" present.
- `/contact` title/meta as section 5; 1 H1 ("Contact Bella Mia"); location line `Mission Valley, San Diego` + `By appointment` + phone present; street address 0 (a street address was live 09:21–11:15 PDT and removed after the Founder's 2026-09-28 no-street-address decision was merged from the other session).
- `/links` `<meta name="robots" content="noindex">` present.
- `/floral-designs-and-more`, `/partial-wedding-planning`, `/full-service-wedding-planning` titles/metas as recorded in section 11; 1 H1 each.
- `/blog/` title `Real Weddings & Venue Guides | Bella Mia Exclusive Events` with the section 9 description.
- `/portfolio` → 301 `/blog/`; `/untitled-c1izt` → 301 `/`; `/delete-this-demo-single-post` → 301 `/blog/`; `https://www.` → 301 non-www.
- `/home` is live with the same content as `/` (duplicate; not in scope, flagged in section 0a).

## 11. Before/after record (fill in)

"Before" column captured 2026-09-28 from the live HTML (curl) before any editor change. "hide" = hide-from-search state, which is only visible inside the editor; live HTML shows no robots meta on any page.

| Item | Before | After | Notes |
|---|---|---|---|
| Untitled page: name / URL / nav / content | `/untitled-c1izt` → 404; not in Showit Pages list; not in sitemap | (pending: redirect to `/`) | ghost URL, nothing to delete |
| "Explore the Galleries" link target | `/services` | no change | already repointed; 0 links to `/portfolio` site-wide |
| "View More Weddings" link target | `/blog/` on Full-Service, Partial, and Floral | no change | already repointed |
| Recent Features items and links | 1) "Loews Coronado Resort Wedding" → `/blog/` (no Loews post exists); 2) "Garden Wedding at Château de Bouthonvilliers" → `/2025/07/27/garden-wedding-at-chateau-de-bouthonvilliers/`; 3) "Erika & Julio's Wedding" → `/blog/erika-batiz-julio-ramirez/` | (pending: ASK about item 1) | 0 links to demo post |
| "Meet Erika & Julio Ramirez" block | Heading "Featured Wedding: Erika & Julio"; body "Timeless romance meets modern simplicity…" (element tORd4KNmO_elements_7); button "SEE THEIR WEDDING" → `/blog/erika-batiz-julio-ramirez/` | 2026-09-29: kept; role line added as a second line of the body paragraph: `A real wedding by Bella Mia: planning, floral design, decor, catering, and bar service.` Saved, unpublished | real clients; page is live (200). Box is 219×209 px; check the extra line does not crowd the button on preview |
| Links page hidden from search | title `Links`; no meta description; no robots meta; H1 "Quick Links"; buttons: Visit the Website `/`, Inquire Here `/contact`, Browse the Blog `/blog`, Our Services `/services`, The Galleries `/blog/`. Editor: Advanced Settings switch "Ask Google to ignore this page" = OFF; Custom Head HTML empty | 2026-09-29: "Ask Google to ignore this page" switched ON (Page → Advanced Settings) with a real keypress; saved, unpublished. Verify `<meta name="robots" content="noindex…">` on `/links` after publish | no `/portfolio` link |
| Home: title / meta / hide / H1 text and tag | LIVE: title `bellamiaexclusiveevents.com`; meta: none; H1 `Luxury Wedding Planning in San Diego` (already H1); H2s: Poignant Moments, MODERN WEDDINGS, Proudly featured in, Your love is art…, 3 testimonial quotes, ON THE BLOG, your love story; H3: Recent Features, SCHEDULE A CONSULTATION WITH US. EDITOR (unpublished, found 2026-09-29): Page Title `San Diego Wedding Planner \| Bella Mia Exclusive Events`; Meta `Boutique San Diego wedding planner serving La Jolla, Coronado & Carlsbad. Full-service planning, design & florals — limited dates each year, inquire now.`; Share Image `0352a5c1-9702-4f71-81d7-8035ee0d97f6.jpg` | 2026-09-29: Showit SEO Settings set to runbook title (61 chars, Showit warns at 60) and meta, saved, not yet published. Also set as Yoast homepage title/meta in WordPress (`/` is served by WordPress; verified live with cache-buster; Cloudflare cache is 10 min) | H1 done. Whichever of Showit or Yoast wins on `/` after publish, both carry the same text |
| Services: title / meta / hide / H1 | title `Wedding Planning Services \| Full-Service, Partial & Florals`; meta `Explore full-service wedding planning, partial planning & floral design from Bella Mia Exclusive Events, serving San Diego, La Jolla & Coronado couples.`; H1 `Southern California Weddings, Engagements, and Intimate Events`; H2s: Our Services, Freeze These Moments In Time, full Service planning & Design, Partial Planning, Floral designs & More | keep title+meta; H1 done. 2026-09-29: canvas "Service 3" (Floral designs & More) duplicated twice → new canvases "Service 3-2" and "Service 3-1" below it, retitled **Event Styling** and **Rental Packages** with the section 7.4 copy (same heading/paragraph layout as the other packages). Saved, unpublished | Canvases keep their auto names; rename in the layers panel if wanted. Check on preview that the duplicated section images suit the new headings |
| Full-Service: title / meta / hide / H1 | title `Full Service Wedding Planning San Diego \| Bella Mia Events`; meta `Comprehensive wedding planning and design from first vision to final dance — our full-service experience for San Diego and Southern California couples.`; H1 `Full-Service Wedding Planning in San Diego` | keep title+meta; H1 done | |
| Partial: title / meta / hide / H1 | title `Partial Wedding Planning San Diego \| Bella Mia Events`; meta `Already started planning? Our partial planning package adds expert guidance, vendor coordination & design support to your San Diego wedding.`; H1 `Partial Wedding Planning in San Diego` | 2026-09-29: title and meta set to runbook text in Showit SEO Settings, saved, unpublished. H1 unchanged | page contains "we book a limited number of weddings each year" (claim confirmed true) |
| Floral: title / meta / hide / H1 | title `Wedding Florals & Event Design San Diego \| Bella Mia Events`; meta `In-house wedding florals, styling, and event rentals — romantic arrangements and design details for San Diego weddings and celebrations.`; H1 `Wedding Floral Design in San Diego`; H2s: Floral Design & More, CATERING SERVICE, FLORAL DESIGN | 2026-09-29: title and meta set to runbook text in Showit SEO Settings; H1 text → `Wedding Floral Design, Styling & Rentals` (element GKS73xCuC_elements_0). Saved, unpublished | page lists Catering and Bar Service (Weekend Mixology & Co.), not in runbook scope |
| About: title / meta / hide / H1 / name used | title `Meet Yvanna \| San Diego Wedding Planner Since 2011`; meta `Meet Yvanna, founder of Bella Mia Exclusive Events — a San Diego wedding planner with 14+ years crafting timeless, personalized weddings across Southern California.`; H1 `Radiant WEDDINGS that stand the test of time` (element c_B-dwlsD_elements_0, tag h1); H2 `Meet YVANNA` (element dIDRqBFiN_elements_1, tag h2) + subline `Capturing love stories since 2011` (tag p); name spelled "Yvanna" throughout (3×) | 2026-09-29: title and meta set to runbook text (no year); "MEET YVANNA" tag h2 → **h1**; "RADIANT WEDDINGS…" tag h1 → **h2**; subline → `Capturing love stories since 2014` (desktop and mobile). All saved, unpublished | year confirmed 2014 |
| Contact: title / meta / hide / H1 / location line / email / phone | title `Contact Us \| Inquire About Your San Diego Wedding`; meta `Ready to start planning? Contact Bella Mia Exclusive Events for a consultation on your San Diego, La Jolla, or Coronado wedding. Limited dates available each year.`; H1 `Inquire` (element UGKsv8sw7_elements_1); address: none; email `info@BELLAMIAEXCLUSIVEEVENTS.COM`; phone: none; footer `COPYRIGHT 2026 Bella Mia Exclusive Events` | 2026-09-29: title and meta set to runbook text; H1 "Inquire" → `Contact Bella Mia` (element UGKsv8sw7_elements_1, already tag h1); form intro (states_0_elements_3) first published 09:21 with the street address, then CORRECTED the same day to `Tell us the details!` / `Mission Valley, San Diego` / `By appointment` / `619-248-0786` per the Founder's 2026-09-28 decision (no street address on the website); email element set to lowercase `info@bellamiaexclusiveevents.com` (CSS still displays it uppercase). All saved, unpublished | The paragraph UGKsv8sw7_elements_3 already carried the email and phone in the editor (unpublished before this run) |
| Erica & Patrick: title / meta / H1 | `/erica-and-patrick-sieben` → **404**; no such WordPress page either | n/a unless page exists unpublished in editor | runbook assumption was wrong |
| "exclusive connections" sentence: pages | Home only ("Poignant Moments" paragraph, element BQwqMTuh0_elements_5: "With our exclusive connections to some of the area's most elegant and luxurious hotels, we provide not just a venue, but a breathtaking setting that reflects your unique love story."). Not on About, Services, or Contact | 2026-09-29: replaced with `Experienced with San Diego's hotel and resort wedding venues.` on BOTH the Showit "Home" page and the "Home-1" blog template (they hold separate copies of the same canvases), desktop and mobile. Saved, unpublished | The Erika & Julio role line was likewise added on both Home and Home-1 |
| Selfie mirror text: pages | none found on any page | nothing to remove | verified again after publish: 0 matches |
| Est. year in hero | no "2012" or "Inc." text in any page HTML (hero lockup is not a text element in the editor either); About said 2011 | About subline now "since 2014" (live). No hero year text exists to change | if the hero lockup image carries "EST. 2012", it needs a new image |
| Site Title | Showit Site Settings → Site Name `Bella Mia Exclusive Events  ` (two trailing spaces); Custom Domain `bellamiaexclusiveevents.com`; Vanity URL `exclusive-events-by-bella-mia-inc-1.showit.site`. WordPress site name was `bellamiaexclusiveevents.com`, tagline empty | 2026-09-29: WordPress Site Title `Bella Mia Exclusive Events`, Tagline set (section 9). Showit Site Name: trailing spaces trimmed (see notes) | Site Settings tabs seen: Site Information, Custom Domain, Vanity URL, Blog, Social, Integrations, Upgrade |
| Redirects added | none: `/portfolio` 404, `/untitled-c1izt` 404, `/delete-this-demo-single-post` 404 (all served by WordPress: `x-powered-by: WP Engine`, body class `error404`) | DONE 2026-09-29 via the WordPress **Redirection** plugin (was installed, inactive; activated, tables created, group "Redirections"): `/untitled-c1izt` → `/` 301; `/delete-this-demo-single-post` → `/blog/` 301; `/portfolio` → `/blog/` 301. Verified live with curl (`x-redirect-by: redirection`); trailing-slash variants also redirect | Showit Site Settings has no Redirects tab (tabs: Site Information, Custom Domain, Vanity URL, Blog, Social, Integrations). Redirection matches the exact path; query strings are ignored by design. Live immediately, no Showit publish needed |
| Domain: primary host | non-www is primary: `https://www.` → 301 → `http://bellamiaexclusiveevents.com/` → 301 → `https://bellamiaexclusiveevents.com/`; `/sitemap.xml` → 301 → `/wp-sitemap.xml` | no change | |
| Blog: post count / SEO plugin / title | 1 post (Garden Wedding at Château de Bouthonvilliers, 2025-07-27, Uncategorized) + 4 pages (Blog, Château, Erika Batiz & Julio Ramirez, BLACK TIE PARISIAN AFFAIR CHERINE & ANDYS WEDDING); Yoast SEO 28.2 installed but **inactive**; WP Site Title `bellamiaexclusiveevents.com`, Tagline empty; blog title `Blog \| bellamiaexclusiveevents.com`, no meta description; categories: Uncategorized only | DONE 2026-09-29: WP Site Title `Bella Mia Exclusive Events`; Tagline `Real Weddings & Venue Guides from a San Diego Wedding Planner`; categories Real Weddings (id 3) and Venue Guides (id 4) created; Yoast SEO 28.2 activated; Yoast site representation = Organization "Bella Mia Exclusive Events"; Blog page (id 147) Yoast title `Real Weddings & Venue Guides \| Bella Mia Exclusive Events`, meta `Real weddings, venue guides, and planning advice from a San Diego wedding planner.` | Done via REST from the logged-in admin tab; post count unchanged; Château post still Uncategorized (not in runbook scope) |
| Published at (date/time) | | **2026-09-29 09:21 PDT** (Showit "Publish" incl. blog design; WordPress changes were live as made) | Section 10 checks run 09:23 PDT with cache-busting: all pass (see section 10 results) |
