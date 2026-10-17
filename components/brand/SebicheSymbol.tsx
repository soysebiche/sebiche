import tokens from '../../brand/tokens.json'
import { cssPalette, symbolFills, symbolRects } from '../../lib/brand'

const rects = symbolRects(symbolFills(cssPalette))

// El pase: a rail with three order tickets, one per product (RestOS, TipTrack, 86MISE).
// Geometry and colors come from brand/tokens.json.
export default function SebicheSymbol({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox={`0 0 ${tokens.symbol.viewBox} ${tokens.symbol.viewBox}`} aria-hidden focusable="false">
            {rects.map(({ key, ...rect }) => <rect key={key} {...rect} />)}
        </svg>
    )
}
