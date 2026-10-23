'use client'

import Link from 'next/link'
import { homeCopy } from '../../content/home'
import { demoTarget } from '../../lib/demo'
import type { Language } from '../../lib/language'
import { trackMarketingEvent } from '../../lib/marketing-analytics'

type DemoCtaProps = {
    language: Language
    className?: string
    source: string
    onClick?: () => void
}

export default function DemoCta({ language, className, source, onClick }: DemoCtaProps) {
    const demo = demoTarget(language)
    const label = homeCopy[language].nav.demo
    const handleClick = () => {
        trackMarketingEvent('Contact CTA Clicked', { source, language, destination: demo.external ? 'demo' : 'contact' })
        onClick?.()
    }

    if (demo.external) {
        return (
            <a className={className} href={demo.href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                {label}
            </a>
        )
    }

    return (
        <Link className={className} href={demo.href} onClick={handleClick}>
            {label}
        </Link>
    )
}
