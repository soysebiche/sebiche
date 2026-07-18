import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sebiche.com'

    const routes = [
        { path: '', priority: 1 },
        { path: '/productos/restos', priority: 0.8 },
        { path: '/productos/tiptrack', priority: 0.8 },
        { path: '/productos/86mise', priority: 0.8 },
        { path: '/contacto', priority: 0.7 },
    ]

    return routes.map(({ path, priority }) => ({
        url: `${baseUrl}${path}`,
        changeFrequency: 'monthly',
        priority,
    }))
}
