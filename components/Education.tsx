'use client'
import { motion } from 'framer-motion'

const education = [
    {
        degree: 'master of arts in data & innovation',
        school: 'southern methodist university (smu)',
        period: '2024 - present',
        gpa: 'gpa 4.0',
        emoji: '🐴',
        gradient: 'from-purple-400 via-pink-400 to-rose-400',
        borderColor: 'border-purple-400',
        accentGradient: 'from-purple-600 to-pink-600',
        tags: ['data analytics', 'ai/ml', 'innovation', 'business strategy', 'ux/ui design']
    },
    {
        degree: 'bachelor of business administration',
        school: 'universidad del pacífico',
        period: '2018',
        gpa: '',
        emoji: '🎓',
        gradient: 'from-turquoise via-teal-400 to-cyan-400',
        borderColor: 'border-turquoise',
        accentGradient: 'from-turquoise to-teal-600',
        tags: ['business strategy', 'marketing', 'finance', 'operations']
    }
]

export default function Education() {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-4xl mr-3">🎓</span>
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-turquoise bg-clip-text text-transparent">
                            education
                        </span>
                    </h2>
                    <p className="text-xl text-gray-700 font-medium">
                        continuous learning & growth
                    </p>
                </motion.div>

                {/* Education cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.school}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ scale: 1.03, y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
                            className="h-full"
                        >
                            <div className={`
                bg-gradient-to-br ${edu.gradient}
                rounded-3xl p-8 shadow-2xl 
                border-4 border-white
                h-full
                relative
              `}>
                                {/* Emoji */}
                                <div className="text-6xl mb-6 drop-shadow-lg">
                                    {edu.emoji}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className={`
                    text-3xl font-bold mb-3 text-white drop-shadow-md
                  `}>
                                        {edu.degree}
                                    </h3>
                                    <p className="text-xl text-white/95 mb-2 font-semibold drop-shadow">
                                        {edu.school}
                                    </p>
                                    <div className="flex items-center gap-3 mb-6">
                                        <p className="text-white/90 font-medium">
                                            {edu.period}
                                        </p>
                                        {edu.gpa && (
                                            <>
                                                <span className="text-white/60">•</span>
                                                <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-white font-bold text-sm">
                                                    {edu.gpa}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {edu.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 rounded-full text-sm font-semibold bg-white/25 backdrop-blur-sm text-white border-2 border-white/30"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
