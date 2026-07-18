'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react'

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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl p-6 md:p-8 border border-gray-200"
    >
      <AnimatePresence mode="wait">
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-800 text-sm">Message sent successfully!</p>
              <p className="text-xs text-emerald-600">I'll respond within 24 hours.</p>
            </div>
          </motion.div>
        )}

        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800 text-sm">Something went wrong</p>
              <p className="text-xs text-red-600">Please try again or email me directly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-charcoal">
            Your Name *
          </label>
          <input
            id="name"
            {...register('name')}
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-lg bg-softGray text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 transition text-sm ${errors.name ? 'ring-2 ring-red-400' : 'focus:ring-turquoise'
              }`}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-charcoal">
            Your Email *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className={`w-full px-4 py-3 rounded-lg bg-softGray text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 transition text-sm ${errors.email ? 'ring-2 ring-red-400' : 'focus:ring-turquoise'
              }`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-charcoal">
            Tell me about your eCommerce challenge *
          </label>
          <textarea
            id="message"
            {...register('message')}
            placeholder="I'm looking to improve our marketplace conversion rate..."
            rows={4}
            className={`w-full px-4 py-3 rounded-lg bg-softGray text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 transition resize-none text-sm ${errors.message ? 'ring-2 ring-red-400' : 'focus:ring-turquoise'
              }`}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-charcoal text-white font-medium rounded-lg hover:bg-charcoal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          aria-label="Send message"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          * Required fields. Your information will be kept confidential.
        </p>
      </div>
    </motion.form>
  )
}
