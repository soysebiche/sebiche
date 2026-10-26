import { ImageResponse } from 'next/og'
import { contactCopy } from '../content/contact'
import { homeCopy } from '../content/home'
import type { Language } from './language'
import { brand, loadHeroPhoto, loadOgFonts, OgLockup, ogContentType, ogSize } from './og'

type ContactImageParams = { params: Promise<{ lang: string }> }

export async function contactImageMetadata(_props: ContactImageParams, language: Language) {
    const { title } = contactCopy[language]
    return [{ id: 'default', alt: `Sebiche — ${title}`, size: ogSize, contentType: ogContentType }]
}

// Contact share image: same editorial photo and lockup as the homepage, with the contact
// headline so a shared /en/contact or /es/contacto link is not a title-only card.
export async function contactImage(_props: ContactImageParams, language: Language) {
    const [fonts, photo] = await Promise.all([loadOgFonts(), loadHeroPhoto()])
    const { eyebrow, title } = contactCopy[language]
    const { hero } = homeCopy[language]

    return new ImageResponse(
        (
            <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', background: brand.ground, color: brand.paper, fontFamily: 'Manrope' }}>
                {/* ImageResponse has no next/image; same pattern as the homepage share image. */}
                {/* eslint-disable-next-line @next/next/no-img-element -- OG canvas */}
                <img src={photo} alt="" width={ogSize.width} height={ogSize.height} style={{ position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', background: brand.veil }} />
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 64 }}>
                    <OgLockup descriptor={hero.eyebrow} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 920 }}>
                        <div style={{ display: 'flex', fontSize: 18, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: brand.copper }}>
                            {eyebrow}
                        </div>
                        <div style={{ display: 'flex', fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 84, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
                            {title}
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...ogSize, fonts },
    )
}
