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
          'charcoal': '#2D3436',

          // Semantic aliases
          primary: '#2A50DF',
          'primary-hover': '#1e3ba8',
          accent: '#1099E7',
          'accent-hover': '#0d7ac4',
          highlight: '#62D4F9',
          background: '#2D3436',

          // Legacy names (for backward compatibility)
          navy: '#2A50DF',
          orange: '#1099E7',
        },
        text: {
          primary: '#2D3436',
          secondary: 'rgba(45, 52, 54, 0.6)',
        },
        dark: {
          'bg-primary': '#0a0a0f',
          'bg-secondary': '#0d0d14',
          'bg-tertiary': '#12121a',
          'bg-elevated': '#1a1a24',
          border: '#1e1e2e',
          'border-light': '#2a2a3e',
        },
        dt: {
          primary: '#ffffff',
          secondary: '#e0e0e8',
          tertiary: '#b0b0c0',
        },
        // Theme-aware tokens for the public site (flip with html.light).
        // Admin/dashboard/chat keep the fixed dark.* / dt.* tokens above.
        surface: {
          base: 'var(--surface-base)',
          alt: 'var(--surface-alt)',
          card: 'var(--surface-card)',
          raised: 'var(--surface-raised)',
        },
        ink: {
          1: 'var(--ink-1)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        line: {
          soft: 'var(--line-soft)',
          strong: 'var(--line-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          ink: 'var(--accent-ink)',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        raleway: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out both',
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'terminal-reveal': 'terminalReveal 0.4s ease-out forwards',
      },
      keyframes: {
        terminalReveal: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      letterSpacing: {
        wide15: '0.15em',
      },
    },
  },
  plugins: [],
}
