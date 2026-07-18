import { cookies, headers } from 'next/headers'
import { isLanguage, languageFromAcceptLanguage, LANGUAGE_COOKIE, type Language } from './language'

export async function getRequestLanguage(): Promise<Language> {
    const cookieStore = await cookies()
    const savedLanguage = cookieStore.get(LANGUAGE_COOKIE)?.value

    if (isLanguage(savedLanguage)) return savedLanguage

    const requestHeaders = await headers()
    return languageFromAcceptLanguage(requestHeaders.get('accept-language'))
}
