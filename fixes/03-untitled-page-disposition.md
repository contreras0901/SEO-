# Fix 03 — The `/untitled-c1izt` page (B3)

**Priority:** HIGH IMPACT
**Evidence:** `https://www.bellamiaexclusiveevents.com/untitled-c1izt` is indexed with the title "Bella Mia Exclusive Events" and a snippet that reads like the homepage or services pitch ("exclusive connections to elegant and luxurious hotels", "timeless romance and modern elegance"). OBSERVED 2026-09-28. Rank could not open the page.
**Why it matters:** an "untitled" URL in search results looks unfinished to a couple comparing planners, and if it duplicates the homepage it competes with it.

## Step 1 — Read the page before deciding

Open `https://bellamiaexclusiveevents.com/untitled-c1izt` in a browser and in the CMS (Squarespace: Pages panel, look in Main Navigation and Not Linked for a page whose URL slug is `untitled-c1izt`). Answer:

1. Is it linked from the navigation, or is it in "Not Linked"?
2. Is its content a copy of the homepage, the services page, or something unique (for example, an old landing page or a hotel-specific pitch)?
3. Does any external link point at it? (Search Console → Links → Top linked pages will show this once Search Console exists.)

## Step 2 — Pick one disposition

| If the page is… | Do this | Result |
|---|---|---|
| A duplicate of the homepage or services | Delete the page, then add a URL mapping `/untitled-c1izt -> / 301` (or `-> /services/` if it duplicates services) | Visitors and search engines land on the real page; the stray URL drops out over time |
| Unique content worth keeping (e.g., a genuine hotel-wedding page) | Rename the slug to something descriptive (e.g., `/coronado-weddings`), give it a real title and description per Fix 01, add it to navigation, and add a URL mapping `/untitled-c1izt -> /coronado-weddings 301` | Content is preserved and findable. **Any hotel language on it must first pass Concierge (B7).** |
| An abandoned test page with nothing useful | Delete it, no mapping | Returns 404; drops out of the index. Fine only if nothing links to it |

**Rank's recommendation:** the snippet reads like homepage copy, so the most likely outcome is the first row: delete and 301 to `/`. Confirm by reading it.

## Where to add the 301 (Squarespace, inferred)
Settings → Advanced → URL Mappings, one line:
```
/untitled-c1izt -> / 301
```
Wix: Settings → SEO → URL Redirect Manager. WordPress: Redirection plugin or `.htaccess`.

## Step 3 — Verify
```
curl -sI https://bellamiaexclusiveevents.com/untitled-c1izt | grep -iE "^(HTTP|location)"
```
Expect `301` and `location: https://bellamiaexclusiveevents.com/`. Then in Search Console, inspect the old URL and request indexing of the target.

## Step 4 — Log it
Date, disposition chosen, and target URL in `06-baseline-and-change-log.md`.
