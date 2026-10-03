# Layout spec: Real Weddings gallery page and blog post

**Purpose:** reproduce the structure of the two Serene page types the Founder shared (a Showit gallery page and a WordPress real-wedding post) with Bella Mia's own content, fonts, and colors. Structure is borrowed; copy, photos, and brand are Bella Mia's.
**Reference observed 2026-09-28 (Founder screenshots):** Serene's `Sarah & Brendan, Park Hyatt Aviara` gallery page; the post `An English Garden Inspired Wedding at a Private Estate` (dated April 17, 2026); its "The Vendor Team" footer.
**Preview:** `layout-preview-erica-and-patrick.html` in this folder, using gray blocks where the photos go.

---

## A. Showit gallery page (one per wedding)

URL pattern: `/blog/firstname-and-firstname/` (VERIFIED 2026-09-29: galleries on this site are WordPress pages under Blog rendered by Showit blog templates, e.g. `/blog/erika-batiz-julio-ramirez/`; `/erica-and-patrick-sieben` does not exist). Erica & Patrick: WordPress draft page id 195 at `/blog/erica-and-patrick/`.

### Canvas 1: Hero (full width, 100vh on desktop, 70vh on mobile)
- Background: one wide photo, black-and-white or heavily desaturated, 40% dark overlay.
- Text, centered vertically and horizontally: `ERICA & PATRICK` in a thin serif, uppercase, letter-spacing 0.25em, very large (desktop ~120px, mobile ~44px), white at 80% opacity so the photo shows through the letters.
- This text element is the page **H1**.

### Canvas 2: Intro composition (white background, generous top and bottom padding)
Three columns on desktop, stacked on mobile.
- **Left:** a portrait photo of the couple (4:5). Overlapping its top-left corner, a small cream card with `ERICA & PATRICK` in small caps and `Park Hyatt Aviara` in italic serif beneath it.
- **Middle:** a detail or reception photo (3:4), set slightly higher than the left one so the two overlap by about 40px.
- **Right column, text, centered:**
  - `ERICA & PATRICK` serif uppercase, letter-spacing 0.15em, ~34px.
  - `PARK HYATT AVIARA` small caps, letter-spacing 0.3em, ~13px, 40px below.
  - No "Featured on" line for this wedding (FOUNDER CONFIRMED: not published). Add one on future posts only when true.
  - Vendor list, one per line, italic serif ~17px, `Role: Name`:
    ```
    Planning & Design: Bella Mia Exclusive Events
    Florals: Bella Mia Exclusive Events
    Photographer: Audree Belle Photography
    Videographer: Shutter And Sound
    Live Band: Patrick LVB
    ```
  - `SCROLL FOR FULL GALLERY` small caps, letter-spacing 0.3em, ~11px, at the bottom.
- The right-column text should be a paragraph tag, not a heading; the H1 is in the hero.

### Canvas 2b: Gallery title card (alternative to Canvas 2, adopted for the La Valencia post 2026-10-03)
Reference: Serene's "Joyce & Elliot / WEDDING GALLERY / TWIN OAKS GOLF COURSE / VIEW THE GALLERY" card (Founder screenshot 2026-10-03). Centered, white, no photos and no vendor lines in the card; the vendor team moves to Canvas 5.
- `Roberta & Sid` serif, title case, ~40px desktop / 30px phone, normal weight. Tag H2 on a post (the H1 is the post title); H1 on a gallery page.
- `WEDDING GALLERY` small caps, letter-spacing 0.3em, ~17px.
- `LA VALENCIA HOTEL` small caps, letter-spacing 0.3em, ~11px, muted gray.
- Button `VIEW THE GALLERY`: italic small caps ~12px, letter-spacing 0.3em, white on the accent `#8a7a4d`, padding 17px × 90px (36px sides on phones). Links to the gallery page, or to a `#gallery` anchor on the first photo row when the photos live in the post itself.
- HTML and CSS: `la-valencia-title-card.html` in this folder.

### Canvas 3: Story (white, narrow measure ~900px, centered)
- Two or three paragraphs from the post body (the "Erica and Patrick" and "Why Aviara suited them" sections), serif ~18px, line-height 1.7, centered text.
- This is what makes the gallery page rank rather than just sit there. Keep 150–300 words here; the full post lives on the blog.

### Canvas 4: Gallery grid
- Three columns on desktop, two on tablet, one on mobile, 16px gutters.
- Mix portrait and landscape; 12–20 images. Every image renamed and alt-texted per the image protocol.

### Canvas 5: The Vendor Team (white, centered)
- Heading `THE VENDOR TEAM` small caps, letter-spacing 0.3em, ~13px. Tag: H2.
- One centered paragraph: `Role: Name | Role: Name | …`, each name linked in the brand's accent color. Roles in roman, names in the link color.

### Canvas 6: CTA
- `Planning a wedding at Park Hyatt Aviara or another North County resort?` italic serif.
- Two text buttons: `INQUIRE ABOUT YOUR DATE` → `/contact`, `VIEW MORE WEDDINGS` → `/portfolio` (or `/services` until the portfolio exists).

### Page SEO settings
- Page Title: `Park Hyatt Aviara Wedding | Erica & Patrick | Bella Mia Events`
- Meta Description: `Erica and Patrick's coastal garden wedding at Park Hyatt Aviara in Carlsbad: Palm Court ceremony, reception in the Gardens, planned and designed by Bella Mia.`
- Share image: the hero photo in color.

---

## B. WordPress real-wedding post (one per wedding, links to the gallery page)

### Header
- Date in small caps with letter spacing and a thin horizontal rule, centered. No monogram badge (FOUNDER CONFIRMED: none in use). If a monogram is created later, it sits on the same line at ~80px.
- **H1** in large italic serif, centered, ~56px desktop / 34px mobile: `A Coastal Garden Wedding at Park Hyatt Aviara`.

### Body
- Text centered, serif ~18px, line-height 1.8, measure ~1000px.
- Paragraph order from `erica-and-patrick-park-hyatt-aviara.md`: opening, the couple, why Aviara, design and florals, the moment.
- A three-column image row after the second paragraph, another after the fourth; final full-width image before the vendor team.

### Footer: The Vendor Team
- Same as Canvas 5 above, one paragraph, pipe-separated, linked names.

### Closing
- One italic line and two links: gallery page and contact.

### WordPress SEO fields
- Slug `/park-hyatt-aviara-wedding-erica-and-patrick`, title and description as in the post file, category Real Weddings, featured image renamed per protocol.

---

## C. Typography and color (Bella Mia's, not Serene's)

Use the fonts already set in Bella Mia's Showit site so every page matches. If none is set for these roles, the preview uses:
- Display serif: Cormorant Garamond (uppercase names, H1s).
- Italic serif: Cormorant Garamond Italic (titles, vendor lines).
- Small caps labels: the same serif, uppercase, letter-spaced.
- Body: the same serif at 18px, or the site's existing body font.
- Colors: near-black `#1f1f1f` text, white background, cream card `#f6f2ec`, accent for links `#8a7a4d` (change to Bella Mia's brand accent if one exists).

## D. Build order for the executing session
1. There is no existing Erica & Patrick page and no photos anywhere on the site (WordPress media library is empty; Showit's Media Library could not be opened by script on 2026-09-29, so check it by hand for any Aviara files before asking for uploads). Get 12–20 Audree Belle photos from the Founder first, upload them to Showit's Media Library named per the image protocol, then in Showit Site → Blog Templates duplicate the "Erika Batiz & Julio Ramirez" template as the base and assign it to page 195.
2. Rebuild canvases in the order above. Set the hero text to H1 and "The Vendor Team" to H2.
3. Fill SEO settings.
4. Publish with the rest of the runbook.
5. Once the WordPress post is live, link the gallery's "read the story" line to it and the post's "view the gallery" line back.
