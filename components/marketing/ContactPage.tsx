'use client'

import { FormEvent, useRef, useState } from 'react'
import { productSlugs, products, type ProductSlug } from '../../content/products'
import type { Language } from '../../lib/language'
import { trackMarketingEvent } from '../../lib/marketing-analytics'
import { useLanguageSelection } from '../../lib/use-language-selection'
import MarketingFooter from './MarketingFooter'
import MarketingHeader from './MarketingHeader'

const CONTACT_EMAIL = 's@sebiche.com'

const copy = {
    en: {
        eyebrow: 'Start with the operation',
        title: 'Tell us where the friction is.',
        intro: 'Share the workflow you want to improve. We will respond with an honest fit assessment, including whether the right product is ready for your environment.',
        direct: 'Prefer email?', directBody: 'Write directly to',
        fields: { name: 'Name', email: 'Work email', restaurant: 'Restaurant or operation', product: 'Product of interest', message: 'What do you want to improve?', select: 'Not sure yet', submit: 'Send inquiry', sending: 'Sending…' },
        successTitle: 'Message received.', successBody: 'Thank you. Sebiche will review the operational context and reply directly.', again: 'Send another inquiry',
        errorTitle: 'The form could not send right now.', errorBody: 'Your information stays in this browser. Continue by email with the same context.', fallback: 'Continue by email',
        privacy: 'Used only to respond to this inquiry. No mailing list.', products: 'Products',
    },
    es: {
        eyebrow: 'Empecemos por la operación',
        title: 'Cuéntanos dónde está la fricción.',
        intro: 'Comparte el flujo que quieres mejorar. Responderemos con una evaluación honesta, incluyendo si el producto adecuado está listo para tu entorno.',
        direct: '¿Prefieres correo?', directBody: 'Escribe directamente a',
        fields: { name: 'Nombre', email: 'Correo de trabajo', restaurant: 'Restaurante u operación', product: 'Producto de interés', message: '¿Qué quieres mejorar?', select: 'Aún no lo sé', submit: 'Enviar consulta', sending: 'Enviando…' },
        successTitle: 'Mensaje recibido.', successBody: 'Gracias. Sebiche revisará el contexto operativo y responderá directamente.', again: 'Enviar otra consulta',
        errorTitle: 'El formulario no pudo enviar ahora.', errorBody: 'Tu información permanece en este navegador. Continúa por correo con el mismo contexto.', fallback: 'Continuar por correo',
        privacy: 'Se utiliza únicamente para responder esta consulta. Sin lista de correos.', products: 'Productos',
    },
} as const

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPage({ initialLanguage, defaultProduct = '' }: { initialLanguage: Language, defaultProduct?: ProductSlug | '' }) {
    const { language, selectLanguage } = useLanguageSelection(initialLanguage)
    const [status, setStatus] = useState<FormStatus>('idle')
    const [formValues, setFormValues] = useState({ name: '', email: '', restaurant: '', product: defaultProduct, message: '', website: '' })
    const hasTrackedStart = useRef(false)
    const t = copy[language]

    function trackStart() {
        if (hasTrackedStart.current) return
        hasTrackedStart.current = true
        trackMarketingEvent('Contact Form Started', { source: defaultProduct ? 'product_page' : 'contact_page', product: defaultProduct || 'unspecified', language })
    }

    function mailtoHref() {
        const subject = language === 'es' ? 'Consulta operativa para Sebiche' : 'Operational inquiry for Sebiche'
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
            <MarketingHeader language={language} onLanguageChange={selectLanguage} />
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
                                    {productSlugs.map((slug) => <option value={slug} key={slug}>{products[slug].name}</option>)}
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
            <MarketingFooter variant="internal" relatedLabel={t.products} />
        </main>
    )
}
