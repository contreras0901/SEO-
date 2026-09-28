# Reconciliation: Atlas package (18 Sep 2026) vs Rank kit and Founder decisions (28 Sep 2026)

**Prepared by:** Rank (AI), 2026-09-28
**Inputs:** `supplied/atlas-seo-implementation-package-2026-09-18.md` (Founder-supplied; Atlas fetched the live site 17–18 Sep), `serene-events-vs-bella-mia-seo-analysis.md` (Rank, search-index observations only, 28 Sep), the Founder decisions recorded in `../fixes/04-listing-alignment-sheet.md`, and the Founder's Showit screenshot (28 Sep).
**Rule:** where Atlas and Rank disagree, the later Founder decision governs. Where neither has a Founder decision, Rank's call is stated and labeled.

## 1. What Atlas saw that Rank could not

Rank never fetched the site; Atlas did. These are OBSERVED by Atlas on 17–18 Sep 2026 and must be re-verified before acting, since ten days have passed.

| # | Finding | Rank priority | Why it outranks Rank's own findings |
|---|---|---|---|
| A1 | `/portfolio` returns 404 and is the target of the homepage "Explore the Galleries" and full-service page "View More Weddings" calls to action | **BLOCKING** (conversion) | A dead page at the point where a ready buyer asks to see work. Rank's rubric puts a broken conversion path above every title-tag issue |
| A2 | `/delete-this-demo-single-post` returns 404 and is linked twice from the homepage "Recent Features" module, one link titled "Loews Coronado Resort Wedding" | **BLOCKING** (trust) | A template placeholder is live on the homepage. It also means the "Loews Coronado wedding" Rank treated as a candidate real-wedding post may not exist as content. Revise `fixes/05` accordingly |
| A3 | Homepage says "Meet Erika & Julio Ramirez" with "Read My Story"; testimonials name Yvanna | **BLOCKING** (trust, E-E-A-T) | Template names left in place. The Showit account holder is Yvanna Contreras (screenshot, 28 Sep); BBB lists "Ivanna Contreras". FOUNDER DECISION: the one spelling used everywhere |
| A4 | Two pages share the H1 "San Diego wedding planner" (homepage and `/full-service-wedding-planning`), both with casing errors; `/services` H1 has random capitals | HIGH IMPACT | Rank assumed one hero H1. Split the intent: homepage = brand + planning and design; full-service page = the head term |
| A5 | Image filenames are `img_6927.jpg`, `253.jpg`, `screenshot_….png`; Serene's are venue-and-couple named | MEDIUM | Cheap to fix, compounding value in image search. Adopt Atlas Part 4 verbatim |
| A6 | Site has more pages than Rank knew: `/full-service-wedding-planning`, `/partial-wedding-planning`, `/floral-designs-and-more`, `/erica-and-patrick-sieben`, a WordPress `/blog` with two posts set in France, titled "Blog \| bellamiaexclusiveevents.com" | Informational | Rank's audit undercounted; the search index only surfaced four URLs. Use Atlas's page list in the runbook |
| A7 | `/services` and `/full-service-wedding-planning` titles and metas are already well built | Keep as is | Rank's Fix 01 proposed a new Services title; **withdrawn**. Leave the existing one |

## 2. Where the two disagree, and the call

| Topic | Atlas (18 Sep) | Rank kit / Founder decision (28 Sep) | Call |
|---|---|---|---|
| Homepage title | `Luxury San Diego Wedding Planner \| Bella Mia Exclusive Events` | `Bella Mia Exclusive Events \| San Diego Wedding Planner` | **Keyword-first, no "Luxury" until Prestige sets positioning:** `San Diego Wedding Planner & Designer \| Bella Mia Exclusive Events` (59). "Luxury" is a positioning claim Prestige owns; add it on Founder say-so |
| Coronado and La Jolla in meta descriptions | Included | Founder decided service area = San Diego; La Jolla and Coronado wait for the Fact Register | **Removed from all metas** until confirmed. The office is in Mission Valley; the Founder has not yet confirmed those areas as served |
| Hotel language | Venue guides to Hotel del and Loews, no vendor claim | D5: soften to "experienced with San Diego's hotel and resort wedding venues"; name no hotel until Concierge confirms a relationship | **Compatible.** A planner's guide to a public venue is not a relationship claim. Two edits required before publishing: (a) the Loews guide's opening line "the property we recommend most often" is a claim about Bella Mia's practice, FOUNDER CONFIRM or cut; (b) every `[FOUNDER FILL — only if true]` stays empty unless true. Concierge sign-off still applies to any sentence implying the hotel refers or prefers Bella Mia |
| Content order | Hotel del guide, then Loews guide, then Westgate real wedding | Rank: real weddings first, guides after | **Westgate real wedding first**, because it is VERIFIED Bella Mia work (homepage copy, Khoa Photography credit), then Erica & Patrick, then the two venue guides. A guide to a venue with no real wedding behind it is weaker than Atlas's own "pairing" rule says |
| Contact title | `Inquire \| San Diego Wedding Planner \| Bella Mia Exclusive` | Rank version with Mission Valley by-appointment line | **Rank's**, because the Founder has since confirmed the office and it belongs in the snippet |
| Services list | Full-service, partial, floral | Founder: plus event styling and rental packages, no selfie mirror | **Founder's.** Add styling and rentals wherever services are listed |
| Address, email | Not addressed | Office address public, info@ | **Founder's.** Runbook section 5 |
| `untitled-c1izt`, www duplicate host | Not seen | Rank findings B2, B3 | **Both stay in the runbook.** Atlas did not fetch these URLs |
| Platform | Showit + WordPress blog (Atlas) | Showit (Founder screenshot) | Agree |

## 3. Public claims and Fact Register candidates raised by the Atlas package

- Homepage hero "Inc. Est. 2012" vs BBB "started 4/22/2014" (Rank, from screenshot and BBB snippet). FOUNDER CONFIRM.
- "Erika & Julio Ramirez" on the homepage: template text, not a Bella Mia person (INFERENCE; the Showit account holder is Yvanna Contreras). Remove.
- Lead planner name spelling: "Yvanna" (site testimonials, Showit account) vs "Ivanna" (BBB). FOUNDER CONFIRM one spelling for all public assets.
- "Loews Coronado Resort Wedding" homepage link: a template placeholder, not a published wedding. Whether a real Loews wedding (Julianne & David, per Style Me Pretty snippet) exists as photos and permissions is UNKNOWN. FOUNDER CONFIRM before it becomes a post.
- Real galleries confirmed to exist on the site: `/erica-and-patrick-sieben` at **Park Hyatt Aviara, Carlsbad** (FOUNDER CONFIRMED 2026-09-28); Cherine & Andy at The Westgate (homepage copy). Note: Serene has a real-wedding post at Park Hyatt Aviara ("A Chic Celebration at the Park Hyatt Aviara", OBSERVED in the search index 28 Sep). Bella Mia's Aviara post is a genuine wedding and should be published; Atlas's "do not open by fighting them at Aviara" applies to venue guides, not to real work.

## 4. Merged execution order

The Showit runbook (`../fixes/showit-runbook.md`) now carries this order:

1. Read the untitled page (Rank B3).
2. Capture before-values (Rank Fix 06).
3. **Stopgaps for the two 404s** (Atlas 2.1, 2.2): repoint both portfolio CTAs to `/erica-and-patrick-sieben` or `/services`; remove both demo-post links from Recent Features.
4. **Remove "Erika & Julio Ramirez"**; name the Founder's confirmed planner name (Atlas 2.5).
5. Titles and metas on every page (merged list, section 5 below).
6. H1 split and casing fixes (Atlas 2.4).
7. Copy edits: hotel line, address, email, services (Rank Fix 04/05).
8. Site-level: site title, redirects, domain (Rank Fix 02/03).
9. Blog: WordPress title, categories "Real Weddings" and "Venue Guides" (Atlas Part 5).
10. Publish, verify, log.

Then, off the runbook: build `/portfolio` (Atlas Part 3), image retrofit (Atlas Part 4), Westgate post, Erica & Patrick post, then the two venue guides with the edits in section 2.

## 5. Final title and meta set (supersedes `fixes/01`)

| Page | Title | Meta description |
|---|---|---|
| `/` | `San Diego Wedding Planner & Designer \| Bella Mia Exclusive Events` | `Full-service and partial wedding planning, floral design, styling, and rentals in San Diego. Bella Mia takes a limited number of weddings each year. Inquire to reserve your date.` (172; trim "Inquire to reserve your date." if the field caps at 155) |
| `/services` | keep existing | keep existing |
| `/full-service-wedding-planning` | keep existing | keep existing |
| `/partial-wedding-planning` | `Partial Wedding Planning San Diego \| Bella Mia Exclusive` | `Already started planning? Partial wedding planning for San Diego couples who need expert guidance, vendor management, and flawless day-of execution.` |
| `/floral-designs-and-more` | `Wedding Floral Design & Styling San Diego \| Bella Mia` | `Wedding florals, event styling, and rental packages for San Diego weddings. Bouquets, ceremony installations, and tablescapes designed around your aesthetic.` |
| `/about` | `Meet [Name] \| Bella Mia Exclusive Events, San Diego` | `Meet the planner behind Bella Mia Exclusive Events and learn how we plan and design weddings in San Diego from first consultation to send-off.` |
| `/contact` | `Contact Bella Mia Exclusive Events \| San Diego Wedding Planner` | `Tell us your date, venue, and vision. Call or text 619.248.0786, email info@bellamiaexclusiveevents.com, or meet us by appointment in Mission Valley.` |
| `/portfolio` (once built) | `San Diego Wedding Portfolio \| Bella Mia Exclusive Events` | `Real weddings planned and designed by Bella Mia Exclusive Events across San Diego. Explore the full gallery from each celebration.` |
| `/blog` (WordPress) | `Real Weddings & Venue Guides \| Bella Mia Exclusive Events` | `Real weddings, venue guides, and planning advice from a San Diego wedding planner.` |

`[Name]` = the Founder's confirmed spelling.

## 6. Founder decisions (answered 2026-09-28, FOUNDER CONFIRMED)

1. Lead planner name: **Yvanna**. Use this spelling on every public asset; BBB's "Ivanna" is to be corrected.
2. Established: **2014**. The hero's "Inc. Est. 2012" is wrong and is changed in the runbook.
3. **"Luxury" is the positioning word.** Titles and H1s in section 5 now use it.
4. **La Jolla and Coronado are served, and so is all of Southern California.** Metas may name them. On Google Business Profile, "Southern California" is not a selectable area; list San Diego County first, then the specific counties actually served (Orange, Los Angeles, Riverside as applicable). Rank's note: keep the profile's service area to where weddings are genuinely taken; a very wide area dilutes local relevance. INFERENCE, not policy.
5. The Loews guide's "the property we recommend most often" line is **true**; it stays.
6. **Still open:** which real weddings, with which permissions, go on `/portfolio`.

Section 5 titles are updated below to reflect 1–4. The runbook carries the same values.

### 5 (revised). Final title and meta set

| Page | Title | Meta description |
|---|---|---|
| `/` | `Luxury San Diego Wedding Planner \| Bella Mia Exclusive Events` | `Luxury wedding planning, floral design, and styling in San Diego, Coronado, and La Jolla. Bella Mia takes a limited number of weddings each year.` |
| `/about` | `Meet Yvanna \| Bella Mia Exclusive Events, San Diego` | `Meet Yvanna, the planner behind Bella Mia Exclusive Events, and how we design luxury weddings across San Diego and Southern California, consultation to send-off.` |
| `/portfolio` (once built) | `San Diego Wedding Portfolio \| Bella Mia Exclusive Events` | `Real weddings planned and designed by Bella Mia Exclusive Events across San Diego, Coronado, and La Jolla. Explore the full gallery from each celebration.` |
| `/blog` | `Real Weddings & Venue Guides \| Bella Mia Exclusive Events` | `Real weddings, venue guides, and planning advice from a San Diego wedding planner. Coronado, La Jolla, downtown, and North County venues covered in depth.` |
| others | unchanged from the table above | |
