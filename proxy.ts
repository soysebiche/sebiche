import { NextResponse, type NextRequest } from 'next/server'
import { isProductSlug } from './content/products'
import { isLanguage, LANGUAGE_COOKIE, languageFromAcceptLanguage } from './lib/language'
import { pathFor, type Route } from './lib/routes'

// Pages live under /en and /es. The bare root permanently 308s to /en (also in next.config), so
// crawlers and x-default stay on the default locale instead of negotiating Accept-Language.
// Unprefixed URLs from before the language prefixes still redirect to the visitor's language:
// an explicit choice from the language switch first, then Accept-Language. Temporary, because
// that target depends on who asks.
export function proxy(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
        const url = request.nextUrl.clone()
        url.pathname = pathFor('en', { page: 'home' })
        return NextResponse.redirect(url, 308)
    }

    const route = routeFor(request.nextUrl.pathname)
    if (!route) return NextResponse.next()

    const savedLanguage = request.cookies.get(LANGUAGE_COOKIE)?.value
    const language = isLanguage(savedLanguage)
        ? savedLanguage
        : languageFromAcceptLanguage(request.headers.get('accept-language'))

    const url = request.nextUrl.clone()
    url.pathname = pathFor(language, route)
    const response = NextResponse.redirect(url, 307)
    response.headers.set('vary', 'accept-language, cookie')
    return response
}

function routeFor(pathname: string): Route | null {
    if (pathname === '/contacto' || pathname === '/contact') return { page: 'contact' }

    const product = pathname.match(/^\/(?:productos|products)\/([^/]+)\/?$/)?.[1]
    if (product && isProductSlug(product)) return { page: 'product', slug: product }

    return null
}

export const config = {
    matcher: ['/', '/contacto', '/contact', '/productos/:slug', '/products/:slug'],
}
