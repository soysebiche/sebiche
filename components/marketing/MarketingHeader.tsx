'use client'

import Link from 'next/link'
import { Fragment, useState } from 'react'
import { homeCopy } from '../../content/home'
import SebicheSymbol from '../brand/SebicheSymbol'
import { languages, rememberLanguage, type Language } from '../../lib/language'
import { htmlLang, pathFor, type Route } from '../../lib/routes'
import DemoCta from './DemoCta'

type MarketingHeaderProps = {
    language: Language
    // The page being shown, so the language switch links to the same page in the other language.
    route: Route
}

export default function MarketingHeader({ language, route }: MarketingHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const t = homeCopy[language]
    const home = pathFor(language, { page: 'home' })
    const homeHref = route.page === 'home' ? '#main' : home
    const productsHref = pathFor(language, { page: 'products' })
    const contactHref = pathFor(language, { page: 'contact' })

    return (
        <header className="holding-header">
            <Link className="holding-wordmark" href={homeHref} aria-label={t.nav.home}>
                <SebicheSymbol className="holding-symbol" />
                <span className="holding-wordmark-text">
                    <strong>SEBICHE</strong>
                    <span>{t.hero.eyebrow}</span>
                </span>
            </Link>

            <nav className="holding-nav" aria-label={t.nav.label}>
                <Link href={productsHref} aria-current={route.page === 'products' ? 'page' : undefined}>{t.nav.products}</Link>
                <Link href={`${home}#approach`}>{t.nav.approach}</Link>
                <Link href={contactHref}>{t.nav.contact}</Link>
            </nav>

            <DemoCta language={language} className="holding-demo holding-demo-header" source="header" />

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
                <Link href={productsHref} aria-current={route.page === 'products' ? 'page' : undefined} onClick={() => setIsMenuOpen(false)}>{t.nav.products}</Link>
                <Link href={`${home}#approach`} onClick={() => setIsMenuOpen(false)}>{t.nav.approach}</Link>
                <Link href={contactHref} onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</Link>
                <DemoCta language={language} className="holding-demo holding-demo-mobile" source="header_mobile" onClick={() => setIsMenuOpen(false)} />
            </nav>

            <div className="holding-language" role="group" aria-label={t.nav.language}>
                {languages.map((option, index) => (
                    <Fragment key={option}>
                        {index > 0 ? <span aria-hidden>/</span> : null}
                        <Link
                            href={pathFor(option, route)}
                            hrefLang={htmlLang[option]}
                            lang={htmlLang[option]}
                            aria-current={option === language ? 'page' : undefined}
                            onClick={() => { rememberLanguage(option); setIsMenuOpen(false) }}
                        >
                            {option.toUpperCase()}
                        </Link>
                    </Fragment>
                ))}
            </div>
        </header>
    )
}
