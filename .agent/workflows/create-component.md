---
description: Create a new React component following design principles
---

# Create New Component

Follow these steps to create a new React component that adheres to ChristLife design principles.

## Component Creation Steps

1. Determine component type and location
   - **UI components**: `components/ui/` (base components from shadcn/ui)
   - **Feature components**: `components/[feature-name]/` (e.g., `components/events/`)
   - **Page components**: Within `app/[route]/` directory

2. Create component file with PascalCase naming
```bash
# Example: Creating an EventCard component
touch components/events/EventCard.tsx
```

3. Define TypeScript interface for props
```typescript
// components/events/EventCard.tsx
interface EventCardProps {
  title: string;
  date: string;
  description?: string;
  imageUrl?: string;
}
```

4. Implement functional component with proper typing
```typescript
export function EventCard({ 
  title, 
  date, 
  description = "No description available",
  imageUrl 
}: EventCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Component implementation */}
    </div>
  );
}
```

5. Add JSDoc documentation for complex components
```typescript
/**
 * EventCard displays information about a church event
 * @param title - Event title
 * @param date - Event date in ISO format
 * @param description - Optional event description
 * @param imageUrl - Optional event image URL
 */
```

6. Use Tailwind CSS utilities and design tokens
   - Reference `app/globals.css` for custom CSS variables
   - Use responsive utilities (mobile-first approach)
   - Implement hover states and transitions

7. Ensure accessibility
   - Add proper ARIA labels where needed
   - Ensure keyboard navigation works
   - Maintain color contrast ratios

8. Export component using named export
```typescript
export { EventCard } from './EventCard';
```

## Component Checklist

- [ ] Component uses TypeScript with explicit types
- [ ] Props interface is defined
- [ ] Component uses functional syntax with hooks
- [ ] Styling uses Tailwind utilities
- [ ] Component is accessible (ARIA, keyboard nav)
- [ ] Images use Next.js `<Image>` component
- [ ] Component is exported with named export
- [ ] Complex logic is documented with JSDoc

## Example Component Structure

```typescript
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  title: string;
  date: string;
  description?: string;
  imageUrl?: string;
}

/**
 * EventCard displays church event information
 */
export function EventCard({ 
  title, 
  date, 
  description,
  imageUrl 
}: EventCardProps) {
  return (
    <article className="group rounded-lg border bg-card hover:shadow-lg transition-shadow">
      {imageUrl && (
        <Image 
          src={imageUrl} 
          alt={title}
          width={400}
          height={250}
          className="rounded-t-lg object-cover"
        />
      )}
      <div className="p-6">
        <time className="text-sm text-muted-foreground">
          {formatDate(date)}
        </time>
        <h3 className="mt-2 text-xl font-semibold">{title}</h3>
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}
      </div>
    </article>
  );
}
```
