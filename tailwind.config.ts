import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#143823",
          gold: "#D97706",
          "gold-hover": "#B45309",
          cream: "#FAFAF7",
          sage: "#E8EFE9",
        },
      },
    },
  },
  plugins: [],
};

export default config;