import './globals.css'
import type { Metadata } from 'next'
import NotFoundContent from '../components/site/NotFoundContent'
import { fontVariables } from '../lib/fonts'
import tokens from '../brand/tokens.flat.json'

// URLs that match no route at all (the root layout lives under app/[lang], so there is no layout
// to render them in).
export const metadata: Metadata = {
    title: 'Page Not Found | Sebiche',
    robots: { index: false },
}

export default function GlobalNotFound() {
    return (
        <html lang="en-US" className={fontVariables}>
            <head>
                <meta name="theme-color" content={tokens.color.ground} />
            </head>
            <body>
                <NotFoundContent />
            </body>
        </html>
    )
}
