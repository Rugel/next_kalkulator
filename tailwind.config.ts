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
        bank: {
          navy: {
            950: "#060d18",
            900: "#0a1628",
            800: "#0d2147",
            700: "#123566",
            600: "#1a4a7a",
          },
          teal: { DEFAULT: "#0d7a6b", light: "#14a08c" },
          gold: { DEFAULT: "#c9a227", light: "#e8c54a" },
          surface: { DEFAULT: "#f0f3f8", elevated: "#ffffff" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bank-header":
          "linear-gradient(160deg, #060d18 0%, #0a1628 35%, #0d2147 70%, #123566 100%)",
        "bank-accent":
          "linear-gradient(135deg, #0d7a6b 0%, #123566 100%)",
      },
      boxShadow: {
        bank: "0 12px 48px rgba(10, 22, 40, 0.12)",
        "bank-md": "0 4px 24px rgba(10, 22, 40, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
