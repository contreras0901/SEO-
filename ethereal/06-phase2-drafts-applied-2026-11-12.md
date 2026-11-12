# Ethereal Luxury Restrooms: Phase 2 drafts, applied to the Showit draft (2026-11-12)

**Prepared by:** Rank (AI). INTERNAL CEG PROJECT work. PROVISIONAL SEO RECOMMENDATION, NOT YET ATELIER POLICY.
**Status: DRAFT IN THE SHOWIT EDITOR, NOT PUBLISHED.** Every change below sits in the unpublished Showit draft of etherealluxuryrestrooms.com. The live site is unchanged (last publish 2026-10-22). Nothing goes live until the Founder says "approved" for this batch and PUBLISH is clicked. Rollback path: every before-value is recorded in the table in section 6 and in `ethereal/phase2-head-html/*.before.html`; any item can be reverted in the editor before publishing, or the whole draft can be discarded by republishing nothing.
**Preview:** the Showit preview build at `https://elr-group-inc-3.showitpreview.com` now carries the full draft. All 20 pages were crawled there in headless Chromium (desktop 1366 px and iPhone 390 px) after the last edit; screenshots are in `screenshots/phase2-2026-11-12/preview/`.

## 0. The honest frame

No one can guarantee a top Google ranking, a map-pack spot, or a lead count, and this document does not. What it does is the controllable work: every commercial page now says, in its title, H1, copy and structured data, what Ethereal sells and where, in the words buyers search with; the dead template content on the core product page is gone; the old WordPress URLs that still sit in Google's index are redirected; and the name, address and phone are identical everywhere. The result is measured, not promised: Search Console impressions and clicks per page, calls and form inquiries, and "How did you hear about us?" answers (that field already exists on the HoneyBook form, see section 5).

## 1. Search intent this batch targets (OBSERVED SEARCH SIGNAL, 2026-11-12, three web searches; one snapshot, not rankings)

| Query family | Intent | What the results show today | Page that now answers it |
|---|---|---|---|
| luxury restroom trailer rental San Diego | TRANSACTIONAL / LOCAL | vendor home pages and city pages (RSS Rentals, Aloe Suites, National Construction Rentals, Golden Coast, San Diego Restroom Trailers, a directory list); Ethereal's home page appeared in this snapshot | Home, Restrooms |
| wedding restroom trailer San Diego | TRANSACTIONAL | vendor wedding pages, RSS Rentals twice | Wedding Restrooms |
| restroom trailer rental Los Angeles (wedding) | TRANSACTIONAL | LA vendors (Platinum Pro Portables, All Site, Major Event Trailers, HDR, LA Luxury Restrooms, One Stop Leasing); no Ethereal page appeared | Service Area, Home (LA named in title and copy). INFERENCE: without an LA-specific page and LA-area proof (venues served, photos), LA visibility will stay weak; that is a later decision with Elevate, not a bulk city-page build. |
| restroom trailer cost / pricing San Diego | COMMERCIAL INVESTIGATION | a directory FAQ quoting $500 to $1,800 per day | Pricing Guide (prices unchanged pending blocker 3) |
| [city] restroom trailer (La Jolla, Carlsbad, Encinitas, Rancho Santa Fe, Del Mar, Coronado, Chula Vista) | LOCAL | not searched individually this session | the seven city pages (H1s now name the service) |

## 2. What was changed, page by page (all in the draft)

**Titles and meta descriptions (Showit SEO Settings) and matching og tags plus schema (Custom Head HTML):**

| Page | New title (chars) | New meta description |
|---|---|---|
| Home | Luxury Restroom Trailer Rentals San Diego & LA \| Ethereal (56) | Boutique luxury restroom trailers for weddings, events & job sites. Based in San Diego, delivered across Southern California to Los Angeles. 619.248.0786. |
| Restrooms | Luxury Restroom Trailers, 2 to 5 Stalls \| Ethereal San Diego (58) | Compare our 2-, 3-, 4- and 5-stall ADA luxury restroom trailers: flushing toilets, running water, climate control, styled interiors. San Diego to Los Angeles. |
| Service Area | Service Area: San Diego to Los Angeles \| Ethereal Luxury (56) | Luxury restroom trailers delivered across San Diego County, North County, Orange County, Los Angeles & Ventura. Based in San Diego. 619.248.0786. |
| Contact | Contact Ethereal Luxury Restrooms \| San Diego 619.248.0786 (58) | Call or text 619.248.0786, email etherealluxuryrestrooms@gmail.com, or visit by appointment at 8885 Rio San Diego Dr, Suite 237, San Diego, CA 92108. |
| Book Now | Book a Luxury Restroom Trailer \| San Diego & SoCal \| Ethereal (60) | Request a quote for a luxury restroom trailer. Share your date, venue and guest count; we recommend the unit, quote all-in and handle delivery. 619.248.0786. |

The other 15 titles and metas were already intent-aligned (Phase 1 table) and were left alone.

**H1s (one per page, on the element the design already uses as the heading):**

| Page | Before | After |
|---|---|---|
| Home | ORGANIC, REFINED, Designed for Luxury | LUXURY RESTROOM TRAILER RENTALS. The brand line moved into the intro paragraph, which now opens "San Diego to Los Angeles. Organic, refined, designed for luxury: …" and closes with the service-area line "Based in San Diego, we deliver across San Diego County, Orange County, Los Angeles and Ventura County." (A longer H1 that named the area was tried and overlapped the paragraph on phones; screenshot kept.) |
| Restrooms | RESTROOM OPTIONS | RESTROOM TRAILERS (the hero style fits about 17 characters on one line; the title tag carries "2 to 5 Stalls") |
| Book Now | two H1s: INQUIRE FORM (hidden under the hero edge) and INQUIRE HERE | one H1: BOOK A LUXURY RESTROOM TRAILER; the hidden hero text demoted to a paragraph tag |
| Contact | OFFICE LOCATION | CONTACT US (the "Location" subheading, address and hours stay) |
| Service Area | AREA WE SERVICE | SAN DIEGO TO LA (one line; longer versions overlapped the paragraph) |
| La Jolla, Carlsbad, Encinitas, Rancho Santa Fe, Del Mar, Coronado, Chula Vista | the city name alone | LUXURY RESTROOM TRAILERS IN [CITY] |
| Wedding Restrooms | WEDDING RESTROOMS | WEDDING RESTROOM TRAILER RENTALS |
| Corporate Events | CORPORATE EVENTS | CORPORATE EVENT RESTROOM TRAILERS |
| Construction Rentals | CONSTRUCTION RENTALS | CONSTRUCTION SITE RESTROOM RENTALS |
| Emergency Rentals | EMERGENCY RESTROOMS | EMERGENCY RESTROOM TRAILER RENTALS |
| Pricing Guide | PRICING GUIDE | RESTROOM TRAILER PRICING, SAN DIEGO |
| Design Options | DESIGN OPTIONS (hidden under the hero edge) plus an H2 | H1 is now the intro heading: CORTESSA & STANDARD DESIGN LINES; the hidden hero text demoted to a paragraph tag |
| About, Why a Trailer | ABOUT US / WHY A TRAILER? | unchanged (About was tried longer and overflowed the hero style) |

**Restrooms page (the "Restroom Units" nav page), template leftovers replaced:**
- "OUR PROCESS" with interior-design steps "Concept Development / Detailed Design / Procurement & Coordination / Installation & Styling" is now "OUR TRAILERS" with four cards: Two-Stall Trailer, Three-Stall Trailer, Four-Stall Trailer, Five-Stall ADA Trailer, each with the suite layout, dimensions and tank sizes already published in the page's Product schema. No prices added (blocker 3). The first step view ("Initial Consultation", Showit canvas view 1) could not be reached by the editor driver; it is not rendered on the live page either (the live DOM showed only steps 2 to 5), so it is left as is and should be checked in the editor by hand.
- The "Portfolio" canvas (three "Project Title Here" cards whose "VIEW PROJECT" buttons linked to a 404 page `/case-study-duplicate`) is hidden on desktop and mobile (not deleted; canvas menu, Visible On Desktop / Visible On Mobile off).

**Service Area page:** new lead-in paragraph in place of the old one: "Based in Mission Valley, we serve San Diego County first — Chula Vista, Coronado and La Jolla up the coast to Del Mar, Rancho Santa Fe, Encinitas, Carlsbad and North County — and all of Southern California from Thousand Oaks to Chula Vista, including Los Angeles, Orange County and Ventura County." No new city pages.

**NAP (item 4):** the footer phone line is now "T: 619.248.0786" on every page (was 619-248-0786); the Contact page number is "619.248.0786" (was "619. 248. 0786"), with its tap-to-call and mailto links intact; the four hidden phone links on the service pages that carried `tel:619.248.0786` now carry `tel:6192480786`; the schema on every touched page carries name, `+1-619-248-0786`, and 8885 Rio San Diego Dr, Suite 237, San Diego, CA 92108 (FOUNDER CONFIRMED 2026-11-12). Visible text, schema and links now all use the same digits; visible format is 619.248.0786 everywhere.

**Schema (item 3):** Home, Contact, Book Now, Service Area and Restrooms head code rewritten (`ethereal/phase2-head-html/`, with the live versions saved as `*.before.html`). One LocalBusiness object (`@id` …/#business) with the confirmed address, phone, email, Instagram `sameAs`, and `areaServed` San Diego, Orange, Los Angeles and Ventura counties, reused as `mainEntity` on Contact and Book Now and as `provider` on Service Area. og:title and og:description now equal each page's title and meta (the Home og:title mismatch from Phase 1 is gone). Existing BreadcrumbList, FAQPage and Product blocks kept. All blocks parse as valid JSON on the preview. Address is kept visible, so this stays a business with a public office address rather than a hidden-address service-area business; if you prefer to hide it, say so and the schema and Business Profile approach change together. Google's Rich Results Test can only read a public URL, so it runs after publish (or on the preview URL now).

**Legacy URLs (item 2), redirects added in Site Settings → Custom Domain → gear → Redirects:**

| Old page | Redirected to | Note |
|---|---|---|
| `4-stall-luxury-restrooms` | `restrooms` | new |
| `looking-to-purchase` | `restrooms` | new |
| `home` | `/` | new |
| the six existing entries | unchanged | |

Disposition per indexed legacy URL: `/4-stall-luxury-restrooms/`, `/looking-to-purchase/`, `/product/purchaserestroom/`, `/portable-restrooms/`, `/an-elegant-stylish-theme/`: redirect (above). `/book-now/`: cannot be redirected in Showit because the page slug exists; leave, it 404s and Google will drop it. Limit that remains: Showit's tool does not match the trailing-slash form Google indexed, so those exact URLs still 404 until either (a) Showit matches them (test after publish), (b) the domain's DNS moves to the Founder's own Cloudflare account where a redirect rule can strip the slash, or (c) Search Console "Remove outdated content" is used for the six URLs. Recommendation: (c) right after publish, (b) only if (a) fails and the Founder wants it.

**Menu label:** the top-nav label "Design Options" was briefly overwritten by the driver while editing the Design Options H1 and has been restored to "Design Options" (verified on the preview nav on three pages).

## 3. Items not implemented, and why

| Phase 2 item | Status |
|---|---|
| Reviews / testimonials block on Home | Not built: no real reviews supplied. Send the review text, reviewer first name, event type and date, and where it was posted; it goes in as a plain styled block (no third-party widget) in the next batch. |
| "You may have seen us in" logo strip | Untouched: blocker 2 (written OK per logo) still open. |
| Prices on Pricing Guide, its meta, and the Product schema | Untouched: blocker 3. The site still says $1,150 / $1,350 / $1,450 / $2,150 plus delivery; Google's cached old page says $1,650 for a 4-stall. Confirm the current list and it changes in all three places in one edit. |
| Book Now form "How did you hear about us?" | Already on the embedded HoneyBook form (fields seen in the editor: name, email, phone, event date, venue address, unit of interest, **How did you hear about us?**, color palette, restroom attendant). Whether submissions email you with that field is a HoneyBook setting on your side; open HoneyBook → the form → notifications and confirm the field is included. Rank has no HoneyBook access. |
| Per-city pages, LA pages | Not created (out of scope, and a doorway-page risk without real local content). |
| Google Business Profile, Search Console, directories | Yours; not touched. After publish: request indexing for the 20 URLs and submit the six legacy URLs for removal. |

## 4. Verification on the preview build (VERIFIED 2026-11-12, headless Chromium, all 20 pages)

| Check | Result |
|---|---|
| Exactly one H1 per page, all new values present | 20 of 20 pass |
| Titles and metas on the five rewritten pages | pass |
| JSON-LD parses, in `<head>` only, no visible schema text | 20 of 20 pass |
| "Project Title Here" / "Concept Development" gone from Restrooms | pass; four trailer cards render |
| Phone text 619.248.0786 everywhere, no dotted `tel:` links | pass (every `tel:` is `tel:6192480786`) |
| Footer and nav link labels unchanged except the restored "Design Options" | pass |
| Layout at 1366 px and 390 px on Home, Restrooms, Service Area, Book Now, Contact, Wedding, La Jolla | pass after the H1 length corrections; screenshots in `screenshots/phase2-2026-11-12/preview/` |
| Redirect list shows 9 entries | pass (`screenshots/phase2-2026-11-12/editor/x04-redirects.png`) |

Known cosmetic carry-overs (pre-existing, not introduced here): on Book Now and Design Options the hero's last text line still peeks out under the hero edge (it was the old hidden H1; now a paragraph). The Restrooms page keeps its large blank gap under the hero photo (template layout).

## 5. After "approved": the publish and verification plan

1. Click PUBLISH once; wait for the "Your site has been published" dialog (the only confirmation that counts).
2. In a cookie-free browser, inspect the live DOM (not a fetch) for: the 20 H1s; the five titles and metas; `tel:` links; the Restrooms trailer cards; the hidden Portfolio canvas; the redirects (`/4-stall-luxury-restrooms`, `/looking-to-purchase`, `/home`, each with and without the trailing slash).
3. Run Google's Rich Results Test on `/`, `/contact`, `/service-area`, `/restrooms`.
4. Search Console: request indexing for the changed pages; submit the six legacy URLs under Removals; note the date in the change log (baseline: Search Console clicks and impressions for the 28 days before publish, captured by the Founder).
5. Re-check anything the CDN has not propagated after one hour.

## 6. Full change log (every editor action, before → after, from the driver's log)

| Page | Change | Before | After |
|---|---|---|---|
entries: 64
| Contact | phone text format | Yvanna Contreras 619. 248. 0786 etherealluxuryrestrooms@gmail.com  | Yvanna Contreras 619.248.0786 etherealluxuryrestrooms@gmail.com  |
| Contact | custom head html | see head/contact.before.html | <meta property="og:title" content="Contact Ethereal Luxury Restrooms | San Diego 619.248.0786"> <meta property |
| Contact | meta | Contact Ethereal Luxury Restrooms for a quote on upscale portable restroom trailer rentals serving San Diego,  | Call or text 619.248.0786, email etherealluxuryrestrooms@gmail.com, or visit by appointment at 8885 Rio San Di |
| Home | title | Luxury Restroom Trailer Rentals San Diego | Ethereal Luxury | Luxury Restroom Trailer Rentals San Diego & LA | Ethereal |
| Home | meta | San Diego's boutique luxury restroom trailer rentals for weddings, corporate events & job sites. Serving all o | Boutique luxury restroom trailers for weddings, events & job sites. Based in San Diego, delivered across South |
| Home | custom head html |  | <meta property="og:title" content="Luxury Restroom Trailer Rentals San Diego &amp; LA | Ethereal"> <meta prope |
| Book Now | title | Book a Luxury Restroom Rental | Ethereal Luxury Restrooms | Book a Luxury Restroom Trailer | San Diego & SoCal | Ethereal |
| Book Now | meta | Book your luxury portable restroom rental today. Ethereal Luxury Restrooms serves weddings, corporate events,  | Request a quote for a luxury restroom trailer. Share your date, venue and guest count; we recommend the unit,  |
| Book Now | custom head html |  | <meta property="og:title" content="Book a Luxury Restroom Trailer | San Diego &amp; SoCal | Ethereal"> <meta p |
| Restrooms | title | Luxury Restroom Trailer Rentals | Ethereal Luxury Restrooms | Luxury Restroom Trailers, 2 to 5 Stalls | Ethereal San Diego |
| Restrooms | meta | Browse our 2 to 5-stall luxury restroom trailers for weddings, corporate events, and job sites across Southern | Compare our 2-, 3-, 4- and 5-stall ADA luxury restroom trailers: flushing toilets, running water, climate cont |
| Restrooms | custom head html |  | <meta property="og:title" content="Luxury Restroom Trailers, 2 to 5 Stalls | Ethereal San Diego"> <meta proper |
| Service Area | title | Ventura to San Diego | Ethereal Luxury Restrooms | Service Area: San Diego to Los Angeles | Ethereal Luxury |
| Service Area | meta | Ethereal Luxury Restrooms serves Ventura County, LA, Orange County, and San Diego with upscale portable restro | Luxury restroom trailers delivered across San Diego County, North County, Orange County, Los Angeles & Ventura |
| Service Area | custom head html |  | <meta property="og:title" content="Service Area: San Diego to Los Angeles | Ethereal Luxury"> <meta property=" |
| Home | text | ORGANIC, REFINED, DESIGNED FOR LUXURY | LUXURY RESTROOM TRAILER RENTALS, SAN DIEGO TO LOS ANGELES |
| Home | text | Luxury restroom trailer rentals in San Diego & Southern California — a warm, aesthetic approach to portable re | Organic, refined, designed for luxury. Boutique restroom trailer rentals for weddings, corporate events and jo |
| Book Now | tag |  | h2 |
| Restrooms | text | RESTROOM OPTIONS | LUXURY RESTROOM TRAILERS: 2 TO 5 STALLS |
| Service Area | text | AREA WE SERVICE  | SERVING SAN DIEGO TO LOS ANGELES |
| Service Area | text | We proudly serve all of Southern California, from Thousand Oaks down to Chula Vista — covering events and job  | We proudly serve all of Southern California, from Thousand Oaks down to Chula Vista — covering events and job  |
| La Jolla | text | LA JOLLA | LUXURY RESTROOM TRAILERS IN LA JOLLA |
| Carlsbad | text | CARLSBAD | LUXURY RESTROOM TRAILERS IN CARLSBAD |
| Encinitas | text | ENCINITAS | LUXURY RESTROOM TRAILERS IN ENCINITAS |
| Rancho Santa Fe | text | RANCHO SANTA FE | LUXURY RESTROOM TRAILERS IN RANCHO SANTA FE |
| Restrooms | text | OUR PROCESS | OUR TRAILERS |
| Service Area | text-sub | T: 619-248-0786 | T: 619.248.0786 |
| Del Mar | text | DEL MAR | LUXURY RESTROOM TRAILERS IN DEL MAR |
| Coronado | text | CORONADO | LUXURY RESTROOM TRAILERS IN CORONADO |
| Chula Vista | text | CHULA VISTA | LUXURY RESTROOM TRAILERS IN CHULA VISTA |
| Wedding Restrooms | text | WEDDING RESTROOMS | WEDDING RESTROOM TRAILER RENTALS |
| Corporate Events | text | CORPORATE EVENTS | CORPORATE EVENT RESTROOM TRAILERS |
| Construction Rentals | text | CONSTRUCTION RENTALS | CONSTRUCTION SITE RESTROOM RENTALS |
| Emergency Rentals | text | EMERGENCY RESTROOMS | EMERGENCY RESTROOM TRAILER RENTALS |
| Pricing Guide | text | PRICING GUIDE | RESTROOM TRAILER PRICING, SAN DIEGO |
| About | text | ABOUT US | ABOUT ETHEREAL LUXURY RESTROOMS |
| Restrooms | text (Process view 2) | CONCEPT DEVELOPMENT | TWO-STALL TRAILER |
| Restrooms | text (Process view 2) | Here’s where your vision begins to take shape. We develop a cohesive concept rooted in warm textures, refined  | A women’s suite and a men’s suite with separate entrances, vanities, flushing toilets, a urinal and LED lighti |
| Restrooms | text (Process view 3) | DETAILED DESIGN | THREE-STALL TRAILER |
| Restrooms | text (Process view 3) | With a clear direction, we refine every detail. From finishes and fixtures to furnishings, lighting, and millw | Women’s, men’s and combo suites with separate entrances, vanities, flushing toilets, a urinal and LED lighting |
| Restrooms | text (Process view 4) | PROCUREMENT & COORDINATION | FOUR-STALL TRAILER |
| Restrooms | text (Process view 4) | Once approved, we manage the behind-the-scenes work that keeps the project moving. That includes sourcing, ord | Two women’s suites and two men’s suites with separate entrances, vanities and LED lighting. 14 ft long and 10  |
| Restrooms | text (Process view 5) | INSTALLATION & STYLING | FIVE-STALL ADA TRAILER |
| Restrooms | text (Process view 5) | This is the moment everything comes together. We oversee installation, place furnishings, and style the finish | Two women’s suites, two men’s suites and one ADA-compliant private suite with ramp access. 24 ft long includin |
| Book Now | tag |  | h1 |
| Book Now | text | INQUIRE HERE | BOOK A LUXURY RESTROOM TRAILER |
| Design Options | tag |  | h1 |
| Design Options | text | MODERN DESIGN GUIDANCE WITH A FLEXIBLE, APPROACHABLE PROCESS  | CORTESSA & STANDARD DESIGN LINES |
| Site Settings > Custom Domain > Redirects | redirects added | an-elegant-stylish-theme | / | portable-restrooms | restrooms | product | restrooms | product/3-stall-1-urinal | home | / | looking-to-purchase | restrooms | 4-stall-luxury-restrooms | restrooms | an-elegant-stylish-theme | |
| Book Now | tag (via list) |  | p |
| Design Options | tag (via list) |  | p |
| Restrooms | Portfolio canvas visibility | [{"t":"Visible On Desktop","checked":true,"hostChecked":null},{"t":"Visible On Desktop","checked":true,"hostCh | [] |
| Service Area | text (H1 repair) | (paragraph text typed into H1 by mistake) | SERVING SAN DIEGO TO LOS ANGELES |
| Service Area | text (lead-in paragraph) | We proudly serve all of Southern California, from Thousand Oaks down to Chula Vista — covering events and job  | San Diego County and North County first: based in Mission Valley, we deliver sty |
| Wedding Restrooms | click action phone target (dotted) on shape | 619.248.0786 | 6192480786 |
| Corporate Events | click action phone target (dotted) on shape | 619.248.0786 | 6192480786 |
| Construction Rentals | click action phone target (dotted) on shape | 619.248.0786 | 6192480786 |
| Emergency Rentals | click action phone target (dotted) on shape | 619.248.0786 | 6192480786 |
| Home | H1 shortened for mobile fit | LUXURY RESTROOM TRAILER RENTALS, SAN DIEGO TO LOS ANGELES | LUXURY RESTROOM TRAILER RENTALS |
| Home | intro paragraph (adds area line) |  | San Diego to Los Angeles. Organic, refined, designed for luxury: boutique restroom trailer |
| About | H1 reverted to fit hero style | ABOUT ETHEREAL LUXURY RESTROOMS | ABOUT US |
| Restrooms | H1 shortened to fit hero style | LUXURY RESTROOM TRAILERS: 2 TO 5 STALLS | RESTROOM TRAILERS |
| Service Area | H1 shortened to 2 lines | SERVING SAN DIEGO TO LOS ANGELES | SAN DIEGO TO LOS ANGELES |
| Service Area | lead-in paragraph shortened to fit layout |  | Based in Mission Valley, we serve San Diego County first — Chula Vista, Coronado and La Jo |
