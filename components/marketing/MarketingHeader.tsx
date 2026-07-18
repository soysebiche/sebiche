'use client'

import Link from 'next/link'
import { useState } from 'react'
import { homeCopy } from '../../content/home'
import type { Language } from '../../lib/language'

type MarketingHeaderProps = {
    language: Language
    onLanguageChange: (language: Language) => void
    context?: 'home' | 'internal'
}

export default function MarketingHeader({ language, onLanguageChange, context = 'internal' }: MarketingHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const t = homeCopy[language]
    const homeHref = context === 'home' ? '#main' : '/'

    function selectLanguage(nextLanguage: Language) {
        onLanguageChange(nextLanguage)
        setIsMenuOpen(false)
    }

    return (
        <header className="holding-header">
            <Link className="holding-wordmark" href={homeHref} aria-label={t.nav.home}>
                <strong>SEBICHE</strong>
                <span>{t.hero.eyebrow}</span>
            </Link>

            <nav className="holding-nav" aria-label={t.nav.label}>
                <Link href="/#products">{t.nav.products}</Link>
                <Link href="/#approach">{t.nav.approach}</Link>
                <Link href="/contacto">{t.nav.contact}</Link>
            </nav>

            <button
                type="button"
                className="holding-menu-button"
                aria-expanded={isMenuOpen}
                aria-controls="holding-mobile-navigation"
                onClick={() => setIsMenuOpen((open) => !open)}
            >
                {t.nav.menu}
            </button>

            <nav
                id="holding-mobile-navigation"
                className={`holding-mobile-nav${isMenuOpen ? ' is-open' : ''}`}
                aria-label={t.nav.label}
            >
                <Link href="/#products" onClick={() => setIsMenuOpen(false)}>{t.nav.products}</Link>
                <Link href="/#approach" onClick={() => setIsMenuOpen(false)}>{t.nav.approach}</Link>
                <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</Link>
            </nav>

            <div className="holding-language" aria-label={t.nav.language}>
                <button
                    type="button"
                    className={language === 'en' ? 'is-active' : undefined}
                    onClick={() => selectLanguage('en')}
                    aria-pressed={language === 'en'}
                >
                    EN
                </button>
                <span aria-hidden>/</span>
                <button
                    type="button"
                    className={language === 'es' ? 'is-active' : undefined}
                    onClick={() => selectLanguage('es')}
                    aria-pressed={language === 'es'}
                >
                    ES
                </button>
            </div>
        </header>
    )
}
