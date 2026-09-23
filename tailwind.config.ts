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
          // Text-strength red for small labels on red-soft (WCAG AA 5.4:1).
          "red-ink": "#B42D26",
          "red-soft": "#FCEAE8",
        },
        // WhatsApp green darkened until white text passes WCAG AA (5.0:1).
        wa: { DEFAULT: "#0A803F", dark: "#086B34", soft: "#E2F5E9" },
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
