import { getRequestLanguage } from '../../lib/request-language'

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

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    const language = await getRequestLanguage()

    return (
        <>
            <nav aria-label="Skip navigation">
                <a href="#main" className="holding-skip-link">{language === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
            </nav>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            {children}
        </>
    )
}
