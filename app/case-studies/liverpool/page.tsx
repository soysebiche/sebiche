'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function LiverpoolCaseStudy() {
    return (
        <article className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <Link
                    href="/#experience"
                    className="text-turquoise hover:text-coral transition mb-4 inline-flex items-center gap-2"
                >
                    ← Back to Portfolio
                </Link>

                <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 mt-6">
                    Growing Liverpool's Marketplace from 0 to 100+ Sellers
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <span className="flex items-center gap-2">
                        <span className="font-semibold text-coral">Company:</span> Servicios Liverpool
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="font-semibold text-coral">Role:</span> Marketplace BU Manager
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="font-semibold text-coral">Period:</span> Jun 2022 - Jul 2024
                    </span>
                </div>

                <div className="bg-gradient-to-r from-turquoise to-coral p-6 rounded-lg text-white">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-1">100+</div>
                            <div className="text-sm opacity-90">Sellers Onboarded</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-1">78%</div>
                            <div className="text-sm opacity-90">Conversion Increase</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-1">35%</div>
                            <div className="text-sm opacity-90">Faster Response Times</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* The Challenge */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-bold text-turquoise mb-4">The Challenge</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-lg text-gray-700 mb-4">
                        Liverpool, one of Mexico's largest department store chains, was launching a new cross-border marketplace initiative from scratch. The challenge was multifaceted:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Zero marketplace infrastructure:</strong> Building seller onboarding, management, and support systems from the ground up</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Competitive market:</strong> Competing against established marketplaces like Mercado Libre and Amazon Mexico</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Brand expectations:</strong> Maintaining Liverpool's premium brand standards while scaling seller acquisition</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Operational complexity:</strong> Managing international sellers with varying compliance requirements</span>
                        </li>
                    </ul>
                </div>
            </motion.section>

            {/* The Strategy */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-bold text-turquoise mb-4">The Strategy</h2>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-coral mb-3">1. User-Centric Onboarding Design</h3>
                        <p className="text-gray-700 mb-3">
                            Designed and implemented a seller onboarding experience that prioritized simplicity and transparency:
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>• Clear, step-by-step process with estimated completion times</li>
                            <li>• Real-time document validation and feedback</li>
                            <li>• Personalized onboarding support via dedicated account managers</li>
                            <li>• Comprehensive seller portal with analytics and tools</li>
                            <li>• Multi-language support for international sellers</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-coral mb-3">2. Conversion Rate Optimization</h3>
                        <p className="text-gray-700 mb-3">
                            Through iterative UX improvements and A/B testing, we achieved a 78% increase in onboarding conversion:
                        </p>
                        <div className="bg-softGray p-4 rounded mb-3">
                            <p className="text-sm text-gray-600 mb-2"><strong>Before:</strong> 23% of sellers completed onboarding</p>
                            <p className="text-sm text-gray-600"><strong>After:</strong> 41% of sellers completed onboarding</p>
                        </div>
                        <p className="text-gray-700">
                            Key improvements included reducing form fields by 40%, adding progress indicators, and implementing smart defaults based on seller type.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-coral mb-3">3. Automation & Efficiency Tools</h3>
                        <p className="text-gray-700 mb-3">
                            Built automation tools that reduced response times by 35%:
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>• Automated seller verification workflows</li>
                            <li>• AI-powered document processing</li>
                            <li>• Chatbot for common seller queries</li>
                            <li>• Automated compliance checks</li>
                            <li>• Self-service knowledge base</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-coral mb-3">4. Quality Control & Brand Protection</h3>
                        <p className="text-gray-700">
                            Established rigorous vetting processes to ensure seller quality while maintaining Liverpool's premium brand positioning. This included product quality checks, seller reputation scoring, and ongoing performance monitoring.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* The Results */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-bold text-turquoise mb-4">The Results</h2>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-l-4 border-turquoise pl-4">
                            <div className="text-3xl font-bold text-turquoise mb-1">100+</div>
                            <div className="text-gray-700 font-semibold mb-2">Active Sellers</div>
                            <p className="text-sm text-gray-600">
                                Grew from 0 to over 100 active cross-border sellers in 24 months
                            </p>
                        </div>

                        <div className="border-l-4 border-coral pl-4">
                            <div className="text-3xl font-bold text-coral mb-1">78%</div>
                            <div className="text-gray-700 font-semibold mb-2">Conversion Increase</div>
                            <p className="text-sm text-gray-600">
                                Improved seller onboarding conversion through UX redesign
                            </p>
                        </div>

                        <div className="border-l-4 border-turquoise pl-4">
                            <div className="text-3xl font-bold text-turquoise mb-1">35%</div>
                            <div className="text-gray-700 font-semibold mb-2">Faster Response Times</div>
                            <p className="text-sm text-gray-600">
                                Reduced average response time through automation and self-service tools
                            </p>
                        </div>

                        <div className="border-l-4 border-coral pl-4">
                            <div className="text-3xl font-bold text-coral mb-1">4.2/5</div>
                            <div className="text-gray-700 font-semibold mb-2">Seller Satisfaction</div>
                            <p className="text-sm text-gray-600">
                                High satisfaction scores from seller feedback surveys
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-turquoise/10 to-coral/10 p-6 rounded-lg border-l-4 border-turquoise">
                    <h3 className="text-xl font-semibold text-charcoal mb-3">Business Impact</h3>
                    <p className="text-gray-700 mb-3">
                        The cross-border marketplace became a strategic growth driver for Liverpool:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li>✓ Launched marketplace from concept to 100+ sellers in under 2 years</li>
                        <li>✓ Established scalable processes that can support 500+ sellers</li>
                        <li>✓ Created competitive advantage in premium cross-border segment</li>
                        <li>✓ Built foundation for future marketplace expansion</li>
                        <li>✓ Maintained brand quality standards while scaling rapidly</li>
                    </ul>
                </div>
            </motion.section>

            {/* The Process */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-bold text-turquoise mb-4">The UX Redesign Process</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-turquoise text-white rounded-full flex items-center justify-center font-bold text-xl">
                                1
                            </div>
                            <div>
                                <h4 className="font-semibold text-charcoal mb-2">Research & Discovery</h4>
                                <p className="text-gray-700 text-sm">
                                    Conducted user interviews with potential sellers, analyzed competitor onboarding flows, and identified key friction points in the initial prototype.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-turquoise text-white rounded-full flex items-center justify-center font-bold text-xl">
                                2
                            </div>
                            <div>
                                <h4 className="font-semibold text-charcoal mb-2">Wireframing & Prototyping</h4>
                                <p className="text-gray-700 text-sm">
                                    Created low-fidelity wireframes focusing on information architecture and flow. Iterated based on stakeholder feedback and usability testing.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-turquoise text-white rounded-full flex items-center justify-center font-bold text-xl">
                                3
                            </div>
                            <div>
                                <h4 className="font-semibold text-charcoal mb-2">A/B Testing & Iteration</h4>
                                <p className="text-gray-700 text-sm">
                                    Launched with MVP and continuously tested variations of form fields, copy, and visual hierarchy to optimize conversion rates.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-turquoise text-white rounded-full flex items-center justify-center font-bold text-xl">
                                4
                            </div>
                            <div>
                                <h4 className="font-semibold text-charcoal mb-2">Scale & Optimize</h4>
                                <p className="text-gray-700 text-sm">
                                    Implemented automation tools and self-service features based on support ticket analysis and seller feedback.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Key Learnings */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-bold text-turquoise mb-4">Key Learnings</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-coral mb-2">1. Start Simple, Then Scale</h4>
                            <p className="text-gray-700">
                                Launching with an MVP and iterating based on real seller feedback was more effective than trying to build the "perfect" system upfront.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-coral mb-2">2. Conversion is About Trust</h4>
                            <p className="text-gray-700">
                                The 78% conversion increase came primarily from transparency improvements—showing sellers exactly what to expect at each step.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-coral mb-2">3. Automation Enables Scale</h4>
                            <p className="text-gray-700">
                                Investing in automation early allowed us to maintain quality while growing from 10 to 100+ sellers without proportionally increasing headcount.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-coral mb-2">4. Data-Driven Decisions Win</h4>
                            <p className="text-gray-700">
                                Every major UX change was backed by data from user testing, analytics, or A/B tests. This made it easier to get stakeholder buy-in and measure success.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* CTA */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center bg-gradient-to-r from-turquoise to-coral p-8 rounded-lg text-white"
            >
                <h2 className="text-3xl font-bold mb-4">Let's Build Your Marketplace Together</h2>
                <p className="text-lg mb-6 opacity-90">
                    Whether you're launching from scratch or optimizing an existing platform, I can help you achieve measurable results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/#contact"
                        className="inline-block px-8 py-3 bg-white text-turquoise font-semibold rounded-full hover:bg-softGray transition"
                    >
                        Schedule a Consultation
                    </Link>
                    <Link
                        href="/case-studies/linio"
                        className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-turquoise transition"
                    >
                        ← View Linio Case Study
                    </Link>
                </div>
            </motion.section>
        </article>
    )
}
