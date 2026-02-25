'use client'
import { motion } from 'framer-motion'
import { Sprout, Rocket, Briefcase, Globe, Handshake, Package, TrendingUp, CheckCircle, BarChart3, ShoppingBag, Zap, Bot, Users } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface Achievement {
    icon: LucideIcon
    metric: string
    description: string
}

const highlights = [
    { value: '125%', label: 'Sales Growth', icon: TrendingUp },
    { value: '100+', label: 'Sellers Onboarded', icon: Users },
    { value: '5', label: 'Countries', icon: Globe },
    { value: '98%', label: 'Fulfillment Rate', icon: CheckCircle },
]

const experiences: {
    company: string
    title: string
    period: string
    location: string
    icon: LucideIcon
    achievements: Achievement[]
}[] = [
    {
        company: 'Linio Peru',
        title: 'Cross-Border Commercial Lead',
        period: 'May 2015 - Dec 2019',
        location: 'Lima, Peru',
        icon: Sprout,
        achievements: [
            { icon: Globe, metric: 'Cross-border expansion', description: 'Spearheaded Peru operations' },
            { icon: Handshake, metric: 'Vendor negotiations', description: 'Led pricing & marketing strategy' },
            { icon: Package, metric: 'Product lifecycle', description: 'Managed international sellers' },
        ],
    },
    {
        company: 'Falabella',
        title: 'Regional Hardlines Cross-Border Commercial Manager',
        period: 'Jan 2020 - May 2022',
        location: 'Mexico City, Mexico',
        icon: Rocket,
        achievements: [
            { icon: TrendingUp, metric: '125% sales growth', description: 'YoY across 5 countries' },
            { icon: Globe, metric: '5 countries', description: 'Mexico, Colombia, Chile, Peru, Argentina' },
            { icon: CheckCircle, metric: '98% fulfillment', description: 'Optimized catalog algorithm' },
            { icon: BarChart3, metric: '40% efficiency', description: 'Improved seller dashboards' },
        ],
    },
    {
        company: 'Liverpool',
        title: 'Marketplace BU Manager',
        period: 'Jun 2022 - Jul 2024',
        location: 'Mexico City, Mexico',
        icon: Briefcase,
        achievements: [
            { icon: ShoppingBag, metric: '100+ sellers', description: 'Onboarded to crossborder marketplace' },
            { icon: Zap, metric: '50% faster', description: 'Reduced onboarding time' },
            { icon: BarChart3, metric: '24% engagement', description: 'Increased through dashboard redesign' },
            { icon: Bot, metric: '35% faster', description: 'Response times via automation' },
        ],
    },
]

export default function Experience() {
    return (
        <section id="experience" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-charcoal">
                        Experience
                    </h2>
                    <p className="text-gray-500">
                        10+ years driving growth through product & UX
                    </p>
                </motion.div>

                {/* Highlight metrics bar */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
                >
                    {highlights.map((h) => {
                        const Icon = h.icon
                        return (
                            <div
                                key={h.label}
                                className="flex items-center gap-3 bg-softGray rounded-lg px-4 py-3 border border-gray-100"
                            >
                                <Icon className="w-4 h-4 text-turquoise flex-shrink-0" />
                                <div>
                                    <span className="text-lg font-bold text-charcoal">{h.value}</span>
                                    <p className="text-xs text-gray-400 leading-tight">{h.label}</p>
                                </div>
                            </div>
                        )
                    })}
                </motion.div>

                <div className="space-y-6">
                    {experiences.map((exp, index) => {
                        const CompanyIcon = exp.icon
                        return (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="bg-softGray rounded-xl p-6 md:p-8 border border-gray-100">
                                    <div className="flex flex-col md:flex-row items-start gap-5">
                                        <div className="w-10 h-10 rounded-lg bg-turquoise/10 flex items-center justify-center flex-shrink-0">
                                            <CompanyIcon className="w-5 h-5 text-turquoise" />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <div className="mb-5">
                                                <h3 className="text-xl font-bold text-charcoal mb-1">
                                                    {exp.title}
                                                </h3>
                                                <p className="text-turquoise font-medium text-sm mb-1">
                                                    {exp.company}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    {exp.period} · {exp.location}
                                                </p>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {exp.achievements.map((achievement) => {
                                                    const AchIcon = achievement.icon
                                                    return (
                                                        <div
                                                            key={achievement.metric}
                                                            className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100"
                                                        >
                                                            <AchIcon className="w-4 h-4 text-turquoise mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                <p className="font-semibold text-charcoal text-sm">
                                                                    {achievement.metric}
                                                                </p>
                                                                <p className="text-xs text-gray-400">
                                                                    {achievement.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
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
