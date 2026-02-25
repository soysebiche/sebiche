/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        turquoise: '#00A89A',
        'turquoise-dark': '#008F83',
        charcoal: '#1A1A2E',
        'charcoal-light': '#2D2D44',
        softGray: '#F8F9FC',
        accent: '#6366F1', // Indigo accent — single warm complement to turquoise
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};