import { productSlugs, type ProductSlug } from '../content/products'
import { languages, type Language } from './language'

// Every public page exists once per language, under its own prefix and with localized
// segments: /es/productos/restos ↔ /en/products/restos, /es/contacto ↔ /en/contact.
export type Route = { page: 'home' } | { page: 'product'; slug: ProductSlug } | { page: 'contact' }

export const routeSegments = {
    en: { product: 'products', contact: 'contact' },
    es: { product: 'productos', contact: 'contacto' },
} as const

export function pathFor(language: Language, route: Route) {
    const segments = routeSegments[language]

    switch (route.page) {
        case 'home':
            return `/${language}`
        case 'product':
            return `/${language}/${segments.product}/${route.slug}`
        case 'contact':
            return `/${language}/${segments.contact}`
    }
}

// hreflang alternates for a route. The bare root negotiates the language, so it is the x-default.
export function languageAlternates(route: Route) {
    const alternates: Record<string, string> = {}
    for (const language of languages) alternates[htmlLang[language]] = pathFor(language, route)
    if (route.page === 'home') alternates['x-default'] = '/'
    return alternates
}

export const htmlLang = { en: 'en-US', es: 'es-419' } as const satisfies Record<Language, string>

export const ogLocale = { en: 'en_US', es: 'es_419' } as const satisfies Record<Language, string>

// generateStaticParams for a product route: every slug, only under the language it belongs to.
// It returns both segments, so the route does not depend on the layout's language params.
export function productStaticParams(language: Language) {
    return () => productSlugs.map((slug) => ({ lang: language, slug }))
}
