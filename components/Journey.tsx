'use client'
import { motion } from 'framer-motion'

const milestones = [
    {
        year: '2015',
        emoji: '🌱',
        title: 'started as intern',
        company: 'linio peru',
        color: 'from-green-400 to-emerald-500'
    },
    {
        year: '2018',
        emoji: '🎓',
        title: 'graduated bba',
        company: 'universidad del pacífico',
        color: 'from-blue-400 to-cyan-500'
    },
    {
        year: '2020',
        emoji: '🚀',
        title: 'ux manager',
        company: 'linio mexico',
        color: 'from-turquoise to-teal-500'
    },
    {
        year: '2022',
        emoji: '💼',
        title: 'marketplace lead',
        company: 'liverpool',
        color: 'from-purple-400 to-pink-500'
    },
    {
        year: '2024',
        emoji: '🎯',
        title: 'madi student',
        company: 'smu',
        color: 'from-coral to-orange-500'
    }
]

export default function Journey() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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

                    {/* Timeline cards */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-4 overflow-x-auto pb-8 md:pb-0 snap-x snap-mandatory">
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
                                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-200 relative h-full">
                                    {/* Year badge */}
                                    <div className={`
                    absolute -top-4 left-1/2 -translate-x-1/2 
                    bg-gradient-to-r ${milestone.color}
                    text-white px-4 py-2 rounded-full font-bold shadow-lg
                  `}>
                                        {milestone.year}
                                    </div>

                                    {/* Icon */}
                                    <div className="text-5xl text-center mt-6 mb-4">
                                        {milestone.emoji}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-center mb-2 text-gray-900">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-gray-600 text-center text-sm">
                                        {milestone.company}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Scroll hint for mobile */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-gray-500 text-sm mt-8 md:hidden"
                >
                    swipe to explore →
                </motion.p>
            </div>
        </section>
    )
}
