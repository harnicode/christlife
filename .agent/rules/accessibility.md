# Accessibility Standards (WCAG 2.1 AA)

## Core Principles

### WCAG Compliance
- ALWAYS meet WCAG 2.1 Level AA standards minimum
- AIM for AAA where possible
- TEST with accessibility tools regularly

## Semantic HTML

### Use Proper Elements
- ALWAYS use semantic HTML5 elements
- AVOID using `<div>` when semantic element exists
- USE proper heading hierarchy

```typescript
// ✅ Good - Semantic HTML
<article>
  <header>
    <h2>Event Title</h2>
    <time dateTime="2024-12-25">December 25, 2024</time>
  </header>
  <p>Event description...</p>
  <footer>
    <button>Register</button>
  </footer>
</article>

// ❌ Avoid - Non-semantic
<div>
  <div>
    <div>Event Title</div>
    <div>December 25, 2024</div>
  </div>
  <div>Event description...</div>
  <div onClick={register}>Register</div>
</div>
```

### Heading Hierarchy
- START with single `<h1>` per page
- FOLLOW sequential order (h1 → h2 → h3)
- NEVER skip heading levels

```typescript
// ✅ Good
<h1>Events</h1>
<h2>Upcoming Events</h2>
<h3>This Week</h3>

// ❌ Avoid
<h1>Events</h1>
<h3>This Week</h3> {/* Skipped h2 */}
```

## ARIA Labels and Roles

### When to Use ARIA
- USE ARIA when semantic HTML is insufficient
- PREFER semantic HTML over ARIA
- FOLLOW "No ARIA is better than bad ARIA"

```typescript
// ✅ Good - Semantic HTML (no ARIA needed)
<button>Submit</button>

// ✅ Good - ARIA when needed
<div role="button" tabIndex={0} aria-label="Close dialog">×</div>

// ❌ Avoid - Redundant ARIA
<button role="button" aria-label="Submit">Submit</button>
```

### Common ARIA Attributes
- USE `aria-label` for elements without visible text
- USE `aria-labelledby` to reference existing labels
- USE `aria-describedby` for additional descriptions
- USE `aria-hidden` to hide decorative elements from screen readers

```typescript
// Icon button needs aria-label
<button aria-label="Close menu">
  <XIcon />
</button>

// Decorative image
<img src="/pattern.svg" alt="" aria-hidden="true" />
```

## Keyboard Navigation

### Interactive Elements
- ENSURE all interactive elements are keyboard accessible
- USE proper `tabIndex` values (0 for normal, -1 to remove from tab order)
- IMPLEMENT keyboard event handlers alongside click handlers

```typescript
// ✅ Good - Keyboard accessible
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Click me
</div>
```

### Focus Management
- PROVIDE visible focus indicators
- MANAGE focus for modals and dialogs
- RESTORE focus when closing modals

```typescript
// ✅ Good - Visible focus state
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Submit
</button>
```

### Skip Links
- PROVIDE skip navigation links
- ALLOW users to skip to main content
- HIDE visually but keep accessible

```typescript
// ✅ Good - Skip link
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground"
>
  Skip to main content
</a>
```

## Forms

### Labels
- ALWAYS associate labels with inputs
- USE `<label>` element with `htmlFor` attribute
- PROVIDE visible labels (avoid placeholder-only)

```typescript
// ✅ Good
<label htmlFor="email" className="block mb-2">
  Email Address
</label>
<input 
  id="email" 
  type="email" 
  name="email"
  aria-required="true"
/>

// ❌ Avoid
<input type="email" placeholder="Email" />
```

### Error Messages
- ASSOCIATE error messages with inputs using `aria-describedby`
- PROVIDE clear, actionable error messages
- ANNOUNCE errors to screen readers

```typescript
// ✅ Good
<input 
  id="email"
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? "email-error" : undefined}
/>
{hasError && (
  <p id="email-error" className="text-destructive" role="alert">
    Please enter a valid email address
  </p>
)}
```

### Required Fields
- INDICATE required fields visually and programmatically
- USE `aria-required` or `required` attribute
- PROVIDE clear indication (not just color)

```typescript
// ✅ Good
<label htmlFor="name">
  Name <span className="text-destructive" aria-label="required">*</span>
</label>
<input id="name" type="text" required aria-required="true" />
```

## Color and Contrast

### Contrast Ratios
- MAINTAIN 4.5:1 contrast ratio for normal text
- MAINTAIN 3:1 contrast ratio for large text (18pt+ or 14pt+ bold)
- MAINTAIN 3:1 contrast ratio for UI components

### Color Independence
- NEVER use color as the only means of conveying information
- PROVIDE additional indicators (icons, text, patterns)

```typescript
// ✅ Good - Multiple indicators
<div className={cn(
  "p-4 rounded-lg",
  status === 'error' && "bg-destructive/10 border-destructive"
)}>
  <AlertCircle className="text-destructive" />
  <span className="text-destructive font-semibold">Error:</span>
  {message}
</div>

// ❌ Avoid - Color only
<div className={status === 'error' ? "text-red-500" : "text-green-500"}>
  {message}
</div>
```

## Images

### Alt Text
- ALWAYS provide meaningful alt text for images
- DESCRIBE the content and context
- USE empty alt (`alt=""`) for decorative images

```typescript
// ✅ Good - Descriptive alt text
<Image 
  src="/pastor-john.jpg" 
  alt="Pastor John Smith delivering Sunday morning sermon at ChristLife Cathedral"
  width={800}
  height={600}
/>

// ✅ Good - Decorative image
<Image 
  src="/decorative-pattern.svg" 
  alt="" 
  aria-hidden="true"
  width={100}
  height={100}
/>

// ❌ Avoid - Generic alt text
<Image src="/pastor.jpg" alt="image" width={800} height={600} />
```

## Media

### Video and Audio
- PROVIDE captions for videos
- PROVIDE transcripts for audio content
- ENSURE media players are keyboard accessible

```typescript
// ✅ Good
<video controls>
  <source src="/sermon.mp4" type="video/mp4" />
  <track kind="captions" src="/sermon-captions.vtt" srcLang="en" label="English" />
</video>
```

## Dynamic Content

### Live Regions
- USE `aria-live` for dynamic content updates
- ANNOUNCE important changes to screen readers
- CHOOSE appropriate politeness level

```typescript
// ✅ Good - Polite announcement
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>

// ✅ Good - Assertive for urgent updates
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>
```

## Testing

### Accessibility Testing
- TEST with keyboard navigation only
- TEST with screen readers (NVDA, JAWS, VoiceOver)
- USE automated tools (axe, Lighthouse)
- CONDUCT manual testing

### Testing Checklist
- [ ] All interactive elements keyboard accessible
- [ ] All images have appropriate alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] Forms have proper labels and error messages
- [ ] Heading hierarchy is logical
- [ ] Focus indicators are visible
- [ ] Screen reader announces content correctly
- [ ] No keyboard traps exist

## Church Context Considerations

### Elderly Users
- USE larger font sizes (minimum 16px)
- PROVIDE high contrast
- ENSURE touch targets are large enough (minimum 44x44px)
- KEEP navigation simple and clear

### Diverse Abilities
- CONSIDER users with various disabilities
- PROVIDE multiple ways to access content
- ENSURE content is understandable
- TEST with diverse user groups
