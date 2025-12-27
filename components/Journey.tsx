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
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-turquoise -translate-y-1/2 z-0" />

                    {/* Timeline cards - All 5 in one row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200 relative h-full min-h-[220px] flex flex-col pt-8">
                                    {/* Year badge - INSIDE card at top */}
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full font-bold shadow-lg text-sm whitespace-nowrap">
                                        {milestone.year}
                                    </div>

                                    {/* Icon */}
                                    <div className="text-4xl text-center mt-4 mb-3">
                                        {milestone.emoji}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="text-base font-bold text-center mb-2 text-gray-900 px-1">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-600 text-center text-xs px-1">
                                            {milestone.company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
