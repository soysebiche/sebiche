import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '../../../../components/marketing/ProductDetail'
import { getProductCopy, isProductSlug, products, productSlugs } from '../../../../content/products'
import { getRequestLanguage } from '../../../../lib/request-language'

type ProductPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
    return productSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params
    if (!isProductSlug(slug)) return {}

    const product = products[slug]
    const copy = product.en
    const canonical = `/productos/${slug}`

    return {
        title: product.name,
        description: copy.intro,
        alternates: { canonical },
        openGraph: {
            type: 'website',
            url: canonical,
            title: `${product.name} | Sebiche`,
            description: copy.intro,
            images: [{ url: product.image, alt: copy.imageAlt }],
        },
        twitter: { card: 'summary_large_image', title: `${product.name} | Sebiche`, description: copy.intro, images: [product.image] },
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    if (!isProductSlug(slug)) notFound()

    const product = products[slug]
    const initialLanguage = await getRequestLanguage()
    const productCopy = getProductCopy(product, initialLanguage)
    const softwareJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: productCopy.intro,
        url: `https://sebiche.com/productos/${product.slug}`,
        author: { '@type': 'Organization', name: 'Sebiche' },
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
            <ProductDetail product={product} initialLanguage={initialLanguage} />
        </>
    )
}
