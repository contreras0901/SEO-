# Fix 01 — Title tags and meta descriptions (B1, B4, B8)

**Priority:** HIGH IMPACT (homepage), MEDIUM (About, Contact), LOW (Services geography)
**Where:** CMS, per-page SEO settings
**Rollback:** re-enter the old values (record them in `06-baseline-and-change-log.md` before changing)

## Ground rules used

- Titles ≤ 60 characters so they are less likely to be truncated or rewritten. Search engines may still rewrite them; that is normal.
- Descriptions 120–155 characters, one clear promise, one action.
- Only claims that are consistent everywhere observed on 2026-09-28 go in the **SAFE** version: the business name, "San Diego," "wedding planner/planning," "floral design" (stated on the site's own services page). Anything else sits in the **IF CONFIRMED** version and needs a Fact Register entry first.
- No hotel names, no "exclusive," no "luxury" until confirmed and approved.

## Page-by-page copy

### Homepage `/`
Current (OBSERVED via SERP): `bellamiaexclusiveevents.com` (bare domain; tag empty or defaulted)

**SAFE title (54 chars):**
```
Bella Mia Exclusive Events | San Diego Wedding Planner
```
**IF CONFIRMED title (64 chars; use only if La Jolla/Coronado service area is Fact Register confirmed):**
```
Bella Mia Exclusive Events | San Diego & Coronado Wedding Planner
```
**SAFE description (151 chars):**
```
Full-service and partial wedding planning with floral design in San Diego. Bella Mia takes a limited number of weddings each year. Inquire to reserve your date.
```
[CLAIM PENDING CONFIRMATION: "limited number of weddings each year" is a public claim on the site. Remove the sentence if not true.]

### Services `/services/`
Current (OBSERVED): `Wedding Planning Services | Full-Service, Partial & Florals` (good, no geography)

**SAFE title (58 chars):**
```
San Diego Wedding Planning & Floral Design | Bella Mia Events
```
**Description (152 chars):**
```
Compare Bella Mia's full-service and partial planning, floral design, styling, and rental packages for San Diego weddings, and see what each includes.
```

### About `/about`
Current (OBSERVED): `About`

**SAFE title (58 chars):**
```
About Bella Mia Exclusive Events | San Diego Wedding Planner
```
**IF CONFIRMED title (uses the owner's name; BBB lists Ivanna Contreras as President, PUBLIC CLAIM):**
```
Meet Ivanna | Bella Mia Exclusive Events, San Diego Wedding Planner
```
**SAFE description (139 chars):**
```
Meet the planner behind Bella Mia Exclusive Events and learn how we plan and design weddings in San Diego from first consultation to send-off.
```

### Contact `/contact`
Current (OBSERVED): `Contact`

**SAFE title (60 chars):**
```
Contact Bella Mia Exclusive Events | San Diego Wedding Planner
```
**SAFE description (131 chars):**
```
Tell us your date, venue, and vision. Call or text 619.248.0786, email info@bellamiaexclusiveevents.com, or send the inquiry form.
```
[Email is FOUNDER CONFIRMED 2026-09-28 as info@. Phone as shown on the site on 2026-09-28; confirm.]

### `/untitled-c1izt`
Do not write a title for it. Handle it in Fix 03 first.

## H1 check (do while you are in each page)

Each page should have exactly one H1 that matches the promise of its title:

| Page | H1 to use if the current one is generic or missing |
|---|---|
| Home | `San Diego Wedding Planning & Floral Design` |
| Services | `Wedding Planning Services` (keep) with H2s `Full-Service Planning`, `Partial Planning`, `Floral Design`, `Event Styling`, `Rental Packages`. If styling and rentals are not yet on the page, add a short section for each (what is included, for which events) so the listings and the site match. No selfie mirror anywhere. |

## Homepage and services copy: the hotel line (D5, FOUNDER CONFIRMED 2026-09-28)

Wherever the site says "exclusive connections to some of the area's most elegant and luxurious hotels" (observed on the homepage and the untitled page), replace with:
```
Experienced with San Diego's hotel and resort wedding venues.
```
No hotel is named until Concierge confirms a current relationship.
| About | `About Bella Mia Exclusive Events` |
| Contact | `Contact Bella Mia` |

## Where to enter these (platform inferred; verify in the CMS)

- **Squarespace:** Pages → gear icon on the page → SEO tab → "SEO Title" and "SEO Description." For the site-wide suffix: Settings (or Marketing) → SEO → Search Appearance → set the title format to `%p` for pages so the per-page title is used as-is, and set the Home page format to `%p` as well. Squarespace's default home title format is what produces a domain-only or site-title-only title. CURRENT PLATFORM POLICY NOT YET VERIFIED: check the exact menu labels in the current Squarespace version.
- **Wix:** Pages & Menu → page → SEO basics → "Title tag" and "Meta description." Site-wide: Settings → SEO → SEO Settings → Pages default title pattern.
- **WordPress (Yoast/Rank Math):** edit page → SEO box → "SEO title" and "Meta description." Site-wide: SEO → Search Appearance → title separator and homepage title.

## Verify after saving

1. Open each page and view source; confirm `<title>` and `<meta name="description">` match.
2. In Search Console → URL Inspection → "Request indexing" for the four URLs.
3. Log the change with date in `06-baseline-and-change-log.md`.
