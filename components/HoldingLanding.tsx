import { homeCopy } from '../content/home'
import type { Language } from '../lib/language'
import ApproachSection from './marketing/ApproachSection'
import ClosingSection from './marketing/ClosingSection'
import HeroSection from './marketing/HeroSection'
import MarketingHeader from './marketing/MarketingHeader'
import ProductGrid from './marketing/ProductGrid'

export default function HoldingLanding({ language }: { language: Language }) {
    const copy = homeCopy[language]

    return (
        <main id="main" className="holding-site">
            <MarketingHeader language={language} route={{ page: 'home' }} />
            <HeroSection copy={copy} language={language} />
            <ProductGrid copy={copy} language={language} />
            <ApproachSection copy={copy} />
            <ClosingSection copy={copy} language={language} />
        </main>
    )
}
