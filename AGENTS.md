# AGENTS.md

## Cursor Cloud specific instructions

Sebiche is a single Next.js 16 (App Router, Turbopack) marketing site — there is no backend service, database, or other companion process. Standard commands live in `package.json` and `README.md`; prefer those over duplicating them.

- Node 22 and npm are used (lockfile: `package-lock.json`; do not use yarn/pnpm). Dependencies are installed by the startup update script (`npm ci`), so you normally don't need to reinstall.
- Run the dev server with `npm run dev` (serves on port 3000; Turbopack). `.claude/launch.json` runs it on port 3001 instead — either is fine.
- Checks: `npm run lint`, `npm run typecheck`, and `npm test`. Note `npm test` runs a full production `next build` first and then `tests/routes.test.mjs` (which itself runs `next start` and smoke-tests routes), so it is slower than the dev server and needs no running server beforehand.
- No secrets are required to lint, typecheck, build, test, or run the marketing UI. The contact flow (`/api/contact`) only delivers email when `RESEND_API_KEY` (plus `CONTACT_FROM_EMAIL`/`CONTACT_TO_EMAIL`) is set. Without it, submitting the contact form is expected to return `503 CONTACT_NOT_CONFIGURED` and the UI falls back to a prefilled `mailto:` to `s@sebiche.com` — this is correct behavior, not a bug.
- `archive/portfolio-legacy` is intentionally excluded from build/lint; legacy/retired routes (e.g. `/menu-board`, `/pizza`, `/case-studies/*`) must keep returning 404 (enforced by `tests/routes.test.mjs`).
