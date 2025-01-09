/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customDark: "#000101",
        comp_color: "#512da8",
        comp_hover: "#1a1f2e" 
      },
    },
  },
  plugins: [],
};