import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0F1B3C",
          light: "#1A2B4D",
          dark: "#0A1227",
        },
        accent: {
          rose: "#E8B4B8",
          gold: "#D4AF37",
          champagne: "#F7E7CE",
        },
        neutral: {
          pearl: "#F8F8FF",
          charcoal: "#1C1C1C",
          silver: "#C0C0C0",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        accent: ["Bebas Neue", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-luxury": "linear-gradient(135deg, #0F1B3C 0%, #1A2B4D 50%, #0F1B3C 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #F7E7CE 50%, #D4AF37 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;