/** @type {import('tailwindcss').Config} */
// Sebiche brand tokens — mirror of the Sebiche design system (tokens.json) and app/globals.css
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ground: '#090909',
        surface: '#10100f',
        paper: '#f1eee7',
        muted: '#9e9a92',
        soft: '#d3cfc8',
        rule: 'rgba(241, 238, 231, 0.22)',
        copper: {
          DEFAULT: '#cf6330',
          action: '#a94721',
          hover: '#933e1d',
          light: '#e38251',
        },
        focus: '#bd5727',
        violet: '#9a76c5',
        orange: '#dd713d',
        olive: '#9ca66a',
        'on-accent': '#100f0e',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'serif'],
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
};
