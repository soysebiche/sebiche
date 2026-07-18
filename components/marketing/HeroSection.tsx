'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { HomeCopy } from '../../content/home'
import type { Language } from '../../lib/language'
import { trackMarketingEvent } from '../../lib/marketing-analytics'

export default function HeroSection({ copy, language }: { copy: HomeCopy, language: Language }) {
    return (
        <section className="holding-hero" aria-labelledby="hero-title">
            <div className="holding-hero-copy">
                <h1 id="hero-title">
                    <span>{copy.hero.start}</span>
                    <em>{copy.hero.accent}</em>
                    <span>{copy.hero.end}</span>
                </h1>
                <p>{copy.hero.body}</p>
                <div className="holding-contact-row">
                    <Link
                        className="holding-button"
                        href="/contacto"
                        onClick={() => trackMarketingEvent('Contact Form Started', { source: 'home_hero', language })}
                    >
                        {copy.hero.cta}
                    </Link>
                </div>
            </div>

            <div className="holding-hero-media">
                <Image
                    src="/holding/hero-editorial.jpg"
                    alt={copy.imageAlt.hero}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 760px) 100vw, 54vw"
                />
                <div className="holding-ticket" aria-hidden>
                    <span>ORDER 86</span>
                    <strong>CONNECTED</strong>
                    <small>KITCHEN · DELIVERY · INVENTORY</small>
                </div>
            </div>
        </section>
    )
}
