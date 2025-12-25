'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function LinioCaseStudy() {
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
                    How I Boosted Cross-Border Sales by 125% at Linio Mexico
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                    <span className="flex items-center gap-2">
                        <span className="font-semibold text-coral">Company:</span> Linio México
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="font-semibold text-coral">Role:</span> Regional Hardlines Cross-Border Commercial Manager
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="font-semibold text-coral">Period:</span> Jan 2020 - May 2022
                    </span>
                </div>

                <div className="bg-gradient-to-r from-turquoise to-coral p-6 rounded-lg text-white">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-1">125%</div>
                            <div className="text-sm opacity-90">Sales Increase</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-1">40%</div>
                            <div className="text-sm opacity-90">Efficiency Improvement</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-1">5</div>
                            <div className="text-sm opacity-90">Countries Managed</div>
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
                        In early 2020, Linio Mexico's cross-border marketplace was underperforming despite having access to international sellers. The platform faced several critical issues:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Low seller engagement:</strong> International sellers found the onboarding process complex and time-consuming</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Poor operational efficiency:</strong> Manual processes created bottlenecks and delays</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Fragmented regional approach:</strong> Each country operated in silos, missing opportunities for synergy</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-coral text-xl">•</span>
                            <span><strong>Limited product catalog:</strong> Cross-border inventory wasn't being leveraged effectively</span>
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
                        <h3 className="text-xl font-semibold text-coral mb-3">1. User Research Across 5 Countries</h3>
                        <p className="text-gray-700 mb-3">
                            Conducted comprehensive research with sellers and buyers across Mexico, Colombia, Peru, Chile, and Argentina to understand pain points and opportunities.
                        </p>
                        <div className="bg-softGray p-4 rounded">
                            <p className="text-sm text-gray-600 italic">
                                "We discovered that 73% of sellers abandoned the onboarding process due to unclear requirements and lack of real-time feedback."
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-coral mb-3">2. UX Optimization of Seller Onboarding</h3>
                        <p className="text-gray-700 mb-3">
                            Redesigned the entire seller onboarding flow with focus on:
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>• Progressive disclosure of information requirements</li>
                            <li>• Real-time validation and feedback</li>
                            <li>• Multi-language support with localized content</li>
                            <li>• Step-by-step wizard with clear progress indicators</li>
                            <li>• Automated document verification where possible</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-coral mb-3">3. Operational Efficiency Improvements</h3>
                        <p className="text-gray-700 mb-3">
                            Implemented automation and process improvements:
                        </p>
                        <ul className="space-y-2 text-gray-700 ml-4">
                            <li>• Automated seller verification workflows</li>
                            <li>• Integrated inventory management systems</li>
                            <li>• Created centralized dashboard for regional oversight</li>
                            <li>• Established KPI tracking and reporting</li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-coral mb-3">4. Regional Team Leadership</h3>
                        <p className="text-gray-700">
                            Built and led a cross-functional team of 10 professionals across 5 countries, establishing unified processes while respecting local market nuances.
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
                            <div className="text-3xl font-bold text-turquoise mb-1">125%</div>
                            <div className="text-gray-700 font-semibold mb-2">Cross-Border Sales Growth</div>
                            <p className="text-sm text-gray-600">
                                Achieved in 18 months through improved seller acquisition and catalog expansion
                            </p>
                        </div>

                        <div className="border-l-4 border-coral pl-4">
                            <div className="text-3xl font-bold text-coral mb-1">40%</div>
                            <div className="text-gray-700 font-semibold mb-2">Operational Efficiency Gain</div>
                            <p className="text-sm text-gray-600">
                                Reduced processing time and manual interventions through automation
                            </p>
                        </div>

                        <div className="border-l-4 border-turquoise pl-4">
                            <div className="text-3xl font-bold text-turquoise mb-1">10</div>
                            <div className="text-gray-700 font-semibold mb-2">Team Members</div>
                            <p className="text-sm text-gray-600">
                                Successfully managed distributed team across 5 Latin American countries
                            </p>
                        </div>

                        <div className="border-l-4 border-coral pl-4">
                            <div className="text-3xl font-bold text-coral mb-1">300+</div>
                            <div className="text-gray-700 font-semibold mb-2">New Sellers Onboarded</div>
                            <p className="text-sm text-gray-600">
                                Significant increase in active cross-border sellers on the platform
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-turquoise/10 to-coral/10 p-6 rounded-lg border-l-4 border-turquoise">
                    <h3 className="text-xl font-semibold text-charcoal mb-3">Business Impact</h3>
                    <p className="text-gray-700 mb-3">
                        The improvements to the cross-border marketplace didn't just increase sales—they transformed Linio's competitive position in the region:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li>✓ Expanded product catalog by 250% with international inventory</li>
                        <li>✓ Reduced average onboarding time from 14 days to 3 days</li>
                        <li>✓ Improved seller satisfaction score from 6.2 to 8.7 (out of 10)</li>
                        <li>✓ Created replicable processes adopted by other Linio markets</li>
                    </ul>
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
                            <h4 className="font-semibold text-coral mb-2">1. User Research is Non-Negotiable</h4>
                            <p className="text-gray-700">
                                Understanding seller pain points across different markets was crucial. What worked in Mexico didn't always work in Peru or Chile.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-coral mb-2">2. Automation Scales, But Needs Human Touch</h4>
                            <p className="text-gray-700">
                                While automation improved efficiency by 40%, maintaining personal support for complex cases was essential for seller satisfaction.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-coral mb-2">3. Cross-Functional Collaboration Drives Results</h4>
                            <p className="text-gray-700">
                                Success required tight coordination between UX, tech, operations, and local market teams. Regular sync-ups and shared KPIs were critical.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-coral mb-2">4. Measure Everything</h4>
                            <p className="text-gray-700">
                                Establishing clear metrics from day one allowed us to iterate quickly and prove ROI to stakeholders.
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
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Marketplace?</h2>
                <p className="text-lg mb-6 opacity-90">
                    Let's discuss how I can help you achieve similar results for your eCommerce platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/#contact"
                        className="inline-block px-8 py-3 bg-white text-turquoise font-semibold rounded-full hover:bg-softGray transition"
                    >
                        Get in Touch
                    </Link>
                    <Link
                        href="/case-studies/liverpool"
                        className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-turquoise transition"
                    >
                        View Liverpool Case Study →
                    </Link>
                </div>
            </motion.section>
        </article>
    )
}
