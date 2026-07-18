'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { HomeCopy } from '../../content/home'
import { products, type ProductSlug } from '../../content/products'
import type { Language } from '../../lib/language'
import { trackMarketingEvent } from '../../lib/marketing-analytics'

const imageAltKeys = { restos: 'restos', tiptrack: 'tiptrack', '86mise': 'mise' } as const

export default function ProductGrid({ copy, language }: { copy: HomeCopy, language: Language }) {
    return (
        <section id="products" className="holding-products" aria-labelledby="products-title">
            <div className="holding-section-heading">
                <h2 id="products-title">
                    <span>{copy.products.title}</span>
                    <em>{copy.products.accent}</em>
                </h2>
                <p>{copy.products.intro}</p>
            </div>

            <div className="holding-product-grid">
                {copy.products.items.map((item) => {
                    const slug = item.slug as ProductSlug
                    const product = products[slug]
                    return (
                        <Link
                            className={`holding-product-card is-${product.accent}`}
                            href={`/productos/${slug}`}
                            key={slug}
                            onClick={() => trackMarketingEvent('Product CTA Clicked', { product: slug, source: 'home_card', language })}
                        >
                            <div className="holding-product-heading">
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.body}</p>
                                </div>
                                <span aria-hidden>{product.icon}</span>
                            </div>
                            <div className="holding-product-image">
                                <Image
                                    src={product.image}
                                    alt={copy.imageAlt[imageAltKeys[slug]]}
                                    fill
                                    sizes="(max-width: 840px) 100vw, 33vw"
                                />
                            </div>
                            <span className="holding-product-link">{copy.products.explore} <span aria-hidden>↗</span></span>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
