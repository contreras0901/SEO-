# Fix 08 — Google names the wrong people as Bella Mia's founders

**Prepared by:** Rank (AI), 2026-10-29
**Founder instruction (2026-10-29):** "Remove Alejandro and definitely remove Erika and Julio, they are not the founders." Context: what Google shows for Bella Mia Exclusive Events.
**Correct fact (FOUNDER CONFIRMED, Fix 04 target record):** Bella Mia Exclusive Events has one founder, **Yvanna Contreras**, founder and lead planner, established 2014.
**Priority:** HIGH IMPACT (branded search accuracy; this is what a planner, hotel contact, or couple sees first)
**Status:** READY TO APPLY — all Founder decisions made (2026-10-30). Nothing below has been applied yet. Google-side steps need the Founder's Google account; the site step needs the Showit editor on the Founder's computer.

## What this session could and could not see

- VERIFIED 2026-10-29 (fetch of the live pages): the homepage now says `Meet Yvanna Contreras` / `Founder & lead planner` / "I'm Yvanna Contreras, founder and lead planner of Bella Mia Exclusive Events…" and mentions Erika & Julio only as "Pictured: Erika & Julio's estate wedding, planned, designed and catered by Bella Mia." The homepage JSON-LD carries `"founder": {"@type": "Person", "name": "Yvanna Contreras"}`.
- VERIFIED 2026-10-29: the About page still says "quality time with her husband **Alejandro** and her kids, Scarlett Isabella, Victoria Rose and Nicolas Alexander." That sentence is the only place "Alejandro" appears anywhere on the site or in this repository.
- **OBSERVED SEARCH SIGNAL, 2026-10-29, Founder's desktop screenshot of the branded Google result:** the names are in the **AI Overview**, under "Overview & Services": `Founders & Owners: Erika and Julio Ramirez.` The overview cites the site ("Bella Mia Exclusive Eve… +2" sources). The same overview also says `Specialties: … luxury hotel connections (such as The Westgate Hotel and Loews Coronado Resort)` and lists the office address and contact correctly. The Business Profile card on the right ("From Bella Mia Exclusive Events") shows the Fix 04 description and names nobody. **Alejandro does not appear in this screenshot.** If he shows up on another query, in AI Mode, or on mobile, send that screenshot too; the About page edit in section 2 covers him either way.
- A web search run from this session (2026-10-29, two queries) returned no founder names, which is expected: this tool does not render AI Overviews.
- INFERENCE on the "+2" sources: the overview is reading a stored copy of the pre-29-Sep homepage ("Meet Erika & Julio Ramirez" / "Read My Story") and the old "exclusive connections to … luxurious hotels" sentence (replaced 2026-09-29), blended with the Westgate and Loews real-wedding posts. The live post heading today is "ERIKA BATIZ & JULIO RAMIREZ WEDDING" with a first line that says Bella Mia planned and designed their celebration (verified by fetch 2026-10-29), which is client wording; nothing live calls them founders.

## 1. Where the names came from (INFERENCE, with the evidence)

| Name shown | Most likely source | Status of that source today |
|---|---|---|
| Erika, Julio | The pre-29-Sep homepage block **"Meet Erika & Julio Ramirez"** with a **"Read My Story"** button, which read exactly like a planner introduction (Atlas 2.5; runbook section 4). The Showit template "Erika Batiz & Julio Ramirez" and the page `/blog/erika-batiz-julio-ramirez/` carried the same two names with no "clients" wording. `analysis/competitor-ranking-2026-10-01.md` already recorded that the index "still reads the Erika & Julio block as the owner's name." | Fixed on the site 2026-09-29 and 2026-10-01 (block relabelled, page redirected to the real-wedding post). Google has not necessarily recrawled every URL; the wrong reading persists until it does. |
| Alejandro | The About page sentence naming "her husband Alejandro" in the paragraph about the owner. Entity extraction attaches people named in a business's "about" text to the business, and a husband named in the owner's bio is the classic false "co-founder." | Still live 2026-10-29. Needs the edit in section 2. |

Nothing in the repository or the live site calls any of the three a founder, owner, or planner. The error is Google's reading of old and ambiguous text, so the fix is: remove the ambiguity, ask Google to re-read, and file a correction on the surface that shows it.

## 2. Site edits (Showit, Founder's computer) — do first, same day

1. **About page, "Meet YVANNA" block, last paragraph.** Current text: `When she is not designing one of her bespoke events she enjoys, writing her book, traveling. But most of all quality time with her husband Alejandro and her kids, Scarlett Isabella, Victoria Rose and Nicolas Alexander. And all her little fur babies`
   Replace with: `When she is not designing one of her bespoke events she enjoys writing her book and traveling, and most of all quality time with her husband, her kids Scarlett Isabella, Victoria Rose and Nicolas Alexander, and all her little fur babies.`
   This removes Alejandro as instructed and keeps the kids' names (adults; **FOUNDER DECISION 2026-10-30: keep the names**). The founder sentence in step 2 is what tells Google who runs the business; the three names in a family sentence are a much weaker signal than a husband named in the owner's bio was, and they stay.
2. **About page, same block, add one plain-language sentence** directly under the `Meet YVANNA` heading or as the first line of the bio: `Yvanna Contreras founded Bella Mia Exclusive Events in 2014 and is its founder and lead planner.` One unambiguous sentence on the About page is what a knowledge panel and an AI feature quote; the current bio never says "founder" in the body text (only the meta description does).
3. **About page, Custom Head HTML (Showit SEO Settings), add Person structured data** so the founder is machine-readable on the page about her, not only on the homepage:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://bellamiaexclusiveevents.com/about#yvanna",
  "name": "Yvanna Contreras",
  "jobTitle": "Founder & Lead Planner",
  "worksFor": { "@id": "https://bellamiaexclusiveevents.com/#business" },
  "url": "https://bellamiaexclusiveevents.com/about"
}
</script>
```

   The `@id` matches the LocalBusiness block already live on the homepage (verified 2026-10-29). Structured data does not force any Google feature to change (CURRENT PLATFORM POLICY NOT YET VERIFIED for current eligibility rules); it removes one more reason to guess.
4. **Erika & Julio post** (`/2026/10/01/private-estate-wedding-san-diego-erika-and-julio/`): confirm the first paragraph says they were the couple, e.g. "Erika and Julio, Bella Mia clients, married at a private estate…". If the body still has `[FOUNDER FILL]` placeholders, that is a separate content item (`fixes/posts/erika-and-julio-private-estate-san-diego.md`); only the "clients" wording matters for this fix.
5. **Homepage:** no change needed. Keep `Meet Yvanna Contreras` / `Founder & lead planner` and the "Pictured: Erika & Julio's estate wedding" caption exactly as they are; they are now the correct signal.
6. Publish once, then run the checks in section 4.

## 3. Google-side steps (Founder's Google account) — same day as the publish

The screenshot shows an **AI Overview**, so **3b is the one to do.** 3a applies only if a knowledge panel with a "Founders" line appears later; 3c is a two-minute check while signed in.

**3a. Knowledge panel** (the box on the right of a desktop result, or the top card on mobile, with "Founders: …").
1. Signed in to the Google account that owns the Business Profile (currently `etherealluxuryrestrooms@gmail.com`, per the 2026-10-01 change-log entry; add `info@bellamiaexclusiveevents.com` as an owner first if that was not done), open the panel and click **Claim this knowledge panel** if it is offered. Verification normally rides on an already-verified property (the Business Profile, Search Console, or the official YouTube/Instagram account). (CURRENT PLATFORM POLICY NOT YET VERIFIED: the claim flow and its eligibility change; follow whatever the panel offers on the day.)
2. Once claimed, use **Suggest an edit** on the Founders line: mark each wrong name **Remove / Incorrect**, and in the explanation box write: `Bella Mia Exclusive Events has one founder, Yvanna Contreras (founded 2014). Erika and Julio were clients featured in a real-wedding story. Alejandro is not involved in the business. Source: https://bellamiaexclusiveevents.com/about`.
3. If the panel cannot be claimed, use **Feedback** at the bottom of the panel with the same text. Unclaimed feedback is reviewed more slowly; expect weeks, not days, and repeat once after the site is recrawled (section 4).

**3b. AI Overview / AI Mode answer** (the surface in the 2026-10-29 screenshot).
1. On the overview, click the thumbs-down (or the three-dot menu → **Feedback**), choose the option closest to "inaccurate / wrong information," select or quote the line `Founders & Owners: Erika and Julio Ramirez`, and paste: `Incorrect. Bella Mia Exclusive Events has one founder and owner, Yvanna Contreras (founded 2014). Erika and Julio Ramirez were clients; their wedding is featured on the site as a real-wedding story. Source: https://bellamiaexclusiveevents.com/about`.
2. In the same feedback, also flag the line `luxury hotel connections (such as The Westgate Hotel and Loews Coronado Resort)`: it repeats the "exclusive connections" claim removed from the site on 2026-09-29 (Fix 04, decision D5). The two hotels are venues where Bella Mia planned real weddings, not partnerships. Suggested text: `Bella Mia does not claim hotel connections or partnerships. The Westgate Hotel and Loews Coronado Resort are venues of past client weddings.` **ESCALATION, public-claim conflict:** this line is a hotel-relationship claim in public; Concierge and Prestige should know it is showing, even though it came from Google and not from the current site. INPUT NEEDED FROM CONCIERGE — not yet performed.
3. There is no edit path for AI answers; they regenerate from the index. The site edits plus re-indexing (section 4) are the real lever, and the wrong names normally drop out once the pages that fed them are re-read. Do not expect feedback alone to change it, and do not expect a date.

**3c. Google Business Profile.**
1. In the profile manager, check the **business description** and any **"From the business"** text, posts, Q&A answers, and photo captions for the three names. Remove any mention. Google Business Profile has no public "founder" field, so if the names appear next to the map listing they are coming from the website or a third-party source, not from the profile.
2. Check **Owner / Manager** users: only Yvanna's accounts and the agreed CEG account should be listed. (Unrelated to what the public sees, but worth confirming while in there.)

## 4. Ask Google to re-read the corrected pages (Search Console, Domain property `sc-domain:bellamiaexclusiveevents.com`)

After the publish, URL Inspection → **Test live URL** → **Request indexing** for:
- `https://bellamiaexclusiveevents.com/about`
- `https://bellamiaexclusiveevents.com/`
- `https://bellamiaexclusiveevents.com/2026/10/01/private-estate-wedding-san-diego-erika-and-julio/`
- `https://bellamiaexclusiveevents.com/blog/erika-batiz-julio-ramirez/` (should report the 301 to the post; if Search Console still shows the old page as indexed, this is the URL feeding "Erika & Julio" and the request is what retires it)

Record the "last crawl" date each inspection shows. The homepage was last requested 2026-10-01; the About page edit in section 2 is new, so its request is the important one.

## 5. Verification and log

- Surface logged 2026-10-29: desktop AI Overview on the branded query. Re-check on the same surface (desktop, same query, signed in or out as on 2026-10-29) and note whether the Founders line, the hotel-connections line, or both have changed. Still useful from the Founder: any screenshot where **Alejandro** appears, since the 2026-10-29 one does not show him.
- Verify the site edits live with the usual cache-busting fetch: `/about` contains "founded Bella Mia Exclusive Events in 2014", contains 0 matches for "Alejandro", and the Person JSON-LD validates in Google's Rich Results Test or the Schema Markup Validator.
- Re-check Google on the same surface at 1 week and at 3 weeks after the indexing requests; log each check (date, query, surface, what it shows) in `06-baseline-and-change-log.md`. If the names are still there at 3 weeks, file the knowledge-panel feedback again (section 3a.3) and check third-party listings (Yelp, The Knot, WeddingWire, BBB, Carats & Cake, Facebook, LinkedIn) for any "owner" or team field naming anyone but Yvanna; BBB's "Ivanna" spelling is already queued in Fix 04.
- Do not expect a date. Rank can commit to the edits, the requests, and the feedback being filed; when Google updates the panel or the AI answer is Google's call.

## What not to do

- Do not remove the Erika & Julio real-wedding post or the homepage caption. They are correct client content and part of the Fix 05 portfolio; removing them would not speed Google up and would lose the only private-estate proof on the site.
- Do not add "founder" or "owner" keywords to the Business Profile name or description beyond one truthful sentence.
- Do not create a Wikipedia, Wikidata, or Crunchbase entry just to feed the panel; a thin entry for a small business is a policy and credibility risk and not needed here.
