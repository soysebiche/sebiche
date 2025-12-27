'use client'
import { motion } from 'framer-motion'

const experiences = [
    {
        company: 'liverpool',
        title: 'marketplace ux lead',
        period: '2022 - 2024',
        emoji: '🛍️',
        gradient: 'from-pink-50 to-purple-50',
        borderColor: 'border-purple-200',
        achievements: [
            {
                icon: '📈',
                metric: '100+ sellers',
                description: 'onboarded to marketplace'
            },
            {
                icon: '🎯',
                metric: '78% conversion',
                description: 'increase through ux optimization'
            },
            {
                icon: '👥',
                metric: 'led team',
                description: 'cross-functional ux initiatives'
            },
            {
                icon: '🚀',
                metric: 'marketplace growth',
                description: 'scaled platform operations'
            }
        ]
    },
    {
        company: 'linio',
        title: 'ux manager',
        period: '2020 - 2022',
        emoji: '🚀',
        gradient: 'from-turquoise/10 to-blue-50',
        borderColor: 'border-turquoise',
        achievements: [
            {
                icon: '💰',
                metric: '125% sales',
                description: 'growth through redesign'
            },
            {
                icon: '🌎',
                metric: 'regional lead',
                description: 'mexico & latam markets'
            },
            {
                icon: '🎨',
                metric: 'design system',
                description: 'created scalable components'
            },
            {
                icon: '📊',
                metric: 'data-driven',
                description: 'a/b testing & analytics'
            }
        ]
    },
    {
        company: 'falabella',
        title: 'product owner',
        period: '2018 - 2020',
        emoji: '💼',
        gradient: 'from-yellow-50 to-orange-50',
        borderColor: 'border-yellow-300',
        achievements: [
            {
                icon: '🛒',
                metric: 'ecommerce',
                description: 'led product development'
            },
            {
                icon: '⚡',
                metric: 'agile',
                description: 'scrum master certified'
            }
        ]
    }
]

export default function Experience() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-4xl mr-3">💼</span>
                        experience
                    </h2>
                    <p className="text-xl text-gray-600">
                        driving growth through design
                    </p>
                </motion.div>

                {/* Experience cards */}
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            className="relative"
                        >
                            {/* Company card */}
                            <div className={`
                bg-gradient-to-br ${exp.gradient}
                rounded-2xl p-8 shadow-xl
                border-2 ${exp.borderColor}
              `}>
                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    {/* Logo/Icon */}
                                    <div className="text-6xl flex-shrink-0">
                                        {exp.emoji}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-xl text-gray-700 font-medium">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <span className="mt-2 md:mt-0 px-4 py-2 bg-white/80 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                                                {exp.period}
                                            </span>
                                        </div>

                                        {/* Achievements */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {exp.achievements.map((achievement) => (
                                                <motion.div
                                                    key={achievement.metric}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md"
                                                >
                                                    <span className="text-2xl flex-shrink-0">
                                                        {achievement.icon}
                                                    </span>
                                                    <div>
                                                        <p className="font-bold text-gray-900">
                                                            {achievement.metric}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {achievement.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
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
