'use client'

import { homeCopy } from '../content/home'
import type { Language } from '../lib/language'
import { useLanguageSelection } from '../lib/use-language-selection'
import ApproachSection from './marketing/ApproachSection'
import ClosingSection from './marketing/ClosingSection'
import HeroSection from './marketing/HeroSection'
import MarketingHeader from './marketing/MarketingHeader'
import ProductGrid from './marketing/ProductGrid'

export default function HoldingLanding({ initialLanguage }: { initialLanguage: Language }) {
    const { language, selectLanguage } = useLanguageSelection(initialLanguage)
    const copy = homeCopy[language]

    return (
        <main id="main" className="holding-site">
            <MarketingHeader language={language} onLanguageChange={selectLanguage} context="home" />
            <HeroSection copy={copy} language={language} />
            <ProductGrid copy={copy} language={language} />
            <ApproachSection copy={copy} />
            <ClosingSection copy={copy} language={language} />
        </main>
    )
}
