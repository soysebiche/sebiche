import { Inter, Montserrat } from 'next/font/google'
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

export const metadata: Metadata = {
    title: 'Sebastian Napuri Mendoza | Product Designer & eCommerce Strategist',
    description: 'Product designer with 10+ years transforming eCommerce experiences across Latin America. 125% sales growth, 100+ sellers onboarded, 5 countries.',
    keywords: ['Sebastian Napuri', 'Product Designer', 'UX Design', 'eCommerce', 'Marketplace', 'LATAM', 'Linio', 'Falabella', 'Liverpool', 'SMU'],
    authors: [{ name: 'Sebastian Napuri Mendoza' }],
    creator: 'Sebastian Napuri Mendoza',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sebiche.vercel.app',
        siteName: 'Sebastian Napuri',
        title: 'Sebastian Napuri Mendoza | Product Designer & eCommerce Strategist',
        description: 'Turning user frustration into revenue growth across Latin America\'s largest retailers.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Sebastian Napuri Mendoza - Product Designer & eCommerce Strategist',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sebastian Napuri Mendoza | Product Designer & eCommerce Strategist',
        description: 'Turning user frustration into revenue growth across Latin America\'s largest retailers.',
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
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <meta name="theme-color" content="#1A1A2E" />
            </head>
            <body className="antialiased">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-charcoal focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
                >
                    Skip to content
                </a>
                {children}
                <StructuredData
                    type="Person"
                    data={{
                        name: 'Sebastian Napuri Mendoza',
                        jobTitle: 'Product Designer & eCommerce Strategist',
                        url: 'https://sebiche.vercel.app',
                    }}
                />
                <Analytics />
            </body>
        </html>
    )
}
