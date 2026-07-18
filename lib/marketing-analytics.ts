'use client'

import { track } from '@vercel/analytics/react'

export function trackMarketingEvent(
    name: 'Product Viewed' | 'Product CTA Clicked' | 'Contact Form Started' | 'Contact Form Submitted' | 'Contact Fallback Used',
    properties?: Record<string, string | number | boolean>,
) {
    track(name, properties)
}
