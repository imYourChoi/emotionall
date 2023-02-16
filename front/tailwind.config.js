/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "14px"],
      sm: ["14px", "17px"],
      base: ["16px", "19px"],
      lg: ["20px", "24px"],
      xl: ["24px", "29px"],
    },
    extend: {
      colors: {
        positive: "#2998FF",
        "positive-blend": "#D3EAFF",
        neutral: "#929292",
        "neutral-blend": "#DADADA",
        ambiguous: "#FF7A00",
        "ambiguous-blend": "#FFE68E",
        negative: "#FF5252",
        "negative-blend": "#FFCACA",
        white: "#FFFFFF",
        black: {
          100: "#F0F0F0",
          200: "#D0D0D0",
          300: "#B3B3B3",
          400: "#7D7D7D",
          500: "#4F4F4F",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
