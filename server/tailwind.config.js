

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs,css}","./public/**/*.{html,js,ejs,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui") , require('@tailwindcss/typography'),],
  daisyui: {
    themes: ["light", "dark", "dracula"],
  },
}