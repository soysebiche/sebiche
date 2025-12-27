'use client'
import { motion } from 'framer-motion'

const metrics = [
    {
        icon: '📈',
        value: '125%',
        label: 'sales growth',
        sublabel: 'yoy at falabella',
        gradient: 'from-green-400 to-emerald-500',
        borderColor: 'border-green-300'
    },
    {
        icon: '🛍️',
        value: '100+',
        label: 'sellers onboarded',
        sublabel: 'liverpool marketplace',
        gradient: 'from-purple-400 to-pink-500',
        borderColor: 'border-purple-300'
    },
    {
        icon: '⚡',
        value: '50%',
        label: 'faster onboarding',
        sublabel: 'through automation',
        gradient: 'from-yellow-400 to-orange-500',
        borderColor: 'border-orange-300'
    },
    {
        icon: '🌎',
        value: '5',
        label: 'countries',
        sublabel: 'latam expansion',
        gradient: 'from-blue-400 to-cyan-500',
        borderColor: 'border-blue-300'
    },
    {
        icon: '✅',
        value: '98%',
        label: 'fulfillment rate',
        sublabel: 'catalog optimization',
        gradient: 'from-teal-400 to-green-500',
        borderColor: 'border-teal-300'
    },
    {
        icon: '📊',
        value: '40%',
        label: 'efficiency gain',
        sublabel: 'seller dashboards',
        gradient: 'from-indigo-400 to-purple-500',
        borderColor: 'border-indigo-300'
    }
]

export default function ImpactMetrics() {
    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="text-4xl mr-3">🚀</span>
                        impact metrics
                    </h2>
                    <p className="text-xl text-gray-600">
                        measurable results across latam's largest retailers
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                        >
                            <div className={`
                bg-white rounded-2xl p-8 shadow-xl
                border-2 ${metric.borderColor}
                h-full
                flex flex-col items-center text-center
              `}>
                                {/* Icon */}
                                <div className="text-5xl mb-4">
                                    {metric.icon}
                                </div>

                                {/* Value */}
                                <div className={`
                  text-5xl font-bold mb-2
                  bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent
                `}>
                                    {metric.value}
                                </div>

                                {/* Label */}
                                <div className="text-xl font-semibold text-gray-900 mb-1">
                                    {metric.label}
                                </div>

                                {/* Sublabel */}
                                <div className="text-sm text-gray-600">
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
