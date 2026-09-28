# Fix 04 — Business information alignment across listings (B6, B7)

**Priority:** HIGH IMPACT (local)
**Founder decisions:**

| Decision | Options | Status |
|---|---|---|
| D1. The one public city | "San Diego" or "Chula Vista" | **DECIDED 2026-09-28 (FOUNDER CONFIRMED): San Diego.** |
| D2. Street address shown publicly | Show the 3374 Clavelita St address (as BBB does), or hide it and operate as a service-area business | **DECIDED 2026-09-28 (FOUNDER CONFIRMED): service-area business, address hidden.** Google's rules for service-area businesses require the address to be hidden when customers are not served there; keep the address on file with Google for verification only. CURRENT PLATFORM POLICY NOT YET VERIFIED: confirm the current Business Profile guideline text before editing. |
| D3. Email | `info@bellamiaexclusiveevents.com` (site) or `bellamiaexclusiveevents@gmail.com` (listings) | **DECIDED 2026-09-28 (FOUNDER CONFIRMED): info@bellamiaexclusiveevents.com.** Make sure it is monitored and that the gmail address forwards to it during the transition. |
| D4. Service list wording | Site says full-service, partial, floral design. The Knot listing also says day-of, month-of, selfie mirror, styling, rental packages | **OPEN.** Default until decided: the three services on the site (full-service planning, partial planning, floral design). Remove selfie mirror, styling, and rentals from The Knot unless the Founder says they are still sold. |
| D5. "Exclusive connections to luxurious hotels" | Keep, soften, or remove | **OPEN.** Default until decided: soften to "experienced with San Diego's hotel and resort wedding venues." No hotel is named until Concierge confirms a current relationship. |

## The target record

```
Business name:    Bella Mia Exclusive Events            (exactly this, no keywords added)
City:             San Diego, CA
Address shown:    none (service-area business; address hidden on Google, omitted on listings that allow it)
Service area:     San Diego, CA  [add La Jolla and Coronado only when the Fact Register confirms them]
Phone:            619-248-0786                           (OBSERVED on site and listings; confirm)
Email:            info@bellamiaexclusiveevents.com
Website:          https://bellamiaexclusiveevents.com    (primary host from Fix 02, no www)
Primary category: Wedding planner
Services:         Full-service wedding planning; Partial wedding planning; Wedding floral design  [D4 default]
Hours:            [confirm; one directory shows Mon–Sat 9:00–6:30, Sun closed — PUBLIC CLAIM]
Description:      Bella Mia Exclusive Events plans and designs weddings in San Diego. We offer
                  full-service planning, partial planning, and floral design, and take a limited
                  number of weddings each year so every couple gets our full attention.
                  [Remove "limited number" if not true. No hotel names until D5 is decided.]
```

### Google Business Profile: the service-area change, step by step

1. Business Profile → Edit profile → Location. If a street address is shown, use the option to clear it so the profile shows no address. Keep the address on file for verification mail if Google asks.
2. Edit profile → Service area → add "San Diego, CA". Do not add more than the areas actually served.
3. Contact → website `https://bellamiaexclusiveevents.com`, phone 619-248-0786. Email is not public on the profile but set the account email to info@ where messaging is enabled.
4. Category: primary "Wedding planner". Add "Florist" or "Wedding service" only if florals are sold as a standalone service; otherwise leave the single category.
5. Save. Some edits go into review; do not resubmit repeatedly. Capture the Performance baseline (Fix 06) before step 1.

## Listing-by-listing worksheet

Observed values are from search snippets on 2026-09-28; open each listing to confirm before editing. "Fix" is what to change to match the target record.

| Listing | Observed (PUBLIC CLAIM) | Fix | Owner login needed |
|---|---|---|---|
| Google Business Profile | UNKNOWN (not visible from this session) | Audit first: name, category, address/service area, phone, website (non-www), hours, services, description, photos. Capture Performance data as baseline before editing (Fix 06) | Google account that owns the profile |
| Website `/contact` and footer | info@ email, 619.248.0786, "San Diego, La Jolla & Coronado" | Show "San Diego, CA" with no street address; phone 619-248-0786; email info@. Keep "La Jolla & Coronado" only if the Fact Register confirms the service area | CMS |
| Yelp | Title says "San Diego"; URL slug says "chula-vista"; 24 reviews, 240 photos | Set city to San Diego; choose "I serve customers at their location" and hide the street address; website non-www; email info@; services per D4 default. Do not gate or solicit reviews | Yelp for Business |
| WeddingWire | URL slug "chula-vista"; page title says "San Diego, CA"; 5.0 / 10 reviews | Set city to San Diego, no street address; website non-www; services per D4 default | WeddingWire vendor account |
| The Knot | "San Diego, CA"; services text includes day-of, month-of, selfie mirror, styling, rentals | Keep city; rewrite services to the D4 default and delete selfie mirror, styling, rentals unless still sold; website non-www; email info@ | The Knot vendor account (same login as WeddingWire) |
| PartySlate | "Chula Vista Event Planner", 239 photos | Change city to San Diego; website non-www | PartySlate account |
| Nextdoor | **Two pages observed:** `/pages/bella-mia-exclusive-events-san-diego-ca/` and `/pages/bella-mia-exclusive-events-chula-vista-ca/` | Claim both, keep the San Diego page, request removal or merge of the Chula Vista page. Duplicate listings are a local-SEO liability | Nextdoor business account |
| BBB | 3374 Clavelita St, San Diego 92154; started 4/22/2014; President Ivanna Contreras; not accredited | Ask BBB to mark the address as not displayed publicly (BBB keeps a physical address on file); set email to info@ and website to non-www | BBB business login |
| Style Me Pretty vendor profile | "Southern California" description | Add "San Diego" to the location, website non-www | SMP account |
| Facebook page | "San Diego CA" | Confirm address/phone/email/website per target | Page admin |
| Instagram bio | UNKNOWN | Website link to non-www host; city in bio | Account |
| LinkedIn company page | UNKNOWN | Website non-www; HQ D1 | Admin |
| TikTok | UNKNOWN | Website non-www | Account |
| ZoomInfo, wedding-usa.nears.me, and other scraped directories | ZoomInfo indexes `/untitled-c1izt`; nears.me shows a 92108 zip and hours | Low priority. Claim/correct only if it takes under 10 minutes each; they follow the primary sources over time | Varies |

## Order

1. D1–D3 are decided. Confirm D4 with Prestige and D5 with Concierge, or apply the defaults above.
2. Google Business Profile first (audit, baseline, then edit).
3. Website contact/footer.
4. Yelp, WeddingWire, The Knot, PartySlate (the ones couples actually use).
5. Nextdoor duplicate.
6. BBB, SMP, social.

Log every edit with the date in `06-baseline-and-change-log.md`.
