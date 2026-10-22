# Ethereal Luxury Restrooms: website change log

**Asset:** `etherealluxuryrestrooms.com` (Showit-hosted, VERIFIED 2026-10-21: response header `x-showit: hosted`).
**Rule:** one row per live change, with the before and after values, who made it, and the publish time. Effects in Search Console or inquiries are read against this log; correlation is not causation.

## 2026-10-21 (PDT): session to apply E1, E2, E3a, E4. Result: BLOCKED, nothing changed, nothing published

**Who:** Rank (AI), authorized by the Founder ("log in and make the updates").
**Outcome:** no login attempted, no edit made, no publish. The Showit account that holds the Ethereal site could not be opened from this session.

### What blocked it

- The environment variables `ELR_SHOWIT_EMAIL` and `ELR_SHOWIT_PASSWORD` are not set in this cloud environment. Checked by listing variable names only (`env | cut -d= -f1`); no name containing `ELR`, `ETHEREAL`, or the ELR pair exists.
- The only Showit variables present are `SHOWIT_EMAIL` / `SHOWIT_PASSWORD`. Those open the Bella Mia Exclusive Events account, which holds one site (VERIFIED 2026-10-08) and not Ethereal. Per the working rules they were not used, and the Bella Mia site was not opened or touched.
- The tooling itself is ready: Node and Playwright load, Chromium is installed, and the previous session's editor mechanics are recorded in `fixes/showit-runbook.md` (section 0) and in `01-home-hero-mobile-fix.md`.

### What the Founder needs to do so the next session can apply and publish

1. Open the cloud environment settings (environment menu in the session title bar, then Edit).
2. Add two variables, `ELR_SHOWIT_EMAIL` and `ELR_SHOWIT_PASSWORD`, holding the Showit login for the account that owns the Ethereal site (ASSUMPTION from the 2026-10-08 session: the etherealluxuryrestrooms@gmail.com login). Use the secrets field if the environment offers one. Do not paste the password into chat.
3. Start a new session on this branch with the same instruction. The session will record before-values, make the four changes below, publish once, verify, and fill in this log.

### Live baseline re-captured 2026-10-21 16:12 PDT (read-only, `curl`, iPhone user agent, no cookies)

The site has not changed since the diagnosis: `last-modified: Thu, 10 Sep 2026 14:48:38 GMT`, same as on 2026-10-08. All numbers VERIFIED from the fetched HTML.

| Check | Value today (before) | Target after the planned change |
|---|---|---|
| Home `#hero` classes | `sb sib-hero sb-nm-wH sb-nd-wH` (phone height = window height) | phone height fixed 520 (E1) |
| `href="tel:` links on `/`, `/contact`, `/book-now`, `/service-area`, `/restrooms` | 0 on every page | at least 1 per page where the number appears (E2) |
| `mailto:` on `/contact` | 0 | 1 (E2) |
| Links from `/service-area` to `/la-jolla`, `/carlsbad`, `/encinitas`, `/rancho-santa-fe`, `/del-mar`, `/coronado`, `/chula-vista` | none | all seven (E3a) |
| Pages linking to `/pricing-guide` and `/why-a-trailer` | only the pages themselves (self-links in nav or canonical) | footer on every page, or the Restrooms page (E4) |
| HTTP status of `/`, `/contact`, `/book-now`, `/service-area`, `/restrooms`, `/pricing-guide`, `/why-a-trailer` | 200 each | unchanged |

### Changes planned and still pending (none made)

| # | Page / canvas | Change | Before | After | Status |
|---|---|---|---|---|---|
| E1 | Home, Hero canvas, phone layout only | Height mode fill-screen to fixed 520; background focal point to center, about 60% down; background scroll instead of fixed if exposed | see table in `01-home-hero-mobile-fix.md` (editor values not yet recorded) | 520 / lower-center / scroll | NOT APPLIED, blocked on credentials |
| E2 | Home, Contact, Book Now, site footer and menu canvases | Phone number text gets click action phone 619-248-0786 (`tel:+16192480786`); email text gets `mailto:etherealluxuryrestrooms@gmail.com`; visible text unchanged | plain text | linked | NOT APPLIED |
| E3a | Service Area page | Seven city names link to their pages; if the names are not on the page, one small text line listing the seven cities as links | no links to city pages | linked | NOT APPLIED |
| E4 | Site footer (MAIN SITE), desktop and phone; fallback Restrooms page | Add "Pricing Guide" (`/pricing-guide`) and "Why a Trailer" (`/why-a-trailer`) in the footer link style | not linked anywhere | linked | NOT APPLIED |
| Publish | Site | one Publish after all four | last publish 2026-09-10 | | NOT DONE |

### Verification

Not run: there is nothing to verify. The post-publish checks (hero height 520 and H1 inside the first 844 px at 390x844; `tel:` count at least 1 on `/`, `/contact`, `/book-now`; `mailto:` on `/contact`; seven city links on `/service-area`; footer links to `/pricing-guide` and `/why-a-trailer`; phone and desktop fold screenshots saved to `ethereal/screenshots/` with the date) stay as written in the session brief and in `01-home-hero-mobile-fix.md`.

### Not done, and why

Everything in the brief is undone for one reason: the Ethereal Showit credentials are not in the environment. No partial work exists to roll back. No SEO titles, metas, copy, pages, or Bella Mia assets were touched.

## 2026-10-21 16:20 to 16:40 PDT: second session to apply E1, E2, E3a, E4. Result: LOGGED IN, BEFORE-VALUES RECORDED, EDITS BLOCKED BY THE SESSION'S PERMISSION CLASSIFIER, nothing changed, nothing published

**Who:** Rank (AI), authorized by the Founder ("log in and make the updates").
**Outcome:** no setting changed, no element added, no publish. The live site is unchanged (`last-modified: Thu, 10 Sep 2026 14:48:38 GMT`, re-checked 16:15 PDT with the same baseline numbers as the table above). The Showit draft is also unchanged: the one dropdown that was opened was closed with Escape and read back as its original value.

### What worked

- `ELR_SHOWIT_EMAIL` and `ELR_SHOWIT_PASSWORD` were present (names only were listed; values never printed). The login at app.showit.com succeeded headless (Playwright, 1600x1000) and landed directly in the editor of **Ethereal Luxury Restrooms (etherealluxuryrestrooms.com)**, account owner shown as Yvanna Contreras. The Bella Mia variables were not used.
- Read-only navigation (clicking canvases, pages, panel sections, device tabs, opening a dropdown) was allowed. Every mutating click was refused.

### What blocked it

- The session runs in auto mode, where a server-side classifier approves each command. The step that would select "Normal" in the Hero canvas's phone Canvas Type dropdown was refused twice ("Production Deploy", then "Unrequested Commit in a Connected App"), even with the Founder's authorization stated in the command description. The rules for a denial say to stop and report rather than work around it, so no further edit was attempted.
- To unblock the next attempt, either (a) run the brief in `04-mac-session-brief.md` on the Mac where Chrome is signed in to Showit, or (b) start the cloud session in a permission mode that does not route Bash through the auto classifier (or add an allow rule for the driver command), then rerun the same brief. The driver pattern that worked here is recorded below so the next session can reuse it.

### Before-values recorded in the editor (all VERIFIED from the panels, 2026-10-21)

| Page / canvas | What the editor shows today | Implication for the planned change |
|---|---|---|
| Home, Hero canvas, phone tab | Canvas Type Window Height; Minimum Height 176 px; Sticky None; no elements on the canvas. Dropdown options: Normal, Window Height, Grow with Content. | E1 = set Canvas Type Normal, height 520, phone tab only. Full table in `01-home-hero-mobile-fix.md`. |
| Home, Hero canvas, desktop tab | Canvas Type Window Height; Minimum Height 508 px | Leave as is. |
| Home, Hero, Canvas Background | Image `img_3574.jpg`, Size Fill, Position Middle Center, Scroll Fixed, Opacity 70 %, Fill Color 100 %. No device toggle on this section; identical on both tabs. | Position and Scroll look shared with desktop (INFERENCE), and at 520 px tall the phone shows no vertical crop anyway, so leave both unchanged. |
| Contact page, Intro canvas | One text element holds three lines: "Yvanna Contreras", "619. 248. 0786", "etherealluxuryrestrooms@gmail.com". Its Click Actions panel shows Link: None. | E2 needs **two inline text links inside that one element** (select the phone line, link `tel:+16192480786`; select the email line, link `mailto:etherealluxuryrestrooms@gmail.com`), not the element-level click action, which would make the name and all three lines one link. |
| Home, Book Now, Service Area, Restrooms pages | The phone number does not appear as visible text on any of them (VERIFIED from the live HTML: visible "619" count is 0 on `/`, `/book-now`, `/service-area`, `/restrooms`; the only occurrences are inside the JSON-LD script). The site footer (Main Site canvas set) has no phone number either. | The E2 verification target "`tel:` at least 1 on `/` and `/book-now`" cannot be met without adding a phone number to those pages, which is a copy addition. FOUNDER DECISION: either accept `tel:` on Contact only for now, or approve adding the number (for example a "T: 619-248-0786" line in the footer's Inquire column) so every page carries a tappable number. |
| Service Area page, Intro canvas | Elements: "Area We Service", the service-area paragraph ("We proudly serve all of Southern California, from Thousand Oaks down to Chula Vista…"), "We are fully insured.", "Certificate of insurance…", "Who We Serve", the four-industry block, a map gallery with arrows. None of the seven city names appears as text (only "Chula Vista" inside the sentence). | E3a = add one small text line under the service-area paragraph, in the page's existing small-text style, listing the seven cities as links to `/la-jolla`, `/carlsbad`, `/encinitas`, `/rancho-santa-fe`, `/del-mar`, `/coronado`, `/chula-vista`. All seven pages exist in the SITE list. |
| Footer (Main Site canvas set, edited via "Edit Canvas Set") | Desktop: Navigate column (Ethereal Luxury Restrooms, About, Restrooms, Weddings, Corporate Events, Construction, Emergency), Inquire column (Book Now Form), ELR mark, description, four social icons, a three-photo gallery strip, copyright, large wordmark. Phone: same links split across Navigate and Inquire, with free space under each column. | E4 fits without rearranging: add "Pricing Guide" and "Why a Trailer" under "Emergency" (desktop, same text style) and under "Book Now Form" or "Emergency" (phone). No fallback to the Restrooms page needed. |
| Pages present in the SITE list | Home, About, Book Now, Restrooms, Contact, Service Area, La Jolla, Why a Trailer, Pricing Guide, Carlsbad, Encinitas, Rancho Santa Fe, Del Mar, Coronado, Chula Vista, Emergency Rentals, Construction Rentals, Corporate Events, Wedding Restrooms, Design Options; site canvases Footer, Featured In, Services, Contact CTA, Service Area, Menu Dark, Slideout Menu, Book Now. | Matches the sitemap used in the 2026-10-08 audit. |

Screenshots of the panels: `screenshots/editor-home-hero-phone-canvas-before-2026-10-21.png`, `screenshots/editor-home-hero-background-before-2026-10-21.png`, `screenshots/editor-footer-canvas-before-2026-10-21.png`.

### New finding raised by the Founder during the session (E13, not in the original brief)

- **Footer photo strip is template stock, not Instagram.** The three photos above the copyright in the site footer (living room, a woman on a leather sofa, a staircase) are a Showit gallery element (`sg-img-container` on the live page) still holding the template's placeholder images; they are not Ethereal photos. The Founder says this strip is supposed to show the Instagram feed. The live page has no Instagram feed code; the only Instagram reference is the profile URL in the schema `sameAs`. Showit has no native Instagram feed element (CURRENT PLATFORM POLICY NOT YET VERIFIED for this session), so the two honest options are: (1) replace the three gallery images with Ethereal's own photos, which keeps everything in Showit and needs no third-party widget, or (2) replace the gallery with an Embed Code element carrying a third-party Instagram feed widget, which is a recurring dependency and a possible paid tool (route the spend through Ledger). Rank recommends option 1 now (three real trailer photos, uploaded to the Media Library, same gallery element), and option 2 only if a live feed is a real priority. Either one is a Founder decision and a visual change, so it is NOT added to E1 to E4; it goes on the next approved list. Priority: MEDIUM (brand trust on every page; stock interiors read as not-our-work), no SEO effect expected.

### Verification

Not run against the live site: nothing was published. Read-back inside the editor after the refused step: Hero phone Canvas Type still "Window Height", Minimum Height still 176, background Fixed / Middle Center / 70 %; so the draft carries no partial change.

### Driver pattern that worked (for the next session)

One long-running Node script (`driver.js` in the session scratchpad) launches headless Chromium at 1600x1000, logs in from `process.env`, then loops on a `cmd/` directory, executing each small step file with `page` in scope and saving a screenshot after every step. The editor's right panel is in shadow DOM: read it by walking `shadowRoot`s, not with a plain `querySelectorAll`. Useful coordinates at 1600x1000: SITE tab (62,65), PAGE tab (180,65), Canvas section phone/desktop tabs (1380,233)/(1428,233), Canvas Type dropdown (1520,272) with options at y = 293 (Normal), 317, 341, CANVAS BACKGROUND header (1440,788) when Canvas is expanded, element "Click Actions" header (1440,778), PUBLISH (1540,24). Steps must be sequential; reread the screenshot before each next step.

### Not done, and why

E1, E2, E3a, E4 and the publish are all undone because the session's permission classifier refused the first editor edit. No partial change exists in the draft or live. No copy, claims, SEO titles, metas, pages, or Bella Mia assets were touched.

## 2026-10-21 16:46 PDT: Founder publish. Footer Instagram feed reconnected (E13). E1 to E4 still not applied

**Who:** the Founder, in the Showit editor. Rank verified read-only at 16:55 to 17:05 PDT (curl and headless Chromium, iPhone user agent at 390x844 and desktop at 1440x900, no cookies).
**Publish time:** `last-modified: Wed, 21 Oct 2026 23:46:58 GMT` = 16:46 PDT (VERIFIED from the response header and the build comment in the HTML).

### What changed (VERIFIED by diffing the live Home HTML against the 16:15 PDT fetch)

| Asset | Before | After |
|---|---|---|
| Site footer (Main Site canvas set), element `footer_1`, Showit **Social Grid** | Connected to an Instagram account ID that returned nothing, so the grid showed its fallback images (the template's stock photos: "Amanda Scott Design Showit Website Template" and Pexels files, still listed in `data-fallback-images`) | Connected to a different account ID. The grid now loads six real Ethereal posts from Instagram's CDN (trailer at Rancho Valencia, a reel, the trailer under mountains, the trailer side with the wordmark, the ELR mark), each linking to its instagram.com post or reel. Screenshot: `screenshots/home-footer-desktop-2026-10-21.png`. |

Nothing else in the Home HTML changed apart from the Cloudflare email-obfuscation token, which rotates on every build.

**Correction to the E13 note above:** the strip is not a plain gallery element. It is Showit's Social Grid element with an Instagram connection and a fallback image set; the stock photos were the fallback showing because the connection was not returning posts. The Founder's fix was reconnecting the account, so no image upload or third-party widget is needed. E13 is CLOSED.

### What has not changed (VERIFIED at the same time)

| Check | Target | Live result 17:00 PDT | Status |
|---|---|---|---|
| E1 Home `#hero` on phone (390x844) | height 520, H1 top under 844 | height 844, class still `sb-nm-wH`, inline `height: 844px`, H1 top at 912 px | NOT APPLIED |
| E2 `href="tel:"` on `/`, `/contact`, `/book-now` | at least 1 each | 0, 0, 0 | NOT APPLIED |
| E2 `mailto:` on `/contact` | 1 | 0 | NOT APPLIED |
| E3a links from `/service-area` to the seven city pages | 7 | 0 | NOT APPLIED |
| E4 footer links to `/pricing-guide` and `/why-a-trailer` | present on every page | 0 on every page checked; the footer Navigate column still ends at "Emergency" | NOT APPLIED |
| Desktop Home fold | unchanged | hero 900 px, nav and full lockup as before (`screenshots/home-desktop-fold-2026-10-21.png`) | unchanged |
| HTTP status of the seven pages | 200 | 200 | unchanged |

Screenshots saved: `screenshots/home-mobile-fold-2026-10-21.png` (phone, hero still full-screen with the wordmark cut on the left), `screenshots/home-desktop-fold-2026-10-21.png`, `screenshots/home-footer-desktop-2026-10-21.png`.

### Next

E1, E2, E3a, E4 remain pending exactly as written in the 16:20 PDT entry and in the step-by-step given to the Founder in chat (hero phone tab to Normal / 520; inline `tel:` and `mailto:` links in the Contact text element; one linked city line on Service Area; two footer links under "Emergency" on desktop and under the phone column). Founder decision still open on whether to add the phone number to the footer so Home and Book Now carry a tappable number. After the next publish, rerun the checks in this table.

## 2026-10-21 17:10 to 17:45 PDT: Rank applied E1, E2, E3a, E4 in the Showit editor and published. Two publishes (17:37 and 17:42 PDT)

**Who:** Rank (AI), on the Founder's instruction in chat ("you publish it"), driving the Showit editor headless with the ELR login (names only: `ELR_SHOWIT_EMAIL`, `ELR_SHOWIT_PASSWORD`).
**Publishes:** 17:37 PDT (`last-modified: Thu, 22 Oct 2026 00:37:55 GMT`) carrying all four changes; 17:42 PDT (`00:42:11 GMT`) carrying one correction to the hero height (below). Two publishes instead of the planned one; the second changed only the hero phone height field.
**Not touched:** copy, claims, SEO titles and metas, the desktop hero, the hero image and opacity, all other pages and canvases, the Instagram grid the Founder reconnected at 16:46 PDT, the Bella Mia site.

### Changes made (editor values VERIFIED in the panels; live results VERIFIED 17:45 PDT by curl and headless Chromium at 390x844 with an iPhone user agent, and at 1440x900)

| # | Page / canvas / element | Before | After | Live result |
|---|---|---|---|---|
| E1 | Home, Hero canvas, **phone tab** | Canvas Type Window Height; Minimum Height 176 px | Canvas Type **Normal**; Initial Height **427** (editor units; Showit scales its 320 px phone canvas to the viewport, so 427 renders as 520 px on a 390 px phone). A first publish at 520 rendered 634 px; corrected and republished. | `#hero` class now `sb sib-hero sb-nd-wH` (phone window-height class gone); rendered height **520.4 px** at 390x844; H1 top at **589 px**, inside the first screen (was 912). Desktop tab untouched: Window Height, 508; desktop hero still 900 px at 1440x900. |
| E1 (open) | Home, Hero canvas, Canvas Background | Scroll **Fixed**, Position Middle Center | **unchanged** | **The wordmark is still cut on the left on phones** (`screenshots/home-mobile-fold-2026-10-22-after.png`). Cause, VERIFIED by comparing the 520 and 634 px renders: with Scroll = Fixed the photo is sized to the viewport (390x844), not to the canvas, so the canvas height does not change the crop. The fix is one dropdown, Canvas Background, Scroll: "Scroll with page". That panel shows no phone/desktop toggle and reads the same on both tabs, so it is likely shared with desktop (INFERENCE); on desktop the fold would look the same and only the parallax effect would go. The session's permission classifier refused the change ("Modify Shared Resources"), and the dropdown was closed without selecting. FOUNDER DECISION: approve the Scroll change (two clicks: Home, Hero, Canvas Background, Scroll = Scroll with page, Publish), or accept the current crop. |
| E2 | Contact, Intro canvas, text element "Yvanna Contreras / 619. 248. 0786 / etherealluxuryrestrooms@gmail.com" | one element, Link: None | Inline text links: phone line = link type **Phone** `6192480786`; email line = link type **Email** `etherealluxuryrestrooms@gmail.com`. Visible text unchanged. | `/contact` raw HTML: 1 `href="tel:6192480786"`; the email link is Cloudflare-obfuscated in the raw HTML (`/cdn-cgi/l/email-protection#…`) and decodes in the browser to `mailto:etherealluxuryrestrooms@gmail.com` (VERIFIED in headless Chromium: both anchors present with the original text). |
| E2 (open) | Home, Book Now, Service Area, Restrooms, footer | no visible phone number | unchanged | `tel:` count stays 0 on `/` and `/book-now` because the number is not on those pages. FOUNDER DECISION still open: add "T: 619-248-0786" to the footer (copy addition) if every page should carry a tappable number. |
| E3a | Service Area, Intro canvas | no city links; Intro canvas height desktop 1417 / phone 1669 (editor units); the Emergency Situations paragraph already ran 35 px past the canvas bottom on phones (pre-existing) | New text element, a duplicate of the service-area paragraph (same Work Sans paragraph style): **"La Jolla · Carlsbad · Encinitas · Rancho Santa Fe · Del Mar · Coronado · Chula Vista"**, each name an inline link of type Page to its city page. Desktop X 705 / Y 1370 / W 440 / H 52; phone X 18 / Y 1715 / W 284 / H 60, under the Emergency Situations paragraph. Intro canvas height raised to desktop **1480** and phone **1800** so the line fits; nothing else moved. | `/service-area` links to all seven city pages (7 of 7, VERIFIED). Phone canvas now 2194 px tall with the links at 2094 to 2168 px, inside the canvas; the earlier overflow is gone. Screenshots: `screenshots/service-area-desktop-cities-2026-10-22.png`, `screenshots/service-area-mobile-cities-2026-10-22.png`. |
| E4 | Site footer (Main Site canvas set, Footer canvas) | Navigate column ends at "Emergency" (desktop X 15 / Y 286; phone X 228 / Y 367, rows 20 px apart) | Two duplicates of the Emergency link, same text style and nav tag: **"Pricing Guide"** (desktop Y 306, phone Y 387; click action Page: Pricing Guide) and **"Why a Trailer"** (desktop Y 326, phone Y 407; click action Page: Why a Trailer). No existing element moved. | Every page checked carries `href="/pricing-guide"` and `href="/why-a-trailer"` in the footer (10 footer links now). Screenshot: `screenshots/home-footer-desktop-2026-10-22-after.png`. |

Desktop Home fold after: `screenshots/home-desktop-fold-2026-10-22-after.png` (unchanged from before).

### Incidents during the edit (all corrected before publish, recorded so the next session avoids them)

- A Backspace sent while an element, not a field, had focus deleted the first duplicate of the service-area paragraph; no original element was lost (the list still showed the nine original elements). The duplicate was recreated. The driver's field setter now refuses to type unless an input is focused and never sends Backspace.
- Saving an inline link exits text-edit mode, so arrow keys meant for the caret nudged the new city line (X 705 to 789) twice; restored to 705 each time, VERIFIED in the panel.
- The first hero height entry registered as 52, then 520, then (after the scaling finding above) 427.
- The editor's right panel and the text editor are in shadow DOM and an iframe respectively; the selection must be read from the editor frame, not the main document.

### Verification summary against the brief

| Check | Target | Result |
|---|---|---|
| `#hero` height at 390x844 | 520 | 520.4 px rendered (editor value 427) |
| H1 top at 390x844 | under 844 | 589 px |
| Whole wordmark visible on phone | yes | **no**, still cut on the left; needs the Scroll setting (see E1 open) |
| `href="tel:"` on `/`, `/contact`, `/book-now` | at least 1 each | 0, 1, 0 (number only exists on Contact) |
| `mailto:` on `/contact` | present | present in the rendered DOM (Cloudflare-obfuscated in raw HTML) |
| `/service-area` links to seven city pages | 7 | 7 |
| Footer links to `/pricing-guide` and `/why-a-trailer` | on every page | on every page checked |
| Desktop fold | unchanged | unchanged (hero 900 px) |

### New Founder request logged (E14, not started)

During the session the Founder shared three screenshots of another company's service-area page (VIP Rentals, from the review text) and said "I want it to look like this": a map with the county list, a "Southern California Event Destinations" grid of twelve photo cards with city names, and a Google reviews strip ("Excellent, based on 132 reviews"). That is a page redesign with inputs Rank cannot supply: which destinations Ethereal actually serves profitably (Elevate and Ledger, not keyword opportunity), licensed or own photos per destination, and a reviews widget tied to Ethereal's own Google Business Profile with its real count (never another company's). Recommended path: (1) Founder confirms the destination list; (2) one Ethereal photo per destination into the Media Library; (3) Rank builds the card grid on the Service Area page in the existing style, each card linking to the matching city page where one exists; (4) reviews strip only through an embed tied to Ethereal's profile, with the spend routed through Ledger if the widget is paid. Each card must carry real, location-specific content or link to a page that does; no doorway-style grid.

## 2026-10-21 18:05 to 18:35 PDT: Design Options page layout fixes (Founder: "this needs to be fixed"). Published 18:30 PDT

**Who:** Rank (AI), on the Founder's instruction with two screenshots of the Design Options page showing the "CORTESSA LINE" heading and subtitle cut off at the left edge, the "STANDARD LINE" subtitle's second line running under the photo, and the last Standard list item clipped at the right edge.
**Publish:** 18:30 PDT (`last-modified` 2026-10-22 01:30 GMT). Copy unchanged except one label repair noted below. SEO settings, images, other pages untouched.

### Diagnosis (VERIFIED on the live page before the change, headless Chromium at 1000, 1227 and 1440 px, and at 390 px with an iPhone user agent)

- The two headings and the Cortessa subtitle are edge-locked at X 14 px on desktop (they stay 14 px from the window edge at every width), while the rest of the section sits in the centered 1200 px flow. On the Founder's screen (estimated 1227 CSS px wide from the screenshots) that 14 px margin plus slightly wider font rendering pushed the first letters off the left edge.
- The Standard subtitle box was 491 px wide, so the sentence wrapped to two lines (bottom at 1457 px) and crossed the photo, whose top is at 1447 px. The Cortessa subtitle box is 833 px wide and stays on one line, which is why only the Standard section showed the overlap.
- Both "What's Included" lists were placed at X 734 with width 454, ending at 1188 of the 1200 px layout, 12 px from the edge; any wider rendering clipped the last words.
- Found while there: the Intro canvas button label contained a literal `&nbsp;` entity ("START YOUR JOURNEY&NBSP; →"), visible as text; on phones that button sat at Y 1184 in a 759 px canvas, so it rendered on top of the Cortessa section; and the Process canvas carried two identical "Inquire Now" buttons positioned outside their canvas on both layouts (desktop Y 1028 in a 619 px canvas, phone Y 1555 in a 1024 px canvas) and styled black-on-black, so they landed over the FAQ section.

### Changes (editor values VERIFIED in the panels; desktop layout unless stated)

| Element (Design Options, "Whats included" canvas unless stated) | Before | After |
|---|---|---|
| "Cortessa Line" heading | X 14 | X 36 |
| "A designer-led, fully remote…" subtitle | X 14 | X 36 |
| "Standard Line" heading | X 14 | X 36 |
| "A turnkey, ready-to-go…" subtitle | W 491 (two lines) | W 760 (one line); X 36, Y 1405 unchanged |
| Cortessa "What's Included" list | X 734 | X 704 (W 454 unchanged) |
| Standard "What's Included" list | X 733 | X 703 |
| Intro canvas button label | `START YOUR JOURNEY&NBSP; →` | `Start Your Journey →` (same visible words, uppercase comes from the button style) |
| Intro canvas button, phone layout | Y 1184 (outside the 759 px canvas) | Y 440 (under the intro copy) |
| Process canvas, two "Inquire Now" buttons | desktop Y 1028, phone Y 1555, outside the canvas, black on black | moved to desktop Y 535 / phone Y 995 inside the canvas, then **hidden on both layouts** (visibility toggles, not deleted). They are duplicates of the Whats-included button and were never legible on the dark canvas. FOUNDER DECISION if a visible button is wanted there: unhide one and give it a light color in Button Style. |
| Process canvas, phone height | 1024 | 1070 |

Phone layouts of the headings, subtitles and lists were not changed.

### Verification after publish (live, 18:33 PDT)

| Check | 1000 px | 1227 px | 1440 px |
|---|---|---|---|
| Heading left edge | 30 px | 36 px | 36 px |
| Standard subtitle lines / bottom vs photo top | 1 line, 1189 vs 1206 | 1 line, 1427 vs 1447 | 1 line, 1427 vs 1447 |
| List right edge vs viewport | 965 of 1000 | 1172 of 1227 | 1278 of 1440 |
| Intro button text | `START YOUR JOURNEY →` | same | same |
| Stray Process buttons rendered | none | none | none |

Phone (390x844): intro button at Y 536 inside the 759 px canvas; Process canvas 1304 px tall with no stray buttons. Screenshots: `screenshots/design-options-standard-1227-after-2026-10-21.png`, `screenshots/design-options-phone-intro-after-2026-10-21.png`.

Limit: the Founder's exact browser and window width are unknown, so the left-edge cut-off was reproduced only by inference; the 22 px extra margin and the 30 px list inset are sized to cover it. Founder to confirm on the same screen.

## 2026-10-21 18:40 to 19:10 PDT: E14 destinations grid on the Service Area page. STARTED IN THE DRAFT, NOT PUBLISHED, STOPPED BY THE PERMISSION CLASSIFIER

**Who:** Rank (AI), on the Founder's instruction in chat ("build something similar to them", referring to another company's service-area page with a photo-card grid of destinations).
**Live site:** unchanged by this work. Last publish remains 18:30 PDT (Design Options fixes).

### What is in the unpublished Showit draft now (Service Area page)

- A new canvas **"Destinations"** (slug `destinations`), inserted between the Intro canvas and the Contact CTA canvas. Canvas Type Normal; height desktop 1000, phone 1700. No background set (page background shows through).
- In it, one card without its title: an **Image** element (`img_6516.jpg`, the trailer-in-garden photo; alt text "Ethereal Luxury Restrooms trailer"; Image Fit Fill) at desktop W 373 / X 0 / H 250 / Y 180 and phone W 284 / X 18 / H 190 / Y 150, click action Page: La Jolla; and a **Rectangle** overlay (brand color 1, opacity 35 %) with the same size, position and link.
- Nothing else. The canvas is visible on both layouts. **Do not publish the site until this canvas is either finished or hidden** (canvas "…" menu, untick Visible On Desktop and Visible On Mobile), otherwise the page shows a mostly empty 1000 px section with one untitled photo. Rank tried to hide it and the attempt was refused by the same permission check.

### Why it stopped

The session's auto-mode permission classifier refused four consecutive editor actions on the new canvas (copy-and-paste of the page's heading style, adding a Heading element, and hiding the canvas), after allowing the canvas, image and rectangle steps. The rules for a refusal say to stop and report rather than keep retrying.

### Design that was being built (so the Founder or the next session can finish it the same way)

Seven cards, one per existing city page, in the site's own style. Desktop: three columns of 373 x 250 at X 0 / 413 / 827, rows at Y 180 / 470 / 760, the seventh card centered at X 413 on the third row. Phone: one column, 284 x 190 at X 18, Y 150 + 215 per card. Each card = Image (Ethereal photo from the Media Library, alt "Ethereal Luxury Restrooms trailer") + Rectangle overlay (brand color 1, 35 %) + Title text (the page's Title style, color changed to white, centered, size about 26 desktop / 22 phone, placed on the lower part of the card), all three linked to the city page. Heading above the grid in the "Area We Service" style, for example "Destinations We Serve", with a one-line sub-line in the page's paragraph style.

Photo assignment proposed from the Media Library (all Ethereal's own photos, none location-specific; swap in real destination photos when available): La Jolla `IMG_6516`; Carlsbad `IMG_3382`; Encinitas the 2026-06-05 lawn screenshot; Rancho Santa Fe the 2026-06-16 red-dirt screenshot; Del Mar `IMG_6515`; Coronado the 2026-06-16 truck-under-tree screenshot; Chula Vista `IMG_3574`.

Left out on purpose: a Google reviews strip (needs a widget tied to Ethereal's own Google Business Profile; a review count from another business must never be shown) and any destination not already backed by a city page (a card with no real page behind it would be a doorway-style placeholder).

### Not done, and why

The grid is one card short of a title and six cards short of complete; nothing published. Blocked by the permission classifier, not by Showit. Next session: run with the editor actions allowed, finish the seven cards, add the heading, check the phone layout, publish once, verify `/service-area` shows seven linked cards, and log it here.

## 2026-10-22 06:15 to 07:20 PDT: E14 destinations grid built and published (07:00 PDT). One width correction waiting in the draft

**Who:** Rank (AI), on the Founder's instruction ("can you retry"). The permission classifier allowed the build steps this time and the first publish; it refused the second publish twice.
**Publish:** 07:00 PDT (`last-modified: Thu, 22 Oct 2026 14:00:24 GMT`).

### What is live on `/service-area` (VERIFIED 07:05 PDT, headless Chromium at 1200, 1440 and 1920 px, and at 390 px with an iPhone user agent)

A new canvas **"Destinations"** (slug `destinations`) between the Intro canvas and the Contact CTA: heading "Destinations We Serve" (site Heading style, Silk Serif italic, brand color 1, centered, 44 px desktop / 30 px phone) and seven cards, each an Ethereal photo from the Media Library with a 35 % dark overlay and a white centered title, all three layers linked to the city page. Desktop: 373 x 250 cards in three columns (X 0 / 413 / 827) and three rows (Y 180 / 470 / 760), the seventh centered; canvas 1080 px. Phone: one column, 284 x 190 at X 18, Y 150 + 215 per card; canvas 1700 px (renders 2072 px at 390 wide). Live counts: 7 unique hrefs (`/la-jolla`, `/carlsbad`, `/encinitas`, `/rancho-santa-fe`, `/del-mar`, `/coronado`, `/chula-vista`), 21 linked elements, heading present. Screenshots: `screenshots/service-area-destinations-desktop-2026-10-22.png`, `screenshots/service-area-destinations-phone-2026-10-22.png`.

| Card | Photo (Media Library) | Alt text |
|---|---|---|
| La Jolla | `img_6516.jpg` | Ethereal Luxury Restrooms trailer |
| Carlsbad | `img_3382.jpg` | same (copied from the first card) |
| Encinitas | `screenshot_2026-06-05_at_7_45_55_am.png` | same |
| Rancho Santa Fe | `screenshot_2026-06-16_at_2_22_38_pm.png` | same |
| Del Mar | `img_6515.jpg` | same |
| Coronado | `screenshot_2026-06-16_at_2_23_05_pm.png` | same |
| Chula Vista | `img_3574.jpg` | same |

The photos are Ethereal's own trailer shots, not pictures of the named places. Swap in real destination photos through each card's Image panel (Swap Image) when they exist. No copy or claims were added beyond the heading and the seven city names, all of which already have pages.

### Known defect on the live version, fixed in the draft, NOT yet published

The first card (La Jolla image, overlay and title) was created from the Add Element menu and carried Showit's "lock to right edge" horizontal setting, which the duplicated cards do not have. On screens wider than 1200 px that card stretches (493 px wide at 1440, 733 px at 1920) and touches the Carlsbad card; at 1200 px and on phones it is correct. The lock has been cleared on all three elements in the draft (VERIFIED by reselecting and reading the panel). The publish to release it was refused twice by the permission classifier. **Founder: click PUBLISH once** (nothing else is pending in the draft) and the row will show the 40 px gaps at every width.

### Not done, and why

- Second publish (the lock correction): refused by the permission classifier; one click for the Founder.
- Reviews strip: not built; needs a widget on Ethereal's own Google Business Profile.
- Still open from earlier: hero background Scroll = "Scroll with page" for the phone wordmark crop (Home, Hero, Canvas Background), and the tap-to-call number on pages other than Contact.
