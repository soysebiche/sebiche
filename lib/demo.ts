import type { Language } from './language'
import { pathFor } from './routes'

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL

function configuredDemoUrl() {
    if (!DEMO_URL) return null
    try {
        const url = new URL(DEMO_URL)
        if (url.protocol !== 'https:') return null
        return url.toString()
    } catch {
        return null
    }
}

// Cal.com (or any https booking URL) when NEXT_PUBLIC_DEMO_URL is set; otherwise the contact page.
export function demoTarget(language: Language) {
    const href = configuredDemoUrl()
    if (href) return { href, external: true as const }
    return { href: pathFor(language, { page: 'contact' }), external: false as const }
}
