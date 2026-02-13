# ChristLife Software Design Principles

## Overview

This document outlines the software design principles and architectural standards for the **ChristLife City Cathedral** web application. These principles ensure consistency, maintainability, scalability, and a premium user experience across the entire codebase.

---

## 1. Architecture & Project Structure

### 1.1 Framework Foundation
- **Next.js 16** with App Router for server-side rendering and optimal performance
- **React 19** for component-based UI development
- **TypeScript** for type safety and enhanced developer experience

### 1.2 Directory Organization

```
christlife/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout with global providers
│   ├── page.tsx           # Home/landing page
│   ├── events/            # Events page route
│   ├── contact/           # Contact page route
│   └── gallery/           # Gallery page route
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── [feature]/        # Feature-specific components
├── lib/                  # Utility functions and helpers
├── public/               # Static assets (images, fonts, etc.)
└── docs/                 # Project documentation
```

### 1.3 Component Organization Principles

- **Atomic Design**: Organize components from smallest to largest (atoms → molecules → organisms → templates → pages)
- **Feature-based grouping**: Group related components by feature/domain
- **Single Responsibility**: Each component should have one clear purpose
- **Composition over inheritance**: Favor component composition

---

## 2. Code Quality & Standards

### 2.1 TypeScript Standards

- **Strict mode enabled**: Enforce strict type checking
- **Explicit typing**: Always define types for props, state, and function returns
- **No `any` types**: Use `unknown` or proper types instead
- **Interface over type**: Prefer `interface` for object shapes, `type` for unions/intersections

```typescript
// ✅ Good
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// ❌ Avoid
type PageProps = any;
```

### 2.2 Component Standards

- **Functional components**: Use function components with hooks
- **Named exports**: Use named exports for better refactoring support
- **Props destructuring**: Destructure props in function signature
- **Default props**: Use default parameters instead of `defaultProps`

```typescript
// ✅ Good
export function EventCard({ 
  title, 
  date, 
  description = "No description available" 
}: EventCardProps) {
  // Component logic
}

// ❌ Avoid
export default function EventCard(props: any) {
  // Component logic
}
```

### 2.3 File Naming Conventions

- **Components**: PascalCase (e.g., `EventCard.tsx`, `HeroSection.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- **Pages**: kebab-case for routes (e.g., `app/events/page.tsx`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

---

## 3. Styling & Design System

### 3.1 Styling Approach

- **Tailwind CSS 4**: Utility-first CSS framework for rapid development
- **CSS Variables**: Use CSS custom properties for theming
- **Component variants**: Use `class-variance-authority` for component variations
- **Responsive design**: Mobile-first approach with breakpoint utilities

### 3.2 Design Tokens

Define design tokens in `app/globals.css`:

```css
:root {
  /* Colors */
  --color-primary: #your-brand-color;
  --color-secondary: #your-secondary-color;
  --color-accent: #your-accent-color;
  
  /* Typography */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  
  /* Spacing */
  --spacing-unit: 0.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### 3.3 UI Component Library

- **shadcn/ui**: Use as base component library
- **Customization**: Extend and customize components to match brand identity
- **Consistency**: Maintain consistent spacing, colors, and typography
- **Accessibility**: Ensure all components meet WCAG 2.1 AA standards

### 3.4 Visual Excellence Standards

> [!IMPORTANT]
> ChristLife is a church website representing a spiritual community. The design must be:
> - **Welcoming and warm**: Use inviting colors and imagery
> - **Professional and trustworthy**: Clean layouts and clear typography
> - **Inspirational**: Incorporate uplifting visuals and messaging
> - **Accessible**: Ensure all users can access content regardless of ability

**Design Requirements:**
- Modern, clean aesthetic with subtle animations
- High-quality imagery (use `generate_image` tool for placeholders)
- Smooth transitions and hover effects
- Responsive design that works beautifully on all devices
- Fast loading times (optimize images, lazy load content)

---

## 4. State Management

### 4.1 State Hierarchy

1. **Server State**: Data from APIs (use Server Components when possible)
2. **URL State**: Search params, route params
3. **Local State**: Component-specific state (useState)
4. **Shared State**: Context API for cross-component state

### 4.2 State Management Patterns

```typescript
// Server Component (preferred for data fetching)
async function EventsPage() {
  const events = await fetchEvents(); // Server-side data fetching
  return <EventsList events={events} />;
}

// Client Component (when interactivity needed)
'use client';

function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialState);
  // Interactive form logic
}
```

### 4.3 Data Fetching

- **Server Components**: Default for data fetching
- **Client-side fetching**: Only when necessary (user interactions, real-time updates)
- **Caching**: Leverage Next.js caching strategies
- **Error handling**: Always handle loading and error states

---

## 5. Performance Optimization

### 5.1 Core Web Vitals

Target metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 5.2 Optimization Strategies

- **Image optimization**: Use Next.js `<Image>` component
- **Font optimization**: Use `next/font` for automatic font optimization
- **Code splitting**: Leverage automatic code splitting
- **Lazy loading**: Use dynamic imports for heavy components
- **Memoization**: Use `useMemo` and `useCallback` judiciously

```typescript
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Optimized image
<Image 
  src="/church-image.jpg" 
  alt="ChristLife Cathedral" 
  width={800} 
  height={600}
  priority // For above-fold images
/>

// Lazy loaded component
const GalleryModal = dynamic(() => import('@/components/GalleryModal'), {
  loading: () => <LoadingSpinner />
});
```

---

## 6. Accessibility (a11y)

### 6.1 WCAG Compliance

- **Level AA compliance**: Minimum standard for all pages
- **Semantic HTML**: Use proper HTML5 elements
- **ARIA labels**: Add when semantic HTML is insufficient
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Color contrast**: Maintain 4.5:1 ratio for normal text, 3:1 for large text

### 6.2 Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Form inputs have associated labels
- [ ] Interactive elements have focus states
- [ ] Color is not the only means of conveying information
- [ ] Content is readable and navigable with screen readers
- [ ] Videos have captions/transcripts

---

## 7. SEO Best Practices

### 7.1 Metadata Management

```typescript
// app/layout.tsx or page.tsx
export const metadata: Metadata = {
  title: 'ChristLife City Cathedral | Welcome Home',
  description: 'Join us at ChristLife City Cathedral for worship, community, and spiritual growth.',
  keywords: ['church', 'cathedral', 'worship', 'community', 'faith'],
  openGraph: {
    title: 'ChristLife City Cathedral',
    description: 'Join our vibrant community of faith',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChristLife City Cathedral',
    description: 'Join our vibrant community of faith',
  },
};
```

### 7.2 SEO Requirements

- **Unique titles**: Each page has a unique, descriptive title
- **Meta descriptions**: Compelling descriptions under 160 characters
- **Structured data**: Use JSON-LD for events, organization info
- **Sitemap**: Generate and submit sitemap.xml
- **Robots.txt**: Configure for proper crawling
- **Canonical URLs**: Prevent duplicate content issues

---

## 8. Testing Strategy

### 8.1 Testing Pyramid

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test critical user flows

### 8.2 Testing Tools (Future Implementation)

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright/Cypress**: E2E testing

---

## 9. Security Principles

### 9.1 Security Best Practices

- **Input validation**: Validate and sanitize all user inputs
- **XSS prevention**: Use React's built-in XSS protection
- **CSRF protection**: Implement CSRF tokens for forms
- **Environment variables**: Never commit secrets to version control
- **HTTPS only**: Enforce HTTPS in production
- **Content Security Policy**: Implement CSP headers

### 9.2 Data Protection

- **Personal data**: Handle contact form data securely
- **Email validation**: Validate email addresses server-side
- **Rate limiting**: Prevent abuse of contact forms
- **Privacy policy**: Include clear privacy policy

---

## 10. Version Control & Collaboration

### 10.1 Git Workflow

- **Branch naming**: `feature/`, `bugfix/`, `hotfix/` prefixes
- **Commit messages**: Follow conventional commits format
- **Pull requests**: Required for all changes
- **Code review**: At least one approval before merge

### 10.2 Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example**:
```
feat(events): add event registration form

- Add form validation
- Integrate with backend API
- Add success/error notifications

Closes #123
```

---

## 11. Documentation Standards

### 11.1 Code Documentation

- **JSDoc comments**: For complex functions and utilities
- **Component documentation**: Props, usage examples
- **README files**: For each major feature/module
- **Inline comments**: For complex logic only (code should be self-documenting)

```typescript
/**
 * Formats a date string for display in event cards
 * @param date - ISO 8601 date string
 * @param format - Display format (short, long, full)
 * @returns Formatted date string
 */
export function formatEventDate(
  date: string, 
  format: 'short' | 'long' | 'full' = 'long'
): string {
  // Implementation
}
```

### 11.2 Documentation Files

- **README.md**: Project overview, setup instructions
- **CONTRIBUTING.md**: Contribution guidelines
- **docs/**: Detailed documentation (architecture, API, etc.)

---

## 12. Deployment & DevOps

### 12.1 Environment Configuration

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Live production environment

### 12.2 Environment Variables

```bash
# .env.local (never commit)
NEXT_PUBLIC_SITE_URL=https://christlifecathedral.com
NEXT_PUBLIC_API_URL=https://api.christlifecathedral.com

# Private variables (server-side only)
DATABASE_URL=postgresql://...
EMAIL_API_KEY=...
```

### 12.3 Deployment Strategy

- **Vercel**: Recommended hosting platform for Next.js
- **Automatic deployments**: Deploy on push to main branch
- **Preview deployments**: For pull requests
- **Environment-specific configs**: Use Vercel environment variables

---

## 13. Error Handling & Logging

### 13.1 Error Boundaries

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### 13.2 Error Handling Patterns

- **Graceful degradation**: Show fallback UI on errors
- **User-friendly messages**: Avoid technical jargon
- **Error logging**: Log errors for debugging (production)
- **Recovery options**: Provide ways to recover from errors

---

## 14. Internationalization (Future Consideration)

### 14.1 i18n Strategy

- **next-intl**: Recommended i18n library for Next.js
- **Language support**: Start with English, plan for expansion
- **Content structure**: Separate content from code
- **RTL support**: Consider right-to-left languages

---

## 15. Analytics & Monitoring

### 15.1 Analytics Integration

- **Google Analytics**: Track page views and user behavior
- **Vercel Analytics**: Monitor performance metrics
- **Event tracking**: Track key user interactions

### 15.2 Monitoring

- **Error tracking**: Sentry or similar service
- **Performance monitoring**: Core Web Vitals tracking
- **Uptime monitoring**: Monitor site availability

---

## 16. Content Management

### 16.1 Content Strategy

For initial version:
- **Static content**: Hardcoded in components
- **Image management**: Store in `/public` directory

Future considerations:
- **CMS integration**: Sanity, Contentful, or similar
- **Dynamic content**: Events, sermons, blog posts
- **Media library**: Organized asset management

---

## 17. Progressive Enhancement

### 17.1 Core Principles

- **Baseline functionality**: Site works without JavaScript
- **Enhanced experience**: JavaScript adds interactivity
- **Graceful degradation**: Features degrade gracefully
- **Performance budget**: Monitor bundle size

---

## 18. Code Review Checklist

Before submitting code for review:

- [ ] Code follows TypeScript and React best practices
- [ ] Components are properly typed
- [ ] Styles use Tailwind utilities and design tokens
- [ ] Images are optimized using Next.js Image component
- [ ] Accessibility standards are met
- [ ] SEO metadata is included
- [ ] Error handling is implemented
- [ ] Code is documented where necessary
- [ ] No console.log statements in production code
- [ ] Environment variables are properly configured

---

## 19. Performance Budget

### 19.1 Bundle Size Limits

- **Initial JS bundle**: < 200KB (gzipped)
- **Page-specific bundles**: < 50KB (gzipped)
- **CSS bundle**: < 50KB (gzipped)
- **Images**: WebP format, properly sized

### 19.2 Monitoring

- Use `@next/bundle-analyzer` to track bundle sizes
- Set up CI checks for bundle size limits
- Regular performance audits using Lighthouse

---

## 20. Future Enhancements

### 20.1 Planned Features

- **Event registration system**: Allow users to register for events
- **Sermon archive**: Video/audio sermon library
- **Online giving**: Secure donation platform
- **Member portal**: Authentication and member-specific content
- **Blog/News**: Content management for updates
- **Live streaming**: Integrate live service streaming

### 20.2 Technical Improvements

- **API layer**: Backend API for dynamic content
- **Database**: PostgreSQL or similar for data persistence
- **Authentication**: NextAuth.js for user authentication
- **Email service**: Automated email notifications
- **Search functionality**: Site-wide search
- **Mobile app**: React Native companion app

---

## Conclusion

These design principles serve as the foundation for building a high-quality, maintainable, and scalable web application for ChristLife City Cathedral. All team members should familiarize themselves with these standards and apply them consistently throughout the development process.

> [!NOTE]
> This is a living document. As the project evolves and new best practices emerge, these principles should be updated accordingly. Propose changes through pull requests with clear justification.

---

**Document Version**: 1.0  
**Last Updated**: February 2026  
**Maintained By**: ChristLife Development Team
