export const languages = ['en', 'es'] as const

export type Language = (typeof languages)[number]

export const LANGUAGE_COOKIE = 'sebiche-language'

export function isLanguage(value: string | undefined): value is Language {
    return value === 'en' || value === 'es'
}

// Highest-q tag wins. Spanish if that tag is es*; everything else, including a missing header, is English.
export function languageFromAcceptLanguage(value: string | null): Language {
    if (!value) return 'en'

    const ranked = value
        .split(',')
        .map((entry, index) => {
            const [range, ...params] = entry.trim().split(';')
            const tag = range?.trim().toLowerCase() ?? ''
            const qualityParam = params.find((param) => param.trim().startsWith('q='))
            const quality = qualityParam ? Number(qualityParam.trim().slice(2)) : 1
            return { tag, quality: Number.isFinite(quality) ? quality : 0, index }
        })
        .filter((entry) => entry.tag && entry.tag !== '*' && entry.quality > 0)
        .sort((a, b) => b.quality - a.quality || a.index - b.index)

    return ranked[0]?.tag.startsWith('es') ? 'es' : 'en'
}

// Remembers an explicit choice from the language switch, so the bare root sends the visitor back
// to the language they picked rather than the browser's.
export function rememberLanguage(language: Language) {
    document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000; samesite=lax`
}
