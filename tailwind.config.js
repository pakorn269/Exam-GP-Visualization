/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pri:  '#6C63FF',
        sec:  '#FF6584',
        ac1:  '#43B89C',
        ac2:  '#FFD700',
        ok:   '#4ade80',
        err:  '#f87171',
        card: 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        sarabun: ['Sarabun', 'sans-serif'],
      },
      spacing: {
        '13': '3.25rem',
      },
      backgroundImage: {
        'app-gradient': 'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)',
        'hero-text':    'linear-gradient(135deg,#fff,#c3b1ff,#ff9eb5)',
        'btn-gradient': 'linear-gradient(135deg,#6C63FF,#FF6584)',
      },
      animation: {
        'fade-in':    'fi 0.3s ease',
        'blink-border': 'blkB 1.5s infinite',
        'conf-fall':  'cfall linear forwards',
      },
      keyframes: {
        fi: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        blkB: {
          '0%,100%': { borderColor: 'rgba(255,255,255,.28)' },
          '50%':     { borderColor: '#6C63FF' },
        },
        cfall: {
          to: { top: '110vh', transform: 'rotateZ(720deg) translateX(90px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
