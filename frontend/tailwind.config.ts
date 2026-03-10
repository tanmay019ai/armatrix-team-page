import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        sand: "#f8f3e8",
        ember: "#d97706",
        teal: "#155e75",
        night: "#06131f",
        mist: "#9fb3c8",
      },
      boxShadow: {
        card: "0 20px 50px rgba(17, 24, 39, 0.10)",
        glow: "0 20px 60px rgba(56, 189, 248, 0.22)",
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at top, rgba(21, 94, 117, 0.20), transparent 35%), linear-gradient(135deg, rgba(217, 119, 6, 0.12), transparent 40%)",
        "aurora-dark": "radial-gradient(circle at top left, rgba(56, 189, 248, 0.20), transparent 30%), radial-gradient(circle at bottom right, rgba(244, 114, 182, 0.18), transparent 26%), linear-gradient(135deg, rgba(8, 23, 39, 0.98), rgba(2, 8, 23, 1))",
      },
    },
  },
  plugins: [],
};


export default config;