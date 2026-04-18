import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        navy: "#102A43",
        "body-text": "#243B53",
        primary: {
          DEFAULT: "#2C7A7B",
          light: "#E6FFFA",
          dark: "#225F60",
        },
        secondary: "#486581",
        surface: "#F5F7FA",
      },
    },
  },
  plugins: [],
};

export default config;
