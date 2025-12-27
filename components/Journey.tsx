'use client'
import { motion } from 'framer-motion'

const milestones = [
    {
        year: '2015',
        emoji: '🌱',
        title: 'started as intern',
        company: 'linio peru'
    },
    {
        year: '2018',
        emoji: '🎓',
        title: 'graduated bba',
        company: 'universidad del pacífico'
    },
    {
        year: '2020',
        emoji: '🚀',
        title: 'ux manager',
        company: 'linio mexico'
    },
    {
        year: '2022',
        emoji: '💼',
        title: 'marketplace lead',
        company: 'liverpool'
    },
    {
        year: '2024',
        emoji: '🎯',
        title: 'madi student',
        company: 'smu'
    }
]

export default function Journey() {
    return (
        <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-4xl mr-3">🚀</span>
                        my journey
                    </h2>
                    <p className="text-xl text-gray-600">
                        from intern to ux leader
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-turquoise -translate-y-1/2" />

                    {/* Scroll indicators for desktop */}
                    <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10">
                        <div className="bg-white rounded-full p-2 shadow-lg border-2 border-purple-300">
                            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                    </div>
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
                        <div className="bg-white rounded-full p-2 shadow-lg border-2 border-purple-300">
                            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Timeline cards */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4 overflow-x-auto pb-8 md:pb-4 snap-x snap-mandatory scrollbar-hide">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="flex-1 min-w-[280px] snap-center"
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200 relative h-full min-h-[200px] flex flex-col">
                                    {/* Year badge */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-bold shadow-lg text-xs">
                                        {milestone.year}
                                    </div>

                                    {/* Icon */}
                                    <div className="text-4xl text-center mt-6 mb-3">
                                        {milestone.emoji}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="text-lg font-bold text-center mb-2 text-gray-900 px-2">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-600 text-center text-sm px-2">
                                            {milestone.company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Scroll hint for mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-4 md:hidden"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span>swipe to explore</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </motion.div>
            </div>
        </section>
    )
}
