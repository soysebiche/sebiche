'use client'

import { useEffect, useState } from 'react'
import { LANGUAGE_COOKIE, type Language } from './language'

export function useLanguageSelection(initialLanguage: Language) {
    const [language, setLanguage] = useState<Language>(initialLanguage)

    useEffect(() => {
        document.documentElement.lang = language === 'en' ? 'en-US' : 'es-419'

        const skipNavigation = document.querySelector<HTMLElement>('[data-skip-navigation]')
        const skipLink = document.querySelector<HTMLAnchorElement>('[data-skip-link]')

        skipNavigation?.setAttribute('aria-label', language === 'es' ? 'Navegación de salto' : 'Skip navigation')
        if (skipLink) {
            skipLink.textContent = language === 'es' ? skipLink.dataset.labelEs ?? 'Saltar al contenido' : skipLink.dataset.labelEn ?? 'Skip to content'
        }
    }, [language])

    function selectLanguage(nextLanguage: Language) {
        setLanguage(nextLanguage)
        document.cookie = `${LANGUAGE_COOKIE}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`
    }

    return { language, selectLanguage }
}
