'use client'
import { motion } from 'framer-motion'

const experiences = [
    {
        company: 'linio peru',
        title: 'cross-border commercial lead',
        period: 'may 2015 - dec 2019',
        location: 'lima, peru 🇵🇪',
        emoji: '🌱',
        gradient: 'from-green-50 to-emerald-50',
        borderColor: 'border-emerald-300',
        achievements: [
            {
                icon: '🌎',
                metric: 'cross-border expansion',
                description: 'spearheaded peru operations'
            },
            {
                icon: '🤝',
                metric: 'vendor negotiations',
                description: 'led pricing & marketing strategy'
            },
            {
                icon: '📦',
                metric: 'product lifecycle',
                description: 'managed international sellers'
            }
        ]
    },
    {
        company: 'falabella',
        title: 'regional hardlines cross-border commercial manager',
        period: 'jan 2020 - may 2022',
        location: 'mexico city, mexico 🇲🇽',
        emoji: '🚀',
        gradient: 'from-orange-50 to-yellow-50',
        borderColor: 'border-orange-300',
        achievements: [
            {
                icon: '📈',
                metric: '125% sales growth',
                description: 'yoy across 5 countries'
            },
            {
                icon: '🌎',
                metric: '5 countries',
                description: 'mexico, colombia, chile, peru, argentina'
            },
            {
                icon: '✅',
                metric: '98% fulfillment',
                description: 'optimized catalog algorithm'
            },
            {
                icon: '📊',
                metric: '40% efficiency',
                description: 'improved seller dashboards'
            }
        ]
    },
    {
        company: 'liverpool',
        title: 'marketplace bu manager',
        period: 'jun 2022 - jul 2024',
        location: 'mexico city, mexico 🇲🇽',
        emoji: '💼',
        gradient: 'from-purple-50 to-pink-50',
        borderColor: 'border-purple-300',
        achievements: [
            {
                icon: '🛍️',
                metric: '100+ sellers',
                description: 'onboarded to crossborder marketplace'
            },
            {
                icon: '⚡',
                metric: '50% faster',
                description: 'reduced onboarding time'
            },
            {
                icon: '📊',
                metric: '24% engagement',
                description: 'increased through dashboard redesign'
            },
            {
                icon: '🤖',
                metric: '35% faster',
                description: 'response times via automation'
            }
        ]
    }
]

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                        10+ years driving growth through product & ux
                    </p>
                </motion.div>

                {/* Experience cards */}
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01, y: -5 }}
                        >
                            <div className={`
                                bg-white rounded-2xl p-8 shadow-xl
                                border-2 ${exp.borderColor}
                            `}>
                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    {/* Icon */}
                                    <div className="text-6xl flex-shrink-0">
                                        {exp.emoji}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 w-full">
                                        <div className="mb-6">
                                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                                {exp.title}
                                            </h3>
                                            <p className="text-xl text-gray-700 font-medium mb-1">
                                                {exp.company}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    📅 {exp.period}
                                                </span>
                                                <span>•</span>
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {exp.achievements.map((achievement) => (
                                                <motion.div
                                                    key={achievement.metric}
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`
                                                        flex items-start gap-3 
                                                        bg-gradient-to-br ${exp.gradient}
                                                        rounded-xl p-4 shadow-md
                                                        border border-gray-200
                                                    `}
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
