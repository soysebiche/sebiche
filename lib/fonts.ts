import { Cormorant_Garamond, Manrope } from 'next/font/google'

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-editorial',
    display: 'swap',
    weight: ['400', '500', '600'],
})

export const fontVariables = `${manrope.variable} ${cormorant.variable}`
