# Sebiche

Corporate Next.js site for [sebiche.com](https://sebiche.com) — restaurant technology products (RestOS, TipTrack, 86MISE).

## Prerequisites

- **Node.js 20.9+** (Node 22 recommended; matches Next.js 16)
- **npm** (lockfile: `package-lock.json` — use npm, not yarn/pnpm)

## Setup

```bash
npm ci
cp .env.example .env.local   # optional — see Environment below
```

## Develop

```bash
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

## Checks

```bash
npm run lint
npm run typecheck
npm test          # production build + route smoke tests
```

Individual scripts: `npm run build`, `npm run test:routes`, `npm start` (after build).

## Environment

The public marketing pages render **without** credentials. Copy `.env.example` to `.env.local` only when you need contact delivery or a GA override:

| Variable | Required? | Purpose |
|---|---|---|
| `RESEND_API_KEY` | No (local) | Contact form email delivery via Resend |
| `CONTACT_FROM_EMAIL` | No | Verified Resend sender |
| `CONTACT_TO_EMAIL` | No | Inbox for inquiries |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Optional public GA4 measurement ID override |

Without `RESEND_API_KEY`, `/api/contact` returns `CONTACT_NOT_CONFIGURED` and the UI offers a prefilled `mailto:` fallback. Do not commit real secrets — use placeholders in `.env.example` and local `.env*.local` files only.

## Project map

| Path | Role |
|---|---|
| `app/(marketing)` | Public corporate site |
| `app/api/contact` | Contact form API |
| `archive/portfolio-legacy` | Historical code — excluded from build/lint |
| `DEPLOYMENT.md` | Production / Vercel notes |
| `PROJECT_GUIDE.md` | Product and architecture guide |

## Cloud Agents

Install dependencies with `npm ci`. No secrets are required to lint, typecheck, build, test, or run the marketing UI. Optional Resend keys are only needed to exercise live contact delivery.
