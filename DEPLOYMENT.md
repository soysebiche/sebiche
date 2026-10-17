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

The marketing pages render without environment variables. Vercel Analytics is enabled automatically when `VERCEL` is present. Google Analytics uses Sebiche's dedicated GA4 web-stream ID, with `NEXT_PUBLIC_GA_MEASUREMENT_ID` available as an optional public override.

The internal contact form needs these production variables to deliver messages:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` — a sender on a domain verified in Resend
- `CONTACT_TO_EMAIL` — the Sebiche inbox that receives inquiries
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional override for the public GA4 measurement ID used by `sebiche.com`

If they are absent or delivery fails, the form fails safely and presents a prefilled `mailto:` fallback without clearing the visitor's information.

## Vercel configuration

- Framework preset: Next.js
- Root directory: repository root
- Build command: `npm run build`
- Production domain: `www.sebiche.com`. The apex `sebiche.com` redirects to it, so `lib/site.ts` (`SITE_URL`) uses `www` for every canonical, sitemap entry, JSON-LD url and Open Graph image. Change both together.

## Routes and languages

Every page exists once per language and is prerendered at build time:

| Page | English | Spanish |
| --- | --- | --- |
| Home | `/en` | `/es` |
| Product | `/en/products/{restos,tiptrack,86mise}` | `/es/productos/{restos,tiptrack,86mise}` |
| Contact | `/en/contact` | `/es/contacto` |

Each page declares its canonical, the `hreflang` alternates (`en-US`, `es-419`, and `x-default` → `/` for the home) and localized title, description and share image. Paths live in `lib/routes.ts`.

`proxy.ts` handles paths without a language prefix: `/` and the old `/productos/*` and `/contacto` URLs redirect (307) to the visitor's language, taken from the `sebiche-language` cookie that the language switch sets, then from `Accept-Language`, defaulting to English. The query string is kept, so `/contacto?product=86mise` still preselects the product.

After deployment, verify `/en`, `/es`, the six product pages, both contact pages, the redirects from `/`, `/robots.txt`, `/sitemap.xml` and `/manifest.webmanifest`. Submit a test inquiry and confirm it reaches `CONTACT_TO_EMAIL`. Confirm that retired portfolio and restaurant-display URLs return `404`.

## Search setup

Verify the `sebiche.com` domain property in Google Search Console with its DNS TXT record, then submit `https://www.sebiche.com/sitemap.xml`. The sitemap lists both languages with their `hreflang` alternates.

## Project boundaries

- `app/(marketing)`: the public corporate Sebiche site.
- `archive/portfolio-legacy`: preserved historical portfolio code, excluded from lint and TypeScript builds.
