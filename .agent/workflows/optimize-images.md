---
description: Optimize images for web performance
---

# Optimize Images

Follow these steps to properly optimize and use images in the ChristLife application.

## Image Preparation

1. Choose appropriate image format
   - **Photos**: WebP (with JPEG fallback)
   - **Graphics/Logos**: SVG (vector) or PNG
   - **Icons**: SVG preferred

2. Resize images to appropriate dimensions
   - **Hero images**: 1920x1080px max
   - **Event cards**: 800x600px max
   - **Thumbnails**: 400x300px max
   - **Profile images**: 500x500px max

3. Compress images before adding to project
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target: < 200KB for hero images, < 100KB for cards

## Adding Images to Project

1. Place images in `public/images/` directory
```bash
# Create organized subdirectories
mkdir -p public/images/events
mkdir -p public/images/gallery
mkdir -p public/images/team
```

2. Use descriptive filenames
   - ✅ Good: `easter-service-2024.jpg`
   - ❌ Bad: `IMG_1234.jpg`

## Using Next.js Image Component

1. Import the Image component
```typescript
import Image from 'next/image';
```

2. Use for all images (required for optimization)
```typescript
<Image 
  src="/images/events/easter-service.jpg"
  alt="Easter Sunday Service at ChristLife Cathedral"
  width={800}
  height={600}
  priority // Only for above-fold images
/>
```

3. For dynamic images from external sources
```typescript
<Image 
  src={imageUrl}
  alt={altText}
  width={800}
  height={600}
  unoptimized={false} // Let Next.js optimize
/>
```

4. Configure remote image domains in `next.config.ts`
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
  },
};
```

## Image Optimization Checklist

- [ ] Image is properly sized (not oversized)
- [ ] Image is compressed
- [ ] Using Next.js `<Image>` component
- [ ] Alt text is descriptive and meaningful
- [ ] Width and height are specified
- [ ] `priority` prop used for above-fold images
- [ ] `loading="lazy"` for below-fold images (default)
- [ ] Responsive sizes configured if needed

## Responsive Images

1. Use `sizes` prop for responsive images
```typescript
<Image 
  src="/images/hero.jpg"
  alt="ChristLife Cathedral"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority
/>
```

2. Use `fill` for container-based sizing
```typescript
<div className="relative w-full h-96">
  <Image 
    src="/images/event.jpg"
    alt="Event"
    fill
    className="object-cover"
  />
</div>
```

## Background Images

For background images, use CSS with optimized images:

```typescript
<div 
  className="bg-cover bg-center h-96"
  style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
>
  {/* Content */}
</div>
```

Or better, use Image component with fill:
```typescript
<div className="relative h-96">
  <Image 
    src="/images/hero-bg.jpg"
    alt=""
    fill
    className="object-cover -z-10"
  />
  {/* Content */}
</div>
```

## Image Accessibility

1. Always provide meaningful alt text
   - Describe what's in the image
   - Include context relevant to the page
   - For decorative images, use `alt=""`

2. Examples:
```typescript
// ✅ Good
<Image src="/pastor.jpg" alt="Pastor John Smith delivering Sunday sermon" />

// ❌ Bad
<Image src="/pastor.jpg" alt="Pastor" />

// ✅ Decorative
<Image src="/pattern.jpg" alt="" role="presentation" />
```

## Performance Tips

1. Use `priority` only for above-fold images (1-2 per page)

2. Let Next.js handle lazy loading for other images

3. Specify exact dimensions when known
```typescript
// ✅ Better performance
<Image src="/event.jpg" alt="Event" width={800} height={600} />

// ❌ Slower, causes layout shift
<Image src="/event.jpg" alt="Event" fill />
```

4. Use appropriate quality setting
```typescript
<Image 
  src="/image.jpg" 
  alt="Description"
  width={800}
  height={600}
  quality={85} // Default is 75, max is 100
/>
```

## Generating Placeholder Images

For development, use the AI image generation tool:

```typescript
// Request image generation for placeholders
// Example: "Generate a warm, welcoming church interior with natural lighting"
```

Then optimize and add to `public/images/`.
