/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FCFCFB',
        dartmouth: {
          green: '#00693E',
          'green-dark': '#005030',
          'green-light': '#E8F5EE',
        },
      },
      fontFamily: {
        sans: [
          'Karla',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'Monaco',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
