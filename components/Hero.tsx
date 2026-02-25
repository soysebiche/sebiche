'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, GraduationCap, Target, Rocket } from 'lucide-react'

export default function Hero() {
  return (
    <section className="flex items-center bg-softGray px-4 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-charcoal">
              Turning User Frustration Into{' '}
              <span className="text-turquoise">Revenue Growth</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-md leading-relaxed">
              Product designer with 10+ years transforming eCommerce experiences across Latin America's largest retailers.
            </p>

            <div className="flex gap-4 pt-1">
              <a
                href="#projects"
                className="px-7 py-3.5 bg-charcoal text-white font-semibold rounded-lg hover:bg-charcoal-light transition-colors text-sm"
              >
                View Case Studies
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 bg-white border border-gray-300 text-charcoal font-semibold rounded-lg hover:border-turquoise hover:text-turquoise transition-colors text-sm"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/sebastian.webp"
                alt="Sebastian Napuri"
                width={600}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-5 border border-gray-200"
            >
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
                <p className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-turquoise flex-shrink-0" />
                  <span>Dallas, TX</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-turquoise flex-shrink-0" />
                  <span>SMU MADI</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-turquoise flex-shrink-0" />
                  <span>UX & Data</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Rocket className="w-4 h-4 text-turquoise flex-shrink-0" />
                  <span>Linio, Falabella, Liverpool</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
