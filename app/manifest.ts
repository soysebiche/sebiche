import type { MetadataRoute } from 'next'
import tokens from '../brand/tokens.json'
import { homeCopy } from '../content/home'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sebiche | Restaurant Technology',
        short_name: 'Sebiche',
        description: homeCopy.en.meta.description,
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: tokens.color.ground,
        theme_color: tokens.color.ground,
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
