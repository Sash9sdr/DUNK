/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        menu: {
          bg: '#0a0a0a',        /* Very dark, almost black */
          card: '#121212',      /* Slightly lighter for cards */
          surface: '#1f1f1f',   /* Interaction surfaces */
          border: '#2a2a2a',    /* Subtle borders */
          text: '#ededed',      /* High contrast text */
          muted: '#888888',     /* Secondary text */
          accent: '#ffffff',    /* Monochrome accent (white) */
          // DYNAMIC COLOR: Uses the CSS variable --highlight-rgb
          // This allows opacity modifiers: bg-menu-highlight/20
          highlight: 'rgb(var(--highlight-rgb) / <alpha-value>)', 
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: [],
}