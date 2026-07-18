import HoldingLanding from '../../components/HoldingLanding'
import { getRequestLanguage } from '../../lib/request-language'

export default async function Home() {
    const initialLanguage = await getRequestLanguage()

    return <HoldingLanding initialLanguage={initialLanguage} />
}
