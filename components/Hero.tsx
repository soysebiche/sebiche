'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Handwritten style accent */}
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: -3 }}
              transition={{ delay: 0.3 }}
              className="inline-block"
            >
              <span className="text-coral font-handwriting text-2xl">hola! 👋</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-900">product designer.</span>
              <br />
              <span className="text-gray-900">born in</span>
              <br />
              <span className="relative inline-block">
                <span className="text-gray-900">perú</span>
                <span className="text-4xl ml-2">🇵🇪</span>
              </span>
              <span className="text-gray-900">,</span>
              <br />
              <span className="text-blue-600">raised in eCommerce,</span>
              <br />
              <span className="text-gray-900">based in</span>
              <br />
              <span className="relative">
                <span className="bg-yellow-300 px-3 py-1 inline-block transform -rotate-1">
                  digital experiences
                </span>
              </span>
              <span className="text-gray-900">.</span>
            </h1>

            {/* Subtext with personality */}
            <p className="text-xl text-gray-700 max-w-lg">
              loves transforming{' '}
              <span className="relative inline-block">
                <span className="text-purple-600 font-semibold">user frustration</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                  <path d="M0,2 Q25,0 50,2 T100,2" stroke="currentColor" strokeWidth="2" fill="none" className="text-purple-400" />
                </svg>
              </span>
              {' '}into{' '}
              <span className="relative inline-block">
                <span className="text-turquoise font-semibold">revenue growth</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                  <path d="M0,2 Q25,0 50,2 T100,2" stroke="currentColor" strokeWidth="2" fill="none" className="text-turquoise" />
                </svg>
              </span>
              {' '}📈 and drinking{' '}
              <span className="inline-block">boba 🧋</span>
            </p>

            {/* Fun stats */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-purple-200"
              >
                <span className="text-2xl mr-2">📚</span>
                <span className="font-semibold text-gray-800">131 books</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-turquoise"
              >
                <span className="text-2xl mr-2">💼</span>
                <span className="font-semibold text-gray-800">9+ years</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-coral"
              >
                <span className="text-2xl mr-2">📈</span>
                <span className="font-semibold text-gray-800">125% growth</span>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="pt-8"
            >
              <p className="text-sm text-gray-500 flex items-center gap-2">
                scroll to explore
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Image & About */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/sebastian.webp"
                  alt="Sebastian Napuri"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                  priority
                />
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 bg-yellow-300 text-4xl p-3 rounded-full shadow-lg transform rotate-12">
                  ✨
                </div>
              </motion.div>
            </div>

            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>👋</span> nice to meet you!
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <span>Based in <strong>Dallas, TX</strong></span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">🐴</span>
                  <span>Currently at <strong className="text-purple-600">SMU</strong> (MADI program)</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Passionate about <strong>UX, data, and business impact</strong></span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-2xl">🚀</span>
                  <span>Transformed experiences for <strong className="text-turquoise">Linio</strong>, <strong className="text-purple-600">Falabella</strong> & <strong className="text-coral">Liverpool</strong></span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 mt-6">
                <a
                  href="#projects"
                  className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all hover:scale-105"
                >
                  View Work 🎨
                </a>
                <a
                  href="#contact"
                  className="flex-1 text-center px-6 py-3 bg-white border-2 border-purple-500 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all hover:scale-105"
                >
                  Say Hi 👋
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}