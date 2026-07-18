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
  };
  
  module.exports = nextConfig;
