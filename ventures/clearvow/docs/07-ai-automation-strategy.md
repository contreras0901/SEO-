# Deliverable 7: AI, automation, and advanced feature strategy

Principle: AI is used where it removes a measurable cost or raises a measurable conversion, and nowhere else. Every AI feature below has a non-AI fallback so the product works when the model is down or the budget is cut. Model calls go through one internal service with logging, cost caps, and prompt versioning.

## 1. Capability evaluation

| Capability | Customer benefit | Business value | Complexity | Monthly operating cost at 10k couples | Risks | Verdict |
|---|---|---|---|---|---|---|
| **Structured inquiry drafting** (turn the couple's structured answers plus a free-text note into a clean brief; suggest the three most useful questions for that category) | Better inquiries, less typing | Higher vendor reply rate; the core quality promise | Low | $20 to $60 | Over-polished briefs look templated to vendors; keep the couple's own words visible | Launch |
| **Inquiry verification and fraud scoring** (rules first: disposable email domains, phone type, velocity, duplicate text; a model only for free-text spam) | Vendors trust inquiries | Protects the one thing that differentiates us | Low to medium | $10 to $30 plus SMS costs | False positives block real couples; always allow manual review | Launch (rules); model in phase 3 |
| **Budget-aware matching** ("Vendors who fit your budget and date, ranked by response rate and quote-match") | Shortlist in seconds | Higher inquiry rate; fair ranking without pay-to-play | Low (it is scoring, not generative AI) | ~$0 | Ranking opacity complaints; publish the ranking rules | Launch |
| **Review and real-wedding summaries** ("What couples say about this photographer") | Faster evaluation | Longer sessions, more inquiries | Low | $30 to $100 | Hallucinated claims; summaries must quote sources and be regenerated on new reviews only | Phase 3 |
| **Vendor reply assistant** (drafts a reply from the brief and the vendor's packages; vendor edits) | Faster responses | Response time is a trust signal; this directly moves it | Low | $20 to $80 | Vendors sending unread AI replies; require an edit or explicit confirm | Phase 3 |
| **Price anomaly and staleness detection** (flag $0, outliers, 180-day-old prices) | Trustworthy prices | Protects Price-Honest | Low (statistics) | ~$0 | None material | Launch |
| **Style and visual search** (embed gallery images; "show me weddings like this") | Discovery | Content engagement; Carats + Cake's "Cherry" proves demand | Medium | $50 to $200 (embeddings plus vector search) | Cost scales with images; defer until 500+ real weddings | Phase 3 |
| **Automated support** (FAQ bot for vendors on billing and profile) | Instant answers | Support cost | Low | $20 to $50 | Wrong billing answers; scope to documented FAQs | Phase 3 |
| **Predictive analytics for vendors** ("You are likely to get 6 to 9 inquiries in May at your current price") | Planning | Retention and upgrade | Medium | ~$0 (statistics) | Requires 12 months of data | Phase 4 |
| **Lead routing** (round-robin to similar vendors when one does not reply in 48h) | Couples get answers | Inquiry fulfillment rate | Low | ~$0 | Vendors perceive it as leakage; make it opt-in for the couple | Phase 3 |
| **Content generation** (auto-draft price guides from listing data; real-wedding captions from credits) | More pages, faster | SEO at low cost | Low | $50 to $150 | Thin content; every page must contain live data tables and human-edited intros | Launch for price guides (data-first), phase 3 for captions |
| **CRM and lifecycle automation** (segmented email: new real wedding at your venue; vendors: monthly analytics digest) | Relevance | Retention | Low (no AI needed) | Email provider cost | Over-emailing | Launch |
| **Fraud and trust for reviews** | Real reviews | Trust | Low (rules: only inquiry-linked reviewers) | ~$0 | | Launch |
| **Full AI planner chat** ("plan my wedding") | Novelty | Low; The Knot already ships this inside ChatGPT | High | High | Expensive, undifferentiated | Reject for 36 months |
| **AI-generated imagery or inspiration boards** | Novelty | Low; conflicts with "real weddings only" | Medium | Medium | Brand damage | Reject |

## 2. Launch set (MVP)

1. Structured inquiry drafting with category-specific questions (model-assisted, deterministic fallback).
2. Rule-based inquiry verification (email + SMS, disposable-domain list, velocity limits).
3. Budget-aware, response-aware ranking with published rules.
4. Price anomaly and staleness flags.
5. Data-driven price guides.
6. Lifecycle email.

Everything in the launch set other than inquiry drafting works without a model. Inquiry drafting uses the Claude API (claude-sonnet-5-5 for drafting, claude-haiku-5-5 for classification) behind a single `lib/ai.ts` module with a cost ceiling per day and a feature flag.

## 3. Ranking rules (published on `/trust`)

Directory order within a category and city: Spotlight slots (max 3, labeled "Sponsored") first; then vendors sorted by a score of response rate (40%), quote-match rate (25%), profile completeness (15%), recency of price confirmation (10%), and real-wedding credits (10%). Paid plan does not affect the score; Preferred gets a visual badge and eligibility for Spotlight, not a ranking lift. This is a deliberate choice against Loverly's "boosted placement" and The Knot's pay-to-rank, and it is the reason couples will trust the list.

## 4. Operating cost ceiling

ASSUMPTION: AI spend capped at 3% of monthly revenue after month 6, with a hard daily cap in code. At base-case month 36 revenue (~$156k), that is under $5k per month, well above the launch set's needs.
