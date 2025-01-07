/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      iflab_white: "#FFFFFF",
      iflab_white_dark: "#E5E5E5",
      iflab_white_light: "#ededed",

      iflab_gray: "#555555",
      iflab_gray_dark: "#252525",
      iflab_gray_light: "#989898",
      iflab_gray_medium: "#B3B3B3",

      iflab_green: "#224410",
      iflab_green_dark: "#1B320D",
      iflab_green_light: "#3B6C22",

      iflab_red: "#FF4C4C",
      iflab_red_dark: "#CC3A3A",
      iflab_red_light: "#FF9999",

      iflab_yellow: "#FFD700",

      iflab_blue: "#0000FF",
    },
    screens: {
      xs: "0" /* white */,
      sm: "640px" /* red */,
      md: "1024px" /* yellow */,
      lg: "1280px" /* green */,
      xl: "1780px" /* blue */,
    },
  },
  plugins: [],
};
