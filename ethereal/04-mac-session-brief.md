# Brief for a Claude session on the Founder's Mac (Showit already logged in)

Paste the block below as the first message of a Claude Code session running on the Mac where Chrome is signed in to the Ethereal Showit account. It applies the four approved website changes, publishes once, verifies, and records the change log. It assumes the repo `contreras0901/SEO-` is checked out on branch `claude/serene-events-seo-analysis-1h8ta1` (clone it first if not).

---

You are applying four approved changes to the Ethereal Luxury Restrooms website (etherealluxuryrestrooms.com, built on Showit) using the Showit editor at app.showit.com, which is already signed in to the Ethereal account in my Chrome. Drive that Chrome (debug port or accessibility control, whichever this Mac is set up for; the Bella Mia runbook `fixes/showit-runbook.md` describes both) and take a screenshot after every click. Do not use any other Showit account.

Read first: `ethereal/01-home-hero-mobile-fix.md` (hero fix, before-values table, verification), `ethereal/03-change-log.md` (baseline and the pending change table), and `fixes/showit-runbook.md` section 0 (editor orientation).

Make exactly these changes and nothing else:

1. Home page, Hero canvas, **phone layout only**: record every current value into the before-values table, then set the phone height from fill-screen to a fixed 520, set the background focal point to center and about 60% down so the whole "ETHEREAL LUXURY RESTROOMS" wordmark shows with margin at 390px wide, and if the panel exposes it set the phone background to scroll instead of fixed. Desktop layout, image, opacity, and text stay untouched.
2. Everywhere the phone number appears as text (Home, Contact, Book Now, the MAIN SITE footer and menu canvases): set the element's click action to phone 619-248-0786. Set the email text to `mailto:etherealluxuryrestrooms@gmail.com`. Visible text unchanged.
3. Service Area page: link each city name (La Jolla, Carlsbad, Encinitas, Rancho Santa Fe, Del Mar, Coronado, Chula Vista) to `/la-jolla`, `/carlsbad`, `/encinitas`, `/rancho-santa-fe`, `/del-mar`, `/coronado`, `/chula-vista`; if the names are not on the page, add one small line of linked city names in the page's existing small-text style. Footer (MAIN SITE footer canvas): add "Pricing Guide" (`/pricing-guide`) and "Why a Trailer" (`/why-a-trailer`) in the existing footer link style on desktop and phone; if that would mean rearranging many elements, put the two links on the Restrooms page instead and say so.
4. PUBLISH once at the end.

Do not change copy or claims, delete anything, edit SEO titles or metas, touch other pages, or open the Bella Mia site.

Verify after publishing, in a cookie-free context at 390x844 with an iPhone user agent: `#hero` height is 520 and the H1 top is under 844; `curl -sL https://etherealluxuryrestrooms.com | grep -c 'href="tel:'` is at least 1 and likewise for /contact and /book-now; `mailto:` on /contact; /service-area links to the seven city pages; the footer carries /pricing-guide and /why-a-trailer. Save a phone and a desktop screenshot of the live home page to `ethereal/screenshots/` with today's date and look at them: full wordmark visible on the phone, desktop unchanged.

Then append the results to `ethereal/03-change-log.md` (date, each change before → after, publish time PDT, verification results, anything left undone and why), fill the before-values table in `ethereal/01-home-hero-mobile-fix.md` and mark it APPLIED with the date, commit on the current branch, and push. If anything blocks you, stop before publishing and write what you found.

---

## Alternative: let a cloud session do it

The cloud route needs the Ethereal Showit login stored as two environment variables, `ELR_SHOWIT_EMAIL` and `ELR_SHOWIT_PASSWORD`, in the **Environment variables** section (not Network secrets, not Allowed domains) of the environment the session will run in, then a new session started in that environment with the brief in `03-change-log.md`. Two cloud attempts on 2026-10-21 stopped because those names were not present in the environment they ran in.
