'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const companies = [
    { name: 'Liverpool', logo: '/logos/liverpool-real.svg' },
    { name: 'Falabella', logo: '/logos/falaaa.svg' },
    { name: 'Linio', logo: '/logos/linio-real.svg' },
]

export default function TrustSignals() {
    return (
        <section className="py-8 bg-white border-y border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-xs text-gray-400 mb-6 uppercase tracking-[0.2em] font-medium">
                        Trusted by LATAM's leading retailers
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
                        {companies.map((company, index) => (
                            <motion.div
                                key={company.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="opacity-40 hover:opacity-100 transition-opacity duration-300"
                            >
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={120}
                                    height={40}
                                    className="h-8 w-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
