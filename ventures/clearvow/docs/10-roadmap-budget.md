# Deliverable 10: Phased implementation roadmap with budget estimates

Budgets are ASSUMPTIONS in US dollars. Each stage has a decision gate; do not fund the next stage until the gate passes.

## Stage 1: Validation (weeks 1 to 8)

**Riskiest assumptions and the cheap tests for each**

| Assumption | Test | Pass criterion |
|---|---|---|
| Vendors will publish prices to be listed | Ask 60 San Diego vendors from the founder's network to claim a profile with prices on the live MVP | 40 of 60 publish within 14 days |
| Couples search price queries and will create accounts | $500 paid search on "[category] prices San Diego" to the category pages; organic baseline from 14 price guides | Cost per verified inquiry under $35; 20+ verified inquiries |
| Vendors value verified inquiries enough to pay | Offer the founding-vendor rate ($39/mo) to the first 50; sell unlocks to free vendors | 12 paying vendors or 40 unlocks in 30 days of inquiries flowing |
| Vendors reply fast enough to keep couples | Measure median first reply | Under 36 hours |
| Inclusivity pledge is not a blocker | Track pledge sign rate in the claim flow | 90%+ sign without objection |

**Deliverables:** the MVP in `../app/` deployed to Vercel and Neon; Stripe live; 150 claimed vendors; 10 real weddings; 14 price guides; analytics dashboard in admin.
**Team:** founder (product and vendor outreach, 15 hours/week), one contract engineer (10 hours/week for deploy, bugs, image upload), one content contractor (real weddings, 10 hours/week).
**Budget:** $8k to $14k (engineer $4k to $6k, content $2k to $3k, paid search $1k, infrastructure and tools $500, legal review of terms and privacy $1.5k to $3k).
**Risks:** founder bandwidth across three businesses; vendors treating it as "another directory"; slow indexing.
**Gate to Stage 2:** 100 live vendors with prices; 20 paying vendors or $1,000 MRR; 100 verified inquiries delivered; cost per verified inquiry under $30; vendor-reported inquiry quality 4 of 5 or better.

## Stage 2: Revenue-focused MVP hardening (months 3 to 6)

**Essential:** direct image upload (R2), Preferred plan self-serve, Spotlight slot management and billing, reply assistant for vendors (model-drafted, human-edited), review summaries, availability month on profiles, saved-vendor comparison table, data export and account deletion self-serve, Google sign-in, Lighthouse CI, Sentry, uptime monitoring, email digests.
**Optional (defer):** couple-submitted real weddings, visual search, vendor team seats, neighborhood pages.
**Team:** founder; engineer to 20 hours/week; content 15 hours/week; a part-time vendor success person (10 hours/week) from month 5.
**Budget:** $30k to $45k over four months.
**Dependencies:** Stage 1 gate; Stripe Billing portal live; legal sign-off on reviews and takedown policy.
**Risks:** feature creep; vendor churn after the founding-rate novelty; The Knot or Zola copying price display in San Diego (unlikely but watch).
**Gate to Stage 3:** $8k MRR; paid churn under 5%; 300 live vendors; 50% of inquiries replied within 48 hours; Orange County launch partner signed.

## Stage 3: Growth platform (months 7 to 18)

**Features:** metro two and three (Orange County, Los Angeles); vendor tools v1 (proposal and contract templates, e-signature via API, deposits via Stripe Connect) attached to inquiries; lead routing when a vendor does not reply in 48h (couple opt-in); predictive inquiry volume for vendors; affiliate program for planners and photographers; partner offers in the couple dashboard; Search Console reporting inside admin; Typesense search if listings exceed 20k.
**Team:** founder as CEO; a full-time engineer plus the contractor; a full-time vendor success and sales lead; content lead; part-time designer.
**Budget:** $180k to $260k over 12 months (base case burn). Financing: founder capital plus a revenue-based note or a small angel round of $150k to $300k.
**Dependencies:** metro playbook from Deliverable 9; vendor tools legal review (contracts, e-signature, payment holding).
**Risks:** metro launches without density; vendor tools distracting from the marketplace; payment compliance.
**Gate to Stage 4:** $60k MRR; three metros each with 150+ live vendors; vendor tools attach rate 15%+; net revenue retention above 100%.

## Stage 4: Category-leading platform (months 19 to 36)

**Features:** six metros; venue partnerships at scale (preferred-vendor lists hosted on Clearvow); annual metro price reports as PR; API for planners' CRMs; enterprise venue accounts (multi-property); visual search; AI review summaries at scale; vendor team seats; couple-submitted weddings; brand campaign.
**Team:** 8 to 14 people.
**Budget:** $600k to $1.2M over 18 months in the base case, funded from revenue plus a seed round if the aggressive path is chosen.
**Risks:** incumbents respond with price transparency; vendor tools competitors (HoneyBook) add marketplace features; brand dilution across metros.
**Success metrics:** $150k+ MRR; 1,400+ paid vendors; Price-Honest rate above 85% platform-wide; top-3 organic ranking for "[metro] wedding [category] prices" in every open metro.

## Decision gates summary

| Gate | Must be true | Who decides |
|---|---|---|
| Fund Stage 2 | 20 paying vendors; 100 verified inquiries; CPI under $30 | Founder with Ledger-style financial review |
| Fund Stage 3 | $8k MRR; churn under 5%; metro two partner signed | Founder and any investor |
| Open each new metro | Launch partner signed; 80 pre-claimed vendors; 10 weddings ready | Growth lead |
| Build vendor tools | 300 live vendors; 40% of Pro vendors asking for proposals or contracts in surveys | Founder |
| Raise a seed round | Base-case trajectory met for two consecutive quarters | Founder |
