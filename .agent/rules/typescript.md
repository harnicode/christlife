# TypeScript Standards

## Strict Mode
- ALWAYS use TypeScript with strict mode enabled
- NEVER use `any` type - use `unknown` or proper types instead
- ALWAYS enable all strict compiler options

## Type Definitions

### Interfaces vs Types
- PREFER `interface` for object shapes
- USE `type` for unions, intersections, and primitives
- ALWAYS define interfaces for component props

```typescript
// ✅ Good - Interface for object shapes
interface EventCardProps {
  title: string;
  date: string;
  description?: string;
}

// ✅ Good - Type for unions
type Status = 'pending' | 'active' | 'completed';

// ❌ Avoid - any type
const data: any = fetchData();
```

### Explicit Typing
- ALWAYS provide explicit return types for functions
- ALWAYS type function parameters
- AVOID implicit any

```typescript
// ✅ Good
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}

// ❌ Avoid
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
```

### Component Props
- ALWAYS define props interface
- USE optional properties with `?` when appropriate
- PROVIDE default values in destructuring

```typescript
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ 
  label, 
  variant = 'primary',
  onClick 
}: ButtonProps) {
  // Component implementation
}
```

## Type Safety

### Null and Undefined
- USE optional chaining (`?.`) for potentially null/undefined values
- USE nullish coalescing (`??`) for default values
- AVOID non-null assertions (`!`) unless absolutely certain

```typescript
// ✅ Good
const name = user?.profile?.name ?? 'Guest';

// ❌ Avoid
const name = user!.profile!.name;
```

### Type Guards
- IMPLEMENT type guards for union types
- USE `typeof` and `instanceof` checks
- CREATE custom type guards when needed

```typescript
function isEvent(item: Event | Announcement): item is Event {
  return 'date' in item && 'location' in item;
}
```

## Generics
- USE generics for reusable components and functions
- PROVIDE meaningful generic parameter names
- CONSTRAIN generics when appropriate

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // Implementation
}
```

## Enums and Constants
- PREFER const objects or union types over enums
- USE UPPER_SNAKE_CASE for constant values
- GROUP related constants

```typescript
// ✅ Good - const object
const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
} as const;

type EventStatus = typeof EVENT_STATUS[keyof typeof EVENT_STATUS];

// ❌ Avoid - enum (unless needed for specific use case)
enum EventStatus {
  UPCOMING,
  ONGOING,
  COMPLETED,
}
```

## Import/Export
- USE named exports for better refactoring
- AVOID default exports except for Next.js pages
- ORGANIZE imports by category

```typescript
// ✅ Good
export function EventCard() { }
export type { EventCardProps };

// ❌ Avoid (except for pages)
export default EventCard;
```

## Type Assertions
- AVOID type assertions when possible
- USE `as const` for literal types
- PREFER type guards over assertions

```typescript
// ✅ Good
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;

// ❌ Avoid
const data = response as MyType;
```
