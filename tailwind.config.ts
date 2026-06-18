import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Admin tokens */
        "gov-900": "#0D1F3C",
        "gov-800": "#1B3A6B",
        "gov-600": "#2D5FA6",
        "gov-100": "#E6F0FF",
        "gov-50":  "#F4F7FB",
        /* Portal tokens */
        "p-800":   "#1B3A6B",
        "p-600":   "#2D5FA6",
        "p-100":   "#E6F0FF",
        "p-50":    "#F4F7FB",
        /* Status */
        success:   "#1A9E60",
        warning:   "#D97706",
        danger:    "#E53E3E",
        neutral:   "#64748B",
        /* shadcn/ui semantic tokens */
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        body:    ["Inter", "sans-serif"],
        syne:    ["Syne", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card:   "0 1px 3px rgba(27,58,107,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(27,58,107,0.12), 0 2px 4px rgba(0,0,0,0.06)",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s ease infinite",
      },
    },
  },
  plugins: [],
};
export default config;
