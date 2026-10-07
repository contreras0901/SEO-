# Advice post template (reference)

**Approved by the Founder 2026-10-07** on the cake post: `https://bellamiaexclusiveevents.com/2026/10/07/wedding-cake-advice-how-to-choose-your-cake/`. Every new post in the Wedding & Event Advice category follows this layout. The generator is `build_advice_post.py` in this folder; the live HTML of the approved post is `cake-post-body.html`.

## Page anatomy (top to bottom)

| # | Block | Spec |
|---|---|---|
| 1 | Kicker | `PLANNING ADVICE`, Questrial 11 px, letter-spacing 0.35 em, uppercase, grey `#6b6b6b`, centered |
| 2 | H1 | HV Florentino Regular 44 px, line-height 1.15, near-black `#1f1f1f`, centered (the Showit template renders it uppercase) |
| 3 | Subtitle | Italic serif 20 px, grey, max 640 px, one sentence |
| 4 | Hero photo | 3:2, full width of the 960 px column |
| 5 | Intro | One paragraph, serif 18 px / 1.8, 760 px measure |
| 6 | Section head | `No. 01` label (same style as kicker) → H2 serif 30 px → 40 px rose rule `#c9a39f` |
| 7 | Body text | Serif 18 px / 1.8, 760 px measure |
| 8 | Do / Don't cards | 2-up grid (min 280 px). **Do** = cream fill `#f6f2ec`, grey label. **Don't** = white, 1 px rose border, rose label. Label 11 px / 0.3 em uppercase; text serif 17 px / 1.7 |
| 9 | Pull quote | Italic serif 26 px, centered, 720 px max, rose rule beneath; one per post, mid-way |
| 10 | Photo pair | 2-up grid of 4:5 portraits, 24 px gap, 48 px above and below |
| 11 | Wide photo | 3:2, full width, near the end |
| 12 | Closing | One centered paragraph |
| 13 | CTA block | Cream background, `BELLA MIA EXCLUSIVE EVENTS` kicker, italic question, two buttons: rose filled → `/contact`, outlined → `/services` |

Rhythm: hero → text → pair → text + cards → quote → text + cards → pair → text → wide → cards → closing → CTA. Six photos per post, all from Bella Mia's own weddings, each with descriptive alt text naming the venue once.

## Photo rules

- Portraits (4:5) in the pairs; 3:2 landscapes for hero and wide shot. Export at 1600 px on the long side.
- Pull from the WordPress media library first (`/wp-json/wp/v2/media`), then the Showit gallery of a real wedding (download at `https://static.showit.co/1600/<key>`; PNG assets convert to JPEG before upload).
- Rename files `<wedding-slug>-<subject>.jpg`; alt text describes the picture and names the venue once.

## WordPress fields per post

- Title = the headline. Excerpt = 2–3 word card name (shown big on the Advice card; under ~18 characters).
- Category: Wedding & Event Advice (id 5). Featured image = the hero photo (4:5 crop works best on the card; pick a portrait if the hero is landscape).
- Yoast title ≤ 60 chars with "| Bella Mia"; Yoast description ≤ 155 chars.
- Body: paste the HTML from the generator into the Code editor, never through the block editor's "Attempt recovery".

## Voice

First person plural, San Diego specifics, one real example from a Bella Mia wedding per post, no vendor or venue claims that are not already on the site. Do/Don't items start with a verb.
