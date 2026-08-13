import { track } from '@vercel/analytics/server'
import { after } from 'next/server'
import { isProductSlug } from '../../../content/products'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, maxLength: number) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function escapeHtml(value: string) {
    return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character)
}

export async function POST(request: Request) {
    let payload: Record<string, unknown>

    try {
        payload = await request.json()
    } catch {
        return Response.json({ ok: false, code: 'INVALID_JSON' }, { status: 400 })
    }

    const website = clean(payload.website, 200)
    if (website) return new Response(null, { status: 204 })

    const name = clean(payload.name, 100)
    const email = clean(payload.email, 180)
    const restaurant = clean(payload.restaurant, 160)
    const product = clean(payload.product, 30)
    const message = clean(payload.message, 3000)
    const language = clean(payload.language, 2) === 'es' ? 'es' : 'en'

    if (!name || !EMAIL_PATTERN.test(email) || !restaurant || !message || (product !== '' && !isProductSlug(product))) {
        return Response.json({ ok: false, code: 'INVALID_FIELDS' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (process.env.VERCEL) {
        after(() => track('Contact Form Validated', {
            product: product || 'unspecified',
            language,
            deliveryMode: apiKey ? 'provider' : 'fallback',
        }, { request }).catch(() => undefined))
    }

    if (!apiKey) {
        return Response.json({ ok: false, code: 'CONTACT_NOT_CONFIGURED' }, { status: 503 })
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
        body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || 'Sebiche <onboarding@resend.dev>',
            to: [process.env.CONTACT_TO_EMAIL || 's@sebiche.com'],
            reply_to: email,
            subject: `Sebiche inquiry · ${product || 'general'} · ${restaurant}`,
            html: `<h1>New Sebiche inquiry</h1><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Restaurant:</strong> ${escapeHtml(restaurant)}</p><p><strong>Product:</strong> ${escapeHtml(product || 'Unspecified')}</p><p><strong>Language:</strong> ${language}</p><hr><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
        }),
    })

    if (!response.ok) {
        return Response.json({ ok: false, code: 'DELIVERY_FAILED' }, { status: 502 })
    }

    if (process.env.VERCEL) {
        after(() => track('Contact Form Delivered', { product: product || 'unspecified', language }, { request }).catch(() => undefined))
    }

    return Response.json({ ok: true })
}
