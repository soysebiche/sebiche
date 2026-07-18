'use client'
import { motion } from 'framer-motion'
import { Palette, ShoppingCart, BarChart3, Code } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface SkillCategory {
    title: string
    icon: LucideIcon
    skills: string[]
}

export default function Skills() {
    const categories: SkillCategory[] = [
        {
            title: 'UX & UI Design',
            icon: Palette,
            skills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems', 'Figma'],
        },
        {
            title: 'eCommerce & Marketplaces',
            icon: ShoppingCart,
            skills: ['Conversion Optimization', 'A/B Testing', 'Customer Journey Mapping', 'Seller Onboarding', 'Marketplace Strategy'],
        },
        {
            title: 'Data & Analytics',
            icon: BarChart3,
            skills: ['Google Analytics', 'Hotjar', 'Excel', 'Python', 'Data Visualization'],
        },
        {
            title: 'Web Development',
            icon: Code,
            skills: ['HTML/CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
        },
    ]

    return (
        <section id="skills" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-charcoal">
                        Skills
                    </h2>
                    <p className="text-gray-500">
                        Expertise across design, data & business
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((category, categoryIndex) => {
                        const Icon = category.icon
                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="h-full transition-all duration-200"
                            >
                                <div className="bg-softGray rounded-xl p-5 border border-gray-100 h-full">
                                    <div className="w-10 h-10 rounded-lg bg-turquoise/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-turquoise" />
                                    </div>

                                    <h3 className="text-lg font-bold text-charcoal mb-3">
                                        {category.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-1.5">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-white text-gray-600 border border-gray-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
