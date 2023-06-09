/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          1: "#4529E6",
          2: "#5126EA",
          3: "#B0A6F0",
          4: "#EDEAFD",
        },
        grey: {
          0: "#0B0D0D",
          1: "#212529",
          2: "#495057",
          3: "#868E96",
          4: "#ADB5BD",
          5: "#CED4DA",
          6: "#DEE2E6",
          7: "#E9ECEF",
          8: "#F1F3F5",
          9: "#F8F9FA",
          10: "#FDFDFD",
          whiteFixed: "#FFFFFF",
        },
        alert: {
          1: "#CD2B31",
          2: "#FDD8D8",
          3: "#FFE5E5",
        },
        sucess: {
          1: "#18794E",
          2: "#CCEBD7",
          3: "#DDF3E4",
        },
        random: {
          1: "#E34D8C",
          2: "#C04277",
          3: "#7D2A4D",
          4: "#7000FF",
          5: "#6200E3",
          6: "#36007D",
          7: "#349974",
          8: "#2A7D5F",
          9: "#153D2E",
          10: "#6100FF",
          11: "#5700E3",
          12: "#30007D",
        },
      },
      // Ex: text-heading1 font-500
      fontSize: {
        heading1: "44px",
        heading2: "36px",
        heading3: "32px",
        heading4: "28px",
        heading5: "24px",
        heading6: "20px",
        heading7: "16px",
        body1: "16px",
        body2: "14px",
        buttonBigText: "16px",
        buttonMediumText: "14px",
        inputPlaceholder: "16px",
        inputLabel: "14px",
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
};
