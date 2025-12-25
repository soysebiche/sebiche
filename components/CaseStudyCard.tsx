'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface CaseStudyCardProps {
    title: string
    company: string
    period: string
    description: string
    metrics: {
        value: string
        label: string
    }[]
    href: string
    index: number
}

export default function CaseStudyCard({
    title,
    company,
    period,
    description,
    metrics,
    href,
    index,
}: CaseStudyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-turquoise mb-1">{title}</h3>
                        <p className="text-sm text-gray-600">
                            {company} | {period}
                        </p>
                    </div>
                </div>

                <p className="text-gray-700 mb-6">{description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-coral mb-1">{metric.value}</div>
                            <div className="text-xs text-gray-600">{metric.label}</div>
                        </div>
                    ))}
                </div>

                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-turquoise hover:text-coral transition font-semibold"
                >
                    Read Full Case Study
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </motion.div>
    )
}
