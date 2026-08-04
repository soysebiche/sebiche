'use client'

type AnalyticsWindow = Window & {
    dataLayer?: unknown[][]
    gtag?: (...parameters: unknown[]) => void
    va?: (...parameters: unknown[]) => void
    vaq?: unknown[][]
}

const googleEventNames = {
    'Product Viewed': 'product_viewed',
    'Product CTA Clicked': 'product_cta_clicked',
    'Contact CTA Clicked': 'contact_cta_clicked',
    'Contact Form Started': 'contact_form_started',
    'Contact Form Submitted': 'generate_lead',
    'Contact Fallback Used': 'contact_fallback_used',
} as const

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

    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
    if (!analyticsWindow.gtag) {
        analyticsWindow.gtag = (...parameters: unknown[]) => {
            analyticsWindow.dataLayer?.push(parameters)
        }
    }

    analyticsWindow.gtag('event', googleEventNames[name], properties ?? {})
}
