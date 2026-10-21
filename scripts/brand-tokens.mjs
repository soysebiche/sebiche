// Loads brand/tokens.json (the design system's schema: groups of { name, value, usage } tokens
// with {alias} refs) plus brand/site.json, resolves every ref and flattens the result into the
// flat shape the site reads: { color: { ground: '#090909' }, space: { sm: '1rem' }, ... }.
import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Canonical group -> flat group, and the token-name prefix to strip ('space-sm' -> space.sm).
const groups = {
    color: { prefix: '' },
    spacing: { to: 'space', prefix: 'space-' },
    radius: { prefix: 'radius-' },
    shadow: { prefix: 'shadow-' },
    border: { prefix: 'border-' },
    duration: { prefix: 'duration-' },
    ease: { prefix: 'ease-' },
    lift: { prefix: 'lift-' },
    photo: { prefix: 'photo-' },
    veil: { prefix: 'veil-' },
}

const ref = /\{([^{}]+)\}/g
const isRef = (value) => typeof value === 'string' && /^\{[^{}]+\}$/.test(value)

// 'saturate(0.65) contrast(1.1)' -> { saturate: 0.65, contrast: 1.1 }
function parseFilter(value) {
    return Object.fromEntries([...value.matchAll(/([a-z-]+)\(([^)]+)\)/g)].map(([, name, arg]) => [name, Number(arg)]))
}

export async function loadBrandTokens(root) {
    const read = async (file) => JSON.parse(await readFile(path.join(root, file), 'utf8'))
    const [canonical, site] = await Promise.all([read('brand/tokens.json'), read('brand/site.json')])

    // Every addressable value: bare token names ({surface}) and type style props ({type.title.fontSize}).
    const index = new Map()
    const add = (key, value) => {
        if (index.has(key)) throw new Error(`brand/tokens.json: duplicate token "${key}"`)
        index.set(key, value)
    }
    for (const [group, { tokens }] of Object.entries(canonical)) {
        if (Array.isArray(tokens)) tokens.forEach(({ name, value }) => add(name, value))
        else if (group === 'type') {
            for (const { styles } of canonical.type.groups) {
                for (const style of styles) {
                    for (const [prop, value] of Object.entries(style)) add(`type.${style.name}.${prop}`, value)
                }
            }
        }
    }

    // A value that is exactly one ref keeps the target's type (numbers stay numbers);
    // refs embedded in a longer string are substituted as text.
    const resolve = (value, seen = []) => {
        if (typeof value !== 'string') return value
        const lookup = (key) => {
            if (seen.includes(key)) throw new Error(`brand tokens: circular ref ${[...seen, key].join(' -> ')}`)
            if (!index.has(key)) throw new Error(`brand tokens: unknown ref {${key}}`)
            return resolve(index.get(key), [...seen, key])
        }
        if (isRef(value)) return lookup(value.slice(1, -1))
        return value.replace(ref, (_, key) => String(lookup(key)))
    }

    const flat = {}
    const aliases = {}
    for (const [group, { to = group, prefix }] of Object.entries(groups)) {
        flat[to] = {}
        for (const { name, value } of canonical[group]?.tokens ?? []) {
            if (!name.startsWith(prefix)) throw new Error(`brand/tokens.json: ${group} token "${name}" lacks prefix "${prefix}"`)
            const key = name.slice(prefix.length)
            flat[to][key] = resolve(value)
            if (isRef(value)) aliases[`${prefix}${key}`] = value.slice(1, -1)
        }
    }
    // Layout mixes fluid spaces (space-*) with fixed component sizes.
    flat.size = {}
    for (const { name, value } of canonical.layout?.tokens ?? []) {
        if (name.startsWith('space-')) flat.space[name.slice('space-'.length)] = resolve(value)
        else flat.size[name] = resolve(value)
    }
    flat.photo = Object.fromEntries(Object.entries(flat.photo).map(([name, value]) => [name, parseFilter(value)]))
    flat.font = { ...canonical.type.families }

    const withoutComment = ({ $comment, ...rest }) => rest // eslint-disable-line @typescript-eslint/no-unused-vars
    for (const group of ['weight', 'text', 'leading', 'tracking']) {
        flat[group] = Object.fromEntries(Object.entries(withoutComment(site[group])).map(([name, value]) => [name, resolve(value)]))
    }
    flat.product = site.product
    flat.symbol = site.symbol

    for (const { product: slug } of flat.symbol.tickets) {
        if (!flat.product[slug]) throw new Error(`brand/site.json: symbol ticket for unknown product "${slug}"`)
    }
    for (const [slug, { color }] of Object.entries(flat.product)) {
        if (!flat.color[color]) throw new Error(`brand/site.json: product "${slug}" uses unknown color "${color}"`)
    }

    return { flat, aliases }
}
