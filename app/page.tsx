'use client'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustSignals from '../components/TrustSignals'
import CaseStudyCard from '../components/CaseStudyCard'
import Section from '../components/Section'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false })

interface JourneyItem {
    year: string
    title: string
    details: string
}

export default function Home() {
    const [selectedYear, setSelectedYear] = useState<string | null>(null)
    const [surprise, setSurprise] = useState<string | null>(null)

    const journey: JourneyItem[] = [
        { year: '2015', title: 'Started as an Intern at Linio Peru', details: 'Began my career...' },
        { year: '2018', title: 'Graduated with a BBA from Universidad del Pacífico', details: 'Earned my degree...' },
        { year: '2020', title: 'Started as Manager at Linio Mexico', details: 'Led regional teams...' },
        { year: '2022', title: 'Started as Manager at Liverpool', details: 'Grew the marketplace...' },
        { year: '2024', title: 'Began the MADI program at SMU', details: 'Pursuing advanced...' },
    ]

    const surprises: string[] = [
        'I once redesigned a checkout flow in 48 hours!',
        "I'm obsessed with ceviche—hence the name Sebiche.",
        "I've led teams across 5 countries!",
        'I boosted sales by 125% with a single UX tweak.',
    ]

    const toggleDetails = (year: string) => setSelectedYear(selectedYear === year ? null : year)
    const showSurprise = () => {
        const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)]
        setSurprise(randomSurprise)
        if (typeof window !== 'undefined' && window.confetti) {
            window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
        }
        setTimeout(() => setSurprise(null), 3000)
    }

    const getLineHeight = () => {
        if (!selectedYear) return '0%'
        const index = journey.findIndex((item) => item.year === selectedYear)
        return `${(index + 1) * 20}%`
    }

    return (
        <div className="min-h-screen bg-softGray">
            <Header />
            <Hero />
            <TrustSignals />
            <Section id="about" title="About Me">
                <div className="w-56 h-56 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                        src="/sebastian.jpg"
                        alt="Sebastian Napuri Mendoza, UX/UI Leader"
                        width={224}
                        height={224}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        sizes="(max-width: 640px) 224px, 224px"
                    />
                </div>
                <p className="text-base sm:text-lg mb-4">
                    From a curious intern in Lima to a global eCommerce leader, my journey blends Peruvian grit with cutting-edge tech.
                </p>
                <p className="text-base sm:text-lg mb-4">
                    With over 9 years shaping marketplaces, I've turned challenges into victories—like boosting sales by 125% or redesigning UX to convert 78% better.
                </p>
                <p className="text-base sm:text-lg mb-6">
                    Inspired by ceviche's perfect balance, I craft digital experiences that are bold, precise, and unforgettable.
                </p>
                <button
                    onClick={showSurprise}
                    className="mx-auto block px-6 py-2 bg-turquoise text-white rounded-full hover:bg-coral transition mb-6"
                    aria-label="Reveal a fun fact about Sebastian"
                >
                    Surprise Me!
                </button>
                {surprise && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-base sm:text-lg text-turquoise mb-6"
                        role="alert"
                    >
                        {surprise}
                    </motion.p>
                )}
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-lg sm:text-xl font-semibold text-turquoise mb-4">My Journey</h3>
                    <div className="relative pl-6" role="list">
                        <motion.div
                            className="absolute left-0 top-0 w-0.5 bg-turquoise"
                            initial={{ height: '0%' }}
                            animate={{ height: getLineHeight() }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />
                        {journey.map((item) => (
                            <div
                                key={item.year}
                                className="mb-6 cursor-pointer"
                                onClick={() => toggleDetails(item.year)}
                                role="listitem"
                            >
                                <motion.div
                                    className="absolute w-4 h-4 bg-turquoise rounded-full -left-2 top-1"
                                    animate={{ scale: selectedYear === item.year ? 1.5 : 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <p className="text-sm sm:text-base text-coral">{item.year}</p>
                                <p className="text-base sm:text-lg">{item.title}</p>
                                {selectedYear === item.year && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-sm sm:text-base text-gray-600 mt-2"
                                    >
                                        {item.details}
                                    </motion.p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
            <Section id="experience" title="Experience" delay={0.4}>
                <div className="space-y-8">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold text-turquoise">Marketplace BU Manager</h3>
                        <p className="text-coral text-sm sm:text-base">Servicios Liverpool | 06/2022 - 07/2024</p>
                        <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
                            <li>Led Crossborder Marketplace project, growing to 100+ sellers.</li>
                            <li>Reduced response times by 35% with automation tools.</li>
                            <li>Increased seller onboarding conversion by 78% via UX redesign.</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold text-turquoise">Regional Hardlines Cross-Border Commercial Manager</h3>
                        <p className="text-coral text-sm sm:text-base">Linio México | 01/2020 - 05/2022</p>
                        <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
                            <li>Boosted cross-border sales by 125% with growth strategies.</li>
                            <li>Improved operational efficiency by 40% via UX optimization.</li>
                            <li>Led a team of 10 across 5 countries.</li>
                        </ul>
                    </div>
                </div>
            </Section>
            <Section id="projects" title="Case Studies" delay={0.6}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <CaseStudyCard
                        title="Linio Cross-Border Marketplace"
                        company="Linio México"
                        period="2020-2022"
                        description="Transformed cross-border operations across 5 Latin American countries, achieving unprecedented growth through UX optimization and regional team leadership."
                        metrics={[
                            { value: '125%', label: 'Sales Growth' },
                            { value: '40%', label: 'Efficiency' },
                            { value: '5', label: 'Countries' },
                        ]}
                        href="/case-studies/linio"
                        index={0}
                    />
                    <CaseStudyCard
                        title="Liverpool Marketplace Launch"
                        company="Servicios Liverpool"
                        period="2022-2024"
                        description="Built Liverpool's cross-border marketplace from the ground up, growing from 0 to 100+ sellers through strategic UX design and automation."
                        metrics={[
                            { value: '100+', label: 'Sellers' },
                            { value: '78%', label: 'Conversion' },
                            { value: '35%', label: 'Faster' },
                        ]}
                        href="/case-studies/liverpool"
                        index={1}
                    />
                </div>
            </Section>
            <ContactForm />
            <Footer />
        </div>
    )
}

declare global {
    interface Window {
        confetti: any
    }
}
