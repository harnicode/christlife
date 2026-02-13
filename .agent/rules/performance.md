# Performance Standards

## Core Web Vitals

### Target Metrics
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 800ms

### Monitoring
- MEASURE Core Web Vitals regularly
- USE Vercel Analytics for real user monitoring
- RUN Lighthouse audits before deployment
- TRACK performance over time

## Performance Budget

### Bundle Size Limits
- Initial JS bundle: < 200KB (gzipped)
- Page-specific bundles: < 50KB (gzipped)
- CSS bundle: < 50KB (gzipped)
- Total page weight: < 1MB

### Enforcement
- CHECK bundle size on every build
- USE `@next/bundle-analyzer` to analyze bundles
- FAIL builds that exceed budget
- OPTIMIZE when approaching limits

## Images

### Next.js Image Component
- ALWAYS use Next.js `<Image>` component
- NEVER use `<img>` tag directly
- SPECIFY width and height to prevent layout shift
- USE appropriate image formats (WebP preferred)

```typescript
// ✅ Good
import Image from 'next/image';

<Image 
  src="/event.jpg" 
  alt="Event description"
  width={800}
  height={600}
  priority // Only for above-fold images
/>

// ❌ Avoid
<img src="/event.jpg" alt="Event" />
```

### Image Optimization
- COMPRESS images before adding to project
- USE appropriate dimensions (don't serve oversized images)
- IMPLEMENT lazy loading for below-fold images (automatic with Next.js)
- USE `priority` prop only for above-fold images (1-2 per page)

```typescript
// ✅ Good - Above-fold hero image
<Image src="/hero.jpg" alt="Hero" width={1920} height={1080} priority />

// ✅ Good - Below-fold image (lazy loaded by default)
<Image src="/event.jpg" alt="Event" width={800} height={600} />
```

## Code Splitting

### Automatic Code Splitting
- LEVERAGE Next.js automatic code splitting
- EACH page gets its own bundle
- SHARED code is split into separate chunks

### Dynamic Imports
- USE dynamic imports for heavy components
- LAZY load components not needed immediately
- PROVIDE loading states

```typescript
import dynamic from 'next/dynamic';

// ✅ Good - Lazy load heavy component
const GalleryModal = dynamic(() => import('@/components/GalleryModal'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // If component doesn't need SSR
});
```

### Route-based Splitting
- KEEP page components focused
- SPLIT large pages into smaller components
- LOAD components on demand

## Server vs Client Components

### Prefer Server Components
- USE Server Components by default
- FETCH data on the server
- REDUCE client-side JavaScript

```typescript
// ✅ Good - Server Component (default)
async function EventsPage() {
  const events = await fetchEvents();
  return <EventsList events={events} />;
}
```

### Client Components
- USE 'use client' only when necessary
- KEEP client components small
- MINIMIZE client-side JavaScript

```typescript
// ✅ Good - Small, focused client component
'use client';

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>Like</button>;
}
```

## Caching

### Next.js Caching
- LEVERAGE Next.js automatic caching
- USE `revalidate` for ISR (Incremental Static Regeneration)
- CONFIGURE cache headers appropriately

```typescript
// ✅ Good - Revalidate every hour
export const revalidate = 3600;

async function EventsPage() {
  const events = await fetchEvents();
  return <EventsList events={events} />;
}
```

## Fonts

### Font Optimization
- USE `next/font` for automatic font optimization
- PRELOAD fonts to reduce layout shift
- LIMIT number of font weights and styles

```typescript
// ✅ Good
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
```

## React Performance

### Memoization
- USE React.memo for expensive components
- USE useMemo for expensive calculations
- USE useCallback for functions passed to children
- AVOID premature optimization

```typescript
// ✅ Good - Expensive calculation
const sortedEvents = useMemo(() => {
  return events.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}, [events]);

// ✅ Good - Callback passed to child
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### Avoid Unnecessary Re-renders
- KEEP component state local when possible
- AVOID passing new object/array references
- USE stable references for callbacks

```typescript
// ❌ Avoid - Creates new object on every render
<Component config={{ theme: 'light' }} />

// ✅ Good - Stable reference
const config = useMemo(() => ({ theme: 'light' }), []);
<Component config={config} />
```

## Third-party Scripts

### Script Loading
- USE Next.js `<Script>` component
- LOAD scripts with appropriate strategy
- DEFER non-critical scripts

```typescript
import Script from 'next/script';

// ✅ Good
<Script 
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive"
/>
```

### Minimize Third-party Code
- AUDIT third-party dependencies
- REMOVE unused dependencies
- CONSIDER bundle size impact

## CSS Performance

### Critical CSS
- INLINE critical CSS for above-fold content
- DEFER non-critical CSS
- MINIMIZE CSS blocking rendering

### Tailwind Optimization
- PURGE unused Tailwind classes (automatic)
- MINIMIZE custom CSS
- USE JIT mode for smaller bundles

## Network Performance

### Reduce Requests
- COMBINE resources when possible
- USE HTTP/2 multiplexing
- MINIMIZE external requests

### Compression
- ENABLE gzip/brotli compression
- COMPRESS text assets
- OPTIMIZE asset delivery

## Monitoring and Profiling

### Performance Monitoring
- USE Vercel Analytics
- MONITOR real user metrics
- TRACK performance regressions

### Profiling
- USE React DevTools Profiler
- IDENTIFY performance bottlenecks
- OPTIMIZE based on data

### Lighthouse Audits
- RUN Lighthouse before deployment
- AIM for score > 90 in all categories
- ADDRESS performance warnings

## Mobile Performance

### Mobile-first Optimization
- OPTIMIZE for mobile devices first
- TEST on real devices
- CONSIDER slower networks

### Responsive Images
- SERVE appropriate image sizes
- USE `sizes` prop for responsive images
- OPTIMIZE for mobile bandwidth

```typescript
<Image 
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Performance Checklist

Before deployment:
- [ ] Lighthouse score > 90 (all categories)
- [ ] Core Web Vitals meet targets
- [ ] Bundle size within budget
- [ ] Images optimized and lazy loaded
- [ ] Fonts optimized with next/font
- [ ] No unnecessary re-renders
- [ ] Server Components used where possible
- [ ] Third-party scripts optimized
- [ ] Tested on mobile devices
- [ ] No performance regressions
