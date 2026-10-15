import Link from 'next/link'

export default function NotFound() {
    return (
        <main id="main" className="flex min-h-screen items-center bg-ground px-5 text-paper sm:px-[3.5vw]">
            <div className="max-w-xl">
                <p className="mb-6 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-copper">Error 404</p>
                <p className="font-editorial text-[clamp(8rem,15vw,15rem)] font-medium leading-[0.65] tracking-[-0.09em]" aria-hidden>
                    86
                </p>
                <h1 className="mt-12 text-[clamp(2.5rem,5vw,4.5rem)] font-[450] leading-[0.92] tracking-[-0.06em]">
                    Page Not Found
                </h1>
                <p className="mt-6 max-w-[34rem] leading-[1.65] text-muted">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    <span className="block" lang="es">La página que buscas no existe o fue movida.</span>
                </p>
                <Link
                    href="/"
                    className="mt-10 inline-flex min-h-[3.65rem] items-center bg-copper-action px-[1.45rem] py-[0.9rem] text-[0.86rem] font-[650] text-white transition-colors hover:bg-copper-hover"
                >
                    Back to Sebiche
                </Link>
            </div>
        </main>
    )
}
