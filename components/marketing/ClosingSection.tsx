'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { HomeCopy } from '../../content/home'
import type { Language } from '../../lib/language'
import { trackMarketingEvent } from '../../lib/marketing-analytics'
import MarketingFooter from './MarketingFooter'

export default function ClosingSection({ copy, language }: { copy: HomeCopy, language: Language }) {
    return (
        <section id="contact" className="holding-closing" aria-labelledby="closing-title">
            <div className="holding-closing-media" aria-hidden>
                <Image
                    src="/holding/closing-editorial.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                />
            </div>
            <div>
                <h2 id="closing-title">
                    <span>{copy.closing.start}</span>
                    <span>{copy.closing.end} <em>{copy.closing.accent}</em></span>
                </h2>
                <div className="holding-contact-row is-dark">
                    <Link
                        className="holding-button"
                        href="/contacto"
                        onClick={() => trackMarketingEvent('Contact CTA Clicked', { source: 'home_closing', language })}
                    >
                        {copy.closing.cta}
                    </Link>
                </div>
            </div>

            <MarketingFooter variant="home" />
        </section>
    )
}
