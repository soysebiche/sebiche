/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
      root: __dirname,
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 86400,
    },
    reactStrictMode: true,
    // English is the default locale and x-default. A permanent 308 keeps crawlers on /en
    // without negotiating Accept-Language at the bare root (which would be a 307).
    async redirects() {
      return [
        {
          source: '/',
          destination: '/en',
          permanent: true,
        },
      ]
    },
    experimental: {
      // The root layout is app/[lang]/layout.tsx, so unmatched URLs need app/global-not-found.tsx.
      globalNotFound: true,
    },
  };
  
  module.exports = nextConfig;
