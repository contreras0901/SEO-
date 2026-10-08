# Founder decision register: Clearvow

Save this file with every decision; the AI roles have no memory between sessions beyond what is written here.

## D-001: Clearvow is a side project serving the three income businesses, not a fourth business

- **Date:** 2026-10-08. **Company:** CEG portfolio (Clearvow is a candidate addition to CEG scope; not yet added to the governing documents).
- **Decision:** Founder time goes to Bella Mia, Ethereal, and Atelier for income; Clearvow receives about four hours a week. PROVISIONAL EXECUTIVE RECOMMENDATION, NOT YET CEG POLICY: roughly 60% of the working week on the income businesses, 10% on Clearvow.
- **Rationale:** The bootstrapped model shows Clearvow earning about $2,000 in its first quarter; the service and rental businesses can produce cash within weeks. Bella Mia's Business Profile (May to Sep 2026) shows 1,897 views but 6 calls and 0 bookings, so its binding constraint is conversion or offer, which is Founder time, not money.
- **Conditions:** No paid ads, no second metro, no engineer, no Preferred or Spotlight selling until a business pays the Founder.
- **Accepted risks:** Clearvow grows slowly; competitors could copy price transparency in San Diego first.
- **Owner:** Founder. **Review:** 2026-11-08. Continue Clearvow hours only if one income business produced cash in the window and 20 vendors have published prices; otherwise Clearvow becomes a weekend project.
- **Unknowns to close:** personal runway in months; Ethereal pipeline; whether Atelier has a paying client.

## D-002: Bella Mia and Ethereal are listed on Clearvow under identical rules, including competitors beside them

- **Date:** 2026-10-08. **Companies:** Bella Mia Exclusive Events, Ethereal Luxury Restrooms, Clearvow.
- **Decision:** Both are listed. Same published-price requirement, same ranking score, excluded from Spotlight by software, disclosure shown on each profile and on the About page.
- **Implemented:** `isHouseVendor` flag on the vendor record; `searchVendors` never marks a house vendor as sponsored; profile disclosure; About page names all three businesses; `scripts/list-house-vendors.ts` creates both profiles as drafts. Prices, packages, images, and the pledge signature are left for the Founder, because prices are a Founder decision and the go-live checklist blocks publication until they exist.
- **Accepted risks:** Competing San Diego planners and rental companies appear next to the house businesses with prices. A house business that is slow to reply or misses its published range loses rank like anyone else.
- **Owner:** Founder enters prices and signs the pledge in the vendor dashboard; admin approves like any other profile. **Review:** 2026-11-08.
- **Fact Register update required:** yes, if Clearvow is added to CEG scope: record the listing policy and the no-Spotlight rule.

## D-003: Atelier may contact vendors who claim a Clearvow profile, with disclosure before claiming

- **Date:** 2026-10-08. **Companies:** Atelier Launch Co., Clearvow.
- **Decision:** One contact per claimed vendor, using business contact details only. Disclosed on the claim page, in the terms (section 6), and on the About page. Declining has no effect on listing or ranking. Couple contact details and inquiry contents are never used.
- **Implemented:** terms section 6; claim-page disclosure line; About page section.
- **Accepted risks:** Some vendors will read the disclosure and not claim. The disclosure is the price of not being accused of a bait and switch in a small market.
- **Owner:** Founder (Atelier). **Review:** 2026-11-08: count claims, declines, and any complaints. **Policy update required:** Atelier outreach rule: one contact, business details only, decline honored permanently.
- **Counsel note:** the terms and privacy pages remain drafts pending counsel review; this section should be included in that review (CAN-SPAM for the Atelier email, and California privacy disclosures).
