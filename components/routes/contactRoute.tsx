import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { homeCopy } from '../../content/home'
import type { Language } from '../../lib/language'
import { pageMetadata } from '../../lib/metadata'
import ContactPage from '../marketing/ContactPage'

// The contact page lives at /es/contacto and /en/contact; each route file passes its language.
type ContactParams = Promise<{ lang: string }>

export async function contactMetadata(params: ContactParams, language: Language): Promise<Metadata> {
    const { lang } = await params
    if (lang !== language) return {}

    const { meta } = homeCopy[language]
    return pageMetadata(language, { page: 'contact' }, { title: meta.contactTitle, description: meta.contactDescription })
}

export async function ContactRoute({ params, language }: { params: ContactParams; language: Language }) {
    const { lang } = await params
    if (lang !== language) notFound()

    return <ContactPage language={language} />
}
