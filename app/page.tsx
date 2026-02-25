'use client'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustSignals from '../components/TrustSignals'
import Journey from '../components/Journey'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import CaseStudyCard from '../components/CaseStudyCard'
import Footer from '../components/Footer'

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false })

const caseStudies = [
    {
        title: 'Linio Marketplace Redesign',
        company: 'Linio',
        period: '2020–2022',
        description: '125% sales increase through UX optimization and data-driven design across 5 LATAM countries.',
        href: '/case-studies/linio',
        image: '/projects/linio.webp',
        index: 0,
    },
    {
        title: 'Liverpool Seller Onboarding',
        company: 'Liverpool',
        period: '2022–2024',
        description: '100+ sellers onboarded with streamlined UX and automated workflows, reducing onboarding time by 50%.',
        href: '/case-studies/liverpool',
        image: '/projects/liverpool.webp',
        index: 1,
    },
]

export default function Home() {
    return (
        <main id="main" className="min-h-screen bg-white">
            <Header />
            <Hero />
            <TrustSignals />
            <Journey />
            <Education />
            <Experience />
            <Skills />

            {/* Case Studies */}
            <section id="projects" className="py-16 bg-softGray">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-charcoal">
                        Case Studies
                    </h2>
                    <p className="text-gray-500 text-center mb-10">
                        Real impact, real results
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        {caseStudies.map((study) => (
                            <CaseStudyCard key={study.title} {...study} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="py-16 bg-white">
                <div className="max-w-xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-charcoal">
                        Let's Talk
                    </h2>
                    <p className="text-gray-500 text-center mb-10">
                        Ready to transform your UX?
                    </p>
                    <ContactForm />
                </div>
            </section>

            <Footer />
        </main>
    )
}
