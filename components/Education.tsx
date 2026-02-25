'use client'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen } from 'lucide-react'

const education = [
    {
        degree: 'Bachelor of Business Administration',
        school: 'Universidad del Pacífico (UP)',
        location: 'Lima, Peru',
        period: '2013 - 2018',
        gpa: 'GPA 3.59',
        icon: GraduationCap,
        tags: ['Business Strategy', 'Marketing', 'Finance', 'Operations'],
    },
    {
        degree: 'Master of Arts in Design & Innovation',
        school: 'Southern Methodist University (SMU)',
        location: 'Dallas, US',
        period: '2024 - Present',
        gpa: 'GPA 4.0',
        icon: BookOpen,
        tags: ['Data Analytics', 'AI/ML', 'Innovation', 'Business Strategy', 'UX/UI Design'],
    },
]

export default function Education() {
    return (
        <section id="education" className="py-16 bg-softGray">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-charcoal">
                        Education
                    </h2>
                    <p className="text-gray-500">
                        Continuous learning & growth
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {education.map((edu, index) => {
                        const Icon = edu.icon
                        return (
                            <motion.div
                                key={edu.school}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -4 }}
                                className="h-full transition-all duration-200"
                            >
                                <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
                                    <div className="w-10 h-10 rounded-lg bg-turquoise/10 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-turquoise" />
                                    </div>

                                    <h3 className="text-xl font-bold text-charcoal mb-2">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-gray-600 font-medium mb-1">
                                        {edu.school}
                                    </p>
                                    <p className="text-gray-400 text-sm mb-1">
                                        {edu.location}
                                    </p>
                                    <div className="flex items-center gap-2 mb-4 text-sm">
                                        <span className="text-gray-400">{edu.period}</span>
                                        {edu.gpa && (
                                            <>
                                                <span className="text-gray-300">·</span>
                                                <span className="px-2 py-0.5 bg-turquoise/10 text-turquoise rounded font-semibold text-xs">
                                                    {edu.gpa}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {edu.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
                                            >
                                                {tag}
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
