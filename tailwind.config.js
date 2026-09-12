/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FCD5CE',
          peach: '#FFB5A7',
          lavender: '#E8DFF5',
          yellow: '#FDF0D5',
          mint: '#D8F3DC',
          cream: '#FAF9F6',
          brown: '#5C4033',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
