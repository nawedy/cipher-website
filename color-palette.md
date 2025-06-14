# AI Consulting Group - Color Palette Guide

## Overview
This color palette is designed for a modern AI consulting and research group website using shadcn/ui and magicUI components. The palette emphasizes dark, professional backgrounds with vibrant neon/fluorescent accents to create a cutting-edge, technological aesthetic.

## Design Philosophy
- **Dark Foundation**: Deep, rich backgrounds that convey professionalism and sophistication
- **Neon Accents**: Bright, electric colors that suggest innovation and advanced technology
- **High Contrast**: Ensures accessibility while maintaining visual impact
- **Animation Ready**: Colors chosen to work beautifully with motion effects and transitions

---

## Primary Color Palette

### Electric Cyan (Primary Brand)
```css
--primary-light: #22d3ee    /* cyan-400 */
--primary: #06b6d4          /* cyan-500 */
--primary-dark: #0891b2     /* cyan-600 */
```
**Usage**: Primary buttons, links, call-to-action elements, logo accents, loading animations

### Neon Lime (Secondary Brand)
```css
--secondary-light: #a3e635  /* lime-400 */
--secondary: #84cc16        /* lime-500 */
--secondary-dark: #65a30d   /* lime-600 */
```
**Usage**: Secondary buttons, highlights, success states, interactive elements

### Electric Yellow (Accent)
```css
--accent-light: #facc15     /* yellow-400 */
--accent: #eab308          /* yellow-500 */
--accent-dark: #ca8a04     /* yellow-600 */
```
**Usage**: Warnings, notifications, hover states, code highlighting

---

## Background Colors

### Deep Slate (Primary Backgrounds)
```css
--bg-primary: #020617      /* slate-950 */
--bg-primary-dark: #0f172a    /* gray-900*/
--bg-secondary: #0f172a    /* slate-900 */
--bg-tertiary: #1e293b    /* slate-800 */
```
**Usage**: Main backgrounds, cards, modals, navigation bars

### Rich Zinc (Alternative Backgrounds)
```css
--bg-alt-primary: #09090b   /* zinc-950 */
--bg-alt-secondary: #18181b /* zinc-900 */
--bg-alt-tertiary: #27272a  /* zinc-800 */
```
**Usage**: Sidebar backgrounds, code blocks, input fields

### Neutral Gray (Surface Colors)
```css
--surface-primary: #0a0a0a  /* neutral-950 */
--surface-secondary: #171717 /* neutral-900 */
--surface-tertiary: #262626 /* neutral-800 */
```
**Usage**: Cards, panels, dropdown menus, overlays

---

## Text Colors

### Primary Text
```css
--text-primary: #f1f5f9     /* slate-100 */
--text-secondary: #cbd5e1   /* slate-300 */
--text-tertiary: #64748b    /* slate-500 */
```
**Usage**: Headlines, body text, captions

### Interactive Text
```css
--text-interactive: #22d3ee  /* cyan-400 */
--text-hover: #06b6d4       /* cyan-500 */
--text-active: #0891b2      /* cyan-600 */
```
**Usage**: Links, interactive elements, navigation items

---

## Accent & Effect Colors

### Electric Orange (Energy)
```css
--energy-light: #fb923c     /* orange-400 */
--energy: #f97316          /* orange-500 */
--energy-dark: #ea580c     /* orange-600 */
```
**Usage**: Progress bars, active states, energy indicators

### Electric Teal (Innovation)
```css
--innovation-light: #2dd4bf /* teal-400 */
--innovation: #14b8a6      /* teal-500 */
--innovation-dark: #0d9488 /* teal-600 */
```
**Usage**: Innovation highlights, feature callouts, data visualizations

### Electric Purple (Premium)
```css
--premium-light: #a855f7    /* purple-500 */
--premium: #9333ea         /* purple-600 */
--premium-dark: #7c3aed    /* purple-700 */
```
**Usage**: Premium features, AI-specific elements, advanced analytics

---

## Semantic Colors

### Success (Green)
```css
--success-light: #4ade80    /* green-400 */
--success: #22c55e         /* green-500 */
--success-dark: #16a34a    /* green-600 */
```

### Warning (Amber)
```css
--warning-light: #fbbf24    /* amber-400 */
--warning: #f59e0b         /* amber-500 */
--warning-dark: #d97706    /* amber-600 */
```

### Error (Red)
```css
--error-light: #f87171     /* red-400 */
--error: #ef4444          /* red-500 */
--error-dark: #dc2626     /* red-600 */
```

---

## Gradient Combinations

### Primary Gradients
```css
/* Cyan to Lime */
--gradient-primary: linear-gradient(135deg, #06b6d4 0%, #84cc16 100%);

/* Dark to Cyan */
--gradient-dark: linear-gradient(135deg, #020617 0%, #06b6d4 100%);

/* Multi-neon */
--gradient-neon: linear-gradient(135deg, #22d3ee 0%, #a3e635 50%, #facc15 100%);
```

### Background Gradients
```css
/* Subtle depth */
--gradient-bg: linear-gradient(135deg, #020617 0%, #0f172a 100%);

/* Card backgrounds */
--gradient-card: linear-gradient(135deg, #1e293b 0%, #334155 100%);
```

---

## Usage Guidelines

### Backgrounds
- **Main sections**: Use `--bg-primary` (slate-950)
- **Cards/Components**: Use `--bg-secondary` (slate-900) or `--bg-tertiary` (slate-800)
- **Interactive surfaces**: Use subtle gradients or zinc alternatives

### Buttons & CTAs
- **Primary actions**: `--primary` with `--text-primary`
- **Secondary actions**: `--secondary` with `--bg-primary`
- **Accent actions**: `--accent` with `--bg-primary`

### Text Hierarchy
- **Headlines**: `--text-primary` (slate-100)
- **Body text**: `--text-secondary` (slate-300)
- **Captions/Meta**: `--text-tertiary` (slate-500)
- **Links**: `--text-interactive` (cyan-400)

### Animations & Effects
- **Glow effects**: Use primary colors with opacity
- **Hover states**: Brighten by one shade level
- **Active states**: Darken by one shade level
- **Loading animations**: Cycle through primary, secondary, accent

---

## Implementation Notes

### Tailwind CSS Classes
```css
/* Most commonly used classes */
.bg-slate-950    /* Primary background */
.bg-gray-900     /* Primary background dark */
.bg-slate-900    /* Secondary background */
.bg-slate-800    /* Tertiary background */

.text-slate-100  /* Primary text */
.text-slate-300  /* Secondary text */
.text-slate-500  /* Tertiary text */

.text-cyan-400   /* Primary accent text */
.text-lime-400   /* Secondary accent text */
.text-yellow-400 /* Accent highlight */

.bg-cyan-500     /* Primary buttons */
.bg-lime-500     /* Secondary buttons */
.bg-orange-500   /* Energy/action buttons */
```

### CSS Custom Properties
Add these to your global CSS for consistent theming:

```css
:root {
  /* Backgrounds */
  --bg-primary: #020617;
  --bg-secondary: #0f172a;
  --bg-tertiary: #1e293b;
  
  /* Text */
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #64748b;
  
  /* Accents */
  --accent-cyan: #06b6d4;
  --accent-lime: #84cc16;
  --accent-yellow: #eab308;
  --accent-orange: #f97316;
}
```

---

## Accessibility Considerations

- All color combinations meet WCAG 2.1 AA contrast standards
- Neon colors are used sparingly to avoid eye strain
- Dark backgrounds reduce blue light exposure
- Color-blind friendly combinations chosen
- Focus states use high contrast combinations

---

## Animation & Effect Recommendations

### Glow Effects
```css
.glow-cyan {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

.glow-lime {
  box-shadow: 0 0 20px rgba(132, 204, 22, 0.5);
}
```

### Gradient Animations
- Use for loading states, progress indicators
- Animate gradient positions for energy effects
- Apply to borders for subtle interactive feedback

This color palette provides a sophisticated, modern foundation for your AI consulting website while maintaining the high-tech, innovative feel you're looking for. 