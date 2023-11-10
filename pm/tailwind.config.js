/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        "pulse":{
          "0%":"scale(100%)",
          "50%":"scale(125%)",
          "100%":"scale(100%)"
        }
      },
      animation:{
        "pulse":"pulse 1s infinite"
      },
      
    },
  },
  plugins: [],
}