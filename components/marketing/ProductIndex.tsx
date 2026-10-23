import Link from 'next/link'
import { homeCopy } from '../../content/home'
import type { Language } from '../../lib/language'
import { pathFor } from '../../lib/routes'
import FooterSignature from '../brand/FooterSignature'
import MarketingHeader from './MarketingHeader'
import ProductGrid from './ProductGrid'

const footerCopy = {
    en: { related: 'Sebiche products', contact: 'Contact' },
    es: { related: 'Productos Sebiche', contact: 'Contacto' },
} as const

export default function ProductIndex({ language }: { language: Language }) {
    const copy = homeCopy[language]
    const common = footerCopy[language]

    return (
        <main id="main" className="holding-site product-index">
            <MarketingHeader language={language} route={{ page: 'products' }} />
            <ProductGrid copy={copy} language={language} />
            <footer className="product-footer">
                <FooterSignature />
                <nav aria-label={common.related}>
                    <Link href={pathFor(language, { page: 'product', slug: 'restos' })}>RestOS</Link>
                    <Link href={pathFor(language, { page: 'product', slug: 'tiptrack' })}>TipTrack</Link>
                    <Link href={pathFor(language, { page: 'product', slug: '86mise' })}>86MISE</Link>
                    <Link href={pathFor(language, { page: 'contact' })}>{common.contact}</Link>
                </nav>
            </footer>
        </main>
    )
}
