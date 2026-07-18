'use client'
import { motion } from 'framer-motion'
import { Sprout, GraduationCap, Rocket, Briefcase, Target } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

const milestones: { year: string; icon: LucideIcon; title: string; company: string }[] = [
    { year: '2015', icon: Sprout, title: 'Started as Intern', company: 'Linio Peru' },
    { year: '2018', icon: GraduationCap, title: 'Graduated BBA', company: 'Universidad del Pacífico' },
    { year: '2020', icon: Rocket, title: 'UX Manager', company: 'Linio Mexico' },
    { year: '2022', icon: Briefcase, title: 'Marketplace Lead', company: 'Liverpool' },
    { year: '2024', icon: Target, title: 'MADI Student', company: 'SMU' },
]

export default function Journey() {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-charcoal">
                        My Journey
                    </h2>
                    <p className="text-gray-500">
                        From intern to UX leader
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
                        {milestones.map((milestone, index) => {
                            const Icon = milestone.icon
                            return (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    whileHover={{ y: -4 }}
                                    className="transition-all duration-200"
                                >
                                    <div className="bg-softGray rounded-xl p-5 border border-gray-100 relative h-full flex flex-col items-center text-center pt-10">
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-charcoal text-white px-3 py-0.5 rounded-full font-semibold text-xs">
                                            {milestone.year}
                                        </div>

                                        <div className="w-10 h-10 rounded-lg bg-turquoise/10 flex items-center justify-center mb-3">
                                            <Icon className="w-5 h-5 text-turquoise" />
                                        </div>

                                        <h3 className="text-sm font-bold text-charcoal mb-1">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs">
                                            {milestone.company}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
