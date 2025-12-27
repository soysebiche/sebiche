'use client'
import { motion } from 'framer-motion'

const metrics = [
    {
        value: '125%',
        label: 'sales growth',
        sublabel: 'year-over-year',
        icon: '📈',
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        value: '100+',
        label: 'sellers onboarded',
        sublabel: 'cross-border marketplace',
        icon: '🛍️',
        gradient: 'from-turquoise to-teal-500'
    },
    {
        value: '50%',
        label: 'faster onboarding',
        sublabel: 'automation \u0026 ux',
        icon: '⚡',
        gradient: 'from-yellow-400 to-orange-500'
    },
    {
        value: '24%',
        label: 'engagement boost',
        sublabel: 'dashboard redesign',
        icon: '🎯',
        gradient: 'from-coral to-red-500'
    },
    {
        value: '5',
        label: 'countries',
        sublabel: 'latam expansion',
        icon: '🌎',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        value: '98%',
        label: 'fulfillment rate',
        sublabel: 'logistics optimization',
        icon: '📦',
        gradient: 'from-green-500 to-emerald-500'
    }
]

export default function ImpactMetrics() {
    return (
        <section className="py-20 bg-gradient-to-br from-charcoal via-gray-900 to-charcoal text-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-turquoise rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-coral rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-turquoise bg-clip-text text-transparent">
                        <span className="text-4xl mr-3">🚀</span>
                        impact metrics
                    </h2>
                    <p className="text-xl text-gray-300">
                        real results, real impact
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative group"
                        >
                            <div className={`
                bg-gradient-to-br ${metric.gradient}
                rounded-2xl p-8 shadow-2xl
                border-2 border-white/20
                backdrop-blur-sm
                h-full
              `}>
                                {/* Icon */}
                                <div className="text-5xl mb-4">
                                    {metric.icon}
                                </div>

                                {/* Value */}
                                <div className="text-5xl md:text-6xl font-bold mb-2 text-white">
                                    {metric.value}
                                </div>

                                {/* Label */}
                                <div className="text-xl font-semibold text-white mb-1">
                                    {metric.label}
                                </div>

                                {/* Sublabel */}
                                <div className="text-sm text-white/80">
                                    {metric.sublabel}
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-gray-400 italic">
                        💡 data-driven design that delivers measurable business outcomes
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
