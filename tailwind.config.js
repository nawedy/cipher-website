// tailwind.config.js
// Tailwind configuration with Cipher Intelligence design tokens and division-specific theming

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
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
          // Cipher Intelligence Group - Master Brand
          cig: {
            'bg-primary': '#0f0f1a',
            'bg-secondary': '#1a1b2e',
            'accent-primary': '#FFD700',
            'accent-secondary': '#3b82f6',
          },
          // Cipher Strategy - Deep Green/Cyan
          cs: {
            'bg-primary': '#073C32',
            'bg-secondary': '#2a1b3d',
            'accent-primary': '#00FFE7',
            'accent-secondary': '#FF367B',
          },
          // Cipher DigitalWorks - Teal/Hot Pink
          cdw: {
            'bg-primary': '#088B8B',
            'bg-secondary': '#1a1b2e',
            'accent-primary': '#2FE4FF',
            'accent-secondary': '#FF2994',
          },
          // Cipher Labs - Electric Blue/Violet
          cl: {
            'bg-primary': '#00BFFF',
            'bg-secondary': '#312066',
            'accent-primary': '#64FFDA',
            'accent-secondary': '#9F5AFF',
          },
          // Cipher Studio - Slate/Chrome
          cst: {
            'bg-primary': '#4B5665',
            'bg-secondary': '#1a1b2e',
            'accent-primary': '#C0C0C0',
            'accent-secondary': '#2FE4FF',
          },
          // Cipher AI - Charcoal/Orange
          cai: {
            'bg-primary': '#222328',
            'bg-secondary': '#0A0A0A',
            'accent-primary': '#FF6B35',
            'accent-secondary': '#A259FF',
          },
          // Shared Design Tokens
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        backgroundImage: {
          // Division-specific gradients
          'cig-gradient': 'linear-gradient(135deg, #0f0f1a 0%, #1a1b2e 100%)',
          'cs-gradient': 'linear-gradient(135deg, #073C32 0%, #2a1b3d 100%)',
          'cdw-gradient': 'linear-gradient(135deg, #088B8B 0%, #1a1b2e 100%)',
          'cl-gradient': 'linear-gradient(135deg, #00BFFF 0%, #312066 100%)',
          'cst-gradient': 'linear-gradient(135deg, #4B5665 0%, #1a1b2e 100%)',
          'cai-gradient': 'linear-gradient(135deg, #222328 0%, #0A0A0A 100%)',
          // Shared gradients
          'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          'hero-gradient': 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 50%)',
        },
        backdropBlur: {
          xs: '2px',
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
          "border-beam": {
            "100%": {
              "offset-distance": "100%",
            },
          },
          marquee: {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(calc(-100% - var(--gap)))" },
          },
          "marquee-vertical": {
            from: { transform: "translateY(0)" },
            to: { transform: "translateY(calc(-100% - var(--gap)))" },
          },
          "fade-in": {
            "0%": { opacity: "0", transform: "translateY(10px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          "fade-up": {
            "0%": { opacity: "0", transform: "translateY(30px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          "slide-in-from-right": {
            "0%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(0)" },
          },
          "slide-in-from-left": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(0)" },
          },
          "gradient-shift": {
            "0%": { "background-position": "0% 50%" },
            "50%": { "background-position": "100% 50%" },
            "100%": { "background-position": "0% 50%" },
          },
          "pulse-glow": {
            "0%, 100%": { 
              "box-shadow": "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "opacity": "1"
            },
            "50%": { 
              "box-shadow": "0 0 0 10px rgba(59, 130, 246, 0)",
              "opacity": "0.8"
            },
          },
          "spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          "fade-in-up": {
            "0%": { opacity: "0", transform: "translateY(20px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          "slide-in-right": {
            "0%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(0)" },
          },
          // MagicUI specific animations
          "shiny-text": {
            "0%, 90%, 100%": {
              "background-position": "calc(-100% - var(--shiny-width)) 0",
            },
            "30%, 60%": {
              "background-position": "calc(100% + var(--shiny-width)) 0",
            },
          },
          "line-shadow": {
            "0%": { "background-position": "0% 0%" },
            "100%": { "background-position": "200% 0%" },
          },
          "aurora": {
            "0%": { "background-position": "0% 50%" },
            "50%": { "background-position": "100% 50%" },
            "100%": { "background-position": "0% 50%" },
          },
          "gradient": {
            "0%": { "background-position": "0% 50%" },
            "50%": { "background-position": "100% 50%" },
            "100%": { "background-position": "0% 50%" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
          marquee: "marquee var(--duration) linear infinite",
          "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
          "fade-in": "fade-in 0.5s ease-out",
          "fade-up": "fade-up 0.5s ease-out",
          "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
          "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
          "gradient-shift": "gradient-shift 15s ease infinite",
          "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          "spin": "spin 1s linear infinite",
          "fade-in-up": "fade-in-up 0.5s ease-out",
          "slide-in-right": "slide-in-right 0.3s ease-out",
          "slide-in-left": "slide-in-left 0.3s ease-out",
          "shiny-text": "shiny-text 8s ease-in-out infinite",
          "line-shadow": "line-shadow 2s linear infinite",
          "aurora": "aurora 60s ease infinite",
          "gradient": "gradient 15s ease infinite",
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
        },
        maxWidth: {
          '8xl': '88rem',
          '9xl': '96rem',
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }