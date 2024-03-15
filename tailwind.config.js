/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'dark': {'raw': '(prefers-color-scheme: light)'},
        // => @media (prefers-color-scheme: dark) { ... }
      }
    },
  },
  plugins: [],
}

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// module.exports = {

//   plugins: [
//       require('flowbite/plugin')
//   ]

// }

// module.exports = {

//   content: [
//       // ...
//       'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
//   ]

// }
