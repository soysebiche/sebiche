import { MetadataRoute } from 'next'
import { productPath, productSlugs } from '../content/products'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sebiche.com'

    const routes: Array<{ path: string, priority: number }> = [
        { path: '', priority: 1 },
        ...productSlugs.map((slug) => ({ path: productPath(slug), priority: 0.8 })),
        { path: '/contacto', priority: 0.7 },
    ]

    return routes.map(({ path, priority }) => ({
        url: `${baseUrl}${path}`,
        changeFrequency: 'monthly',
        priority,
    }))
}
