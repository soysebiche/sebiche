import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

// Shared pieces for the Open Graph images. Values mirror the brand tokens in app/globals.css.
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export const brand = {
    ground: '#090909',
    paper: '#f1eee7',
    muted: '#9e9a92',
    rule: 'rgba(241, 238, 231, 0.22)',
    copper: '#cf6330',
    violet: '#9a76c5',
    orange: '#dd713d',
    onAccent: '#100f0e',
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

// The hero photo with the site's hero treatment (saturate 0.65, contrast 1.1, brightness 0.72).
export async function loadHeroPhoto() {
    const photo = await sharp(join(process.cwd(), 'public/holding/hero-editorial.jpg'))
        .resize(ogSize.width, ogSize.height, { fit: 'cover' })
        .modulate({ saturation: 0.65, brightness: 0.72 })
        .linear(1.1, -12.8)
        .jpeg({ quality: 82 })
        .toBuffer()

    return `data:image/jpeg;base64,${photo.toString('base64')}`
}

export function OgSymbol({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100">
            <rect x="8" y="22" width="84" height="8" fill={brand.paper} />
            <rect x="16" y="36" width="18" height="32" fill={brand.copper} />
            <rect x="41" y="36" width="18" height="44" fill={brand.violet} />
            <rect x="66" y="36" width="18" height="26" fill={brand.orange} />
        </svg>
    )
}

// Symbol + wordmark + descriptor, one ticket width apart.
export function OgLockup({ descriptor }: { descriptor: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <OgSymbol size={64} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.22em', lineHeight: 1 }}>SEBICHE</div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1 }}>
                    {descriptor}
                </div>
            </div>
        </div>
    )
}
