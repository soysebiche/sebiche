import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { homeCopy } from '../../content/home'
import { productSlugs, products } from '../../content/products'
import { isLanguage, type Language } from '../../lib/language'
import { pageMetadata } from '../../lib/metadata'
import { pathFor } from '../../lib/routes'
import { SITE_URL } from '../../lib/site'
import ProductIndex from '../marketing/ProductIndex'

type ProductsParams = Promise<{ lang: string }>

export async function productsIndexMetadata(params: ProductsParams, language: Language): Promise<Metadata> {
    const { lang } = await params
    if (lang !== language) return {}

    const { meta } = homeCopy[language]
    return pageMetadata(language, { page: 'products' }, { title: meta.productsTitle, description: meta.productsDescription })
}

export async function ProductsIndexRoute({ params, language }: { params: ProductsParams; language: Language }) {
    const { lang } = await params
    if (!isLanguage(lang) || lang !== language) notFound()

    const copy = homeCopy[language]
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: copy.meta.productsTitle,
        description: copy.meta.productsDescription,
        inLanguage: language,
        url: `${SITE_URL}${pathFor(language, { page: 'products' })}`,
        numberOfItems: productSlugs.length,
        itemListElement: productSlugs.map((slug, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: products[slug].name,
            url: `${SITE_URL}${pathFor(language, { page: 'product', slug })}`,
        })),
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ProductIndex language={language} />
        </>
    )
}
