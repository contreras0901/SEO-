# Fix 06 — Baseline capture and change log

**Rule:** capture the baseline before or on the same day as the first change. Without it, nothing that follows can be attributed.
**Status:** NO BASELINE — capture first.

## Baseline checklist

| Source | What to capture | How | Captured by / date |
|---|---|---|---|
| Google Search Console | Performance → Search results, last 16 months: total clicks, impressions, average position; top 50 queries; top pages. Export to CSV | Search Console → Performance → Export | |
| Google Search Console | Pages → Indexing report: counts of indexed and not-indexed pages, and the reasons | Search Console → Indexing → Pages | |
| Google Search Console | URL Inspection results for `/`, `/services/`, `/about`, `/contact`, `/untitled-c1izt`, and the www homepage | Search Console → URL Inspection | |
| Google Business Profile | Performance, last 6 months: searches (by query if shown), profile views, calls, website clicks, direction requests, messages | Business Profile → Performance | |
| Google Business Profile | Screenshot of the current name, category, address/service area, phone, website, hours, services, description | Business Profile → Edit profile | |
| Website inquiries | Count of form submissions, calls, texts, emails per month for the last 6 months, with "how did you hear about us" if recorded | CRM / inbox / phone log | |
| Listings | Screenshot of each listing's business info section before editing (Yelp, WeddingWire, The Knot, PartySlate, Nextdoor ×2, BBB, SMP) | Browser | |
| Current page titles/descriptions | Copy the existing title and description of each page before overwriting | CMS SEO tab | |

## Lead-source capture (start now)

Add one required question to the website inquiry form: **"How did you find us?"** with options: Google search, Instagram, The Knot / WeddingWire, Yelp, venue or hotel referral, planner or vendor referral, friend or past client, other. Ask the same question on every call and log it. Without this, search's commercial contribution stays UNKNOWN.

## Change log

Add a row for every live change, including listing edits and posts.

| Date | Asset | Change | Old value | New value | By | Notes |
|---|---|---|---|---|---|---|
| | `/` title | Fix 01 | `bellamiaexclusiveevents.com` | | | |
| | `/services/` title | Fix 01 | `Wedding Planning Services \| Full-Service, Partial & Florals` | | | |
| | `/about` title | Fix 01 | `About` | | | |
| | `/contact` title | Fix 01 | `Contact` | | | |
| | Primary host | Fix 02 | both hosts live | | | |
| | `/untitled-c1izt` | Fix 03 | indexed, live | | | |
| 2026-09-28 | Google Business Profile | Fix 04, steps 1–7: name checked, primary category Wedding planner, description pasted, service area San Diego CA, phone and non-www website, services list (5, no selfie mirror). Address NOT cleared: Founder confirmed the Mission Valley office (8885 Rio San Diego Dr, Suite 237) is a real client-facing office, so D2 was revised to keep it public | NOT CAPTURED — Founder applied edits without pasting prior values | Target record in Fix 04 | Founder | FOUNDER REPORTED: no re-verification prompt; no Chula Vista duplicate found in Maps; Maps shows the Mission Valley office. Unknown: prior hours, Performance baseline, ZIP (92107 typed, 92108 expected). Some edits may sit in Google review for days. |
| | Yelp | Fix 04 | | | | |
| | WeddingWire | Fix 04 | | | | |
| | The Knot | Fix 04 | | | | |
| | PartySlate | Fix 04 | | | | |
| | Nextdoor (duplicate) | Fix 04 | two pages | | | |
| | BBB | Fix 04 | | | | |
| | `/real-weddings/` post 1 | Fix 05 | none | | | |

## 90-day review (PROVISIONAL thresholds)

- Branded queries ("bella mia exclusive events", "bella mia events san diego"): clicks and impressions vs baseline.
- Non-branded impressions for any query containing a venue name that has a real-wedding post.
- Indexing: `/untitled-c1izt` and www URLs reported as redirects; no duplicate-page warnings.
- Inquiries with source = Google search, vs baseline.
- Note anything else that changed in the same window (ads, outreach, seasonality, referrals) so results are read as combined, not attributed to SEO alone.
