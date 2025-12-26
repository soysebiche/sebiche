'use client'

interface StructuredDataProps {
    type: 'Person' | 'Organization' | 'Article'
    data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
    let structuredData: any = {}

    switch (type) {
        case 'Person':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: data.name || 'Sebastian Napuri Mendoza',
                jobTitle: data.jobTitle || 'eCommerce UX Leader & Marketplace Expert',
                url: data.url || 'https://sebiche.vercel.app',
                sameAs: data.sameAs || [
                    'https://www.linkedin.com/in/sebastian-napuri',
                    'https://github.com/soysebiche',
                ],
                alumniOf: {
                    '@type': 'EducationalOrganization',
                    name: 'Universidad del Pacífico',
                },
                worksFor: data.worksFor || [
                    {
                        '@type': 'Organization',
                        name: 'Servicios Liverpool',
                    },
                ],
                knowsAbout: [
                    'eCommerce',
                    'UX Design',
                    'Marketplace Management',
                    'Cross-Border Commerce',
                    'Product Management',
                ],
            }
            break

        case 'Organization':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: data.name || 'Sebiche',
                url: data.url || 'https://sebiche.vercel.app',
                logo: data.logo || 'https://sebiche.vercel.app/logo.svg',
                description: data.description || 'eCommerce UX and Marketplace Consulting',
                founder: {
                    '@type': 'Person',
                    name: 'Sebastian Napuri Mendoza',
                },
            }
            break

        case 'Article':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: data.headline,
                description: data.description,
                author: {
                    '@type': 'Person',
                    name: 'Sebastian Napuri Mendoza',
                },
                datePublished: data.datePublished || new Date().toISOString(),
                dateModified: data.dateModified || new Date().toISOString(),
                publisher: {
                    '@type': 'Organization',
                    name: 'Sebiche',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://sebiche.vercel.app/logo.svg',
                    },
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': data.url,
                },
            }
            break
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}
