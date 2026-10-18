export const languages = ['en', 'es'] as const

export type Language = (typeof languages)[number]

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

// Remembers an explicit choice from the language switch, so the bare root sends the visitor back
// to the language they picked rather than the browser's.
export function rememberLanguage(language: Language) {
    document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000; samesite=lax`
}
