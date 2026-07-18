import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <main id="main" className="min-h-screen flex items-center justify-center bg-softGray px-4">
            <div className="text-center max-w-md">
                <p className="text-7xl font-bold text-charcoal mb-4">404</p>
                <h1 className="text-2xl font-bold text-charcoal mb-3">
                    Page Not Found
                </h1>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white font-medium rounded-lg hover:bg-charcoal-light transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </main>
    )
}
