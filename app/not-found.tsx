import Link from 'next/link'

export default function NotFound() {
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
                <Link
                    href="/"
                    className="mt-xl inline-flex min-h-[var(--button-height)] items-center bg-copper-action px-md py-sm text-sm font-button text-on-action transition-colors duration-fast hover:bg-copper-hover"
                >
                    Back to Sebiche
                </Link>
            </div>
        </main>
    )
}
