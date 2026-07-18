# Sebiche deployment

Sebiche is a Next.js App Router project deployed from the repository root.

## Production checks

Run the complete local gate before deployment:

```bash
npm ci
npm run lint
npm run typecheck
npm test
```

No application environment variables are currently required. Vercel Analytics is enabled automatically when `VERCEL` is present.

## Vercel configuration

- Framework preset: Next.js
- Root directory: repository root
- Build command: `npm run build`
- Production domain: `sebiche.com`

After deployment, verify `/`, `/robots.txt`, `/sitemap.xml` and `/manifest.webmanifest`. Confirm that retired portfolio and restaurant-display URLs return `404`.

## Search setup

Submit `https://sebiche.com/sitemap.xml` in Google Search Console after domain verification. Public canonical URLs and Open Graph metadata use `https://sebiche.com`.

## Project boundaries

- `app/(marketing)`: the public corporate Sebiche site.
- `archive/portfolio-legacy`: preserved historical portfolio code, excluded from lint and TypeScript builds.
