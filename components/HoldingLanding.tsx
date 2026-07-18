'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LANGUAGE_COOKIE, type Language } from '../lib/language'

const EMAIL = 's@sebiche.com'

const copy = {
    en: {
        nav: {
            products: 'Products',
            approach: 'Approach',
            contact: 'Contact',
            menu: 'Menu',
            label: 'Primary navigation',
            language: 'Language',
            home: 'Sebiche home',
        },
        hero: {
            eyebrow: 'Restaurant technology',
            start: 'Your restaurant,',
            accent: 'connected',
            end: 'end to end.',
            body: 'A family of products built from real operations to help independent restaurants go digital.',
            cta: "Let's talk about your restaurant",
        },
        products: {
            title: 'Three products.',
            accent: 'One connected operation.',
            intro: 'Three specialized products working together across your restaurant.',
            items: [
                { name: 'RestOS', body: 'Orders, POS, kitchen and payments.' },
                { name: 'TipTrack', body: 'Delivery, routes, tips and oversight.' },
                { name: '86MISE', body: 'Inventory, purchasing and forecasting.' },
            ],
        },
        approach: {
            start: 'Technology that understands',
            accent: 'how a restaurant works.',
            pillars: [
                { title: 'Less friction', body: 'Clearer workflows so your team can focus on service.' },
                { title: 'More control', body: 'Real-time visibility from the kitchen to the doorstep.' },
                { title: 'Decisions with context', body: 'Connected data that helps you act better every day.' },
            ],
            caption: 'The details shape the operation.',
        },
        closing: {
            start: 'Digitize your restaurant',
            end: 'without losing its',
            accent: 'soul.',
            cta: 'Contact us',
        },
        imageAlt: {
            hero: 'A chef finishing a dish on the restaurant pass',
            restos: 'RestOS point of sale screen',
            tiptrack: 'TipTrack delivery operations screen',
            mise: '86MISE inventory dashboard',
            operations: 'A chef working the hot line during service',
        },
    },
    es: {
        nav: {
            products: 'Productos',
            approach: 'Enfoque',
            contact: 'Contacto',
            menu: 'Menú',
            label: 'Navegación principal',
            language: 'Idioma',
            home: 'Inicio de Sebiche',
        },
        hero: {
            eyebrow: 'Tecnología para restaurantes',
            start: 'Tu restaurante,',
            accent: 'conectado',
            end: 'de punta a punta.',
            body: 'Una familia de productos creada desde la operación real para digitalizar restaurantes independientes.',
            cta: 'Hablemos de tu restaurante',
        },
        products: {
            title: 'Tres productos.',
            accent: 'Una operación conectada.',
            intro: 'Tres productos especializados que trabajan juntos en todo tu restaurante.',
            items: [
                { name: 'RestOS', body: 'Pedidos, POS, cocina y pagos.' },
                { name: 'TipTrack', body: 'Reparto, rutas, propinas y supervisión.' },
                { name: '86MISE', body: 'Inventario, compras y pronóstico.' },
            ],
        },
        approach: {
            start: 'Tecnología que entiende',
            accent: 'cómo trabaja un restaurante.',
            pillars: [
                { title: 'Menos fricción', body: 'Flujos más claros para que tu equipo se enfoque en el servicio.' },
                { title: 'Más control', body: 'Visibilidad en tiempo real desde la cocina hasta la entrega.' },
                { title: 'Decisiones con contexto', body: 'Datos conectados que te ayudan a decidir mejor cada día.' },
            ],
            caption: 'El detalle hace la diferencia.',
        },
        closing: {
            start: 'Digitaliza tu restaurante',
            end: 'sin perder su',
            accent: 'esencia.',
            cta: 'Contáctanos',
        },
        imageAlt: {
            hero: 'Un chef terminando un plato en el pase del restaurante',
            restos: 'Pantalla de punto de venta de RestOS',
            tiptrack: 'Pantalla de operaciones de reparto de TipTrack',
            mise: 'Panel de inventario de 86MISE',
            operations: 'Un chef trabajando en la línea durante el servicio',
        },
    },
} as const

const productScreens = [
    { src: '/holding/restos.png', accent: 'copper', icon: 'OS', altKey: 'restos' },
    { src: '/holding/tiptrack.png', accent: 'violet', icon: '↗', altKey: 'tiptrack' },
    { src: '/holding/86mise.png', accent: 'orange', icon: '▤', altKey: 'mise' },
] as const

function contactHref(language: Language) {
    const subject = language === 'en'
        ? 'I want to learn more about Sebiche'
        : 'Quiero conocer más sobre Sebiche'
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`
}

export default function HoldingLanding({ initialLanguage }: { initialLanguage: Language }) {
    const [language, setLanguage] = useState<Language>(initialLanguage)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const t = copy[language]

    useEffect(() => {
        document.documentElement.lang = language === 'en' ? 'en-US' : 'es-419'
    }, [language])

    function selectLanguage(nextLanguage: Language) {
        setLanguage(nextLanguage)
        setIsMenuOpen(false)
        document.cookie = `${LANGUAGE_COOKIE}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`
    }

    return (
        <main id="main" className="holding-site">
            <section className="holding-hero" aria-labelledby="hero-title">
                <header className="holding-header">
                    <a className="holding-wordmark" href="#main" aria-label={t.nav.home}>
                        <strong>SEBICHE</strong>
                        <span>{t.hero.eyebrow}</span>
                    </a>

                    <nav className="holding-nav" aria-label={t.nav.label}>
                        <a href="#products">{t.nav.products}</a>
                        <a href="#approach">{t.nav.approach}</a>
                        <a href="#contact">{t.nav.contact}</a>
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
                        <a href="#products" onClick={() => setIsMenuOpen(false)}>{t.nav.products}</a>
                        <a href="#approach" onClick={() => setIsMenuOpen(false)}>{t.nav.approach}</a>
                        <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
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

                <div className="holding-hero-copy">
                    <h1 id="hero-title">
                        <span>{t.hero.start}</span>
                        <em>{t.hero.accent}</em>
                        <span>{t.hero.end}</span>
                    </h1>
                    <p>{t.hero.body}</p>
                    <div className="holding-contact-row">
                        <a className="holding-button" href={contactHref(language)}>{t.hero.cta}</a>
                    </div>
                </div>

                <div className="holding-hero-media">
                    <Image
                        src="/holding/hero-editorial.jpg"
                        alt={t.imageAlt.hero}
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 760px) 100vw, 54vw"
                    />
                    <div className="holding-ticket" aria-hidden>
                        <span>ORDER 86</span>
                        <strong>CONNECTED</strong>
                        <small>KITCHEN · DELIVERY · INVENTORY</small>
                    </div>
                </div>
            </section>

            <section id="products" className="holding-products" aria-labelledby="products-title">
                <div className="holding-section-heading">
                    <h2 id="products-title">
                        <span>{t.products.title}</span>
                        <em>{t.products.accent}</em>
                    </h2>
                    <p>{t.products.intro}</p>
                </div>

                <div className="holding-product-grid">
                    {t.products.items.map((product, index) => {
                        const screen = productScreens[index]
                        return (
                            <article className={`holding-product-card is-${screen.accent}`} key={product.name}>
                                <div className="holding-product-heading">
                                    <div>
                                        <h3>{product.name}</h3>
                                        <p>{product.body}</p>
                                    </div>
                                    <span aria-hidden>{screen.icon}</span>
                                </div>
                                <div className="holding-product-image">
                                    <Image
                                        src={screen.src}
                                        alt={t.imageAlt[screen.altKey]}
                                        fill
                                        loading="eager"
                                        unoptimized
                                        sizes="(max-width: 840px) 100vw, 33vw"
                                    />
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>

            <section id="approach" className="holding-approach" aria-labelledby="approach-title">
                <div className="holding-approach-copy">
                    <h2 id="approach-title">
                        <span>{t.approach.start}</span>
                        <em>{t.approach.accent}</em>
                    </h2>
                </div>
                <div className="holding-pillars">
                    {t.approach.pillars.map((pillar, index) => (
                        <article key={pillar.title}>
                            <span className="holding-pillar-number">0{index + 1}</span>
                            <span className="holding-pillar-mark" aria-hidden>{index === 0 ? '↓' : index === 1 ? '≋' : '▥'}</span>
                            <h3>{pillar.title}</h3>
                            <p>{pillar.body}</p>
                        </article>
                    ))}
                </div>
                <div className="holding-operations-media">
                    <Image
                        src="/holding/operations-editorial.jpg"
                        alt={t.imageAlt.operations}
                        fill
                        loading="eager"
                        unoptimized
                        sizes="(max-width: 760px) 100vw, 75vw"
                    />
                </div>
                <div className="holding-86-block" aria-hidden>
                    <strong>86</strong>
                    <span>{t.approach.caption}</span>
                </div>
            </section>

            <section id="contact" className="holding-closing" aria-labelledby="closing-title">
                <div>
                    <h2 id="closing-title">
                        <span>{t.closing.start}</span>
                        <span>{t.closing.end} <em>{t.closing.accent}</em></span>
                    </h2>
                    <div className="holding-contact-row is-dark">
                        <a className="holding-button" href={contactHref(language)}>{t.closing.cta}</a>
                    </div>
                </div>

                <footer className="holding-footer">
                    <span>SEBICHE — Dallas, Texas</span>
                    <div>
                        <a href="#products">RestOS</a>
                        <i aria-hidden />
                        <a href="#products">TipTrack</a>
                        <i aria-hidden />
                        <a href="#products">86MISE</a>
                    </div>
                </footer>
            </section>
        </main>
    )
}
