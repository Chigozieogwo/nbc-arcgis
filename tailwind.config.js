/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    }
  },
  plugins: [require('daisyui'),require('flowbite/plugin.js')],
}

