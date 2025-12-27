'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const companies = [
    {
        name: 'Linio',
        logo: '/logos/linio-real.svg',
        metric: '125% Sales Increase',
    },
    {
        name: 'Falabella',
        logo: '/logos/falaaa.svg',
        metric: 'Marketplace Growth',
    },
    {
        name: 'Liverpool',
        logo: '/logos/liverpool-real.svg',
        metric: '100+ Sellers Onboarded',
    },
]

const metrics = [
    { value: '9+', label: 'Years Experience' },
    { value: '125%', label: 'Sales Increase' },
    { value: '100+', label: 'Sellers Onboarded' },
]

export default function TrustSignals() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm text-gray-600 mb-8 text-center font-medium"
                >
                    Trusted by leading eCommerce companies
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center items-center gap-12 mb-12 flex-wrap"
                >
                    {companies.map((company, index) => (
                        <motion.div
                            key={company.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                width={120}
                                height={60}
                                className="grayscale hover:grayscale-0 transition-all duration-300 object-contain"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl font-bold text-turquoise mb-2 font-montserrat">
                                {metric.value}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
