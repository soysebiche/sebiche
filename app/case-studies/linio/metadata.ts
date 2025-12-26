import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Linio Cross-Border Marketplace Case Study | Sebastian Napuri',
    description: 'How I boosted cross-border sales by 125% at Linio Mexico through UX optimization, regional team leadership, and automation across 5 Latin American countries.',
    keywords: ['Linio', 'eCommerce', 'marketplace', 'cross-border', 'UX optimization', 'case study', 'Latin America'],
    authors: [{ name: 'Sebastian Napuri Mendoza' }],
    openGraph: {
        title: 'Linio Cross-Border Marketplace: 125% Sales Growth Case Study',
        description: 'Transforming cross-border operations across 5 Latin American countries through strategic UX optimization and team leadership.',
        type: 'article',
        url: 'https://sebiche.vercel.app/case-studies/linio',
        images: [
            {
                url: '/projects/linio.webp',
                width: 1200,
                height: 630,
                alt: 'Linio Cross-Border Marketplace Case Study',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Linio Cross-Border Marketplace: 125% Sales Growth',
        description: 'How I boosted cross-border sales by 125% through UX optimization and regional team leadership.',
        images: ['/projects/linio.webp'],
    },
}
