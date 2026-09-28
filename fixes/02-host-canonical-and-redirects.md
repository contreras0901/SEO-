# Fix 02 — One host, one canonical (B2)

**Priority:** HIGH IMPACT
**Evidence:** both `https://bellamiaexclusiveevents.com/` and `https://www.bellamiaexclusiveevents.com/untitled-c1izt` are indexed (OBSERVED 2026-09-28). Two hosts serving the same site split link and ranking signals and can produce duplicate-page reports.
**Founder decision:** which host is primary. **Recommendation: non-www** (`https://bellamiaexclusiveevents.com`), because that is the host the homepage and three of the four core pages are already indexed under. Changing to www would force re-indexing of the pages that are currently fine.
**Rollback:** switch the primary domain back; nothing is deleted.

## Steps (Squarespace, platform inferred; verify labels)

1. Settings → Domains. Confirm both `bellamiaexclusiveevents.com` and `www.bellamiaexclusiveevents.com` are connected.
2. Set `bellamiaexclusiveevents.com` as **Primary**. Squarespace then serves a 301 from the non-primary host to the primary one automatically. CURRENT PLATFORM POLICY NOT YET VERIFIED: confirm in Squarespace's current help article on primary domains.
3. Confirm SSL is on for both hosts (Settings → Advanced → SSL → Secure). HTTP should also 301 to HTTPS.
4. Do not add a manual URL mapping for the host; the primary-domain setting handles it.

## Steps (Wix)
Settings → Domains → click the domain → "Set as primary." Wix redirects the other automatically.

## Steps (WordPress)
Settings → General → set both "WordPress Address" and "Site Address" to `https://bellamiaexclusiveevents.com`. Add to `.htaccess` (Apache) if redirects do not appear automatically:
```
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.bellamiaexclusiveevents\.com$ [NC]
RewriteRule ^(.*)$ https://bellamiaexclusiveevents.com/$1 [R=301,L]
```

## Verify (run from any machine that can reach the site)

```
curl -sI https://www.bellamiaexclusiveevents.com/ | grep -iE "^(HTTP|location)"
curl -sI http://bellamiaexclusiveevents.com/ | grep -iE "^(HTTP|location)"
curl -sI https://www.bellamiaexclusiveevents.com/untitled-c1izt | grep -iE "^(HTTP|location)"
curl -s https://bellamiaexclusiveevents.com/ | grep -io '<link rel="canonical"[^>]*>'
```
Expected: the first three return `HTTP/… 301` with `location: https://bellamiaexclusiveevents.com/...`; the fourth shows a self-referencing canonical on the non-www host.

## Search Console

1. Add and verify **both** properties if not already: a Domain property (`bellamiaexclusiveevents.com`) covers every host and protocol at once and is the simplest. CURRENT PLATFORM POLICY NOT YET VERIFIED for the current verification methods.
2. After the redirect is live, inspect `https://www.bellamiaexclusiveevents.com/untitled-c1izt` and the www homepage; they should report "Page with redirect."
3. Submit the sitemap once (Squarespace: `https://bellamiaexclusiveevents.com/sitemap.xml`).

## Log it
Record the date and the chosen primary host in `06-baseline-and-change-log.md`.
