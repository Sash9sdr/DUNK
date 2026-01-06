
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        menu: {
          bg: '#0a0a0a',
          card: '#121212',
          surface: '#1f1f1f',
          border: '#2a2a2a',
          text: '#ededed',
          muted: '#888888',
          accent: '#ffffff',
          highlight: 'rgb(var(--highlight-rgb) / <alpha-value>)', 
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
