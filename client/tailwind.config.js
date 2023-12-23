/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "fira-sans": ["Fira Sans", "sans-serif"],
      },
      colors: {
        "primary": "#f01b16",
        "primary-hover": "#fe0103",
      },
    },
  },
  plugins: [],
};
