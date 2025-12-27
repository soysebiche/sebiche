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
        <section className="py-20 bg-gradient-to-br from-charcoal via-gray-900 to-charcoal text-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-turquoise rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-turquoise bg-clip-text text-transparent"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            ⚡ Skills & Expertise
                        </motion.h2>
                        <p className="text-xl text-gray-300">
                            Tools and technologies I use to create exceptional experiences
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="space-y-12">
                        {categories.map((category, categoryIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.1 }}
                            >
                                {/* Category Title */}
                                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <span className="text-4xl">{category.emoji}</span>
                                    <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                                        {category.title}
                                    </span>
                                </h3>

                                {/* Skills Grid */}
                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className={`
                        px-5 py-3 rounded-full 
                        bg-gradient-to-r ${category.color}
                        text-white font-medium
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        cursor-default
                        flex items-center gap-2
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
        </section>
    )
}
