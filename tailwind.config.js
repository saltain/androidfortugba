/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#0A0E27',
        'brand-text': '#FAFAF8',
        'brand-accent': '#1A1A1A',
      },
      fontFamily: {
        serif: ['PlayfairDisplay', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
