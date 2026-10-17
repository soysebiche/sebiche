import type { Metadata } from 'next'
import { homeCopy } from '../content/home'
import type { Language } from './language'
import { languageAlternates, ogLocale, pathFor, type Route } from './routes'

type PageMetadataOptions = {
    // Page title, run through the layout's "%s | Sebiche" template. Omit to use the site title.
    title?: string
    description?: string
}

// Next replaces (does not merge) openGraph and twitter between the layout and the page, so each
// page builds the full set here: canonical, hreflang alternates and localized share metadata.
export function pageMetadata(language: Language, route: Route, { title, description }: PageMetadataOptions = {}): Metadata {
    const { meta } = homeCopy[language]
    const path = pathFor(language, route)
    const shareTitle = title ? `${title} | Sebiche` : meta.title
    const shareDescription = description ?? meta.share
    const otherLanguage: Language = language === 'en' ? 'es' : 'en'

    return {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        alternates: { canonical: path, languages: languageAlternates(route) },
        openGraph: {
            type: 'website',
            url: path,
            locale: ogLocale[language],
            alternateLocale: [ogLocale[otherLanguage]],
            siteName: 'Sebiche',
            title: shareTitle,
            description: shareDescription,
        },
        twitter: { card: 'summary_large_image', title: shareTitle, description: shareDescription },
    }
}
