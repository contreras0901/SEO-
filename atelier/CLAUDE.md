# Atelier Launch Co. — digital products platform

Read this first. It tells you what exists, what the Founder has decided, what is verified, and what to build next.

## What this project is
Atelier Launch Co. sells phone-friendly digital products (PDF courses + template folders) about local SEO,
marketing, digital products, agency launch, and AI. This repo has four parts:

| Folder | Purpose |
|---|---|
| `publishing/` | Builds every product PDF and the plain-text companion zips from HTML sources. |
| `delivery/` | Flask service: Lemon Squeezy webhook -> stamp the buyer's PDFs -> email them. Tracks subscribers. |
| `social/` | Renders Instagram carousels, TikTok/Reels covers and Story frames to PNG. |
| `website/` | `library-page.html` (the "Library" tab for the Atelier site) and the earlier sales-page draft. |

## Founder decisions (5 October 2026). Do not change without asking.
- **Seller name:** "Atelier Launch Co." Entity type and state of formation are NOT confirmed.
- **Products and prices:** Agency Starter Library $127 founding / $197 regular. AI Operating System Masterclass
  $67 founding / $97 regular. Updates and Members Access $29 per month or $289 per year.
  Individual shorter products may be priced separately later. Coaching is a separate, later offer.
- **Founding price** must be real: limited by a stated buyer count or end date that is actually enforced.
- **Updates:** a one-time purchase = the edition bought. Updates + members access = the subscription.
  A lapsed subscriber keeps files already downloaded and loses new updates and members access.
- **Refunds:** all sales final (narrow exception, pending Founder confirmation: duplicate charge, or access never delivered).
- **Cancellation:** online; to avoid the next charge the cancellation must be submitted >= 10 days before renewal.
  This conflicts with how Lemon Squeezy cancels (it expires at end of cycle) and is flagged for the attorney. Do not "fix" it silently.
- **Law:** California governing law, San Diego County venue (attorney to confirm).
- **Checkout:** Lemon Squeezy (merchant of record). Do NOT attach downloadable files to the Lemon Squeezy products;
  this service sends the stamped files. Otherwise buyers get an unstamped copy.
- **Per-buyer marking:** hidden text + metadata only. No visible buyer marks. One Atelier name stamp (top-left) per page, no circular logo on documents.
- **Branding:** warm white `#ffffff` / `#faf9f7`, taupe `#b4a68c`, charcoal `#45403b`, muted `#7d705f`; Cormorant Garamond (headlines) + Jost (body);
  square corners, hairline rules, widely spaced uppercase labels. Wordmark: "ATELIER LAUNCH" + small taupe "CO."
- **Delivery:** automated as orders come in (this service).

## Truth and safety rules for ALL content you write or edit
1. Never invent customers, testimonials, results, statistics, rankings, prices, or completed actions.
2. No guaranteed results, rankings, traffic, leads, or income. Every product says it is educational.
3. Not legal, tax, accounting, or regulated advice. Contract/formation material = outlines to take to a licensed professional.
4. Not affiliated with Anthropic, OpenAI, or Google. Say so where their names are used.
5. Dated, checkable claims only (e.g. "checked against vendor help pages on 5 October 2026"). Re-verify anything about product features before reuse.
6. Starting numbers (25% buffers, 10 photos, 14-day launch...) are labeled as suggestions, not benchmarks.
7. Do not copy other companies' terms, copy, or designs.

## Never do without the Founder's explicit approval
Publish or change the live website; send email to real customers; change prices, policies, or legal text; make public claims;
connect real payment or email accounts; commit secrets. An AI cannot post, pay, sign, or call anyone: every external action needs a named human.

## Commands
```
make setup     # pip install + playwright chromium
make fonts     # brand fonts into publishing/fonts/
make build     # all PDFs + zips -> publishing/dist/
make social    # PNGs -> social/dist/
make test      # delivery tests (8 scenarios)
make masters   # copy built files to delivery/masters/ (the service sends these)
make run       # gunicorn on :8000 (needs env vars: see .env.example)
```

## Architecture notes
- `publishing/src/masterclass-print.html` is the print template for the 50-page masterclass.
  `masterclass-web.html` is the web version (also the source for extracting prompts/code).
  Modules are Python files `src/modules/m1..m4.py` that call `build_module.build(...)`.
- `{{FONT_DIR}}` in templates is replaced with the absolute `file://` path of `publishing/fonts/` at build time.
- PDF page size is 5in x 8.5in (phone-friendly). A tiny overlay adds the name stamp (pages 2+) and page numbers.
- `delivery/app.py` verifies `X-Signature` (HMAC-SHA256 of the raw body with `LEMON_SIGNING_SECRET`), dedupes events, and
  processes in a background thread. `fulfil.py` maps Lemon Squeezy `product_id` -> files via `delivery/config.json`.
  `stamping.py` writes hidden licensee text + metadata. SQLite lives in `DATA_DIR`.
- Event idempotency: orders keyed by `order_created:<id>`; subscription events keyed by id + hash of the exact body.

## Status: verified vs not verified
**Verified (by running it):** all PDFs build; every master stamps on all pages; delivery tests pass (bad signature, duplicate retry,
unmapped product alert, redelivery, non-paid ignored, subscription lifecycle, update dry-run).
**NOT verified:** behavior against REAL Lemon Squeezy test-mode events (field names `user_email`, `user_name`, `status`, `order_number`,
`first_order_item.product_id`, subscription `product_id`/`status`/`ends_at` come from documented JSON:API shapes); real SMTP sending;
deployment; the exact Lemon Squeezy product IDs; the 10-day cancellation rule; California compliance (attorney).
The masterclass script `run_platform.py` was tested with a fake model, never against the live API.

## Backlog (do in this order; ask before anything that touches real accounts)
1. **Deploy the delivery service.** Add a Dockerfile (or the host's equivalent), HTTPS, persistent disk for `DATA_DIR`, `/health` check. Propose hosting options and costs; do not sign up for anything.
2. **Real test-mode run.** Walk the Founder through a Lemon Squeezy test purchase and test subscription. Log the real payload (redact emails), then adjust `fulfil.py` field names and add a test fixture from the real payload.
3. **CI.** GitHub Actions: `make test` on every push; fail on any test error.
4. **Waitlist.** A small endpoint or form-provider integration for `WAITLIST_URL` on the website page; double opt-in; unsubscribe link.
5. **Privacy policy and terms pages** for the website, using the attorney-reviewed text only (export of the Terms draft belongs in `docs/`). Do not invent legal text.
6. **Members area (optional).** Gate content with the Lemon Squeezy License API (subscription license keys expire with the subscription) behind a server-side check. A static page cannot hide content.
7. **Update workflow.** Document and schedule `send_update.py` for new editions; add an "edition" field to the config.
8. **Per-product smaller PDFs.** Split each module into its own sellable product only after the Founder prices them.
9. **Hardening.** Rate-limit the webhook, structured logging, backup of `deliveries.db`, retry with backoff for SMTP.

## How to work here
- Make small changes; run `make test` and rebuild affected PDFs; look at rendered pages (convert with `pdftoppm -png`) before claiming layout works.
- Keep the Founder-time cost low: summarize in plain language, list decisions needed with a recommended answer.
- If something is unknown, say UNKNOWN and name the smallest step to find out.
