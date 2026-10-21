import '../globals.css'
import '../holding.css'
import '../product.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GoogleAnalytics from '../../components/site/GoogleAnalytics'
import Telemetry from '../../components/Telemetry'
import { homeCopy } from '../../content/home'
import { fontVariables } from '../../lib/fonts'
import { isLanguage, languages } from '../../lib/language'
import { htmlLang } from '../../lib/routes'
import { CONTACT_EMAIL, SITE_URL } from '../../lib/site'
import tokens from '../../brand/tokens.flat.json'

// Only /en and /es exist; anything else at the first segment is a 404.
export const dynamicParams = false

export function generateStaticParams() {
    return languages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
    const { lang } = await params
    if (!isLanguage(lang)) return {}

    const { meta } = homeCopy[lang]

    // Canonical, hreflang and share metadata are per page (lib/metadata.ts).
    return {
        metadataBase: new URL(SITE_URL),
        title: { default: meta.title, template: '%s | Sebiche' },
        description: meta.description,
        keywords: [...meta.keywords],
        authors: [{ name: 'Sebiche' }],
        creator: 'Sebiche',
        manifest: '/manifest.webmanifest',
        robots: { index: true, follow: true },
    }
}

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Sebiche',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/icon-512.png`,
    email: CONTACT_EMAIL,
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

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
    const { lang } = await params
    if (!isLanguage(lang)) notFound()

    return (
        <html lang={htmlLang[lang]} className={fontVariables}>
            <head>
                <meta name="theme-color" content={tokens.color.ground} />
                <GoogleAnalytics />
            </head>
            <body>
                <nav aria-label={lang === 'es' ? 'Navegación de salto' : 'Skip navigation'}>
                    <a href="#main" className="holding-skip-link">
                        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
                    </a>
                </nav>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                {children}
                <Telemetry enabled={Boolean(process.env.VERCEL)} />
            </body>
        </html>
    )
}
