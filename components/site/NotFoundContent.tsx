import Link from 'next/link'

// 404 body, in both languages: a not-found page cannot tell which language the visitor reads.
export default function NotFoundContent() {
    return (
        <main id="main" className="flex min-h-screen items-center bg-ground px-gutter-sm text-paper sm:px-gutter">
            <div className="max-w-xl">
                <p className="mb-md text-label font-bold uppercase tracking-label text-copper">Error 404</p>
                <p className="font-editorial text-numeral-86 font-medium leading-numeral tracking-numeral" aria-hidden>
                    86
                </p>
                <h1 className="mt-xl text-display-m font-display leading-display tracking-display">
                    Page Not Found
                </h1>
                <p className="mt-md max-w-[34rem] leading-body text-muted">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    <span className="block" lang="es">La página que buscas no existe o fue movida.</span>
                </p>
                <div className="mt-xl flex flex-wrap gap-sm">
                    <Link
                        href="/en"
                        className="inline-flex min-h-[var(--button-height)] items-center bg-copper-action px-md py-sm text-sm font-button text-on-action transition-colors duration-fast hover:bg-copper-hover"
                    >
                        Back to Sebiche
                    </Link>
                    <Link
                        href="/es"
                        lang="es"
                        className="inline-flex min-h-[var(--button-height)] items-center border border-rule px-md py-sm text-sm font-button text-paper transition-colors duration-fast hover:border-paper"
                    >
                        Volver a Sebiche
                    </Link>
                </div>
            </div>
        </main>
    )
}
