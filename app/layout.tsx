import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import './holding.css'
import type { Metadata } from 'next'

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-editorial',
    display: 'swap',
    weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
    metadataBase: new URL('https://sebiche.com'),
    title: 'Sebiche | Restaurant Technology',
    description: 'Connected restaurant technology for orders, delivery, inventory, purchasing and forecasting.',
    keywords: ['restaurant technology', 'restaurant operations', 'POS', 'delivery management', 'restaurant inventory'],
    authors: [{ name: 'Sebiche' }],
    creator: 'Sebiche',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: ['es_419'],
        url: 'https://sebiche.com',
        siteName: 'Sebiche',
        title: 'Sebiche | Restaurant Technology',
        description: 'Your restaurant, connected end to end.',
        images: [{
            url: '/holding/hero-editorial.jpg',
            width: 1200,
            height: 630,
            alt: 'Chef finishing a dish on the restaurant pass',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sebiche | Restaurant Technology',
        description: 'Your restaurant, connected end to end.',
        images: ['/holding/hero-editorial.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
}

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sebiche',
    url: 'https://sebiche.com',
    email: 's@sebiche.com',
    description: 'Connected restaurant technology for independent restaurants.',
    location: {
        '@type': 'Place',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Dallas',
            addressRegion: 'TX',
            addressCountry: 'US',
        },
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <meta name="theme-color" content="#11110f" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
            </head>
            <body>
                <a href="#main" className="holding-skip-link">Skip to content</a>
                {children}
                {process.env.VERCEL ? <Analytics /> : null}
            </body>
        </html>
    )
}
