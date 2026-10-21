import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import tokens from '../brand/tokens.flat.json'
import { symbolFills, symbolRects } from './brand'

// Shared pieces for the Open Graph images. Images cannot read CSS variables, so the values
// come straight from brand/tokens.flat.json.
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const { color } = tokens

export const brand = {
    ground: color.ground,
    paper: color.paper,
    muted: color.muted,
    rule: color.rule,
    copper: color.copper,
    violet: color.violet,
    orange: color.orange,
    onAccent: color['on-accent'],
    veil: tokens.veil.share,
    trackingWordmark: tokens.tracking.wordmark,
    trackingDescriptor: tokens.tracking.descriptor,
}

const fontDir = join(process.cwd(), 'assets/fonts')

export async function loadOgFonts() {
    const [medium, bold, italic] = await Promise.all([
        readFile(join(fontDir, 'Manrope-Medium.ttf')),
        readFile(join(fontDir, 'Manrope-Bold.ttf')),
        readFile(join(fontDir, 'CormorantGaramond-MediumItalic.ttf')),
    ])

    return [
        { name: 'Manrope', data: medium, weight: 500 as const, style: 'normal' as const },
        { name: 'Manrope', data: bold, weight: 700 as const, style: 'normal' as const },
        { name: 'Cormorant Garamond', data: italic, weight: 500 as const, style: 'italic' as const },
    ]
}

// The hero photo with the site's hero treatment (tokens.photo.hero, as on the home hero).
export async function loadHeroPhoto() {
    const { saturate, contrast, brightness } = tokens.photo.hero
    const photo = await sharp(join(process.cwd(), 'public/holding/hero-editorial.jpg'))
        .resize(ogSize.width, ogSize.height, { fit: 'cover' })
        .modulate({ saturation: saturate, brightness })
        .linear(contrast, -128 * (contrast - 1))
        .jpeg({ quality: 82 })
        .toBuffer()

    return `data:image/jpeg;base64,${photo.toString('base64')}`
}

export function OgSymbol({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox={`0 0 ${tokens.symbol.viewBox} ${tokens.symbol.viewBox}`}>
            {symbolRects(symbolFills(color)).map(({ key, ...rect }) => <rect key={key} {...rect} />)}
        </svg>
    )
}

// Symbol + wordmark + descriptor, one ticket width apart.
export function OgLockup({ descriptor }: { descriptor: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(64 * tokens.symbol.clearSpace) }}>
            <OgSymbol size={64} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: brand.trackingWordmark, lineHeight: 1 }}>SEBICHE</div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: brand.trackingDescriptor, textTransform: 'uppercase', lineHeight: 1 }}>
                    {descriptor}
                </div>
            </div>
        </div>
    )
}
