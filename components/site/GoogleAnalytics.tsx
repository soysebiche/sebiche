const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-X9SVKLLCBY'
const googleMeasurementId = configuredMeasurementId.match(/^G-[A-Z0-9]+$/)?.[0]

export default function GoogleAnalytics() {
    if (!googleMeasurementId) return null

    return (
        <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleMeasurementId}`} />
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleMeasurementId}');`,
                }}
            />
        </>
    )
}
