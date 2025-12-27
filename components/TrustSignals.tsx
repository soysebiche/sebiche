'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const companies = [
    {
  { name: 'Liverpool', logo: '/logos/liverpool.svg' },
    { name: 'Falabella', logo: '/logos/falabella.svg' },
    { name: 'Linio', logo: '/logos/linio.svg' },
]

export default function TrustSignals() {
    return (
        <section className="py-12 bg-white border-y border-gray-200">
            <div className="max-w-6xl mx-auto px-4">
                {/* Company Logos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide font-semibold">
                        Trusted by LATAM's Leading Retailers
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                        {companies.map((company, index) => (
                            <motion.div
                                key={company.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="grayscale hover:grayscale-0 transition-all duration-300"
                            >
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
