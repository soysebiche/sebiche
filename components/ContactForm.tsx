'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Replace with your actual Formspree endpoint
      // Get your endpoint from https://formspree.io/
      // Example: https://formspree.io/f/YOUR_FORM_ID
      const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        setIsError(false)

        // Trigger confetti animation
        if (typeof window !== 'undefined' && window.confetti) {
          window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          })
        }

        reset()
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        setIsError(true)
        setIsSuccess(false)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setIsError(true)
      setIsSuccess(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      id="contact"
      className="py-16 px-4 bg-charcoal text-white"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Let's Transform Your eCommerce</h2>
        <p className="text-center text-gray-300 mb-8">
          Ready to achieve measurable results? Let's discuss your marketplace challenges.
        </p>

        <AnimatePresence mode="wait">
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-start gap-3"
            >
              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm text-gray-300">I'll respond within 24 hours.</p>
              </div>
            </motion.div>
          )}

          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-start gap-3"
            >
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div>
                <p className="font-semibold">Something went wrong</p>
                <p className="text-sm text-gray-300">Please try again or email me directly at contact@example.com</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name *
            </label>
            <input
              id="name"
              {...register('name')}
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition ${errors.name ? 'ring-2 ring-red-500' : 'focus:ring-turquoise'
                }`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Your Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john@example.com"
              className={`w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition ${errors.email ? 'ring-2 ring-red-500' : 'focus:ring-turquoise'
                }`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Tell me about your eCommerce challenge *
            </label>
            <textarea
              id="message"
              {...register('message')}
              placeholder="I'm looking to improve our marketplace conversion rate..."
              rows={5}
              className={`w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 transition resize-none ${errors.message ? 'ring-2 ring-red-500' : 'focus:ring-turquoise'
                }`}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-turquoise text-white font-semibold rounded-full hover:bg-coral transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Send message"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          <p className="text-sm text-gray-400 text-center">
            * Required fields. Your information will be kept confidential.
          </p>
        </form>
      </div>
    </motion.section>
  )
}

declare global {
  interface Window {
    confetti: any
  }
}