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
    gradient: string
    borderColor: string
}

export default function Skills() {
    const categories: SkillCategory[] = [
        {
            title: 'UX & UI Design',
            emoji: '✨',
            gradient: 'from-purple-400 to-pink-400',
            borderColor: 'border-purple-400',
            skills: [
                { name: 'User Research' },
                { name: 'Wireframing' },
                { name: 'Prototyping' },
                { name: 'Usability Testing' },
                { name: 'Design Systems' },
                { name: 'Figma' },
            ],
        },
        {
            title: 'eCommerce & Marketplaces',
            emoji: '🛒',
            gradient: 'from-turquoise to-blue-400',
            borderColor: 'border-turquoise',
            skills: [
                { name: 'Conversion Optimization' },
                { name: 'A/B Testing' },
                { name: 'Customer Journey Mapping' },
                { name: 'Seller Onboarding' },
                { name: 'Marketplace Strategy' },
            ],
        },
        {
            title: 'Data & Analytics',
            emoji: '📊',
            gradient: 'from-coral to-orange-400',
            borderColor: 'border-coral',
            skills: [
                { name: 'Google Analytics' },
                { name: 'Hotjar' },
                { name: 'Excel' },
                { name: 'Python' },
                { name: 'Data Visualization' },
            ],
        },
        {
            title: 'Web Development',
            emoji: '💻',
            gradient: 'from-yellow-400 to-amber-400',
            borderColor: 'border-yellow-400',
            skills: [
                { name: 'HTML/CSS' },
                { name: 'JavaScript' },
                { name: 'React' },
                { name: 'Next.js' },
                { name: 'Tailwind CSS' },
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

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="h-full"
                        >
                            <div className={`
                                bg-white rounded-2xl p-6 shadow-xl 
                                border-2 ${category.borderColor}
                                h-full
                            `}>
                                {/* Icon */}
                                <div className="text-4xl mb-4">
                                    {category.emoji}
                                </div>

                                {/* Title */}
                                <h3 className={`
                                    text-2xl font-bold mb-4
                                    bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent
                                `}>
                                    {category.title}
                                </h3>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className={`
                                                px-3 py-1.5 rounded-full text-sm font-semibold
                                                bg-gradient-to-r ${category.gradient} text-white
                                                shadow-md
                                            `}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
