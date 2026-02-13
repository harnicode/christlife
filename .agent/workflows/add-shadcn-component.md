---
description: Add a new shadcn/ui component to the project
---

# Add shadcn/ui Component

Follow these steps to add a new component from the shadcn/ui library to the ChristLife project.

## Prerequisites

Ensure shadcn/ui is properly configured in the project (check `components.json`).

## Adding a Component

1. Browse available components at https://ui.shadcn.com/docs/components

2. Add the component using the CLI
// turbo
```bash
# Example: Adding a Button component
yarn dlx shadcn@latest add button
```

3. Add multiple components at once
// turbo
```bash
yarn dlx shadcn@latest add button card dialog
```

4. The component will be added to `components/ui/`

5. Import and use the component
```typescript
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return <Button>Click me</Button>;
}
```

## Customizing Components

1. Locate the component in `components/ui/`

2. Modify the component to match ChristLife branding
   - Update colors using CSS variables from `app/globals.css`
   - Adjust spacing and sizing
   - Add custom variants using `class-variance-authority`

3. Example customization:
```typescript
// components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Add custom variant for ChristLife
        church: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90",
      },
    },
  }
);
```

## Common Components to Add

Essential components for ChristLife:

// turbo-all
```bash
# Navigation
yarn dlx shadcn@latest add navigation-menu

# Forms
yarn dlx shadcn@latest add form input textarea label

# Display
yarn dlx shadcn@latest add card badge separator

# Feedback
yarn dlx shadcn@latest add alert dialog toast

# Layout
yarn dlx shadcn@latest add tabs accordion
```

## Component Usage Best Practices

1. **Always use the imported component** from `@/components/ui/`
2. **Customize through props** when possible
3. **Extend with composition** for complex use cases
4. **Maintain accessibility** features built into shadcn components
5. **Test responsive behavior** on different screen sizes

## Example: Creating a Custom Card

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function EventCard({ title, date, category }: EventCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Card content */}
      </CardContent>
    </Card>
  );
}
```

## Troubleshooting

**Component not found:**
```bash
# Ensure shadcn is properly initialized
yarn dlx shadcn@latest init
```

**Style conflicts:**
- Check `tailwind.config.js` for proper configuration
- Verify `app/globals.css` includes shadcn styles
- Ensure CSS variables are defined in `:root`

**TypeScript errors:**
```bash
# Regenerate TypeScript types
yarn build
```
