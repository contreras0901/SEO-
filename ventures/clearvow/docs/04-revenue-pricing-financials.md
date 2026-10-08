# Deliverable 4: Revenue streams, pricing strategy, and 36-month financial scenarios

All prices are hypotheses to be tested in the validation stage (Deliverable 10). All financial figures are ASSUMPTION-driven outputs of `../model/financial_model.py`, which anyone can edit and re-run. No verified market data is used in the model; the inputs are our choices, labeled in the script.

## 1. Revenue streams (prioritized)

| # | Stream | Who pays | Price hypothesis | Gross margin | Operating requirement | Customer value | Launch stage |
|---|---|---|---|---|---|---|---|
| 1 | **Pro subscription** | Vendors | $59/mo or $590/yr; founding-vendor rate $39/mo for the first 50 in each metro | ~90% | Profile review, pricing-data moderation, support | Unlimited verified inquiries, analytics, "Price-Honest" badge, 10 real-wedding submissions/yr | MVP |
| 2 | **Verified inquiry unlock** | Free-tier vendors | $15 per inquiry, vendor sees date, venue, guest count, budget band, and category before unlocking; refund if the couple never replies within 7 days | ~85% after verification costs (SMS, email) | Inquiry verification pipeline, refund policy | Pay only for what you use; no commitment | MVP |
| 3 | **Preferred subscription** | Vendors | $149/mo or $1,490/yr | ~90% | Editorial time for real-wedding features | Top-of-category placement, unlimited submissions, expedited publishing, Spotlight eligibility | MVP (pricing shown; sold manually at first) |
| 4 | **Spotlight placements** | Vendors and venues | $249/mo per slot, capped at 3 per city and category; venue Spotlight $399/mo | ~95% | Sales effort | Guaranteed above-the-fold placement on category and venue pages | Month 4+ |
| 5 | **Couple-side partner revenue** | Partners (invitation, website, registry, insurance, travel) | Affiliate or flat partner fee; modeled at $0.60 to $1.20 per active couple per month | ~100% | Partnerships | Vetted offers inside the planning dashboard; never sells couple data | Month 6+ |
| 6 | **Vendor tools (CRM-lite)** | Paid vendors | $29/mo add-on; payments at cost plus 0.5% | ~80% | Significant build | Proposals, contracts, deposits, shared timeline, from the same inbox | Year 2 to 3 |
| 7 | **Data and insights** | Venues, vendors, industry | Annual metro price report (free as marketing); paid custom reports later | high | Analyst time | Benchmarks for pricing | Year 3 |

**Explicitly rejected:** white-label, API licensing, enterprise licensing, booking commissions (vendors distrust them and they invite disintermediation), paid couple memberships, and selling couple data. None of these would be paid for by customers in the first 36 months at a level worth the complexity.

## 2. Pricing logic

- Pro at $59 sits between Carats + Cake ($35 to $45) and Loverly ($99 to $199) and well under The Knot's REPORTED metro placements. It must deliver at least four verified inquiries per month per vendor to be an easy "yes" (a $15 unlock would cost $60 for the same four).
- Inquiry unlocks are priced near Zola's REPORTED ~$13.50 per connection but with full inquiry visibility before paying and a no-reply refund, which is the trust difference.
- Preferred and Spotlight are capped on purpose. Scarcity keeps placement meaningful and keeps ranking honest for free and Pro vendors.
- Annual plans with two months free reduce churn; that is the main lever in the base and aggressive cases.

## 3. Unit economics (ASSUMPTION)

| Metric | Conservative | Base | Aggressive |
|---|---|---|---|
| Blended paid ARPU (monthly) | $66 | $72 | $78 |
| Monthly paid churn | 6.0% | 4.5% | 3.5% |
| Implied paid lifetime (months) | 17 | 22 | 29 |
| Paid vendor LTV (gross, before CAC) | ~$1,100 | ~$1,600 | ~$2,230 |
| Vendor CAC target | $150 | $200 | $300 |
| Cost per verified couple inquiry (paid search) | $25 | $18 | $15 |
| Couple accounts converting to at least one inquiry | 35% | 45% | 50% |

## 4. Cost stack (ASSUMPTION)

Year-1 monthly: founder stipend $4k to $6k from month 7; contract engineer $3k to $6k; content $0.8k to $2k; paid marketing $0.5k to $2.5k; infrastructure $350 to $600 plus about $1.20 per paid vendor (hosting, email, SMS verification, search, AI calls). Year-2 and year-3 costs step up with hires (engineering, vendor success, sales). Payment processing 3.2% of revenue.

## 5. Scenario outputs

## Scenario summary (36 months)

| Scenario | First profitable month | Cash trough (capital needed) | Y1 revenue | Y2 revenue | Y3 revenue | Month-36 MRR | Month-36 paid vendors | Month-36 couple accounts |
|---|---|---|---|---|---|---|---|---|
| Conservative | 32 | $-196,867 | $20,328 | $106,755 | $306,213 | $34,604 | 337 | 10,080 |
| Base | 20 | $-123,451 | $56,007 | $365,072 | $1,268,734 | $156,148 | 1,430 | 34,800 |
| Aggressive | 11 | $-159,444 | $136,128 | $1,242,226 | $4,990,046 | $632,484 | 5,429 | 113,700 |

### Conservative: quarterly detail

| Quarter | Markets | Free vendors | Paid vendors | Couples | Quarter revenue | Quarter opex | Quarter net | Cumulative cash |
|---|---|---|---|---|---|---|---|---|
| Q1 | 1 | 57 | 3 | 180 | $2,188 | $14,026 | $-11,838 | $-11,838 |
| Q2 | 1 | 111 | 9 | 360 | $3,768 | $14,095 | $-10,327 | $-22,164 |
| Q3 | 1 | 162 | 18 | 540 | $5,905 | $26,193 | $-20,288 | $-42,452 |
| Q4 | 1 | 211 | 29 | 720 | $8,467 | $26,312 | $-17,845 | $-60,297 |
| Q5 | 2 | 344 | 46 | 1,440 | $17,058 | $51,239 | $-34,181 | $-94,478 |
| Q6 | 2 | 471 | 69 | 2,160 | $22,834 | $51,500 | $-28,666 | $-123,144 |
| Q7 | 2 | 593 | 97 | 2,880 | $29,637 | $51,813 | $-22,176 | $-145,320 |
| Q8 | 2 | 711 | 129 | 3,600 | $37,226 | $52,166 | $-14,941 | $-160,261 |
| Q9 | 3 | 941 | 169 | 5,220 | $55,981 | $79,900 | $-23,919 | $-184,179 |
| Q10 | 3 | 1,161 | 219 | 6,840 | $68,734 | $80,476 | $-11,742 | $-195,921 |
| Q11 | 3 | 1,375 | 275 | 8,460 | $83,019 | $81,128 | $1,891 | $-194,031 |
| Q12 | 3 | 1,583 | 337 | 10,080 | $98,479 | $81,840 | $16,639 | $-177,392 |

Month-36 revenue mix: subscriptions $22,257, inquiry unlocks $3,561, spotlights $4,482, couple partners $3,326, vendor tools $978.

Assumptions: Vendor growth relies on founder network and SEO only; paid ads minimal. Paid conversion 2.5%/mo of free base; churn 6%/mo (close to small-directory norms). One market per year.

### Base: quarterly detail

| Quarter | Markets | Free vendors | Paid vendors | Couples | Quarter revenue | Quarter opex | Quarter net | Cumulative cash |
|---|---|---|---|---|---|---|---|---|
| Q1 | 1 | 97 | 8 | 360 | $4,300 | $21,604 | $-17,303 | $-17,303 |
| Q2 | 1 | 184 | 26 | 720 | $9,005 | $21,807 | $-12,802 | $-30,106 |
| Q3 | 1 | 264 | 51 | 1,080 | $15,376 | $37,093 | $-21,716 | $-51,822 |
| Q4 | 2 | 436 | 89 | 1,800 | $27,326 | $37,595 | $-10,269 | $-62,091 |
| Q5 | 2 | 648 | 147 | 3,300 | $46,885 | $90,305 | $-43,419 | $-105,510 |
| Q6 | 3 | 970 | 230 | 5,550 | $73,590 | $91,426 | $-17,836 | $-123,346 |
| Q7 | 3 | 1,266 | 339 | 7,800 | $102,160 | $92,704 | $9,456 | $-113,891 |
| Q8 | 4 | 1,668 | 477 | 10,800 | $142,437 | $94,453 | $47,984 | $-65,907 |
| Q9 | 4 | 2,153 | 652 | 15,600 | $207,009 | $214,102 | $-7,093 | $-73,000 |
| Q10 | 5 | 2,760 | 870 | 21,600 | $275,506 | $217,025 | $58,481 | $-14,519 |
| Q11 | 5 | 3,326 | 1,129 | 27,600 | $347,897 | $220,227 | $127,670 | $113,150 |
| Q12 | 6 | 4,015 | 1,430 | 34,800 | $438,324 | $224,151 | $214,173 | $327,323 |

Month-36 revenue mix: subscriptions $102,955, inquiry unlocks $15,056, spotlights $13,446, couple partners $17,226, vendor tools $7,464.

Assumptions: Six metros by month 34; each new metro seeded with a local launch partner (planner or venue). Paid conversion 4%/mo; churn 4.5%/mo, helped by annual plans and inquiry value. Vendor tools (CRM-lite) launch in year 3 at 18% attach.

### Aggressive: quarterly detail

| Quarter | Markets | Free vendors | Paid vendors | Couples | Quarter revenue | Quarter opex | Quarter net | Cumulative cash |
|---|---|---|---|---|---|---|---|---|
| Q1 | 1 | 134 | 16 | 600 | $7,867 | $41,083 | $-33,216 | $-33,216 |
| Q2 | 1 | 250 | 50 | 1,200 | $17,623 | $41,498 | $-23,875 | $-57,091 |
| Q3 | 2 | 486 | 114 | 2,400 | $38,647 | $60,361 | $-21,713 | $-78,804 |
| Q4 | 3 | 827 | 223 | 4,200 | $71,990 | $61,762 | $10,228 | $-68,576 |
| Q5 | 4 | 1,477 | 413 | 9,600 | $144,313 | $226,652 | $-82,339 | $-150,916 |
| Q6 | 5 | 2,235 | 705 | 16,350 | $235,540 | $230,497 | $5,043 | $-145,873 |
| Q7 | 6 | 3,096 | 1,104 | 24,450 | $355,869 | $235,655 | $120,214 | $-25,659 |
| Q8 | 7 | 4,053 | 1,617 | 33,900 | $506,504 | $242,184 | $264,320 | $238,661 |
| Q9 | 8 | 5,534 | 2,296 | 50,700 | $780,856 | $622,189 | $158,666 | $397,327 |
| Q10 | 9 | 7,099 | 3,161 | 69,600 | $1,057,348 | $633,930 | $423,418 | $820,745 |
| Q11 | 10 | 8,753 | 4,207 | 90,600 | $1,386,014 | $647,996 | $738,018 | $1,558,764 |
| Q12 | 11 | 10,501 | 5,429 | 113,700 | $1,765,828 | $664,340 | $1,101,488 | $2,660,252 |

Month-36 revenue mix: subscriptions $423,483, inquiry unlocks $55,129, spotlights $39,468, couple partners $75,042, vendor tools $39,362.

Assumptions: Assumes a seed round (~$750k-$1.5M) by month 9 to fund sales and 11 metros. Paid conversion 5.5%/mo; churn 3.5%/mo. These are top-quartile marketplace numbers. Requires the qualified-inquiry promise to hold at scale; biggest execution risk.


## 6. How to read the scenarios

- **Conservative** is the "founder network plus SEO, no sales hire" path. It never needs a large round, but it is slow: monthly profitability arrives only in month 32 and the cash trough is about $197k. It is survivable but is not a venture-scale outcome.
- **Base** is the plan this blueprint is built around. It needs about $125k to $150k of cash (founder capital plus a small friends-and-family or revenue-based note), turns monthly profitable around month 20, and exits month 36 at roughly $156k MRR with about 1,430 paying vendors across six metros.
- **Aggressive** requires a seed round and the qualified-inquiry promise holding at scale. It is presented to show the ceiling, not to plan against.

## 7. Break-even math for San Diego alone

With the base cost stack for year 1 (about $7k per month before founder stipend, about $12k with it), San Diego alone breaks even at roughly 170 to 200 paying vendors at $72 ARPU, or about 110 paying vendors plus 25 Spotlight slots. ASSUMPTION: San Diego has 2,500 to 4,000 active wedding vendors (INFERENCE from The Knot's REPORTED national count of ~200,000 across ~380 metros, weighted for a large market). A 5 to 8 percent paid penetration is required. That is achievable but not automatic; it is the central validation question.

## 8. Sensitivities that matter most (in order)

1. Monthly paid churn. Moving base churn from 4.5% to 6% cuts month-36 MRR by roughly a third.
2. Paid conversion from free profiles. This depends entirely on inquiry volume per vendor, which depends on couple traffic, which depends on SEO and content speed.
3. Metro launch cadence. Each new metro costs about $15k to $25k in content and launch-partner work before it pays back.
4. Pricing. Pro at $79 instead of $59 lifts revenue ~25% if conversion holds; test in metro two, not metro one.
