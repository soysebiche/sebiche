// El pase: a rail with three order tickets, one per product (RestOS, TipTrack, 86MISE).
// Construction on a 100-unit square, as defined in the Sebiche design system.
export default function SebicheSymbol({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden focusable="false">
            <rect x="8" y="22" width="84" height="8" fill="var(--paper)" />
            <rect x="16" y="36" width="18" height="32" fill="var(--copper)" />
            <rect x="41" y="36" width="18" height="44" fill="var(--violet)" />
            <rect x="66" y="36" width="18" height="26" fill="var(--orange)" />
        </svg>
    )
}
