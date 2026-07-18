import Image from 'next/image'
import type { HomeCopy } from '../../content/home'

export default function ApproachSection({ copy }: { copy: HomeCopy }) {
    return (
        <section id="approach" className="holding-approach" aria-labelledby="approach-title">
            <div className="holding-approach-copy">
                <h2 id="approach-title">
                    <span>{copy.approach.start}</span>
                    <em>{copy.approach.accent}</em>
                </h2>
            </div>
            <div className="holding-pillars">
                {copy.approach.pillars.map((pillar, index) => (
                    <article key={pillar.title}>
                        <span className="holding-pillar-number">0{index + 1}</span>
                        <span className="holding-pillar-mark" aria-hidden>{index === 0 ? '↓' : index === 1 ? '≋' : '▥'}</span>
                        <h3>{pillar.title}</h3>
                        <p>{pillar.body}</p>
                    </article>
                ))}
            </div>
            <div className="holding-operations-media">
                <Image
                    src="/holding/operations-editorial.jpg"
                    alt={copy.imageAlt.operations}
                    fill
                    loading="eager"
                    unoptimized
                    sizes="(max-width: 760px) 100vw, 75vw"
                />
            </div>
            <div className="holding-86-block" aria-hidden>
                <strong>86</strong>
                <span>{copy.approach.caption}</span>
            </div>
        </section>
    )
}
