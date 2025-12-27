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
        turquoise: '#00A89A', // Improved contrast for WCAG AA compliance
        coral: '#FF6F61',
        charcoal: '#333333',
        softGray: '#F7F7F7',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
    },
  },
},
  plugins: [],
};