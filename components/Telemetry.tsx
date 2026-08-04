'use client'

import dynamic from 'next/dynamic'
import Script from 'next/script'
import { useEffect } from 'react'

const Analytics = dynamic(
    () => import('@vercel/analytics/react').then((module) => module.Analytics),
    { ssr: false },
)

const SpeedInsights = dynamic(
    () => import('@vercel/speed-insights/next').then((module) => module.SpeedInsights),
    { ssr: false },
)

type TelemetryProps = {
    googleMeasurementId?: string
    vercelEnabled: boolean
}

export default function Telemetry({ googleMeasurementId, vercelEnabled }: TelemetryProps) {
    useEffect(() => {
        if (!googleMeasurementId) return

        const analyticsWindow = window as Window & {
            dataLayer?: unknown[][]
            gtag?: (...parameters: unknown[]) => void
        }

        analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
        analyticsWindow.gtag = analyticsWindow.gtag ?? ((...parameters: unknown[]) => {
            analyticsWindow.dataLayer?.push(parameters)
        })
        analyticsWindow.gtag('js', new Date())
        analyticsWindow.gtag('config', googleMeasurementId)
    }, [googleMeasurementId])

    if (!vercelEnabled && !googleMeasurementId) return null

    return (
        <>
            {vercelEnabled ? (
                <>
                    <Analytics />
                    <SpeedInsights />
                </>
            ) : null}
            {googleMeasurementId ? (
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${googleMeasurementId}`}
                    strategy="afterInteractive"
                />
            ) : null}
        </>
    )
}
