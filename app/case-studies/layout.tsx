import { ReactNode } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function CaseStudiesLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-softGray pt-20">
                {children}
            </main>
            <Footer />
        </>
    )
}
