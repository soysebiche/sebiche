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

The marketing pages render without environment variables. Vercel Analytics is enabled automatically when `VERCEL` is present. Google Analytics is enabled when `NEXT_PUBLIC_GA_MEASUREMENT_ID` contains the public GA4 web-stream ID.

The internal contact form needs these production variables to deliver messages:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — a sender on a domain verified in Resend
- `CONTACT_TO_EMAIL` — the Sebiche inbox that receives inquiries
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — the public GA4 measurement ID for `sebiche.com`

If they are absent or delivery fails, the form fails safely and presents a prefilled `mailto:` fallback without clearing the visitor's information.

## Vercel configuration

- Framework preset: Next.js
- Root directory: repository root
- Build command: `npm run build`
- Production domain: `sebiche.com`

After deployment, verify `/`, the three `/productos/*` pages, `/contacto`, `/robots.txt`, `/sitemap.xml` and `/manifest.webmanifest`. Submit a test inquiry and confirm it reaches `CONTACT_TO_EMAIL`. Confirm that retired portfolio and restaurant-display URLs return `404`.

## Search setup

Verify the `sebiche.com` domain property in Google Search Console with its DNS TXT record, then submit `https://sebiche.com/sitemap.xml`. Public canonical URLs and Open Graph metadata use `https://sebiche.com`.

## Project boundaries

- `app/(marketing)`: the public corporate Sebiche site.
- `archive/portfolio-legacy`: preserved historical portfolio code, excluded from lint and TypeScript builds.
