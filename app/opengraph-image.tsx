import { ImageResponse } from 'next/og'
import { homeCopy } from '../content/home'
import { brand, loadHeroPhoto, loadOgFonts, OgLockup, ogContentType, ogSize } from '../lib/og'

export const alt = 'Sebiche — Your restaurant, connected end to end.'
export const size = ogSize
export const contentType = ogContentType

// Shared links are read by crawlers without a language preference, so the image follows the
// English metadata (og:locale en_US). One language per piece, as the brand guidelines ask.
export default async function OpenGraphImage() {
    const [fonts, photo] = await Promise.all([loadOgFonts(), loadHeroPhoto()])
    const { hero } = homeCopy.en

    return new ImageResponse(
        (
            <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', background: brand.ground, color: brand.paper, fontFamily: 'Manrope' }}>
                <img src={photo} alt="" width={ogSize.width} height={ogSize.height} style={{ position: 'absolute', inset: 0 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', background: 'linear-gradient(90deg, rgba(9, 9, 9, 0.9) 0%, rgba(9, 9, 9, 0.62) 55%, rgba(9, 9, 9, 0.3) 100%)' }} />
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 64 }}>
                    <OgLockup descriptor={hero.eyebrow} />
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 500, letterSpacing: '-0.06em', lineHeight: 0.92 }}>
                            <span>{hero.start}</span>
                            <span style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 100, letterSpacing: '-0.04em' }}>{hero.accent}</span>
                            <span>{hero.end}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 20, fontSize: 18, fontWeight: 700, paddingBottom: 8 }}>
                            <span style={{ color: brand.copper }}>RestOS</span>
                            <span style={{ color: brand.violet }}>TipTrack</span>
                            <span style={{ color: brand.orange }}>86MISE</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...ogSize, fonts },
    )
}
