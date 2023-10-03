/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0954B6",
        secondary: "#F47A00",
      },
      fontFamily: [],
      keyframes: {
        slideMenuClose: {
          from: { display: "block", position: "absolute" },
          to: { transform: "translateX(-208px)", position: "absolute" },
        },

        slideMenuOpen: {
          from: { transform: "translateX(-208px)", position: "absolute" },
          to: { display: "block", position: "absolute" },
        },

        fadeInModel: {
          from: { transform: "scale(0.90)", opacity: 0.2 },
          to: { opacity: 1 },
        },
      },
      animation: {
        slideMenuClose: "slideMenuClose  0.4s",
        slideMenuOpen: "slideMenuOpen  0.4s  ",
        fadeInModel: "fadeInModel 0.4s ",
      },
    },
  },
  plugins: [],
};
