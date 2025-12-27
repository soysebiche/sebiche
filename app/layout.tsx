import { Inter, Montserrat, Caveat } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import StructuredData from '../components/StructuredData'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})

const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    weight: ['400', '700'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Sebastian Napuri Mendoza | eCommerce UX Leader',
    description: 'Transforming user experience into measurable revenue growth. 9+ years driving eCommerce success with proven results: 125% sales increase, 78% conversion boost.',
    keywords: ['Sebastian Napuri', 'UX', 'UI', 'eCommerce', 'Marketplace', 'Product Manager', 'Peru', 'Linio', 'Liverpool'],
    authors: [{ name: 'Sebastian Napuri Mendoza' }],
    creator: 'Sebastian Napuri Mendoza',
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://sebiche.vercel.app',
        siteName: 'Sebiche',
        title: 'Sebastian Napuri Mendoza | eCommerce UX Leader',
        description: 'Transforming user experience into measurable revenue growth',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Sebastian Napuri Mendoza - eCommerce UX Leader',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sebastian Napuri Mendoza | eCommerce UX Leader',
        description: 'Transforming user experience into measurable revenue growth',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code', // TODO: Add actual verification code
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className={`${inter.variable} ${montserrat.variable} ${caveat.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#00A89A" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Sebiche" />
            </head>
            <body className="antialiased">
                {children}
                <StructuredData
                    type="Person"
                    data={{
                        name: 'Sebastian Napuri Mendoza',
                        jobTitle: 'eCommerce UX Leader & Marketplace Expert',
                        url: 'https://sebiche.vercel.app',
                    }}
                />
                <StructuredData
                    type="Organization"
                    data={{
                        name: 'Sebiche',
                        url: 'https://sebiche.vercel.app',
                        description: 'eCommerce UX and Marketplace Consulting',
                    }}
                />
                <Script
                    src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
                    strategy="lazyOnload"
                />
                <Script id="sw-register" strategy="afterInteractive">
                    {`
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', function() {
                                navigator.serviceWorker.register('/sw.js');
                            });
                        }
                    `}
                </Script>
                <Analytics />
            </body>
        </html>
    )
}
