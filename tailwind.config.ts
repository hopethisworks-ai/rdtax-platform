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
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#b45309",
          600: "#92400e",
          700: "#78350f",
          900: "#451a03",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          50: "#FDFCFA",
          100: "#FAF8F5",
          200: "#F5F0EB",
        },
      },
    },
  },
  plugins: [],
};

export default config;
