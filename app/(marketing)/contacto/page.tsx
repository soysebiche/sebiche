import type { Metadata } from 'next'
import ContactPage from '../../../components/marketing/ContactPage'
import { isProductSlug } from '../../../content/products'
import { getRequestLanguage } from '../../../lib/request-language'

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Discuss your restaurant operation and product fit with Sebiche.',
    alternates: { canonical: '/contacto' },
}

export default async function Contact({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
    const params = await searchParams
    const initialLanguage = await getRequestLanguage()
    const defaultProduct = params.product && isProductSlug(params.product) ? params.product : ''

    return <ContactPage initialLanguage={initialLanguage} defaultProduct={defaultProduct} />
}
