import Link from 'next/link'
import { Fragment } from 'react'
import { productPath, productSlugs, products, type ProductSlug } from '../../content/products'

type MarketingFooterProps = {
    variant: 'home' | 'internal'
    currentSlug?: ProductSlug
    relatedLabel?: string
    contactLabel?: string
}

export default function MarketingFooter({ variant, currentSlug, relatedLabel, contactLabel }: MarketingFooterProps) {
    if (variant === 'home') {
        return (
            <footer className="holding-footer">
                <span>SEBICHE — Dallas, Texas</span>
                <div>
                    {productSlugs.map((slug, index) => (
                        <Fragment key={slug}>
                            {index > 0 ? <i aria-hidden /> : null}
                            <Link href={productPath(slug)}>{products[slug].name}</Link>
                        </Fragment>
                    ))}
                </div>
            </footer>
        )
    }

    return (
        <footer className="product-footer">
            <span>SEBICHE — Dallas, Texas</span>
            <nav aria-label={relatedLabel}>
                {productSlugs.map((slug) => (
                    <Link href={productPath(slug)} key={slug} aria-current={slug === currentSlug ? 'page' : undefined}>
                        {products[slug].name}
                    </Link>
                ))}
                {contactLabel ? <Link href="/contacto">{contactLabel}</Link> : null}
            </nav>
        </footer>
    )
}
