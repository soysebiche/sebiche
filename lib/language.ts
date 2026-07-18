export type Language = 'en' | 'es'

export const LANGUAGE_COOKIE = 'sebiche-language'

export function isLanguage(value: string | undefined): value is Language {
    return value === 'en' || value === 'es'
}

export function languageFromAcceptLanguage(value: string | null): Language {
    if (!value) return 'en'

    const preferred = value
        .split(',')
        .map((entry) => entry.trim().split(';')[0]?.toLowerCase())
        .find(Boolean)

    return preferred?.startsWith('es') ? 'es' : 'en'
}
