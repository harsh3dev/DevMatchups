import type { Config } from "tailwindcss"
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'text': 'var(--text)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        cardForeground: 'var(--card-foreground)',
        popover: 'var(--popover)',
        popoverForeground: 'var(--popover-foreground)',
       
        primaryForeground: 'var(--primary-foreground)',
        
        secondaryForeground: 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        mutedForeground: 'var(--muted-foreground)',
        
        accentForeground: 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        destructiveForeground: 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart1: 'var(--chart-1)',
        chart2: 'var(--chart-2)',
        chart3: 'var(--chart-3)',
        chart4: 'var(--chart-4)',
        chart5: 'var(--chart-5)',
        clickWhite: 'var(--clickWhite)',
        inputGray: 'var(--inputGray)',
        bgActive: 'var(--bgActive)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeIn: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(50%, -50%) scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0%, 0%) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 8s infinite",
        grid: "grid 15s linear infinite",
        fade: 'fadeIn .5s ease-in-out',
        spotlight: "spotlight 1.2s ease .75s 1 forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config