# Showit runbook: Bella Mia website fixes

**For:** a Claude session running on the Founder's computer with browser control, or the Founder by hand.
**Platform:** Showit (confirmed by screenshot of `app.showit.com`, 2026-09-28). Site name in editor: "Bella Mia Exclusive Events". Nav: Home, About, Services, Blog, Contact.
**Decisions already made by the Founder (2026-09-28):** city San Diego; office address shown, 8885 Rio San Diego Dr, Suite 237, San Diego, CA 92108 (confirm ZIP, 92107 was typed); email info@bellamiaexclusiveevents.com; services = full-service planning, partial planning, floral design, event styling, rental packages, no selfie mirror; hotel line softened.
**Rules:** publish once at the end, not after every step. Record every "before" value in section 9 before overwriting it. Do not delete anything without doing step 1 first. Ask the Founder anything marked ASK.

---

## 0. Orientation in the Showit editor

- Top-left tabs: **SITE** (all pages, site settings) and **PAGE** (the open page's canvases).
- Right panel on a page: **PAGE INFO** (name, URL), **SEO SETTINGS** (page title, meta description, share image, hide-from-search toggle), **ADVANCED SETTINGS** (custom page head/body code).
- Site-level settings are behind the gear on the SITE tab. Labels can differ slightly by version; look for the nearest match.
- Text elements: clicking one opens text properties. The HTML tag (paragraph, H1, H2…) is a setting on the text element, often labeled "Tag" or "Text Tag" in the element's Text or Style panel.
- **PUBLISH** is top right. Nothing is live until it is clicked.

## 1. The untitled page

1. SITE tab → Pages list. Find the page named "Untitled" or whose URL ends in `untitled-c1izt`. Open it.
2. Read it. Record in section 9: page name, URL, whether it is in the navigation, and what its content is.
3. Decide:
   - **Duplicate of Home or Services** → in PAGE INFO note the URL, then delete the page (page menu ⋯ → Delete). Then SITE → Site Settings → Advanced → 301 Redirects (or "Redirects"): add `/untitled-c1izt` → `/` (or `/services` if it duplicated Services). If Showit has no redirects section, leave the page in place, turn on **Hide from search engines** in its SEO SETTINGS instead, and note that.
   - **Unique content worth keeping** → rename the page (PAGE INFO → name) and its URL to something descriptive, give it a real title and description using the pattern in step 3, add it to the nav if it belongs there, and add a 301 from `/untitled-c1izt` to the new URL. **ASK the Founder before keeping any hotel or "preferred vendor" language on it.**
   - **Empty or test** → delete it; no redirect needed.

## 2. Capture current SEO values (before)

For Home, About, Services, Contact: open the page → SEO SETTINGS → copy Page Title, Meta Description, and the state of "Hide from search engines" into section 9. All four must have hide-from-search **off**.

## 3. New SEO values

Paste exactly.

**Home**
- Page Title: `Bella Mia Exclusive Events | San Diego Wedding Planner`
- Meta Description: `Full-service and partial wedding planning with floral design in San Diego. Bella Mia takes a limited number of weddings each year. Inquire to reserve your date.`

**Services**
- Page Title: `San Diego Wedding Planning & Floral Design | Bella Mia Events`
- Meta Description: `Compare Bella Mia's full-service and partial planning, floral design, styling, and rental packages for San Diego weddings, and see what each includes.`

**About**
- Page Title: `About Bella Mia Exclusive Events | San Diego Wedding Planner`
- Meta Description: `Meet the planner behind Bella Mia Exclusive Events and learn how we plan and design weddings in San Diego from first consultation to send-off.`

**Contact**
- Page Title: `Contact Bella Mia Exclusive Events | San Diego Wedding Planner`
- Meta Description: `Tell us your date, venue, and vision. Call or text 619.248.0786, email info@bellamiaexclusiveevents.com, or meet us by appointment in Mission Valley.`

**Blog** (if it has its own SEO settings in Showit; otherwise skip, it is handled in WordPress)
- Page Title: `Real Weddings & Planning Notes | Bella Mia Exclusive Events`
- Meta Description: `Real San Diego weddings planned and designed by Bella Mia Exclusive Events, with the venues, details, and vendor teams behind each one.`

If the ASK on "limited number of weddings each year" comes back false, delete that sentence from the Home description.

## 4. Headings (one H1 per page)

- **Home:** the hero text "SAN DIEGO WEDDING PLANNER" → set its tag to **H1**. Check the desktop and mobile canvases; they share the element but confirm both render it. Record the previous tag.
- **About, Services, Contact:** find the main heading text on each page and set it to **H1**. Section headings on Services ("Full-Service Planning", "Partial Planning", "Floral Design", "Event Styling", "Rental Packages") → **H2**.
- If a logo is an image, leave it; images are not headings.
- Do not set more than one H1 per page. If two elements are already H1, demote the second to H2.

## 5. Copy edits

1. **Hotel line.** Search every page (Home, About, Services, the untitled page) for "exclusive connections". Replace the sentence with: `Experienced with San Diego's hotel and resort wedding venues.`
2. **Contact page.** Add, near the form or phone:
   ```
   8885 Rio San Diego Dr, Suite 237
   San Diego, CA 92108
   By appointment
   ```
   Phone `619-248-0786`. Email `info@bellamiaexclusiveevents.com`. Remove any gmail address anywhere on the site.
3. **Footer** (if there is a site-wide footer): same address line, phone, email.
4. **Services page.** If "Event Styling" and "Rental Packages" are not present, add a short section for each (2–3 sentences: what is included, for which events). Remove any "selfie mirror" text. **ASK** the Founder for two sentences on each if none exist on the page.
5. **"INC. EST. 2012"** in the hero: **ASK** the Founder. BBB shows the business started 4/22/2014. Change only on the Founder's answer.

## 6. Site-level

1. SITE → Site Settings: record the **Site Title**. It should be `Bella Mia Exclusive Events`. If the Home page title was blank before, this site title (or the domain) is what search engines were showing.
2. **Domain.** In the Showit account dashboard (not the editor), open Domains. Record whether `bellamiaexclusiveevents.com` and `www.bellamiaexclusiveevents.com` are both connected and which is primary. Showit normally serves the naked domain as primary and redirects www; **do not change** domain settings unless www is primary. If www is primary, switch primary to non-www. This step is CURRENT PLATFORM POLICY NOT YET VERIFIED; read Showit's on-screen notes before changing anything.
3. **Schema (optional, later).** Site Settings → Advanced → Custom Head HTML is where `fixes/07-localbusiness-schema-draft.json` goes, wrapped in `<script type="application/ld+json">…</script>`, but only after every placeholder in that file is filled.

## 7. Blog

Click Blog in the preview nav. Record what loads: a WordPress blog with posts, an empty blog, or an error. Showit blogs run on WordPress; its SEO is managed inside WordPress (usually a Yoast or similar plugin), not in the Showit editor. This is where the Real Weddings posts from `fixes/05-real-weddings-content-kit.md` will be published.

## 8. Publish and verify

1. Click **PUBLISH**. Wait for the confirmation.
2. Verify from the same computer (terminal):
   ```
   curl -s https://bellamiaexclusiveevents.com/ | grep -o '<title>[^<]*</title>'
   curl -s https://bellamiaexclusiveevents.com/ | grep -o '<meta name="description"[^>]*>'
   curl -s https://bellamiaexclusiveevents.com/ | grep -o '<h1[^>]*>[^<]*</h1>'
   curl -sI https://www.bellamiaexclusiveevents.com/ | grep -iE '^(HTTP|location)'
   curl -sI https://bellamiaexclusiveevents.com/untitled-c1izt | grep -iE '^(HTTP|location)'
   ```
   Expected: the new Home title and description; exactly one H1 containing "San Diego Wedding Planner"; www returns 301 to non-www; the untitled URL returns 301 (or 404 if deleted with no redirect, or 200 with a noindex tag if hidden instead).
3. In Google Search Console (add the Domain property `bellamiaexclusiveevents.com` if none exists), use URL Inspection → Request indexing for `/`, `/services/`, `/about`, `/contact`.
4. Copy section 9 into `fixes/06-baseline-and-change-log.md` with today's date, and commit.

## 9. Record of before-values (fill in)

| Item | Before | After | Notes |
|---|---|---|---|
| Untitled page: name / URL / in nav? / content | | | |
| Home: Page Title | | | |
| Home: Meta Description | | | |
| Home: hide from search | | | |
| Home: hero text tag | | H1 | |
| About: Page Title / Meta / hide / H1 | | | |
| Services: Page Title / Meta / hide / H1 | | | |
| Contact: Page Title / Meta / hide / H1 | | | |
| "exclusive connections" sentence: pages found on | | replaced | |
| Contact address / email / phone shown | | | |
| Selfie mirror text: pages found on | | removed | |
| Site Title | | | |
| Domain: primary host | | | |
| Redirect `/untitled-c1izt` → | | | |
| Blog status | | | |
| Est. year shown in hero | 2012 | | ASK: BBB says 2014 |
| Published at (date/time) | | | |
