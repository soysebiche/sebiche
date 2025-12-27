'use client'
import { motion } from 'framer-motion'

const education = [
    {
        degree: 'master of arts in data & innovation',
        school: 'southern methodist university (smu)',
        period: '2024 - present',
        emoji: '🐴',
        gradient: 'from-purple-50 to-pink-50',
        borderColor: 'border-purple-300',
        accentColor: 'text-purple-600',
        tags: ['data analytics', 'ai/ml', 'innovation', 'business strategy']
    },
    {
        degree: 'bachelor of business administration',
        school: 'universidad del pacífico',
        period: '2018',
        emoji: '🎓',
        gradient: 'from-turquoise/10 to-blue-50',
        borderColor: 'border-turquoise',
        accentColor: 'text-turquoise',
        tags: ['business strategy', 'marketing', 'finance']
    }
]

export default function Education() {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-4xl mr-3">🎓</span>
                        education
                    </h2>
                    <p className="text-xl text-gray-600">
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
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={`
                bg-gradient-to-br ${edu.gradient}
                rounded-2xl p-8 shadow-xl 
                border-2 ${edu.borderColor}
                h-full
              `}
                        >
                            <div className="flex items-start gap-4">
                                {/* Emoji */}
                                <div className="text-5xl flex-shrink-0">
                                    {edu.emoji}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className={`text-2xl font-bold mb-2 ${edu.accentColor}`}>
                                        {edu.degree}
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-2 font-medium">
                                        {edu.school}
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        {edu.period}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {edu.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`
                          px-3 py-1 rounded-full text-sm font-medium
                          ${edu.accentColor === 'text-purple-600'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-turquoise/20 text-turquoise'}
                        `}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
