/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Mono"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cinder: {
          light: '#f6f6f9',
          DEFAULT: '#898ca7',
          dark: '#18181f',
        },
        mint: {
          50: '#eeffef',
          100: '#d8ffdd',
          200: '#a4ffaf',
          300: '#78fd8a',
          400: '#36f250',
          500: '#0cdb29',
          600: '#03b61c',
          700: '#078e1a',
          800: '#0b701a',
          900: '#0c5b19',
          950: '#003309',
        },
        mercury: {
          light: '#e6e5e4',
          dark: '#262424',
        },
        sea: {
          light: '#f6f6f9',
          dark: '#25232c',
        },
      },
    },
  },
  plugins: [],
}
