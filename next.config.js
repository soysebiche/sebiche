/** @type {import('next').NextConfig} */
const contentSecurityPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live",
    "frame-src https://vercel.live",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ')

const securityHeaders = [
    { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
]

const nextConfig = {
    turbopack: {
      root: __dirname,
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 86400,
    },
    reactStrictMode: true,
    experimental: {
      // The root layout is app/[lang]/layout.tsx, so unmatched URLs need app/global-not-found.tsx.
      globalNotFound: true,
    },
    async headers() {
      return [
        { source: '/', headers: securityHeaders },
        { source: '/:path*', headers: securityHeaders },
      ]
    },
  };
  
  module.exports = nextConfig;
