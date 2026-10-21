# Ethereal Luxury Restrooms: Home hero image on phones (fix runbook)

**Prepared by:** Rank (AI) with an Elevate website-integrity lens, 2026-10-08
**Status:** DIAGNOSED AND SIMULATED, NOT YET APPLIED. Before-values recorded from the editor on 2026-10-21 (below); the edit itself is still pending.
**2026-10-21 update (first attempt):** a session authorized to apply this fix found `ELR_SHOWIT_EMAIL` / `ELR_SHOWIT_PASSWORD` absent from the environment, so nothing was applied or published.
**2026-10-21 update (second attempt, 16:20 to 16:40 PDT):** the credentials were present, the login worked, and the editor opened the Ethereal site directly. The before-values below were read from the Hero canvas panel. The first mutating click (choosing "Normal" in the phone Canvas Type dropdown) was refused by the session's auto-mode permission classifier ("Unrequested Commit in a Connected App") twice, so no setting was changed, nothing was published, and the dropdown was closed with Escape; a read-back confirmed the draft still shows Canvas Type "Window Height". Live site unchanged (last-modified 2026-09-10). See `03-change-log.md` for what unblocks the next attempt.
**Site:** `etherealluxuryrestrooms.com`, Showit-hosted (VERIFIED 2026-10-08: response header `x-showit: hosted`, last-modified 2026-09-10).
**Screenshots:** `screenshots/home-mobile-hero-before-after.png` (phone, 390x844, live vs simulated fix), `screenshots/home-desktop-fold-2026-10-08.png` (desktop is fine, leave it).

## What is wrong (VERIFIED 2026-10-08, headless Chromium at 390x844, iPhone user agent)

- The Hero canvas on the phone layout is set to fill the whole screen. The live HTML carries the Showit class `sb-nm-wH` on `#hero` (mobile height = window height) and an inline `height: 844px`.
- The hero photo is the trailer-side shot (`img_3574.jpg`, 4:3 landscape). Stretched to cover a 390x844 portrait area it renders 1125px wide, so only 390 of those pixels show. The first letter of "ETHEREAL" is cut off, the lockup looks cramped, and the sky takes the top third.
- The headline ("Organic, Refined, Designed for Luxury", the page's H1), the intro copy, and the "Get in touch" link all sit in the next canvas. On a phone the first screen is image only; the visitor must scroll past a full screen before reading a single word.
- The image is served at 800px wide on phones (`static.showit.co/800/...`); the original is at least 3200x2400, so sharpness is not the problem. The crop and height are.
- Desktop (1440x900) shows the full lockup with the nav and reads well. Nothing to change there.

## The fix (two settings on one canvas, phone layout only)

Showit keeps a separate phone layout for every canvas, so this does not touch desktop.

1. Log in at `app.showit.com` with the account that owns the Ethereal site (not the Bella Mia login; see below). Open the Ethereal site, **PAGE** tab, page **Home**.
2. In the canvas list click **Hero** (the live canvas id is `hero`; if the list shows a different name, it is the first canvas, the one with the trailer photo).
3. Switch to the phone view (phone icon in the bottom toolbar) or work in the narrow phone column on the left of the editor.
4. Right panel, canvas settings. **Record the current values before changing anything** (section "Before values" below), then:
   - **Height (phone):** turn off the setting that makes the canvas fill the screen (Showit labels it along the lines of "Fill Screen" / window height; the live class `sb-nm-wH` is that setting) and set a fixed phone height of **520**. Simulated result at 520: the full lockup is visible, the trailer fills the frame, and the H1 begins at 588px, inside the first screen on an 844px phone. 600 also works but pushes the headline to the fold line; 520 is the recommendation.
   - **Background image position (phone):** keep Fill/Cover; set the focal point to **center, slightly below middle** (about 60% down). The lockup sits in the lower-middle of the photo, so a centered-top crop shows sky and cuts the wordmark. Showit's position picker: pick the bottom-center or center option and nudge until "ETHEREAL LUXURY RESTROOMS" has clear margin on both sides at 390px wide.
   - Optional, same panel: on the phone layout the background is set to **fixed** (parallax; the live element has `position: fixed`). Fixed backgrounds jump on iOS Safari. If the setting is exposed, set it to scroll normally on phone. Leave desktop as is.
5. Check the **Intro** canvas (the H1 canvas) still starts directly under the hero on the phone layout. Nothing else should move.
6. **Preview** at phone size, then **PUBLISH** (top right). Nothing is live until Publish.
7. Verify live: open `etherealluxuryrestrooms.com` on a phone, or run the check in "Verification" below. The headline must be visible without scrolling and the whole wordmark on the trailer must be visible.

**Rollback:** set the phone height back to fill-screen and the position back to the recorded value, publish again. Two clicks, no content lost.

## Before values (fill in from the editor before changing)

| Setting (phone layout, Hero canvas) | Before (editor shows, read 2026-10-21) | After |
|---|---|---|
| Canvas Type (height mode) | **Window Height** (dropdown options: Normal, Window Height, Grow with Content). Desktop tab also Window Height. | Normal (fixed) |
| Minimum Height (phone) | **176 px** (only a minimum while Window Height is on; desktop tab shows 508 px) | 520 px (the field relabels to the fixed height once Canvas Type is Normal; confirm in the editor) |
| Sticky | None | unchanged |
| Hidden to start | off | unchanged |
| Background Media Type / Image | Image, `img_3574.jpg` | unchanged |
| Background Size | Fill | unchanged |
| Background Position | **Middle Center** (9-way dropdown; no percentage control) | Middle Center, see note |
| Background Scroll | **Fixed** | Fixed, see note |
| Background Opacity | 70 % | unchanged |
| Canvas Fill | Color, swatch 1, 100 % | unchanged |
| Canvas elements | none (the canvas list shows "- empty -") | unchanged |

Notes from the editor (2026-10-21):

- The Canvas section has a phone / desktop toggle, so Canvas Type and height are per device. The **Canvas Background section shows no device toggle** and reads identically on both tabs, so Position and Scroll appear to be shared with the desktop layout (INFERENCE from the panel; not tested by changing a value). Changing them would touch desktop, which this fix must not do.
- At 390 px wide and 520 px tall the 4:3 photo is height-limited under Fill (it renders about 693 px wide and 520 px tall), so there is no vertical crop and the vertical focal point makes no difference on the phone. **Keep Position at Middle Center**; the "60 % down" nudge in the original plan is unnecessary at 520 and would only shift the desktop crop.
- For the same reason, leave Scroll at Fixed rather than change a shared setting. If the phone-only parallax jump matters later, it is a separate, desktop-affecting decision.
- Net change to make: Canvas Type Normal and height 520 on the phone tab. Nothing else on this canvas.

Screenshots of the panels as read: `screenshots/editor-home-hero-phone-canvas-before-2026-10-21.png`, `screenshots/editor-home-hero-background-before-2026-10-21.png`.

## Verification (after publish)

From any machine with Node and Playwright, or by eye on a phone:

```
# expect: heroH 520, h1Top under 844
node -e "
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},isMobile:true})).newPage();
await p.goto('https://etherealluxuryrestrooms.com',{waitUntil:'networkidle'});
console.log(await p.evaluate(()=>({heroH:document.querySelector('#hero').getBoundingClientRect().height,h1Top:document.querySelector('h1').getBoundingClientRect().top+scrollY})));await b.close();})()"
```

## Why this is not already live

- The Showit credentials available to this session (`SHOWIT_EMAIL`, the info@bellamia… account) open an account whose "View My Site Designs" and "View Shared Designs" lists contain exactly one site, Bella Mia Exclusive Events (VERIFIED 2026-10-08 in the editor; no edits were made there, status stayed "Saved").
- The Ethereal site therefore lives in a different Showit account (ASSUMPTION: the etherealluxuryrestrooms@gmail.com login, which the Bella Mia change log shows is the Google account the Founder uses for Ethereal). Its password is not in this environment.
- To have a later session apply and publish this fix directly: add two environment variables, `ELR_SHOWIT_EMAIL` and `ELR_SHOWIT_PASSWORD`, in the cloud environment settings (environment menu in the session title bar, then Edit; under Network secrets if offered, otherwise as environment variables). A new session picks them up. Do not paste the password into chat.

## Second-order notes for the same canvas (not part of this fix, FOUNDER DECISION)

- The hero carries no headline on either layout. Showit allows a text element on the phone layout only. A one-line "Luxury restroom trailer rentals, San Diego & Southern California" over the lower third of the photo would give phone visitors the what-and-where on the first screen. This is a copy change and a public claim (service area), so it waits for Elevate's claimed-area wording and the Founder's approval. Draft only.
- The hero image has an empty `alt`. Set it to the plain description "Ethereal Luxury Restrooms trailer" in the image settings. LOW priority, no approval needed.
