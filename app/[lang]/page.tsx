import type { Metadata } from 'next'
import HoldingLanding from '../../components/HoldingLanding'
import { isLanguage } from '../../lib/language'
import { pageMetadata } from '../../lib/metadata'

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
    const { lang } = await params
    return isLanguage(lang) ? pageMetadata(lang, { page: 'home' }) : {}
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
    const { lang } = await params
    if (!isLanguage(lang)) return null

    return <HoldingLanding language={lang} />
}
