---
description: Create a new page following Next.js App Router conventions
---

# Create New Page

Follow these steps to create a new page in the ChristLife application using Next.js App Router.

## Page Creation Steps

1. Create route directory in `app/`
```bash
# Example: Creating an events page
mkdir -p app/events
```

2. Create `page.tsx` file
```bash
touch app/events/page.tsx
```

3. Define metadata for SEO
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | ChristLife City Cathedral',
  description: 'Join us for upcoming events and gatherings at ChristLife City Cathedral.',
  keywords: ['church events', 'cathedral events', 'community gatherings'],
  openGraph: {
    title: 'Events | ChristLife City Cathedral',
    description: 'Join us for upcoming events and gatherings',
    images: ['/og-events.jpg'],
  },
};
```

4. Implement page component
```typescript
export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Upcoming Events</h1>
      {/* Page content */}
    </main>
  );
}
```

5. For pages with dynamic data, use Server Components
```typescript
async function EventsPage() {
  // Server-side data fetching
  const events = await fetchEvents();
  
  return (
    <main>
      <EventsList events={events} />
    </main>
  );
}
```

6. For pages requiring client-side interactivity, mark as client component
```typescript
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({});
  // Client-side logic
}
```

7. Create layout file if needed (optional)
```bash
touch app/events/layout.tsx
```

8. Implement custom layout
```typescript
export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="events-layout">
      <EventsNavigation />
      {children}
    </div>
  );
}
```

## Page Structure Checklist

- [ ] Route directory created in `app/`
- [ ] `page.tsx` file created
- [ ] Metadata exported for SEO
- [ ] Page component properly typed
- [ ] Server Component used by default (unless client interactivity needed)
- [ ] Semantic HTML structure
- [ ] Responsive design implemented
- [ ] Accessibility standards met
- [ ] Images optimized with Next.js Image component

## SEO Requirements

Each page must include:
- Unique, descriptive title (< 60 characters)
- Compelling meta description (< 160 characters)
- Relevant keywords
- Open Graph tags for social sharing
- Twitter card metadata

## Example Complete Page

```typescript
import type { Metadata } from 'next';
import { EventsList } from '@/components/events/EventsList';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Events | ChristLife City Cathedral',
  description: 'Join us for worship services, community events, and special gatherings at ChristLife City Cathedral.',
  keywords: ['church events', 'worship services', 'community gatherings', 'cathedral events'],
  openGraph: {
    title: 'Events | ChristLife City Cathedral',
    description: 'Join us for worship services and community events',
    images: ['/images/og-events.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | ChristLife City Cathedral',
    description: 'Join us for worship services and community events',
  },
};

export default async function EventsPage() {
  // Server-side data fetching
  const upcomingEvents = await fetchUpcomingEvents();
  
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Upcoming Events" 
        description="Join us for worship, fellowship, and community"
      />
      
      <section className="container mx-auto px-4 py-12">
        <EventsList events={upcomingEvents} />
      </section>
    </main>
  );
}

async function fetchUpcomingEvents() {
  // Data fetching logic
  return [];
}
```
