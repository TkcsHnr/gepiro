/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      flexGrow: {
        2: '2',
        3: '3',
        5: '5'
      }
    }
  },
  plugins: [require("daisyui")],
}

