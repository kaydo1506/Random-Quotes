/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-color': '#87b5b5',
        'inner-color': '#c0d8d8',
        'header-color': '#4aa3a3',
      },
      border: {
        'custom-border': '1px solid #1d2f2f',
      },
      boxShadow: {
        'custom-boxShadow': '1px 1px 10px 2px #3a5f5f',
      },
    },
  },
  plugins: [],
};
