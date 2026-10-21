import tokens from '../brand/tokens.flat.json'

type ProductSlug = keyof typeof tokens.product

export type SymbolFills = { rail: string; tickets: string[] }

// Fills for El pase: rail in paper, each ticket in its product color. `palette` maps color token
// names to values (CSS variables on the site, literal colors in images).
export function symbolFills(palette: Record<string, string>): SymbolFills {
    return {
        rail: palette.paper,
        tickets: tokens.symbol.tickets.map((ticket) => palette[tokens.product[ticket.product as ProductSlug].color]),
    }
}

// The symbol's rectangles on its 100-unit square, from brand/tokens.flat.json.
export function symbolRects(fills: SymbolFills) {
    const { rail, tickets } = tokens.symbol
    return [
        { key: 'rail', ...rail, fill: fills.rail },
        ...tickets.map(({ product, x, y, width, height }, index) => ({ key: product, x, y, width, height, fill: fills.tickets[index] })),
    ]
}

// Every color token as its CSS variable, so the inline symbol follows app/tokens.css.
export const cssPalette = Object.fromEntries(Object.keys(tokens.color).map((name) => [name, `var(--${name})`]))
