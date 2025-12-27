'use client'
import { motion } from 'framer-motion'

const metrics = [
    {
        icon: '📈',
        value: '125%',
        label: 'sales growth',
        sublabel: 'yoy at falabella',
        gradient: 'from-green-400 to-emerald-500'
    },
    {
        icon: '🛍️',
        value: '100+',
        label: 'sellers onboarded',
        sublabel: 'liverpool marketplace',
        gradient: 'from-purple-400 to-pink-500'
    },
    {
        icon: '⚡',
        value: '50%',
        label: 'faster onboarding',
        sublabel: 'through automation',
        gradient: 'from-yellow-400 to-orange-500'
    },
    {
        icon: '🌎',
        value: '5',
        label: 'countries',
        sublabel: 'latam expansion',
        gradient: 'from-blue-400 to-cyan-500'
    },
    {
        icon: '✅',
        value: '98%',
        label: 'fulfillment rate',
        sublabel: 'catalog optimization',
        gradient: 'from-teal-400 to-green-500'
    },
    {
        icon: '📊',
        value: '40%',
        label: 'efficiency gain',
        sublabel: 'seller dashboards',
        gradient: 'from-indigo-400 to-purple-500'
    }
]

export default function ImpactMetrics() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-turquoise rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                        <span className="text-4xl mr-3">🚀</span>
                        impact metrics
                    </h2>
                    <p className="text-xl text-gray-300">
                        measurable results across latam's largest retailers
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                        >
                            <div className={`
                bg-gradient-to-br ${metric.gradient}
                rounded-2xl p-8 shadow-2xl
                border-2 border-white/20
                backdrop-blur-sm
                h-full
                flex flex-col items-center text-center
              `}>
                                {/* Icon */}
                                <div className="text-5xl mb-4">
                                    {metric.icon}
                                </div>

                                {/* Value */}
                                <div className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                    {metric.value}
                                </div>

                                {/* Label */}
                                <div className="text-xl font-semibold text-white mb-1 drop-shadow">
                                    {metric.label}
                                </div>

                                {/* Sublabel */}
                                <div className="text-sm text-white/90">
                                    {metric.sublabel}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
