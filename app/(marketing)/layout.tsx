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
    const skipNavigationLabel = language === 'es' ? 'Navegación de salto' : 'Skip navigation'
    const skipLinkLabel = language === 'es' ? 'Saltar al contenido' : 'Skip to content'

    return (
        <>
            <nav aria-label={skipNavigationLabel} data-skip-navigation>
                <a
                    href="#main"
                    className="holding-skip-link"
                    data-skip-link
                    data-label-en="Skip to content"
                    data-label-es="Saltar al contenido"
                >
                    {skipLinkLabel}
                </a>
            </nav>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            {children}
        </>
    )
}
