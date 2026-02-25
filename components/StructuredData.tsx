interface StructuredDataProps {
    type: 'Person' | 'Article'
    data: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
    let structuredData: Record<string, unknown> = {}

    switch (type) {
        case 'Person':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: data.name || 'Sebastian Napuri Mendoza',
                jobTitle: data.jobTitle || 'Product Designer & eCommerce Strategist',
                url: data.url || 'https://sebiche.vercel.app',
                sameAs: [
                    'https://www.linkedin.com/in/sebastian-napuri',
                    'https://github.com/soysebiche',
                ],
                alumniOf: [
                    {
                        '@type': 'EducationalOrganization',
                        name: 'Universidad del Pacífico',
                    },
                    {
                        '@type': 'EducationalOrganization',
                        name: 'Southern Methodist University',
                    },
                ],
                knowsAbout: [
                    'Product Design',
                    'UX Design',
                    'eCommerce',
                    'Marketplace Management',
                    'Cross-Border Commerce',
                    'Data Analytics',
                ],
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
