import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sebiche | Restaurant Technology',
        short_name: 'Sebiche',
        description: 'Connected restaurant technology for orders, delivery, inventory, purchasing and forecasting.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#090909',
        theme_color: '#090909',
        lang: 'en-US',
        icons: [
            {
                src: '/brand/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/brand/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/brand/icon-maskable-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        categories: ['business', 'productivity'],
    }
}
