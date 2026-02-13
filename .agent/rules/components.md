# React Component Standards

## Component Structure

### Functional Components
- ALWAYS use functional components with hooks
- NEVER use class components
- USE arrow functions or function declarations consistently

```typescript
// ✅ Good - Function declaration
export function EventCard({ title, date }: EventCardProps) {
  return <div>{title}</div>;
}

// ✅ Also acceptable - Arrow function
export const EventCard = ({ title, date }: EventCardProps) => {
  return <div>{title}</div>;
};
```

## Naming Conventions

### Component Files
- USE PascalCase for component files (e.g., `EventCard.tsx`)
- MATCH filename to component name
- ONE component per file (except for small, tightly coupled components)

### Component Names
- USE PascalCase for component names
- USE descriptive, meaningful names
- AVOID generic names like `Component` or `Item`

```typescript
// ✅ Good
export function EventRegistrationForm() { }

// ❌ Avoid
export function Form() { }
```

## Props

### Props Destructuring
- DESTRUCTURE props in function signature
- PROVIDE default values in destructuring
- AVOID accessing props object directly

```typescript
// ✅ Good
export function EventCard({ 
  title, 
  date, 
  description = "No description available" 
}: EventCardProps) {
  return <div>{title}</div>;
}

// ❌ Avoid
export function EventCard(props: EventCardProps) {
  return <div>{props.title}</div>;
}
```

### Props Interface
- ALWAYS define props interface
- PLACE interface before component
- USE optional properties appropriately

```typescript
interface EventCardProps {
  title: string;
  date: string;
  description?: string;
  onRegister?: () => void;
}

export function EventCard({ title, date, description, onRegister }: EventCardProps) {
  // Implementation
}
```

## Hooks

### Hook Rules
- ONLY call hooks at top level
- ONLY call hooks in functional components or custom hooks
- FOLLOW the "use" naming convention for custom hooks

### useState
- USE descriptive state variable names
- GROUP related state when appropriate
- PROVIDE type annotations for complex state

```typescript
// ✅ Good
const [isSubmitting, setIsSubmitting] = useState(false);
const [formData, setFormData] = useState<FormData>({ name: '', email: '' });

// ❌ Avoid
const [data, setData] = useState();
```

### useEffect
- ALWAYS provide dependency array
- KEEP effects focused and single-purpose
- CLEANUP side effects when needed

```typescript
// ✅ Good
useEffect(() => {
  const subscription = subscribeToEvents();
  return () => subscription.unsubscribe();
}, []);

// ❌ Avoid - missing dependencies
useEffect(() => {
  fetchData(userId);
});
```

### Custom Hooks
- START name with "use"
- RETURN values in array or object
- ENCAPSULATE reusable logic

```typescript
function useEventRegistration(eventId: string) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const register = async () => {
    setIsLoading(true);
    // Registration logic
    setIsLoading(false);
  };
  
  return { isRegistered, isLoading, register };
}
```

## Component Composition

### Composition over Inheritance
- PREFER composition over inheritance
- USE children prop for flexible layouts
- CREATE compound components when appropriate

```typescript
// ✅ Good - Composition
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <p>Content</p>
</Card>
```

## Performance Optimization

### React.memo
- USE React.memo for expensive components
- AVOID premature optimization
- PROVIDE custom comparison function if needed

```typescript
export const EventCard = React.memo(({ title, date }: EventCardProps) => {
  return <div>{title}</div>;
});
```

### useMemo and useCallback
- USE useMemo for expensive calculations
- USE useCallback for functions passed to child components
- AVOID overusing (only when needed)

```typescript
// ✅ Good - Expensive calculation
const sortedEvents = useMemo(() => {
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}, [events]);

// ✅ Good - Callback passed to child
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

## Exports

### Named Exports
- USE named exports for components
- AVOID default exports (except for pages)
- EXPORT types alongside components

```typescript
// ✅ Good
export function EventCard() { }
export type { EventCardProps };

// ❌ Avoid
export default EventCard;
```

## Client vs Server Components

### Server Components (Default)
- USE Server Components by default
- FETCH data directly in Server Components
- AVOID useState, useEffect in Server Components

```typescript
// Server Component (default)
async function EventsPage() {
  const events = await fetchEvents();
  return <EventsList events={events} />;
}
```

### Client Components
- ADD 'use client' directive when needed
- USE for interactivity (state, effects, event handlers)
- KEEP client components small and focused

```typescript
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({});
  // Interactive form logic
}
```

## Error Boundaries

### Implementation
- CREATE error boundaries for critical sections
- PROVIDE user-friendly error messages
- LOG errors for debugging

```typescript
'use client';

export function ErrorBoundary({ 
  error, 
  reset 
}: { 
  error: Error; 
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```
