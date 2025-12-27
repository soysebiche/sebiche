'use client'
import { motion } from 'framer-motion'

interface Skill {
    name: string
    icon?: string
}

interface SkillCategory {
    title: string
    emoji: string
    skills: Skill[]
    color: string
}

export default function Skills() {
    const categories: SkillCategory[] = [
        {
            title: 'UX & UI Design',
            emoji: '✨',
            color: 'from-purple-400 to-pink-400',
            skills: [
                { name: 'User Research', icon: '🔍' },
                { name: 'Wireframing', icon: '📐' },
                { name: 'Prototyping', icon: '🎨' },
                { name: 'Usability Testing', icon: '🧪' },
                { name: 'Design Systems', icon: '🎯' },
                { name: 'Figma', icon: '🎭' },
                { name: 'Adobe XD', icon: '💎' },
            ],
        },
        {
            title: 'eCommerce & Marketplaces',
            emoji: '🛒',
            color: 'from-turquoise to-blue-400',
            skills: [
                { name: 'Conversion Optimization', icon: '📈' },
                { name: 'A/B Testing', icon: '🔬' },
                { name: 'Customer Journey Mapping', icon: '🗺️' },
                { name: 'Seller Onboarding', icon: '👥' },
                { name: 'Marketplace Strategy', icon: '💼' },
                { name: 'Product Management', icon: '📦' },
            ],
        },
        {
            title: 'Data & Analytics',
            emoji: '📊',
            color: 'from-coral to-orange-400',
            skills: [
                { name: 'Google Analytics', icon: '📉' },
                { name: 'Hotjar', icon: '🔥' },
                { name: 'Mixpanel', icon: '📱' },
                { name: 'Excel', icon: '📗' },
                { name: 'Python', icon: '🐍' },
                { name: 'Data Visualization', icon: '📊' },
            ],
        },
        {
            title: 'Web Development',
            emoji: '💻',
            color: 'from-yellow-400 to-amber-400',
            skills: [
                { name: 'HTML/CSS', icon: '🎨' },
                { name: 'JavaScript', icon: '⚡' },
                { name: 'React', icon: '⚛️' },
                { name: 'Next.js', icon: '▲' },
                { name: 'Tailwind CSS', icon: '🌊' },
                { name: 'Git', icon: '🔧' },
            ],
        },
    ]

    return (
        <section id="skills" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-4xl mr-3">⚡</span>
                        skills
                    </h2>
                    <p className="text-xl text-gray-600">
                        expertise across design, data & business
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="h-full"
                        >
                            <div className={`
                                bg-white rounded-2xl p-6 shadow-xl
                                border-2 ${category.color.replace('from-', 'border-t-').replace('to-', 'border-b-')}
                                h-full
                            `}>
                                {/* Icon */}
                                <div className="text-4xl mb-4">
                                    {category.emoji}
                                </div>

                                {/* Title */}
                                <h3 className={`
                                    text-2xl font-bold mb-4
                                    bg-gradient-to-r ${category.color} bg-clip-text text-transparent
                                `}>
                                    {category.title}
                      `}
                                    >
                                    {skill.icon && <span>{skill.icon}</span>}
                                    <span>{skill.name}</span>
                                </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Fun fact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-lg text-gray-400 italic">
                        💡 Always learning, always growing. Currently exploring AI-powered UX tools!
                    </p>
                </motion.div>
            </motion.div>
        </div>
        </section >
    )
}
