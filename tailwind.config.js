/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            Poppins: ['Poppins'],
            Poppins_Bold: ['Poppins-Bold'],
            Martian: ['Martian']
        }
    },
  },
  plugins: [],
}

