/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px',
      },
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}