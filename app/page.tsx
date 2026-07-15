import { headers } from 'next/headers'
import HoldingLanding, { type Language } from '../components/HoldingLanding'

export default async function Home() {
    const requestHeaders = await headers()
    const country = requestHeaders.get('x-vercel-ip-country')?.toUpperCase()
    const initialLanguage: Language = country && country !== 'US' ? 'es' : 'en'

    return <HoldingLanding initialLanguage={initialLanguage} />
}
