/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: { DEFAULT: '#FFD600', 400: '#FFE033', 500: '#FFD600', 600: '#F5CB00' },
        orange: { DEFAULT: '#FF6B00', 500: '#FF6B00' },
        gas: {
          bg: '#0A0A0A', surface: '#141414', card: '#1C1C1C', card2: '#242424',
          border: '#2E2E2E', border2: '#383838',
          text: '#FAFAFA', text2: '#D4D4D4', muted: '#888888', muted2: '#555555',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #FFD600, #FF6B00)',
        'grad-hero': 'radial-gradient(ellipse at 50% -10%, rgba(255,214,0,0.12) 0%, transparent 65%)',
      },
      boxShadow: {
        'yellow': '0 0 0 1px #FFD600, 0 8px 24px rgba(255,214,0,0.2)',
        'yellow-glow': '0 4px 20px rgba(255,214,0,0.4)',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}
