/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
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
          0: "#CD2B31",
          1: "#FDD8D8",
          2: "#FFE5E5",
        },
        sucess: {
          0: "#18794E",
          1: "#CCEBD7",
          2: "#DDF3E4",
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
      fontWeight: {
        body: {
          1: "600",
          "2-400": "400",
          "2-500": "500",
        },
        button: {
          "big-text": "700",
          "medium-text": "400",
        },
        input: {
          placeholder: "400",
          label: "500",
        },
        heading: {
          1: "700",
          2: "600",
          "3-600": "600",
          "3-500": "500",
          "4-600": "600",
          "4-500": "500",
          "5-600": "600",
          "5-500": "500",
          "6-600": "600",
          "6-500": "500",
          "7-600": "600",
          "7-500": "500",
        },
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      }
    },
  },

  plugins: [],
};
