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
          // Brand colors from Fiverr guide
          'royal-blue': '#2A50DF',
          'medium-blue': '#1099E7',
          'light-blue': '#62D4F9',

          // Semantic aliases
          primary: '#2A50DF',
          'primary-hover': '#1e3ba8',
          accent: '#1099E7',
          'accent-hover': '#0d7ac4',
          highlight: '#62D4F9',

          // Legacy names (for backward compatibility)
          navy: '#2A50DF',
          orange: '#1099E7',
        },
        text: {
          primary: '#2D3436',
          secondary: 'rgba(45, 52, 54, 0.6)',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
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
