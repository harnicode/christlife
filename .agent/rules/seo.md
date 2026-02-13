# SEO Standards

## Metadata Management

### Page Metadata
- ALWAYS export metadata for every page
- INCLUDE unique, descriptive title (< 60 characters)
- INCLUDE compelling description (< 160 characters)
- ADD relevant keywords
- IMPLEMENT Open Graph and Twitter card metadata

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | ChristLife City Cathedral',
  description: 'Join us for worship services, community events, and special gatherings at ChristLife City Cathedral.',
  keywords: ['church events', 'worship services', 'community gatherings', 'cathedral'],
  openGraph: {
    title: 'Events | ChristLife City Cathedral',
    description: 'Join us for worship services and community events',
    images: ['/images/og-events.jpg'],
    type: 'website',
    url: 'https://christlifecathedral.com/events',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | ChristLife City Cathedral',
    description: 'Join us for worship services and community events',
    images: ['/images/og-events.jpg'],
  },
};
```

### Title Best Practices
- MAKE titles unique for each page
- INCLUDE brand name (ChristLife City Cathedral)
- PLACE most important keywords first
- KEEP under 60 characters to avoid truncation

```typescript
// ✅ Good
title: 'Sunday Worship Services | ChristLife City Cathedral'

// ❌ Avoid - Too generic
title: 'Services'

// ❌ Avoid - Too long
title: 'Join us for our amazing Sunday morning worship services with contemporary music and inspiring messages at ChristLife City Cathedral'
```

### Meta Descriptions
- WRITE compelling, actionable descriptions
- INCLUDE primary keywords naturally
- KEEP under 160 characters
- MAKE each description unique

```typescript
// ✅ Good
description: 'Join us every Sunday at 9am and 11am for inspiring worship, biblical teaching, and community fellowship at ChristLife City Cathedral.'

// ❌ Avoid - Too short
description: 'Church services'

// ❌ Avoid - Keyword stuffing
description: 'Church services, worship services, Sunday services, cathedral services, Christian services'
```

## Structured Data

### JSON-LD Implementation
- IMPLEMENT structured data for organization
- ADD structured data for events
- USE Schema.org vocabulary

```typescript
// app/layout.tsx or specific pages
export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'ChristLife City Cathedral',
    url: 'https://christlifecathedral.com',
    logo: 'https://christlifecathedral.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'General Inquiries',
    },
  };

  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Event Schema
```typescript
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Easter Sunday Service',
  startDate: '2024-04-09T09:00:00',
  endDate: '2024-04-09T11:00:00',
  location: {
    '@type': 'Place',
    name: 'ChristLife City Cathedral',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
    },
  },
  description: 'Join us for a special Easter Sunday celebration',
  image: 'https://christlifecathedral.com/images/easter-2024.jpg',
};
```

## Semantic HTML

### Proper Structure
- USE semantic HTML5 elements
- MAINTAIN proper heading hierarchy
- IMPLEMENT landmark regions

```typescript
// ✅ Good
<header>
  <nav aria-label="Main navigation">
    {/* Navigation */}
  </nav>
</header>

<main id="main-content">
  <article>
    <h1>Page Title</h1>
    {/* Content */}
  </article>
</main>

<footer>
  {/* Footer content */}
</footer>
```

## URLs and Navigation

### URL Structure
- USE descriptive, readable URLs
- KEEP URLs short and meaningful
- USE hyphens to separate words
- AVOID special characters

```typescript
// ✅ Good
/events/easter-sunday-service
/about/our-mission
/contact

// ❌ Avoid
/events?id=123
/page1
/events_easter_sunday
```

### Internal Linking
- CREATE clear navigation structure
- USE descriptive anchor text
- IMPLEMENT breadcrumbs for deep pages
- ENSURE all pages are reachable

## Images and Media

### Image SEO
- PROVIDE descriptive alt text
- USE descriptive filenames
- OPTIMIZE image file sizes
- IMPLEMENT lazy loading

```typescript
// ✅ Good
<Image 
  src="/images/easter-sunday-service-2024.jpg"
  alt="Congregation celebrating Easter Sunday service at ChristLife Cathedral with choir and worship team"
  width={800}
  height={600}
/>

// ❌ Avoid
<Image 
  src="/IMG_1234.jpg"
  alt="image"
  width={800}
  height={600}
/>
```

## Performance and SEO

### Core Web Vitals
- OPTIMIZE for Core Web Vitals (impacts SEO rankings)
- ENSURE fast page load times
- MINIMIZE layout shifts
- IMPROVE interactivity

### Mobile Optimization
- ENSURE mobile-responsive design
- TEST on mobile devices
- OPTIMIZE for mobile performance
- USE mobile-friendly navigation

## Content Quality

### Content Guidelines
- WRITE unique, valuable content
- AVOID duplicate content
- UPDATE content regularly
- USE natural language (avoid keyword stuffing)

### Heading Usage
- USE one H1 per page
- MAKE H1 descriptive and keyword-rich
- USE H2-H6 for content hierarchy
- ENSURE headings describe content

```typescript
// ✅ Good
<h1>Sunday Worship Services at ChristLife Cathedral</h1>
<h2>Service Times</h2>
<h3>Morning Service</h3>

// ❌ Avoid
<h1>Welcome</h1>
<h3>Services</h3> {/* Skipped H2 */}
```

## Sitemap and Robots

### Sitemap.xml
- GENERATE sitemap automatically
- INCLUDE all important pages
- UPDATE when adding new pages
- SUBMIT to search engines

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://christlifecathedral.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://christlifecathedral.com/events',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Add more pages
  ];
}
```

### Robots.txt
```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://christlifecathedral.com/sitemap.xml',
  };
}
```

## Social Media Integration

### Open Graph
- IMPLEMENT Open Graph tags
- USE high-quality images (1200x630px)
- PROVIDE compelling titles and descriptions

### Twitter Cards
- IMPLEMENT Twitter Card metadata
- USE appropriate card type
- TEST with Twitter Card Validator

## Canonical URLs

### Prevent Duplicate Content
- IMPLEMENT canonical URLs
- HANDLE www vs non-www
- MANAGE trailing slashes consistently

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://christlifecathedral.com/events',
  },
};
```

## Local SEO (Church Context)

### Google Business Profile
- MAINTAIN accurate business information
- INCLUDE service times
- ADD photos regularly
- RESPOND to reviews

### Local Keywords
- INCLUDE location in content naturally
- MENTION neighborhood/city
- CREATE location-specific pages if multiple locations

## Analytics and Monitoring

### Track Performance
- IMPLEMENT Google Analytics
- MONITOR search rankings
- TRACK organic traffic
- ANALYZE user behavior

### Search Console
- VERIFY site with Google Search Console
- MONITOR indexing status
- FIX crawl errors
- SUBMIT sitemaps

## SEO Checklist

Before publishing pages:
- [ ] Unique, descriptive title (< 60 chars)
- [ ] Compelling meta description (< 160 chars)
- [ ] Relevant keywords included naturally
- [ ] Open Graph metadata complete
- [ ] Twitter Card metadata complete
- [ ] Structured data implemented (if applicable)
- [ ] Images have descriptive alt text
- [ ] URLs are descriptive and clean
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Internal links use descriptive anchor text
- [ ] Page loads quickly (< 2.5s LCP)
- [ ] Mobile-responsive design
- [ ] No duplicate content
- [ ] Canonical URL set
