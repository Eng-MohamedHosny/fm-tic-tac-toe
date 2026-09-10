/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: '#1A2A33',
          semi: '#1F3641',
          shadow: '#10212A',
        },
        teal: {
          DEFAULT: '#31C3BD',
          hover: '#65E9E4',
          shadow: '#118C87',
        },
        yellow: {
          DEFAULT: '#F2B137',
          hover: '#FFC860',
          shadow: '#CC8B13',
        },
        silver: {
          DEFAULT: '#A8BFC9',
          hover: '#DBE8ED',
          shadow: '#6B8997',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        // 3D keycap bevel effects matching Figma
        'tile': 'inset 0 -8px 0 0 #10212A',
        'tile-sm': 'inset 0 -4px 0 0 #10212A',
        'btn-yellow': 'inset 0 -8px 0 0 #CC8B13',
        'btn-yellow-sm': 'inset 0 -4px 0 0 #CC8B13',
        'btn-teal': 'inset 0 -8px 0 0 #118C87',
        'btn-teal-sm': 'inset 0 -4px 0 0 #118C87',
        'btn-silver-sm': 'inset 0 -4px 0 0 #6B8997',
        'turn-pill': 'inset 0 -4px 0 0 #10212A',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        popIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        popIn: 'popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
