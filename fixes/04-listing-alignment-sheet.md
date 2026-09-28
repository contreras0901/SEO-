# Fix 04 — Business information alignment across listings (B6, B7)

**Priority:** HIGH IMPACT (local)
**Founder decisions required before editing anything:**

| Decision | Options | Rank's recommendation |
|---|---|---|
| D1. The one public city | "San Diego" or "Chula Vista" | **San Diego.** It matches the website, The Knot, BBB, Style Me Pretty, and the positioning (La Jolla/Coronado). Chula Vista pulls the business toward a budget-signalled search result. |
| D2. Street address shown publicly | Show the 3374 Clavelita St address (as BBB does), or show no street address and operate as a service-area business | **Service-area business, no public street address**, if clients are not received at that address. Google's rules for service-area businesses require hiding the address in that case. CURRENT PLATFORM POLICY NOT YET VERIFIED: confirm in Google Business Profile guidelines before changing the profile. |
| D3. Email | `info@bellamiaexclusiveevents.com` (site) or `bellamiaexclusiveevents@gmail.com` (listings) | **info@**, and make sure it is monitored. |
| D4. Service list wording | Site says full-service, partial, floral design. The Knot listing also says day-of, month-of, selfie mirror, styling, rental packages | Whatever Prestige confirms Bella Mia sells today. Remove anything no longer offered. |
| D5. "Exclusive connections to luxurious hotels" | Keep, soften, or remove | **Soften to a verifiable statement** (e.g., "experienced with San Diego's hotel and resort venues") unless Concierge confirms a current relationship that can be named. |

## The target record (fill in after D1–D5)

```
Business name:   Bella Mia Exclusive Events            (exactly this, no keywords added)
City:            [D1]
Address shown:   [D2]
Phone:           619-248-0786                           (OBSERVED on site and listings; confirm)
Email:           [D3]
Website:         https://bellamiaexclusiveevents.com    (primary host from Fix 02, no www)
Primary category: Wedding planner
Services:        [D4]
Hours:           [confirm; one directory shows Mon–Sat 9:00–6:30, Sun closed — PUBLIC CLAIM]
Description:     [one paragraph, no hotel names unless confirmed, D5 wording]
```

## Listing-by-listing worksheet

Observed values are from search snippets on 2026-09-28; open each listing to confirm before editing. "Fix" is what to change to match the target record.

| Listing | Observed (PUBLIC CLAIM) | Fix | Owner login needed |
|---|---|---|---|
| Google Business Profile | UNKNOWN (not visible from this session) | Audit first: name, category, address/service area, phone, website (non-www), hours, services, description, photos. Capture Performance data as baseline before editing (Fix 06) | Google account that owns the profile |
| Website `/contact` and footer | info@ email, 619.248.0786, "San Diego, La Jolla & Coronado" | Align to D1–D3; make phone and email identical to the profile | CMS |
| Yelp | Title says "San Diego"; URL slug says "chula-vista"; 24 reviews, 240 photos | Update location to D1/D2; website to non-www; email D3; service list D4. Do not gate or solicit reviews | Yelp for Business |
| WeddingWire | URL slug "chula-vista"; page title says "San Diego, CA"; 5.0 / 10 reviews | Set city to D1; website non-www; services D4 | WeddingWire vendor account |
| The Knot | "San Diego, CA"; services text includes day-of, month-of, selfie mirror, styling, rentals | Keep city; rewrite services to D4; website non-www | The Knot vendor account (same login as WeddingWire) |
| PartySlate | "Chula Vista Event Planner", 239 photos | Change city to D1; website non-www | PartySlate account |
| Nextdoor | **Two pages observed:** `/pages/bella-mia-exclusive-events-san-diego-ca/` and `/pages/bella-mia-exclusive-events-chula-vista-ca/` | Claim both, keep the D1 page, request removal/merge of the other. Duplicate listings are a local-SEO liability | Nextdoor business account |
| BBB | 3374 Clavelita St, San Diego 92154; started 4/22/2014; President Ivanna Contreras; not accredited | Update address per D2 (BBB may require a physical address on file even if not displayed); confirm email and website | BBB business login |
| Style Me Pretty vendor profile | "Southern California" description | Add D1 city, website non-www | SMP account |
| Facebook page | "San Diego CA" | Confirm address/phone/email/website per target | Page admin |
| Instagram bio | UNKNOWN | Website link to non-www host; city in bio | Account |
| LinkedIn company page | UNKNOWN | Website non-www; HQ D1 | Admin |
| TikTok | UNKNOWN | Website non-www | Account |
| ZoomInfo, wedding-usa.nears.me, and other scraped directories | ZoomInfo indexes `/untitled-c1izt`; nears.me shows a 92108 zip and hours | Low priority. Claim/correct only if it takes under 10 minutes each; they follow the primary sources over time | Varies |

## Order

1. Decide D1–D5 (Founder, with Prestige for D4 and Concierge for D5).
2. Google Business Profile first (audit, baseline, then edit).
3. Website contact/footer.
4. Yelp, WeddingWire, The Knot, PartySlate (the ones couples actually use).
5. Nextdoor duplicate.
6. BBB, SMP, social.

Log every edit with the date in `06-baseline-and-change-log.md`.
