/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'black-03': 'rgba(0, 0, 0, 0.3)',
      },
      animation: {
        dots: 'dots 1.5s steps(4, end) infinite',
      },
      keyframes: {
        dots: {
          '0%, 100%': { content: '"..."' },
          '25%': { content: '".  "' },
          '50%': { content: '".. "' },
          '75%': { content: '"..."' },
        },
      },
    },
  },
  plugins: [],
}
