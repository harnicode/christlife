# Styling Standards

## Tailwind CSS

### Utility-First Approach
- ALWAYS use Tailwind utility classes
- AVOID writing custom CSS unless absolutely necessary
- USE Tailwind's built-in utilities for consistency

```typescript
// ✅ Good
<div className="flex items-center justify-between p-4 rounded-lg shadow-md">

// ❌ Avoid
<div style={{ display: 'flex', padding: '1rem' }}>
```

### Design Tokens
- PREFER CSS variables from `app/globals.css` over hardcoded values
- USE design tokens for colors, spacing, typography
- MAINTAIN consistency across the application

```typescript
// ✅ Good - Using design tokens
<div className="bg-primary text-primary-foreground">

// ❌ Avoid - Hardcoded colors
<div className="bg-blue-600 text-white">
```

### Responsive Design
- ALWAYS implement mobile-first responsive design
- USE Tailwind breakpoint prefixes (sm:, md:, lg:, xl:, 2xl:)
- TEST on multiple screen sizes

```typescript
// ✅ Good - Mobile-first
<div className="w-full md:w-1/2 lg:w-1/3">

// ❌ Avoid - Desktop-first
<div className="w-1/3 md:w-full">
```

## Class Organization

### Class Order
- FOLLOW a consistent order: layout → spacing → sizing → typography → colors → effects
- USE Prettier or similar formatter for consistency

```typescript
// ✅ Good - Organized order
<div className="flex items-center gap-4 p-6 rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
```

### Conditional Classes
- USE `clsx` or `cn` utility for conditional classes
- KEEP class logic readable

```typescript
import { cn } from '@/lib/utils';

// ✅ Good
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === 'primary' && "primary-classes"
)}>
```

## Component Variants

### Class Variance Authority
- USE `class-variance-authority` (cva) for component variants
- DEFINE variants clearly
- PROVIDE default variant

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## Design System

### shadcn/ui Components
- ALWAYS use shadcn/ui components as base
- CUSTOMIZE to match ChristLife branding
- MAINTAIN consistency with design system

### Color Palette
- USE semantic color names (primary, secondary, accent, etc.)
- DEFINE colors in `app/globals.css`
- ENSURE WCAG AA contrast ratios (4.5:1 for text)

```css
/* app/globals.css */
:root {
  --primary: 220 90% 56%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 5% 96%;
  --secondary-foreground: 240 6% 10%;
}
```

### Typography
- USE design system font families
- MAINTAIN consistent font sizes and line heights
- ENSURE readable text (minimum 16px for body)

```typescript
// ✅ Good
<h1 className="text-4xl font-bold">
<p className="text-base leading-relaxed">
```

## Animations and Transitions

### Smooth Interactions
- ADD transitions for interactive elements
- USE Tailwind transition utilities
- KEEP animations subtle and purposeful

```typescript
// ✅ Good
<button className="transition-colors hover:bg-primary/90">
<div className="transition-transform hover:scale-105">
```

### Micro-animations
- IMPLEMENT hover effects
- ADD focus states for accessibility
- USE transform and opacity for performance

```typescript
// ✅ Good - Performant animation
<div className="transform transition-transform hover:translate-y-[-2px]">

// ❌ Avoid - Non-performant
<div style={{ transition: 'top 0.3s' }}>
```

## Accessibility in Styling

### Focus States
- ALWAYS provide visible focus states
- USE Tailwind focus utilities
- ENSURE keyboard navigation is clear

```typescript
// ✅ Good
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
```

### Color Contrast
- MAINTAIN 4.5:1 contrast ratio for normal text
- MAINTAIN 3:1 contrast ratio for large text
- TEST with accessibility tools

### Dark Mode (Future)
- PREPARE for dark mode with CSS variables
- USE Tailwind dark mode utilities
- TEST both light and dark themes

## Custom CSS

### When to Use
- ONLY when Tailwind utilities are insufficient
- FOR complex animations or layouts
- ALWAYS document why custom CSS is needed

### CSS Modules
- USE CSS modules for component-specific styles
- AVOID global CSS except in `app/globals.css`

```typescript
// ✅ Acceptable for complex cases
import styles from './EventCard.module.css';

<div className={styles.complexLayout}>
```

## Inline Styles

### Avoid Inline Styles
- NEVER use inline styles except for dynamic values
- PREFER Tailwind utilities or CSS variables

```typescript
// ✅ Acceptable - Dynamic value
<div style={{ backgroundImage: `url(${imageUrl})` }}>

// ❌ Avoid - Static styles
<div style={{ padding: '1rem', color: 'blue' }}>
```

## Performance

### CSS Bundle Size
- MONITOR CSS bundle size (< 50KB gzipped)
- REMOVE unused Tailwind classes (automatic with Tailwind)
- AVOID importing entire CSS libraries

### Critical CSS
- ENSURE above-fold content styles load first
- MINIMIZE CSS blocking rendering
- USE Next.js automatic optimization
