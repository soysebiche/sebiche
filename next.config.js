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
    experimental: {
      // The root layout is app/[lang]/layout.tsx, so unmatched URLs need app/global-not-found.tsx.
      globalNotFound: true,
    },
  };
  
  module.exports = nextConfig;
