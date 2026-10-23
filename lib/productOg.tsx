import { ImageResponse } from 'next/og'
import { homeCopy } from '../content/home'
import { isProductSlug, products } from '../content/products'
import type { Language } from './language'
import { brand, loadOgFonts, OgLockup, ogContentType, ogSize } from './og'

// Share image for a product page. Used by /es/productos/[slug] and /en/products/[slug], each
// with its own language, like the page metadata.
type ProductImageParams = { params: Promise<{ slug: string }> }

export async function productImageMetadata({ params }: ProductImageParams) {
    const { slug } = await params
    const name = isProductSlug(slug) ? products[slug].name : 'Sebiche'
    return [{ id: 'default', alt: `${name} · SEBICHE`, size: ogSize, contentType: ogContentType }]
}

// Endorsed product card: product headline on ground, identity panel in the product color
// with "<product> by SEBICHE".
export async function productImage({ params }: ProductImageParams, language: Language) {
    const { slug } = await params
    const fonts = await loadOgFonts()
    const product = isProductSlug(slug) ? products[slug] : products.restos
    const accent = brand[product.accent]
    const copy = product[language]

    return new ImageResponse(
        (
            <div style={{ display: 'flex', width: '100%', height: '100%', background: brand.ground, color: brand.paper, fontFamily: 'Manrope' }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: 64 }}>
                    <OgLockup descriptor={homeCopy[language].hero.eyebrow} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div style={{ display: 'flex', gap: 16, fontSize: 15, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                            <span style={{ color: accent }}>{product.number}</span>
                            <span>{copy.eyebrow}</span>
                        </div>
                        <div style={{ display: 'flex', fontSize: 64, fontWeight: 500, letterSpacing: '-0.055em', lineHeight: 0.98, maxWidth: 680 }}>
                            {copy.headline}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', width: 360, flexDirection: 'column', justifyContent: 'flex-end', gap: 20, background: accent, color: brand.onAccent, padding: 48 }}>
                    <div style={{ display: 'flex', fontSize: 76, fontWeight: 500, letterSpacing: '-0.07em', lineHeight: 1 }}>{product.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 18, fontWeight: 500 }}>
                        <span>{language === 'es' ? 'de' : 'by'}</span>
                        <span style={{ fontWeight: 700, letterSpacing: '0.22em' }}>SEBICHE</span>
                    </div>
                </div>
            </div>
        ),
        { ...ogSize, fonts },
    )
}
