# Ethereal Luxury Restrooms: Phase 1 read-only inventory (2026-11-12)

**Prepared by:** Rank (AI), on the Founder's Phase 1 brief. INTERNAL CEG PROJECT work. PROVISIONAL SEO RECOMMENDATION, NOT YET ATELIER POLICY.
**Asset:** `etherealluxuryrestrooms.com` (Showit, account owner shown in the editor as Yvanna Contreras).
**What was done:** read-only. Nothing in Showit was edited, saved, or published; the editor still showed "Saved" with no pending change when the session closed. No Google Business Profile, Search Console, or directory listing was touched.
**Method (VERIFIED, 2026-11-12, 08:00 to 10:30 PST):**
- Live site: headless Chromium (Playwright, 1366×900) rendered every sitemap URL and 40 legacy or guessed URLs; title, meta, robots, canonical, H1, body text, and every `<script type="application/ld+json">` were read from the rendered DOM, not from a fetch. `curl` traced redirects and status codes. Screenshots: `screenshots/phase1-2026-11-12/live/`.
- Showit editor: headless Chromium logged in with the environment's ELR credentials (names only; values never printed) and read, page by page, Page Info, SEO Settings, Advanced Settings (Custom Head HTML, "Ask Google to ignore this page"), and Site Settings. Screenshots: `screenshots/phase1-2026-11-12/editor/`.
- Google index: web `site:` searches (OBSERVED SEARCH SIGNAL, one snapshot, not ranking data, not an index count). Search Console was not opened.
- Showit platform behavior: Showit help articles "URL Redirects in Showit" (659353) and "Indexing Help" (6953593), read 2026-11-12.

## 0. Blocker status

| # | Item | Status |
|---|---|---|
| 1 | Street address | **FOUNDER CONFIRMED 2026-11-12: 8885 Rio San Diego Dr, Suite 237, San Diego, CA 92108.** Live Contact page text and the LocalBusiness schema on Home, Contact, and Service Area already use 8885 / Suite 237 / 92108 (VERIFIED). No 8886 found anywhere on the site. |
| 2 | Written OK for each "You may have seen us in" logo (Sheraton, Porsche, BRICK, Shady Canyon, Liberty Station, Stone Mountain) | **OPEN.** The strip is still live on Home. Nothing proposed until answered. |
| 3 | Current, correct pricing | **OPEN.** Live site shows 2-stall $1,150 / 3-stall $1,350 / 4-stall $1,450 / 5-stall ADA $2,150 plus delivery, in three places: Pricing Guide copy, Pricing Guide meta description, and the Product/Offer schema on `/restrooms`. Google's cached legacy pages show 4-stall $1,650 plus delivery, and purchase prices ($27,890 to $72,890; $46,580 for a 2-station 12 ft unit). Which set is current is UNKNOWN. |

## 1. Showit page list vs. sitemap

- Showit SITE panel lists **20 pages**: Ethereal Luxury Restrooms (home, slug `ethereal-luxury-restrooms`, served at `/`), About, Book Now, Restrooms, Contact, Service Area, La Jolla, Why a Trailer, Pricing Guide, Carlsbad, Encinitas, Rancho Santa Fe, Del Mar, Coronado, Chula Vista, Emergency Rentals, Construction Rentals, Corporate Events, Wedding Restrooms, Design Options. Site canvases: Footer, Featured In, Services, Contact CTA, Service Area, Menu Dark, Slideout Menu, Book Now. Blog Templates: none usable ("Your subscription does not include a blog"), so **there is no WordPress and no Yoast on this site**; all metadata lives in Showit page settings.
- `sitemap.xml` lists exactly the same **20 URLs** (no `lastmod` values). `robots.txt` is Cloudflare-managed: `Allow: /` for all, with AI-training crawlers disallowed; nothing blocks Google.
- **No legacy WordPress-era page exists in Showit.** The four URLs in the brief (`/4-stall-luxury-restrooms/`, `/book-now/`, `/portable-restrooms/`, `/product/purchaserestroom/`) and the others found below are ghosts in Google's index from the old WordPress site; the live server returns 404 for every one of them in the trailing-slash form Google indexed. The emoji-heavy copy and the old prices exist only in Google's stored copy, not on any page you can edit.
- `www` and `http` 301 to `https://etherealluxuryrestrooms.com`. `/?p=1` returns the home page with a self canonical (IGNORE FOR NOW, unchanged since October).

## 2. Per-page inventory (Table A)

Title and meta description are identical in the Showit SEO Settings panel and in the live DOM for all 20 pages (VERIFIED both sides). No page has a robots meta tag or an `X-Robots-Tag` header, and the Showit "Ask Google to ignore this page" toggle is **OFF on all 20 pages**, so all 20 are indexable. Every canonical is self-referencing (Showit generates them).

| # | URL | Showit page | Title tag (live = editor) | Meta description | H1 (live) | Canonical | Robots meta / X-Robots / Showit noindex toggle | Indexable? | JSON-LD types (all in `<head>`) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `/` | Ethereal Luxury Restrooms (Home) | Luxury Restroom Trailer Rentals San Diego \| Ethereal Luxury | San Diego's boutique luxury restroom trailer rentals for weddings, corporate events & job sites. Serving all of Southern California. Book your date today. | ORGANIC, REFINED, Designed for  Luxury | self | none / none / OFF | Yes | LocalBusiness |
| 2 | `/about` | About | About Ethereal Luxury Restrooms \| Southern California | Learn about Ethereal Luxury Restrooms, Southern California's upscale portable restroom trailer rental company for weddings, events, and job sites. | ABOUT US | self | none / none / OFF | Yes | AboutPage, Organization, BreadcrumbList |
| 3 | `/book-now` | Book Now | Book a Luxury Restroom Rental \| Ethereal Luxury Restrooms | Book your luxury portable restroom rental today. Ethereal Luxury Restrooms serves weddings, corporate events, and job sites from Thousand Oaks to Chula Vista. | INQUIRE FORM **+** INQUIRE HERE (2 H1s) | self | none / none / OFF | Yes | ContactPage, LocalBusiness, BreadcrumbList |
| 4 | `/restrooms` | Restrooms | Luxury Restroom Trailer Rentals \| Ethereal Luxury Restrooms | Browse our 2 to 5-stall luxury restroom trailers for weddings, corporate events, and job sites across Southern California. Cortessa and Standard design lines available. | RESTROOM OPTIONS | self | none / none / OFF | Yes | ItemList (4 × Product with Offer prices 1150, 1350, 1450, 2150), FAQPage (5 Q&A), BreadcrumbList |
| 5 | `/contact` | Contact | Contact Us \| Ethereal Luxury Restrooms San Diego | Contact Ethereal Luxury Restrooms for a quote on upscale portable restroom trailer rentals serving San Diego, LA, and Orange County events. | OFFICE / LOCATION | self | none / none / OFF | Yes | ContactPage, LocalBusiness, BreadcrumbList |
| 6 | `/service-area` | Service Area | Ventura to San Diego \| Ethereal Luxury Restrooms | Ethereal Luxury Restrooms serves Ventura County, LA, Orange County, and San Diego with upscale portable restroom trailers for events and job sites. | AREA WE SERVICE | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 7 | `/la-jolla` | La Jolla | La Jolla Luxury Restroom Trailer Rentals \| Ethereal Luxury | Luxury restroom trailers delivered to La Jolla for estate weddings, private events & renovations. Styled interiors, same-day availability. 619.248.0786. | LA JOLLA | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 8 | `/why-a-trailer` | Why a Trailer | Restroom Trailer vs. Porta-Potty \| Ethereal Luxury | Flushing toilets, running water, climate control, and styled interiors vs. a plastic box — why San Diego weddings and events choose luxury restroom trailers. 619.248.0786. | WHY A TRAILER? | self | none / none / OFF | Yes | FAQPage, BreadcrumbList |
| 9 | `/pricing-guide` | Pricing Guide | Restroom Trailer Rental Cost in San Diego \| Ethereal Luxury | San Diego luxury restroom trailer pricing: 2-stall $1,150, 3-stall $1,350, 4-stall $1,450, 5-stall ADA $2,150, plus delivery. Same-day may be available. 619.248.0786. | PRICING GUIDE | self | none / none / OFF | Yes | FAQPage, BreadcrumbList |
| 10 | `/carlsbad` | Carlsbad | Carlsbad Luxury Restroom Trailer Rentals \| Ethereal Luxury | Luxury restroom trailers delivered to Carlsbad for weddings, corporate events & renovations. Styled interiors, same-day availability. 619.248.0786. | CARLSBAD | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 11 | `/encinitas` | Encinitas | Encinitas Luxury Restroom Trailer Rentals \| Ethereal Luxury | Luxury restroom trailers delivered to Encinitas for garden weddings, private events & renovations. Styled interiors, same-day availability. 619.248.0786. | ENCINITAS | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 12 | `/rancho-santa-fe` | Rancho Santa Fe | Rancho Santa Fe Restroom Trailer Rentals \| Ethereal Luxury | Luxury restroom trailers delivered to Rancho Santa Fe for estate weddings, private events & renovations. Styled interiors, same-day availability. 619.248.0786. | RANCHO SANTA FE | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 13 | `/del-mar` | Del Mar | Del Mar Luxury Restroom Trailer Rentals \| Ethereal Luxury | Luxury restroom trailers delivered to Del Mar for estate weddings, race-season events & renovations. Styled interiors, same-day availability. 619.248.0786. | DEL MAR | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 14 | `/coronado` | Coronado | Coronado Luxury Restroom Trailer Rentals \| Ethereal Luxury | Luxury restroom trailers delivered to Coronado for beachfront weddings, private events & renovations. Styled interiors, same-day availability. 619.248.0786. | CORONADO | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 15 | `/chula-vista` | Chula Vista | Chula Vista Restroom Trailer Rentals \| Ethereal Luxury | Luxury restroom trailers delivered to Chula Vista for weddings, quinceañeras, corporate events & renovations. Styled interiors, same-day availability. 619.248.0786. | CHULA VISTA | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 16 | `/emergency-rentals` | Emergency Rentals | Emergency Restroom Rentals \| Ethereal Luxury Restrooms | Emergency restroom trailer rentals across Southern California for facility shutdowns, water and fire damage, and unexpected closures. Call 619.248.0786. | EMERGENCY RESTROOMS | self | none / none / OFF | Yes | Service |
| 17 | `/construction-rentals` | Construction Rentals | Construction Restroom & Solar Unit Rentals San Diego \| ELR | Durable restroom trailers & solar-powered single units for construction sites across San Diego & Southern California. Weekly & monthly rates available. | CONSTRUCTION RENTALS | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 18 | `/corporate-events` | Corporate Events | Corporate Event Restroom Rentals San Diego \| Ethereal Luxury | Executive-level luxury restroom trailers for corporate events, galas & activations across San Diego & Southern California. Polished, punctual & fully serviced. | CORPORATE EVENTS | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 19 | `/wedding-restrooms` | Wedding Restrooms | Wedding Restroom Trailer Rentals San Diego \| Ethereal Luxury | Luxury wedding restroom trailers for San Diego & Southern California weddings. Elegant, climate-controlled & styled to match your venue. Reserve your date. | WEDDING RESTROOMS | self | none / none / OFF | Yes | Service, BreadcrumbList |
| 20 | `/design-options` | Design Options | Cortessa & Standard Styling \| Ethereal Luxury Restrooms | Choose between our Cortessa and Standard design lines — from marble-inspired finishes and statement lighting to clean, classic styling for your restroom rental. | DESIGN OPTIONS | self | none / none / OFF | Yes | WebPage, BreadcrumbList |

Notes on Table A (observations only, no drafts yet):
- **Home title mismatch inside the page.** Showit Page Title is "Luxury Restroom Trailer Rentals San Diego | Ethereal Luxury", but the page's Custom Head HTML carries `og:title` "Luxury Portable Restroom Rentals | Ethereal Luxury Restrooms". Google's listing for the home page currently shows the og:title wording ("Luxury Portable Restroom Rentals"), so the two should agree in Phase 2.
- **H1s.** Home H1 is "ORGANIC, REFINED, Designed for Luxury" (brand voice, no service or area; the service line sits in a paragraph under it). Book Now has two H1s ("INQUIRE FORM" and "INQUIRE HERE"). Contact's H1 is "OFFICE LOCATION". Restrooms H2s still include template placeholders ("Project Title Here" twice, "Concept Development", "Procurement & Coordination").
- **Service-area wording** differs across pages: "Serving all of Southern California" (Home meta), "Thousand Oaks to Chula Vista" (Book Now meta), "Ventura County, LA, Orange County, and San Diego" (Service Area), "San Diego, LA, and Orange County" (Contact meta), and schema `areaServed` four counties. One sentence has not been chosen yet (Elevate decision, carried from the October audit).
- Word counts are low everywhere (59 words on Book Now, 87 on Restrooms, 107 to 111 on each city page).

## 3. Legacy URLs (Table B)

Six old WordPress URLs are still in Google's index (OBSERVED SEARCH SIGNAL, 2026-11-12, three `site:` searches; Google's snippets say the pages are about 1,200 days old). All six 404 today in the exact form Google holds (with trailing slash). Showit already has six redirect entries, but they match only the no-slash form, and Showit's own help article says the native redirect tool does not support trailing slashes.

| Legacy URL | Live status today | Showit redirect entry? | In Google index? (OBSERVED SEARCH SIGNAL, 2026-11-12, web search `site:` queries) | What Google still shows |
|---|---|---|---|---|
| `/4-stall-luxury-restrooms/` | 404 | no | **Yes** | FOUR STALL; rental $1,650 + delivery (Google snippet) |
| `/book-now/` | 404 | no | **Yes** | Book Now (old WP page; slash variant of live /book-now) |
| `/portable-restrooms/` | 404 | yes: `portable-restrooms` → `restrooms` (matches only the no-slash form) | **Yes** | PORTABLE RESTROOMS (old WP page) |
| `/product/purchaserestroom/` | 404 | yes: `product/purchaserestroom` → `restrooms` (matches only the no-slash form) | **Yes** | 2 STATION 12 ft PRIVATE PORTABLE RESTROOM, $46,580 for purchase (Google snippet) |
| `/looking-to-purchase/` | 404 | no | **Yes** | LOOKING TO PURCHASE; models $27,890 to $72,890 (Google snippet) |
| `/an-elegant-stylish-theme/` | 404 | yes: `an-elegant-stylish-theme` → `/` (matches only the no-slash form) | **Yes** | An Elegant & Stylish Theme (WordPress template demo page) |
| `/home/` | 404 | no | not seen | old WP home slug (from the 2026-10-08 audit) |
| `/product/` | 404 | yes: `product` → `restrooms` (matches only the no-slash form) | not seen | WooCommerce product archive |
| `/4-stall-luxury-restrooms` | 404 | no | not seen | no-slash variant |
| `/portable-restrooms` | 200, served as `/restrooms` (301) | yes: `portable-restrooms` → `restrooms` (matches only the no-slash form) | not seen | no-slash variant |
| `/product/purchaserestroom` | 200, served as `/restrooms` (301) | yes: `product/purchaserestroom` → `restrooms` (matches only the no-slash form) | not seen | no-slash variant |
| `/an-elegant-stylish-theme` | 301 → `/` | yes: `an-elegant-stylish-theme` → `/` (matches only the no-slash form) | not seen | no-slash variant |
| `/looking-to-purchase` | 404 | no | not seen | no-slash variant |
| `/links` | 404 | no | not seen | link-in-bio check (Bella Mia pattern) |

Existing Showit redirect entries (read from Site Settings → Custom Domain → gear → Domain Configuration → Redirects; screenshot `editor/site-domain-gear-2.png`):

| Old Page | Redirected To |
|---|---|
| `an-elegant-stylish-theme` | `/` |
| `portable-restrooms` | `restrooms` |
| `product` | `restrooms` |
| `product/3-stall-1-urinal-luxury-restroom` | `restrooms` |
| `product/3-station-14-private-door-portable-restroom` | `restrooms` |
| `product/purchaserestroom` | `restrooms` |

VERIFIED with curl: every entry works for the no-slash URL (301 to the target) and fails (404) once a trailing slash is added. Not in the list: `4-stall-luxury-restrooms`, `looking-to-purchase`, `book-now/` (the slash variant of a live page cannot be entered in this tool), `home`.

## 4. Structured data: where it renders

**All JSON-LD on all 20 pages is in `<head>` only.** None of it renders as visible text: the rendered body text of every page was searched for `@context`, `@type`, `schema.org`, and `@graph` and none appeared (VERIFIED in the live DOM, desktop viewport). The editor shows why: each page's schema sits in Advanced Settings → Custom Head HTML, which Showit injects into `<head>` (screenshots `editor/head-HOME.png`, `editor/head-Contact.png`, `editor/head-Service_Area.png`, `editor/head-Wedding_Restrooms.png`; live page screenshots in `live/`). There is no site-wide schema: Site Settings → Integrations holds only Google Analytics, Google Tag Manager, Meta Pixel, BDOW, Hawthorne CSS, Lenis Scroll Library, and a "Custom Code 3" slot (contents not opened).

All blocks parse as valid JSON (checked locally; Google's Rich Results Test is a Phase 2 step, after the schema is redrafted).

What the schema currently claims (PUBLIC CLAIM where the Fact Register has not confirmed it):

| Page(s) | Type | NAP and claims in the block |
|---|---|---|
| Home | LocalBusiness | name Ethereal Luxury Restrooms; `+1-619-248-0786`; `etherealluxuryrestrooms@gmail.com`; 8885 Rio San Diego Dr. Suite 237, San Diego, CA 92108; `areaServed` Ventura, Los Angeles, Orange, San Diego counties; `sameAs` Instagram; `foundingDate` 2021; `image` a Showit-hosted trailer photo |
| Contact | ContactPage → mainEntity LocalBusiness | same name, phone, email, and 8885 address |
| Book Now | ContactPage → mainEntity LocalBusiness | name, phone, email; no address |
| Service Area | Service → provider LocalBusiness | name, phone, 8885 address; `areaServed` four counties as AdministrativeArea |
| 7 city pages | Service → provider LocalBusiness | name, phone; no address; `areaServed` one Place each (e.g. "La Jolla, San Diego, CA") |
| Emergency, Construction, Corporate, Wedding | Service → provider LocalBusiness | name, phone; no address; `areaServed` four counties |
| Restrooms | ItemList of 4 Product (2-, 3-, 4-, 5-stall) with Offer prices 1150 / 1350 / 1450 / 2150; FAQPage (5 Q&A) | prices are the blocker-3 figures |
| Why a Trailer, Pricing Guide | FAQPage (3 and 4 Q&A) | Pricing Guide FAQ repeats the prices |
| About | AboutPage → Organization | address present (8885) |
| Design Options | WebPage + WebSite + Service | no NAP |
| Every page except Home and Emergency | BreadcrumbList | |

## 5. NAP as it appears today (visible text, VERIFIED in live DOM)

| Location | Name | Address | Phone |
|---|---|---|---|
| Header / menu (all pages) | ETHEREAL LUXURY RESTROOMS | none | none (the hero photo on Home shows "T: 619.248.0786" inside the image only) |
| Footer (all pages) | Ethereal Luxury Restrooms | none | "T: 619-248-0786", `tel:6192480786` |
| Contact page | Ethereal Luxury Restrooms | 8885 Rio San Diego Dr. Suite 237 (city/state/ZIP in the schema; visible lines to be re-read in Phase 2) | 619-248-0786, `tel:6192480786` |
| Service and city pages (body/CTA) | Ethereal Luxury Restrooms | none | 619.248.0786 (four pages use `href="tel:619.248.0786"` with dots, which some dialers reject) |
| Meta descriptions (10 pages) | | | 619.248.0786 |
| Schema | Ethereal Luxury Restrooms | 8885 Rio San Diego Dr. Suite 237, San Diego, CA 92108 | +1-619-248-0786 |

Format is inconsistent (dots vs. hyphens) but the digits are the same everywhere. Phase 2 item 4 will make the format identical.

## 6. Where the Phase 2 controls live in this Showit UI (VERIFIED by screenshot)

- **Redirects:** SITE tab → Site Settings → Site Information → Custom Domain → gear icon next to "DOMAIN: etherealluxuryrestrooms.com" → "Domain Configuration" dialog → REDIRECTS tab: "Old Page" slug field, "Redirected To" field, ADD button, list below. Requires a publish to go live. Per Showit's help article: no trailing-slash or wildcard support; a Showit page with the same slug takes precedence over a redirect (so `/book-now/` cannot be fixed here).
- **Hide from search:** page selected → right panel → ADVANCED SETTINGS → toggle "Ask Google to ignore this page" (bottom of the panel). Currently OFF on all 20 pages.
- **Schema / head code:** page → ADVANCED SETTINGS → "Custom Head HTML" box (opens an "Update Custom Head HTML" code editor with CANCEL / SAVE). This is the only place the JSON-LD lives.
- **Titles and metas:** page → SEO SETTINGS → Page Title (60-character counter) and Meta Description; Share Image below.
- **Book Now form:** the live page embeds a HoneyBook contact form (October audit); the "How did you hear about us?" field therefore has to be added in HoneyBook, not in Showit. Not opened in this phase.

## 7. Evidence files

- `screenshots/phase1-2026-11-12/live/` : desktop fold of all 20 live pages, plus the 404 pages for `/4-stall-luxury-restrooms/`, `/an-elegant-stylish-theme/`, `/links`, and the redirected `/portable-restrooms` and `/product/purchaserestroom`.
- `screenshots/phase1-2026-11-12/editor/` : `page-<name>-seo.png` (SEO Settings panel, 20 pages), `adv-<name>.png` (Advanced Settings with the noindex toggle, 20 pages), `head-*.png` (Custom Head HTML editor for Home, Contact, Service Area, Wedding Restrooms), `site-domain-gear-2.png` (redirect list), `site-settings-Site_Information.png`, `site-integrations.png`.

## 8. Stop point

Phase 1 ends here for Founder review. No disposition, redirect, schema, H1, or copy draft has been written yet. Phase 2 drafts start only after the table is approved, and items 2 and 3 above stay blocked until answered.
