'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { getProductCopy, products, type Product } from '../../content/products'
import type { Language } from '../../lib/language'
import { trackMarketingEvent } from '../../lib/marketing-analytics'
import { useLanguageSelection } from '../../lib/use-language-selection'
import MarketingHeader from './MarketingHeader'

const commonCopy = {
    en: { back: 'All products', proof: 'Verified product evidence', related: 'Other Sebiche products', contact: 'Contact', screen: 'product screen', scenes: 'Inside the product', scenesTitle: 'From operational signal to controlled action.' },
    es: { back: 'Todos los productos', proof: 'Evidencia verificada del producto', related: 'Otros productos Sebiche', contact: 'Contacto', screen: 'pantalla del producto', scenes: 'Dentro del producto', scenesTitle: 'De la señal operativa a la acción controlada.' },
} as const

export default function ProductDetail({ product, initialLanguage }: { product: Product, initialLanguage: Language }) {
    const { language, selectLanguage } = useLanguageSelection(initialLanguage)
    const copy = getProductCopy(product, language)
    const common = commonCopy[language]
    const viewedLanguage = useRef(initialLanguage)

    useEffect(() => {
        trackMarketingEvent('Product Viewed', { product: product.slug, language: viewedLanguage.current })
    }, [product.slug])

    return (
        <main id="main" className={`product-site is-${product.accent}`}>
            <MarketingHeader language={language} onLanguageChange={selectLanguage} />

            <section className="product-hero" aria-labelledby="product-title">
                <div className="product-hero-copy">
                    <Link className="product-back" href="/#products"><span aria-hidden>←</span> {common.back}</Link>
                    <p className="product-eyebrow"><span>{product.number}</span>{copy.eyebrow}</p>
                    <h1 id="product-title">{copy.headline}</h1>
                    <p className="product-intro">{copy.intro}</p>
                    <Link
                        className="holding-button"
                        href={`/contacto?product=${product.slug}`}
                        onClick={() => trackMarketingEvent('Product CTA Clicked', { product: product.slug, source: 'product_hero', language })}
                    >
                        {copy.cta}
                    </Link>
                </div>
                <div className="product-hero-identity" aria-label={product.name}>
                    <span>{product.icon}</span>
                    <strong>{product.name}</strong>
                </div>
            </section>

            <section className="product-framing" aria-label={`${copy.problemTitle} / ${copy.audienceTitle}`}>
                <article>
                    <span>01</span>
                    <h2>{copy.problemTitle}</h2>
                    <p>{copy.problem}</p>
                </article>
                <article>
                    <span>02</span>
                    <h2>{copy.audienceTitle}</h2>
                    <p>{copy.audience}</p>
                </article>
            </section>

            <section className="product-workflow" aria-labelledby="workflow-title">
                <div className="product-section-lead">
                    <p>{product.name} / 03</p>
                    <h2 id="workflow-title">{copy.workflowTitle}</h2>
                    <span>{copy.workflowIntro}</span>
                </div>
                <ol>
                    {copy.workflow.map((step, index) => (
                        <li key={step.title}>
                            <span>0{index + 1}</span>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="product-screen" aria-label={`${product.name} ${common.screen}`}>
                <div className="product-screen-frame">
                    <Image
                        src={product.image}
                        alt={copy.imageAlt}
                        fill
                        loading="eager"
                        sizes="(max-width: 760px) 92vw, 74vw"
                    />
                </div>
                <div className="product-proof">
                    <p>{common.proof}</p>
                    <strong>{product.proofMetric}</strong>
                    <span>{copy.evidenceLabel}</span>
                    <small>{copy.evidenceBody}</small>
                </div>
            </section>

            {product.scenes && product.scenes.length > 0 && (
                <section className="product-scenes" aria-labelledby="product-scenes-title">
                    <div className="product-scenes-lead">
                        <p>{product.name} / {common.scenes}</p>
                        <h2 id="product-scenes-title">{common.scenesTitle}</h2>
                    </div>
                    <div className="product-scenes-grid">
                        {product.scenes.map((scene, index) => {
                            const sceneCopy = scene[language]

                            return (
                                <figure key={scene.image}>
                                    <div className="product-scene-frame">
                                        <Image
                                            src={scene.image}
                                            alt={sceneCopy.alt}
                                            fill
                                            sizes="(max-width: 760px) 92vw, 46vw"
                                        />
                                    </div>
                                    <figcaption>
                                        <span>0{index + 1}</span>
                                        <div>
                                            <h3>{sceneCopy.title}</h3>
                                            <p>{sceneCopy.body}</p>
                                        </div>
                                    </figcaption>
                                </figure>
                            )
                        })}
                    </div>
                </section>
            )}

            <section className="product-capabilities" aria-labelledby="capabilities-title">
                <div className="product-section-lead">
                    <p>{product.name} / 04</p>
                    <h2 id="capabilities-title">{copy.capabilitiesTitle}</h2>
                </div>
                <div className="product-capability-grid">
                    {copy.capabilities.map((capability, index) => (
                        <article key={capability.title}>
                            <span>0{index + 1}</span>
                            <h3>{capability.title}</h3>
                            <p>{capability.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="product-boundaries">
                <article>
                    <h2>{copy.integrationsTitle}</h2>
                    <ul>{copy.integrations.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
                <article>
                    <h2>{copy.requirementsTitle}</h2>
                    <ul>{copy.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
                <article className="product-status">
                    <p>{copy.statusLabel}</p>
                    <h2>{copy.statusTitle}</h2>
                    <span>{copy.statusBody}</span>
                </article>
            </section>

            <section className="product-final-cta" aria-labelledby="product-cta-title">
                <p>{product.name}</p>
                <h2 id="product-cta-title">{copy.headline}</h2>
                <Link
                    className="holding-button"
                    href={`/contacto?product=${product.slug}`}
                    onClick={() => trackMarketingEvent('Product CTA Clicked', { product: product.slug, source: 'product_closing', language })}
                >
                    {copy.cta}
                </Link>
            </section>

            <footer className="product-footer">
                <span>SEBICHE — Dallas, Texas</span>
                <nav aria-label={common.related}>
                    {Object.values(products).map((item) => (
                        <Link href={`/productos/${item.slug}`} key={item.slug} aria-current={item.slug === product.slug ? 'page' : undefined}>{item.name}</Link>
                    ))}
                    <Link href="/contacto">{common.contact}</Link>
                </nav>
            </footer>
        </main>
    )
}
