/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customBG': '#EFEFEF',
        'customMain': '#1C6E8C',
        'customDark': '#274156',
        'customAccent': '#8134DF',
      },
    },
  },
  plugins: [],
};
