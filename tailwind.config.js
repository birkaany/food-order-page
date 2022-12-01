/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/app.js"],

  theme: {
    extend: {
      colors: {
        "th-green-800": "#00240F",
        "th-green-400": "#05A84B",
        "th-red-500": "#EC0000",
      },
      fontFamily: {
        mainFont: ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
