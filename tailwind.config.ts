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
        brand: {
          navy: '#1E3A5F',
          'navy-light': '#25466F',
          'navy-lighter': '#2B5280',
          orange: '#FF6B35',
          sage: '#8FBC8F',
        },
        text: {
          primary: '#2D3436',
          secondary: 'rgba(45, 52, 54, 0.6)',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      letterSpacing: {
        wide15: '0.15em',
      },
    },
  },
  plugins: [],
}
