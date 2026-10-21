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
