import type { MetadataRoute } from 'next'
import { productSlugs } from '../content/products'
import { languages } from '../lib/language'
import { languageAlternates, pathFor, type Route } from '../lib/routes'
import { SITE_URL } from '../lib/site'

const routes: Array<{ route: Route; priority: number }> = [
    { route: { page: 'home' }, priority: 1 },
    ...productSlugs.map((slug) => ({ route: { page: 'product', slug } as const, priority: 0.8 })),
    { route: { page: 'contact' }, priority: 0.7 },
]

// One entry per language and page, each listing its hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
    return routes.flatMap(({ route, priority }) => {
        const alternates = Object.fromEntries(
            Object.entries(languageAlternates(route)).map(([hreflang, path]) => [hreflang, `${SITE_URL}${path}`]),
        )

        return languages.map((language) => ({
            url: `${SITE_URL}${pathFor(language, route)}`,
            changeFrequency: 'monthly' as const,
            priority,
            alternates: { languages: alternates },
        }))
    })
}
