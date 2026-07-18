'use client'

type AnalyticsWindow = Window & {
    va?: (...parameters: unknown[]) => void
    vaq?: unknown[][]
}

export function trackMarketingEvent(
    name: 'Product Viewed' | 'Product CTA Clicked' | 'Contact CTA Clicked' | 'Contact Form Started' | 'Contact Form Submitted' | 'Contact Fallback Used',
    properties?: Record<string, string | number | boolean>,
) {
    if (typeof window === 'undefined') return

    const analyticsWindow = window as AnalyticsWindow
    if (!analyticsWindow.va) {
        analyticsWindow.va = (...parameters: unknown[]) => {
            analyticsWindow.vaq = analyticsWindow.vaq ?? []
            analyticsWindow.vaq.push(parameters)
        }
    }

    analyticsWindow.va('event', { name, data: properties })
}
