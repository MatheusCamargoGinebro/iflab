/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      iflab_white: "#FFFFFF",
      iflab_white_dark: "#E5E5E5",
      iflab_white_light: "#F7F7F7",

      iflab_gray: "#555555",
      iflab_gray_dark: "#252525",
      iflab_gray_light: "#989898",

      iflab_green: "#224410",
      iflab_green_dark: "#1B320D",
      iflab_green_light: "#3B6C22",
    },
  },
  plugins: [],
}