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
        pop: {
          coral: '#FF6B6B',
          purple: '#7C4DFF',
          teal: '#2EC4B6',
          lemon: '#FFD166',
          mint: '#B8F2E6',
          peach: '#FFB4A2',
          ink: '#2D3142',
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
      boxShadow: {
        pop: '4px 4px 0 0 #2D3142',
        'pop-sm': '2px 2px 0 0 #2D3142',
      },
    },
  },
  plugins: [],
}
