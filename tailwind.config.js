module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in",
      },
    },
    fontFamily: {
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
