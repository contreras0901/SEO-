# Atelier Launch Co. website: "not active" diagnosis and fix kit

**Prepared by:** Rank (AI), 2026-11-11
**Asset:** `atelierlaunchco.com`, a single-page site hosted on Netlify (site name `lustrous-gecko-0b2e85`, site id `f8aed846-0e0e-4975-8d9d-35424ff8ca0c`, free tier). Domain registered at Namecheap 2026-09-10, expires 2027-09-10. The homepage source is not in any GitHub repository; it was published to Netlify directly.
**Status:** fix prepared in `site/`, NOT yet deployed. This session has no Netlify login, so the Founder publishes it (steps below).

## 1. What was checked on 2026-11-11

| Check | Result |
|---|---|
| `https://atelierlaunchco.com/` | 200 OK from Netlify. Site is live. |
| `http://` and `www.` | Both 301 to `https://atelierlaunchco.com/`. Correct. |
| Domain record (RDAP) | Active, `clientTransferProhibited` only. No hold, no expiry problem. |
| Google Analytics / Tag Manager tag | **None on the page.** |
| HubSpot tracking code | **None on the page.** |
| Search Console / Meta verification tag | **None on the page.** |
| `robots.txt` | **Missing** (serves the 404 page). |
| `sitemap.xml` | **Missing** (404). |
| `<link rel="canonical">` and `og:url` | Point to `https://www.atelierlaunchco.com/`, which redirects away to the non-www address. Canonical should be the address that actually serves the page. |

## 2. Why a tool says the site is "not active"

The site itself is fine. Any dashboard that says "not active" is saying it has never received a signal from the site, because the page carries no tracking or verification tag at all:

- **Google Analytics 4:** "Data collection isn't active for your website." Needs the GA4 `gtag.js` snippet (not in this kit: the Measurement ID `G-XXXXXXXXXX` is only visible inside the GA property).
- **HubSpot:** "Tracking code not installed" / domain not connected. Fixed in this kit: the tracking code for portal 247566644 (the CEG HubSpot account, NA2 region) is added to `site/index.html`.
- **Google Search Console:** ownership not verified, no data. Needs the HTML-tag or DNS verification (see section 4).

## 3. What is in `site/`

Deploy-ready folder. Deploying it replaces the current live site with the same page plus these changes:

| File | Change |
|---|---|
| `index.html` | Byte-for-byte copy of the live homepage with 3 edits: canonical set to `https://atelierlaunchco.com/`; `og:url` set to the same; HubSpot tracking code `https://js-na2.hs-scripts.com/247566644.js` added just before `</head>`. Verified in a headless browser: title, h1, and hero render, no script errors. |
| `robots.txt` | Allows all crawlers, points to the sitemap. |
| `sitemap.xml` | The one URL the site has. Add entries when Library, Privacy, or Terms pages go live. |

## 4. Deploy steps (Founder, about 2 minutes)

1. Log in at app.netlify.com and open the site **lustrous-gecko-0b2e85** (custom domain atelierlaunchco.com).
2. Go to **Deploys**. Drag the whole `atelier/site` folder (the folder, not the three files) onto the "Drag and drop your site output folder here" area. Netlify publishes it in a few seconds.
3. Verify: open `https://atelierlaunchco.com/robots.txt` and `https://atelierlaunchco.com/sitemap.xml` (both should show plain text, not the 404 page), then view-source on the homepage and confirm the canonical shows no `www`.
4. **HubSpot:** in HubSpot go to Settings, Tracking & Analytics, Tracking code. Within an hour of the deploy it should report the code as installed on atelierlaunchco.com. If you also want the domain listed, use Settings, Website, Domains & URLs, Connect a domain (for tracking only).
5. **Google Analytics (if that is where "not active" appeared):** in the GA property copy the Measurement ID (`G-...`) and send it; the gtag snippet is then a 4-line paste before `</head>`. Not added here because the ID cannot be guessed.
6. **Google Search Console:** add the property `atelierlaunchco.com` as a Domain property and verify by the DNS TXT record at Namecheap (Advanced DNS, add TXT record `@` with the value Google shows). Then submit `https://atelierlaunchco.com/sitemap.xml` under Sitemaps.

## 5. Rollback

Netlify, Deploys, pick the previous deploy, **Publish deploy**. The live site before this kit is the deploy with ETag `c6a528b9d8f23d8d39f16354ec7e498d`.

## 6. Open items

- The GA4 Measurement ID (Founder supplies it).
- Decide whether the homepage source should live in `contreras0901/atelier-platform` under `website/` so future edits are versioned and Netlify can deploy from Git instead of drag-and-drop. Recommended.
