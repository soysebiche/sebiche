'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { contactCopy } from '../../content/contact'
import { isProductSlug, products, type ProductSlug } from '../../content/products'
import type { Language } from '../../lib/language'
import { trackMarketingEvent } from '../../lib/marketing-analytics'
import { pathFor } from '../../lib/routes'
import { CONTACT_EMAIL } from '../../lib/site'
import FooterSignature from '../brand/FooterSignature'
import MarketingHeader from './MarketingHeader'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage({ language }: { language: Language }) {
    const [status, setStatus] = useState<FormStatus>('idle')
    // Product pages link here with ?product=<slug>. The page is static, so the query is read in the
    // browser rather than on the server.
    const [defaultProduct, setDefaultProduct] = useState<ProductSlug | ''>('')
    const [formValues, setFormValues] = useState({ name: '', email: '', restaurant: '', product: '' as ProductSlug | '', message: '', website: '' })
    const hasTrackedStart = useRef(false)
    const t = contactCopy[language]

    useEffect(() => {
        const product = new URLSearchParams(window.location.search).get('product') ?? ''
        if (!isProductSlug(product)) return
        setDefaultProduct(product)
        setFormValues((values) => (values.product ? values : { ...values, product }))
    }, [])

    function trackStart() {
        if (hasTrackedStart.current) return
        hasTrackedStart.current = true
        trackMarketingEvent('Contact Form Started', { source: defaultProduct ? 'product_page' : 'contact_page', product: defaultProduct || 'unspecified', language })
    }

    function mailtoHref() {
        const subject = language === 'es' ? 'Mensaje de un restaurante para SEBICHE' : 'A note from a restaurant for SEBICHE'
        const body = [
            `${t.fields.name}: ${formValues.name}`,
            `${t.fields.email}: ${formValues.email}`,
            `${t.fields.restaurant}: ${formValues.restaurant}`,
            `${t.fields.product}: ${formValues.product || t.fields.select}`,
            '',
            formValues.message,
        ].join('\n')
        return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus('submitting')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ ...formValues, language }),
            })

            if (!response.ok) throw new Error('Contact request failed')
            setStatus('success')
            trackMarketingEvent('Contact Form Submitted', { product: formValues.product || 'unspecified', language })
        } catch {
            setStatus('error')
        }
    }

    return (
        <main id="main" className="contact-site">
            <MarketingHeader language={language} route={{ page: 'contact' }} />
            <section className="contact-layout" aria-labelledby="contact-title">
                <div className="contact-intro">
                    <p>{t.eyebrow}</p>
                    <h1 id="contact-title">{t.title}</h1>
                    <span>{t.intro}</span>
                    <div className="contact-direct">
                        <strong>{t.direct}</strong>
                        <span>{t.directBody} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span>
                    </div>
                </div>

                <div className="contact-form-panel">
                    {status === 'success' ? (
                        <div className="contact-result" role="status">
                            <span aria-hidden>✓</span>
                            <h2>{t.successTitle}</h2>
                            <p>{t.successBody}</p>
                            <button type="button" onClick={() => { setStatus('idle'); setFormValues({ name: '', email: '', restaurant: '', product: defaultProduct, message: '', website: '' }); hasTrackedStart.current = false }}>{t.again}</button>
                        </div>
                    ) : (
                        <form onSubmit={submit} onFocus={trackStart}>
                            <label>
                                <span>{t.fields.name}</span>
                                <input required autoComplete="name" value={formValues.name} onChange={(event) => setFormValues({ ...formValues, name: event.target.value })} />
                            </label>
                            <label>
                                <span>{t.fields.email}</span>
                                <input required type="email" autoComplete="email" value={formValues.email} onChange={(event) => setFormValues({ ...formValues, email: event.target.value })} />
                            </label>
                            <label>
                                <span>{t.fields.restaurant}</span>
                                <input required autoComplete="organization" value={formValues.restaurant} onChange={(event) => setFormValues({ ...formValues, restaurant: event.target.value })} />
                            </label>
                            <label>
                                <span>{t.fields.product}</span>
                                <select value={formValues.product} onChange={(event) => setFormValues({ ...formValues, product: event.target.value as ProductSlug | '' })}>
                                    <option value="">{t.fields.select}</option>
                                    {Object.values(products).map((product) => <option value={product.slug} key={product.slug}>{product.name}</option>)}
                                </select>
                            </label>
                            <label className="is-wide">
                                <span>{t.fields.message}</span>
                                <textarea required rows={6} value={formValues.message} onChange={(event) => setFormValues({ ...formValues, message: event.target.value })} />
                            </label>
                            <input className="contact-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={formValues.website} onChange={(event) => setFormValues({ ...formValues, website: event.target.value })} />
                            <div className="contact-submit is-wide">
                                <button type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? t.fields.sending : t.fields.submit}</button>
                                <small>{t.privacy}</small>
                            </div>
                            {status === 'error' ? (
                                <div className="contact-error is-wide" role="alert">
                                    <div><strong>{t.errorTitle}</strong><span>{t.errorBody}</span></div>
                                    <a href={mailtoHref()} onClick={() => trackMarketingEvent('Contact Fallback Used', { product: formValues.product || 'unspecified', language })}>{t.fallback} <span aria-hidden>↗</span></a>
                                </div>
                            ) : null}
                        </form>
                    )}
                </div>
            </section>
            <footer className="product-footer">
                <FooterSignature />
                <nav aria-label={t.products}>
                    <Link href={pathFor(language, { page: 'product', slug: 'restos' })}>RestOS</Link>
                    <Link href={pathFor(language, { page: 'product', slug: 'tiptrack' })}>TipTrack</Link>
                    <Link href={pathFor(language, { page: 'product', slug: '86mise' })}>86MISE</Link>
                </nav>
            </footer>
        </main>
    )
}
