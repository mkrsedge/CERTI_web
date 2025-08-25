/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Neue Machina', 'Inter', 'sans-serif'],
      },
      colors: {
        // Website brand colors
        'brand': {
          primary: '#ffedaca',    // Light cream/beige
          secondary: '#3e2723',   // Dark brown
        },
        // Color variants for different use cases
        'cream': {
          50: '#ffedaca',
          100: '#ffe8b3',
          200: '#ffe3c0',
          300: '#ffdecd',
          400: '#ffd9da',
          500: '#ffedaca',
          600: '#f5e2a0',
          700: '#ebd794',
          800: '#e1cc88',
          900: '#d7c17c',
        },
        'brown': {
          50: '#8b6b68',
          100: '#7a5d5a',
          200: '#694f4c',
          300: '#58413e',
          400: '#473330',
          500: '#3e2723',
          600: '#351f1b',
          700: '#2c1713',
          800: '#230f0b',
          900: '#1a0703',
        }
      }
    },
  },
  plugins: [],
}
