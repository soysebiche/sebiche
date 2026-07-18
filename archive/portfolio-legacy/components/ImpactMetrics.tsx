'use client'
import { motion } from 'framer-motion'
import { TrendingUp, ShoppingBag, Zap, Globe, CheckCircle, BarChart3 } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

const metrics: { icon: LucideIcon; value: string; label: string; sublabel: string }[] = [
    { icon: TrendingUp, value: '125%', label: 'Sales Growth', sublabel: 'YoY at Falabella' },
    { icon: ShoppingBag, value: '100+', label: 'Sellers Onboarded', sublabel: 'Liverpool Marketplace' },
    { icon: Zap, value: '50%', label: 'Faster Onboarding', sublabel: 'Through automation' },
    { icon: Globe, value: '5', label: 'Countries', sublabel: 'LATAM expansion' },
    { icon: CheckCircle, value: '98%', label: 'Fulfillment Rate', sublabel: 'Catalog optimization' },
    { icon: BarChart3, value: '40%', label: 'Efficiency Gain', sublabel: 'Seller dashboards' },
]

export default function ImpactMetrics() {
    return (
        <section className="py-16 bg-softGray">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-charcoal">
                        Impact Metrics
                    </h2>
                    <p className="text-gray-500">
                        Measurable results across LATAM's largest retailers
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon
                        return (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                whileHover={{ y: -3 }}
                                className="transition-all duration-200"
                            >
                                <div className="bg-white rounded-xl p-6 border border-gray-100 h-full flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-lg bg-turquoise/10 flex items-center justify-center mb-3">
                                        <Icon className="w-5 h-5 text-turquoise" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-charcoal mb-1">
                                        {metric.value}
                                    </div>
                                    <div className="text-sm font-semibold text-charcoal mb-0.5">
                                        {metric.label}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {metric.sublabel}
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
