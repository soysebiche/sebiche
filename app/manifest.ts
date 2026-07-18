import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sebiche | Restaurant Technology',
        short_name: 'Sebiche',
        description: 'Connected restaurant technology for orders, delivery, inventory, purchasing and forecasting.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#F3EFE7',
        theme_color: '#11110F',
        lang: 'en-US',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
        categories: ['business', 'productivity'],
    }
}
