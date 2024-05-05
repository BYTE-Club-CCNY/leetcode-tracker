/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'customBG': '#EFEFEF',
        'customMain': '#1C6E8C',
        'customDark': '#274156',
        'customAccent': '#8134DF',
        'customDarkBG': '#1d1c1e',
        'customDarkAccent': '#2e2d30',
        'customDarkMain': '#00A3C4'
      },
    },
  },
  plugins: [],
};
