# Clearvow (MVP)

A price-transparent, inclusive-by-default wedding vendor marketplace. Couples see published prices before they ask, send verified structured inquiries, and track replies. Vendors list for free with prices, read every inquiry brief, and pay only to unlock contact details or for a no-contract Pro plan. Ranking never depends on plan. Strategy and specifications live in `../docs/`.

## Run locally

```bash
cp .env.example .env            # only DATABASE_URL and SESSION_SECRET are required
npm install                     # runs prisma generate
npx prisma migrate dev          # creates prisma/dev.db (SQLite)
npm run db:seed                 # 48 labeled sample vendors, 4 sample weddings, demo accounts
npm run dev                     # http://localhost:3000
```

Demo accounts (password `password1234`): `couple@clearvow.example`, `vendor@clearvow.example` (owns "Harbor Light Studio (sample)", Pro plan), `admin@clearvow.example`.

Without email, SMS, Stripe, or AI keys the app still runs: verification codes print to the server console, billing buttons are disabled with a visible message, and inquiry briefs use the deterministic formatter.

## Founder-operated profiles

```bash
npx tsx scripts/list-house-vendors.ts you@example.com   # creates Bella Mia and Ethereal as drafts owned by that account
```

They stay drafts until prices, a package, an image, and the pledge are added in the vendor dashboard. The dashboard shows a switcher when one account owns several profiles. House profiles are excluded from Spotlight in code and carry a public disclosure.

## Verify

```bash
npm run lint && npm run typecheck && npm run build
PORT=3100 npx next start -p 3100 > server.log &
SMOKE_LOG=server.log npm run smoke      # 15-step Playwright flow through the real UI
```

The smoke test needs a Chromium binary; set `CHROME_PATH` if it is not at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.

## Production

Switch `prisma/schema.prisma` datasource to `postgresql`, set the variables in `.env.example`, run `prisma migrate deploy`, and schedule `GET /api/cron` daily with `Authorization: Bearer $CRON_SECRET`. Stripe webhook: `/api/stripe/webhook`. See `../docs/11-mvp-build-plan.md` section 11 for the full launch checklist.

## Layout

- `prisma/schema.prisma`: data model (SQLite locally, Postgres in production).
- `src/lib/`: auth, db, validation (zod), ranking rules, stats, notify (email, SMS), stripe, ai, analytics, queries, plans, pledge.
- `src/lib/actions/`: server actions for auth, couples, inquiries, vendors, admin, billing.
- `src/app/`: routes. Public pages, `dashboard/*` (couples), `vendor/*`, `admin/*`, `api/*`.
- `scripts/smoke.ts`: end-to-end test.
