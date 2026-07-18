'use client'

import dynamic from 'next/dynamic'

const Analytics = dynamic(
    () => import('@vercel/analytics/react').then((module) => module.Analytics),
    { ssr: false },
)

const SpeedInsights = dynamic(
    () => import('@vercel/speed-insights/next').then((module) => module.SpeedInsights),
    { ssr: false },
)

export default function Telemetry({ enabled }: { enabled: boolean }) {
    if (!enabled) return null

    return (
        <>
            <Analytics />
            <SpeedInsights />
        </>
    )
}
