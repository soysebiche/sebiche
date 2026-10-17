import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductCopy, isProductSlug, products } from '../../content/products'
import { isLanguage, type Language } from '../../lib/language'
import { pageMetadata } from '../../lib/metadata'
import { pathFor } from '../../lib/routes'
import { SITE_URL } from '../../lib/site'
import ProductDetail from '../marketing/ProductDetail'

// The product page lives at /es/productos/[slug] and /en/products/[slug]. Both route files call
// these with their own language, so each path segment only renders in the language it belongs to.
type ProductParams = Promise<{ lang: string; slug: string }>

async function resolve(params: ProductParams, language: Language) {
    const { lang, slug } = await params
    if (!isLanguage(lang) || lang !== language || !isProductSlug(slug)) return null
    return { language: lang, product: products[slug] }
}

export async function productMetadata(params: ProductParams, language: Language): Promise<Metadata> {
    const resolved = await resolve(params, language)
    if (!resolved) return {}

    const { product } = resolved
    const copy = getProductCopy(product, language)
    return pageMetadata(language, { page: 'product', slug: product.slug }, { title: product.name, description: copy.intro })
}

export async function ProductRoute({ params, language }: { params: ProductParams; language: Language }) {
    const resolved = await resolve(params, language)
    if (!resolved) notFound()

    const { product } = resolved
    const copy = getProductCopy(product, language)
    const url = `${SITE_URL}${pathFor(language, { page: 'product', slug: product.slug })}`
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: product.name,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: copy.intro,
            inLanguage: language,
            url,
            author: { '@id': `${SITE_URL}/#organization` },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Sebiche', item: `${SITE_URL}${pathFor(language, { page: 'home' })}` },
                { '@type': 'ListItem', position: 2, name: product.name, item: url },
            ],
        },
    ]

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ProductDetail product={product} language={language} />
        </>
    )
}
