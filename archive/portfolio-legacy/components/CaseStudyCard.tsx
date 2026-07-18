'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface CaseStudyCardProps {
    title: string
    company: string
    period: string
    description: string
    href: string
    image: string
    index: number
}

export default function CaseStudyCard({
    title,
    company,
    period,
    description,
    href,
    image,
    index,
}: CaseStudyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -4 }}
            className="transition-all duration-200"
        >
            <Link href={href} className="block group">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-turquoise/50 transition-colors">
                    <div className="aspect-[16/9] relative bg-softGray overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                    <div className="p-6">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                            {company} · {period}
                        </p>
                        <h3 className="text-lg font-bold text-charcoal mb-2 group-hover:text-turquoise transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">{description}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-turquoise">
                            Read case study
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
