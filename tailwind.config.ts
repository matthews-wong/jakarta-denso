import type { Config } from "tailwindcss";

/**
 * Design tokens for the v3 redesign: one navy family from the logo, cool
 * neutrals, WhatsApp green reserved for booking actions and the logo red
 * reserved for the "Terlaris" tag.
 */
export default {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#081733", 2: "#122A5C" },
        ink: "#0B1633",
        muted: "#5A6580",
        line: "#E1E6EE",
        ice: "#F1F5FA",
        brand: {
          DEFAULT: "#2449B8",
          soft: "#E7EDFB",
          red: "#D6392F",
          "red-soft": "#FCEAE8",
        },
        wa: { DEFAULT: "#0E8F47", dark: "#0B7A3C", soft: "#E2F5E9" },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      maxWidth: {
        site: "1440px",
        prose: "44rem",
      },
      borderRadius: {
        panel: "22px",
        tile: "26px",
      },
      boxShadow: {
        panel: "0 40px 80px -30px rgba(2, 8, 26, 0.7)",
        seg: "0 1px 3px rgba(11, 22, 51, 0.14)",
        bar: "0 -10px 30px rgba(8, 23, 51, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
