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
