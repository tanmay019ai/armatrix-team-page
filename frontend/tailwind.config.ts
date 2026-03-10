import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        sand: "#f8f3e8",
        ember: "#d97706",
        teal: "#155e75",
      },
      boxShadow: {
        card: "0 20px 50px rgba(17, 24, 39, 0.10)",
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at top, rgba(21, 94, 117, 0.20), transparent 35%), linear-gradient(135deg, rgba(217, 119, 6, 0.12), transparent 40%)",
      },
    },
  },
  plugins: [],
};


export default config;