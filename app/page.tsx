'use client'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustSignals from '../components/TrustSignals'
import Skills from '../components/Skills'
import Journey from '../components/Journey'
import Education from '../components/Education'
import Experience from '../components/Experience'
import CaseStudyCard from '../components/CaseStudyCard'
import Footer from '../components/Footer'

const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false })

const caseStudies = [
    {
        title: 'linio marketplace redesign',
        company: 'linio',
        period: '2020-2022',
        description: '125% sales increase through ux optimization and data-driven design',
        href: '/case-studies/linio',
        index: 0
    },
    {
        title: 'liverpool seller onboarding',
        company: 'liverpool',
        period: '2022-2024',
        description: '100+ sellers onboarded with streamlined ux and automated workflows',
        href: '/case-studies/liverpool',
        index: 1
    },
]


export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Hero />

            {/* Trust Signals */}
            <TrustSignals />

            {/* Journey Timeline */}
            <Journey />

            {/* Education */}
            <Education />

            {/* Experience */}
            <Experience />

            {/* Skills Section */}
            <Skills />

            {/* Case Studies */}
            <section id="projects" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="text-4xl mr-3">📂</span>
                        case studies
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        real impact, real results
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {caseStudies.map((study) => (
                            <CaseStudyCard key={study.title} {...study} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        <span className="text-4xl mr-3">💬</span>
                        let's talk
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        ready to transform your ux?
                    </p>
                    <ContactForm />
                </div>
            </section>

            <Footer />
        </div>
    )
}
