import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sebiche.com'

    return [
        {
            url: baseUrl,
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}
