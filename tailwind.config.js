/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "jost": ["Jost", "sans-serif"],
      },
      colors: {
        "AD1": "#AD1FEA",
        "466": "#4661E6",
        "373": "#373F68",
        "F2F": "#F2F4FF",
        "F7F": "#F7F8FD",
        "3A4": "#3A4374",
        "647": "#647196",
        "F49": "#F49F85",
        "62B": "#62BCFA",
        "CFD": "#CFD7FF"
      }
    },
  },
  plugins: [],
}