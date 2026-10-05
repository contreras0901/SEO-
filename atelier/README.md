# Atelier Launch Co. platform

Builds the digital products (PDFs + template zips), the social designs, the website Library page,
and the automated delivery service that stamps and emails purchases.

## Quick start
```bash
python3 -m venv .venv && source .venv/bin/activate
make setup          # packages + headless Chromium
make build          # PDFs + zips -> publishing/dist/
make social         # PNGs -> social/dist/
make test           # delivery tests
```

## Deploying delivery
See `delivery/README.md`. Copy `delivery/config.example.json` to `delivery/config.json`, set the env vars from `.env.example`,
`make masters` to stage the files, then run behind HTTPS and point a Lemon Squeezy webhook at `/webhooks/lemonsqueezy`.

## Working with Claude Code
Open this folder in Claude Code. `CLAUDE.md` holds the decisions, rules, and the ordered backlog.
A good first message is in `START_HERE.md`.
