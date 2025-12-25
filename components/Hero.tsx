'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-turquoise to-coral text-white text-center px-4 pt-24 sm:pt-0 relative overflow-hidden"
    >
      {/* Subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-turquoise/20 to-coral/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      <div className="space-y-6 relative z-10 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold tracking-tight text-balance"
        >
          Transforming User Experience into Measurable Revenue Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl font-inter max-w-3xl mx-auto"
        >
          9+ years driving eCommerce success | 125% sales increase | 78% conversion boost
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm sm:text-base text-white/90 font-medium"
        >
          ⚡ Accepting 3 strategic projects per quarter
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center mx-auto pt-4"
        >
          <a
            href="#experience"
            className="inline-block px-8 py-3 bg-white text-turquoise font-semibold rounded-full hover:bg-coral hover:text-white transition-all duration-300 hover:scale-105 shadow-lg"
            aria-label="Explore Sebastian's work experience"
          >
            View Case Studies
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-coral transition-all duration-300 hover:scale-105"
            aria-label="Contact Sebastian"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}