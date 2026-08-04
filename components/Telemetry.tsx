'use client'

import dynamic from 'next/dynamic'
import Script from 'next/script'

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
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${googleMeasurementId}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${googleMeasurementId}');
                        `}
                    </Script>
                </>
            ) : null}
        </>
    )
}
