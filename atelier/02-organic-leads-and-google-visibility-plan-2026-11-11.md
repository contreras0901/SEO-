# Atelier Launch Co.: organic leads and Google visibility plan

**Prepared by:** Rank (AI), Atelier SEO & Search Director, 2026-11-11
**Asset:** `atelierlaunchco.com` (single-page site on Netlify; domain registered 2026-09-10)
**Status:** PROVISIONAL SEO RECOMMENDATION, NOT YET ATELIER POLICY. Internal CEG project work. Nothing here has been changed on the live site or any listing. Facts observed on the site are PUBLIC CLAIM, NOT YET INTERNAL CEG FACT.
**Companion:** `README.md` and `site/` in this folder (the deploy-ready technical fix kit from earlier today).

---

## 0. Escalations (read first)

1. **Claim risk on the live site.** The Testimonials section presents Bella Mia Exclusive Events and Ethereal Luxury Restrooms as clients ("In their words", "Alex, Ethereal Luxury Restrooms"), and the stats bar says "3 Brands launched & growing". Both companies are CEG companies owned by the Founder. Work on them is INTERNAL CEG PROJECT work, not client work. Presenting it as client testimonials without disclosing the ownership connection is an endorsement-disclosure risk (consumer-protection rules on endorsements with a material connection) and a trust risk if a prospect finds out. Recommended fix: keep the case studies, reframe them as "Brands we built in-house" with a one-line disclosure, and retire the quotation format until a real external client gives one. Legal specifics go to a qualified professional. **FOUNDER DECISION REQUIRED.**
2. **Business-formation claims.** "We form businesses in all 50 states", "LLC or corporation filing", "operating agreement guidance". Whether a non-attorney may offer these services, and how they must be described, is a legal question for a qualified professional before more search traffic lands on these claims. Not an SEO question, flagged because SEO work would amplify it.
3. **Google Business Profile eligibility is in doubt.** Verified today on Google's eligibility page (support.google.com/business/answer/13763036, fetched 2026-11-11): "a business must make in-person contact with customers during its stated hours"; "online-only businesses" and "lead generation agents or companies" are ineligible; a P.O. box or remote mailbox address is not allowed. The site's FAQ says consultations, reviews, and training "happen over video". As described, Atelier reads as online-only and would not be eligible. If the Founder does meet clients in person in San Diego, it can be set up as a service-area business with the address hidden. **FOUNDER DECISION REQUIRED (see section 8).** Do not create a profile with a mailbox address or a keyworded name.
4. **Measurement gap.** No Search Console, no analytics, no tracking code, no lead-source capture. Until the fix kit is deployed and Search Console is verified, nothing in this plan can be measured.

---

## 1. Business objective

Qualified consultation requests from first-time founders (and existing small businesses needing a site plus SEO), at the package prices shown on the site ($1,450 / $4,800 / $7,500, PUBLIC CLAIM, Ledger has not validated them). Owner: Founder. Capacity claim on site: "one client at a time", so the target is a steady few qualified inquiries a month, not volume.

## 2. Search objective

Move the site up the outcome hierarchy in order: **indexation (currently failing) → branded visibility → commercial visibility for a small set of buyer-intent queries → consultation requests with lead source captured.**

## 3. Baseline

**NO BASELINE. Capture first.** No Search Console property, no analytics, no Business Profile, no lead log. The fix kit deploy plus Search Console verification is the baseline step; expect every metric to start at zero or near zero, which is normal for a two-month-old domain.

## 4. Current visibility (all OBSERVED SEARCH SIGNAL, 2026-11-11, web-search tool, not a Google ranking position)

| Search | What appeared | Reading (INFERENCE) |
|---|---|---|
| `"Atelier Launch Co"` (branded) | No result for the business; unrelated "Atelier" companies, games, and a beauty platform. | The site is not surfacing even for its own name. For a referral-driven business this is the most expensive gap: anyone who hears the name and Googles it finds nothing. |
| `site:atelierlaunchco.com` | No pages from the domain. | Not an index count, but consistent with the site not being discovered yet: no sitemap, no Search Console, no known inbound links, and the canonical pointing at a redirecting `www` address. |
| "LLC formation and website design package for new business" | Dominated by ZenBusiness and other national filing services. | Not a winnable query for a new studio site. STOP: do not target "LLC formation" head terms. |
| "web designer for new small business San Diego" | Agency pages (Solazzo, SD Web Co, CyberOptik, Emulent, Envisager) plus directories (Clutch, DesignRush, Semrush Agency Partners, UpCity, Gartner). | Competitive, but half the first page is directories, which a new business can be listed in within days. |
| "business launch consultant San Diego" | SBDC, CSUSM, Thumbtack, Upwork, Clutch, DesignRush. | Mixed intent; marketplaces and free government resources dominate. Low priority as a page target; high value as a listing and partnership channel. |
| "local SEO services for small business San Diego" | Established agencies and directories. | Very competitive. Atelier's SEO service should be sold through the "founder launch" angle and through the audit lead magnet, not by competing head-on for "San Diego SEO agency". |
| "how to start a business in San Diego, LLC, website, first steps" | City of San Diego guides, SBDC, Accessity, Golden Hill CDC, LLC services' blogs. | Informational intent with an official-source top. A genuinely useful founder guide can earn visibility here and feeds the checklist lead magnet. |

## 5. Technical findings (prioritized)

| ID | Finding | Priority | Fix | Owner |
|---|---|---|---|---|
| T1 | Canonical and og:url point to `www`, which 301s to non-www. Google receives a canonical that redirects away. | BLOCKING | In the fix kit (`site/index.html`). | Founder deploys |
| T2 | No `sitemap.xml`, no `robots.txt`, no Search Console property, so Google has no discovery path beyond chance. | BLOCKING | Fix kit has both files; Founder verifies Search Console (DNS TXT at Namecheap) and submits the sitemap; request indexing for the homepage with URL Inspection. | Founder |
| T3 | No analytics or tracking tag of any kind. | HIGH | HubSpot tracking code is in the fix kit; add GA4 once the Measurement ID is supplied. | Founder |
| T4 | Single-page site: Services, SEO, Formation, Packages, FAQ, and the Journal are all anchors on one URL. One page can only match one primary intent. The Journal teasers ("LLC or sole proprietorship?") are not real pages. | HIGH | Section 6 page plan. | Rank drafts, Founder approves |
| T5 | Conversion path: "Book a consultation" resolves to a `mailto:` link, and the checklist form relies on Netlify form detection on a drag-and-drop deploy. Neither lands in HubSpot, neither captures lead source. | HIGH | Replace with a HubSpot form (consultation request with a "How did you find us?" field) and a scheduling link; confirm the checklist form actually delivers. | Founder, Forge for the intake flow |
| T6 | Page weight 880 KB of inline HTML/CSS/SVG on one URL. | MEDIUM | Acceptable for now; revisit when the site is split into pages. | Later |
| T7 | Existing `ProfessionalService` schema names the business and founder; no `url`, `sameAs`, or service-area fields, and FAQ schema would not earn rich results for this business type (CURRENT PLATFORM POLICY NOT YET VERIFIED for FAQ eligibility; last known: restricted to government and health sites). | LOW | Tidy once pages exist. | Later |

## 6. Content and page plan (query-to-page map, PROVISIONAL)

Principle: one primary intent per page; every page must be substantive enough that a founder would bookmark it. No mass city or state pages (the "all 50 states" claim does not justify 50 pages; the location-page test fails for every one of them).

| Cluster | Example queries (customer language first) | Intent | Target page | Priority |
|---|---|---|---|---|
| Branded | atelier launch co, atelier launch co san diego, yvanna contreras web design | NAVIGATIONAL | Homepage, About page, directory listings | DO NOW |
| Founder launch bundle | "start a business and get a website", "everything to launch my business", "llc and website done for me" | COMMERCIAL INVESTIGATION | `/the-full-launch/` (package page with scope, timeline, what you get, honest disclosures) | NEXT |
| Website design for new businesses (San Diego) | "web designer for new business san diego", "custom website for small business san diego" | COMMERCIAL / LOCAL | `/website-design/` with a San Diego section; one page, not city pages | NEXT |
| SEO for new and small businesses | "local seo for new business", "google business profile setup service", "seo audit for small business website" | COMMERCIAL | `/seo/` (local SEO, audit, AI search visibility) with the instant estimate | NEXT |
| Formation + first-year plan | "help forming an llc and business plan san diego", "business formation consultant" | COMMERCIAL | `/business-formation/` (only after the legal review in escalation 2) | NEXT, gated |
| First-time founder questions | "llc or sole proprietorship for a new business", "do i need an llc before building a website", "how long does it take to launch a business", "how to start a business in san diego" | INFORMATIONAL | `/journal/` with the 4 to 6 articles the homepage already teases, each ending in the checklist offer | NEXT |
| Case studies | "small business website before and after", brand-name searches for Bella Mia / Ethereal | COMMERCIAL / NAVIGATIONAL | `/work/bella-mia/`, `/work/ethereal/` with the in-house disclosure | LATER |

Cannibalization risk: the homepage currently tries to cover every cluster. After the split, the homepage targets branded and "founder launch bundle" only.

## 7. Where the first organic leads realistically come from (next 90 days)

A two-month-old domain with no links will not outrank established agencies for "San Diego web design" in 90 days, and nothing here promises that. The realistic early channels, in order of expected contribution (all HYPOTHESIS):

1. **Branded search that actually works.** Referrals from the Bella Mia and Ethereal networks Google the name. Fixing indexation (T1, T2) and building an About page is what makes those referrals convert.
2. **Directory and marketplace listings that already rank.** Clutch, DesignRush, UpCity, Semrush Agency Partners, and Yelp appear on page one for the commercial queries above. Create accurate, complete listings (same name, phone, website everywhere). Free tiers first; no paid directory placement without Ledger.
3. **The checklist lead magnet plus the Journal.** Informational founder queries have an official-source SERP but room for a genuinely practical guide. Each article links to "The Complete Launch Checklist", which captures an email into HubSpot and starts a nurture sequence.
4. **Genuine local links and partnerships.** SBDC, San Diego Regional Chamber, Accessity, Golden Hill CDC, and startup events appear in the "start a business in San Diego" SERP. A real relationship (workshop, resource listing, guest guide) earns a real link. No paid links, no link schemes.
5. **Google Business Profile, only if eligible** (escalation 3). If eligible, it becomes the main local channel and the first place to collect compliant reviews from real external clients.
6. **AI search visibility.** Consistent business details across the web, clear service pages, and real case studies are what make the site citable. Never promise inclusion in AI answers; the site's own AI/LLM SEO copy should be reviewed for implied guarantees ("makes sure that answer is you" is one).

## 8. Priorities

**DO NOW (this week, Founder, about 3 hours)**
1. Deploy `atelier/site/` to Netlify (README steps).
2. Verify Search Console as a Domain property via Namecheap DNS TXT; submit the sitemap; run URL Inspection on the homepage and request indexing.
3. Send the GA4 Measurement ID (or decide to rely on HubSpot only).
4. Decide the three escalations: testimonial disclosure, formation-claims legal review, in-person meetings (GBP eligibility).
5. Replace the mailto consultation link with a HubSpot form that asks "How did you find us?"; confirm the checklist form delivers.
6. Create listings: Clutch, DesignRush, UpCity, Yelp, Bing Places, with identical name, phone, email, website.

**NEXT (weeks 2 to 8, Rank drafts, Founder approves each page)**
7. Split the site into the pages in section 6, starting with About, The Full Launch, Website Design, SEO.
8. Publish the four Journal articles already teased on the homepage, human-reviewed, specific, with the checklist CTA.
9. Build the in-house case study pages with disclosure.
10. Start the HubSpot nurture sequence for checklist downloads (Vanguard and Acquire lens; INPUT NEEDED, not yet performed).

**LATER (quarter 2)**
11. Compliant review requests once real external clients exist.
12. Schema tidy-up, performance work, AI-visibility measurement from Search Console's generative-AI report where available.

**STOP / DO NOT**
- City or state pages at scale ("all 50 states").
- AI-generated volume blogging.
- Targeting "LLC formation" or "San Diego SEO agency" head terms.
- Buying an SEO tool now: no named decision needs one yet (tool-spend test fails).
- Any guarantee language on the site or in proposals.

## 9. Measurement (PROVISIONAL)

| Level | KPI | Source | Review |
|---|---|---|---|
| Indexation | Homepage and each new page indexed | Search Console URL Inspection, Page indexing | Weekly until green |
| Visibility | Impressions for branded and the 4 commercial clusters | Search Console Performance | Monthly |
| Engagement | Clicks; directory profile views | Search Console; directory dashboards | Monthly |
| Conversion | Consultation requests and checklist downloads with lead source | HubSpot forms | Monthly |
| Commercial | Signed engagements by lead source and value | HubSpot deals, Ledger | Quarterly |

Change log: `atelier/README.md` section 5 and this folder. First review date: 2026-12-11. Thresholds: by day 30, homepage indexed and branded search shows the site; by day 90, at least one consultation request with lead source "Google". These are provisional checkpoints, not promises.

## 10. Risks and limitations

- Rank could not see Search Console, analytics, or any inbound-link data; "not indexed" is an inference from the fix kit findings and today's search observations.
- Web-search observations are one moment, one tool, no location set. Not rankings.
- Lead attribution stays UNKNOWN until the form captures lead source.
- Small numbers: a one-client-at-a-time studio will never have statistically meaningful search data; read trends directionally.

## 11. Founder decisions required

1. Testimonial disclosure and "3 brands" wording (recommended: in-house framing with disclosure).
2. Legal review of formation-service claims before more traffic (recommended: yes, before the formation page is built).
3. In-person client contact in San Diego, yes or no (determines whether a Business Profile is allowed).
4. Approve the page split in section 6 (recommended: yes, four pages first).
5. GA4 Measurement ID, or HubSpot-only tracking (recommended: both).
