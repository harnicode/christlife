# Security Standards

## Environment Variables

### Secret Management
- NEVER commit secrets or API keys to version control
- USE `.env.local` for local development (gitignored)
- STORE production secrets in Vercel environment variables
- ROTATE secrets regularly

```bash
# ✅ Good - .env.local (gitignored)
DATABASE_URL=postgresql://localhost/christlife
EMAIL_API_KEY=sk_test_123456

# ❌ Never commit .env files with secrets
```

### Environment Variable Usage
- PREFIX public variables with `NEXT_PUBLIC_`
- KEEP server-side variables private (no prefix)
- VALIDATE environment variables at startup

```typescript
// ✅ Good - Public variable (accessible in browser)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// ✅ Good - Private variable (server-side only)
const apiKey = process.env.EMAIL_API_KEY;

// ❌ Avoid - Exposing private data
const apiKey = process.env.NEXT_PUBLIC_EMAIL_API_KEY; // Don't do this!
```

## Input Validation

### User Input
- ALWAYS validate and sanitize user inputs
- NEVER trust client-side data
- VALIDATE on server-side
- USE type-safe validation libraries (Zod, Yup)

```typescript
import { z } from 'zod';

// ✅ Good - Server-side validation
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export async function submitContactForm(formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };
  
  // Validate
  const validated = contactFormSchema.parse(data);
  
  // Process validated data
}
```

### SQL Injection Prevention
- USE parameterized queries or ORMs
- NEVER concatenate user input into SQL queries
- VALIDATE and escape inputs

```typescript
// ✅ Good - Parameterized query
const user = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// ❌ Avoid - SQL injection risk
const user = await db.query(
  `SELECT * FROM users WHERE email = '${email}'`
);
```

## XSS Prevention

### React's Built-in Protection
- LEVERAGE React's automatic XSS protection
- AVOID `dangerouslySetInnerHTML` when possible
- SANITIZE HTML if you must use it

```typescript
// ✅ Good - React automatically escapes
<div>{userContent}</div>

// ⚠️ Use with caution - Sanitize first
import DOMPurify from 'isomorphic-dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userContent) 
}} />
```

### Content Security Policy
- IMPLEMENT Content Security Policy headers
- RESTRICT script sources
- PREVENT inline script execution

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  },
];
```

## CSRF Protection

### Form Protection
- IMPLEMENT CSRF tokens for forms
- VALIDATE tokens on server-side
- USE SameSite cookies

```typescript
// Server Action with CSRF protection
'use server';

import { cookies } from 'next/headers';

export async function submitForm(formData: FormData) {
  const csrfToken = formData.get('csrf_token');
  const cookieToken = cookies().get('csrf_token')?.value;
  
  if (csrfToken !== cookieToken) {
    throw new Error('Invalid CSRF token');
  }
  
  // Process form
}
```

## Authentication (Future)

### Best Practices
- USE established libraries (NextAuth.js)
- IMPLEMENT secure password hashing (bcrypt, argon2)
- ENFORCE strong password requirements
- IMPLEMENT rate limiting for login attempts

### Session Management
- USE secure, httpOnly cookies
- SET appropriate session timeouts
- IMPLEMENT proper logout functionality
- REGENERATE session IDs after login

## HTTPS

### Enforce HTTPS
- ALWAYS use HTTPS in production
- REDIRECT HTTP to HTTPS
- USE HSTS headers

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];
```

## Data Protection

### Personal Data
- COLLECT only necessary data
- ENCRYPT sensitive data at rest
- USE secure transmission (HTTPS)
- IMPLEMENT data retention policies

### Contact Form Data
- VALIDATE email addresses
- SANITIZE message content
- IMPLEMENT rate limiting
- LOG submissions for security

```typescript
// Rate limiting example
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
});

export async function submitContactForm(formData: FormData) {
  const identifier = getClientIP();
  const { success } = await ratelimit.limit(identifier);
  
  if (!success) {
    throw new Error('Too many requests');
  }
  
  // Process form
}
```

## Dependency Security

### Package Management
- AUDIT dependencies regularly (`yarn audit`)
- UPDATE dependencies promptly
- REMOVE unused dependencies
- USE lock files (yarn.lock)

```bash
# Regular security audits
yarn audit

# Fix vulnerabilities
yarn audit --fix
```

### Supply Chain Security
- VERIFY package integrity
- USE trusted package sources
- REVIEW dependency changes
- MONITOR for vulnerabilities

## Headers Security

### Security Headers
- IMPLEMENT security headers
- PREVENT clickjacking
- CONTROL referrer information

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Error Handling

### Secure Error Messages
- NEVER expose sensitive information in errors
- LOG detailed errors server-side
- SHOW generic messages to users
- AVOID stack traces in production

```typescript
// ✅ Good
try {
  await processPayment();
} catch (error) {
  console.error('Payment error:', error); // Log detailed error
  throw new Error('Payment processing failed'); // Generic user message
}

// ❌ Avoid
catch (error) {
  throw error; // Exposes internal details
}
```

## File Uploads (Future)

### Upload Security
- VALIDATE file types
- LIMIT file sizes
- SCAN for malware
- STORE files securely

```typescript
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 5 * 1024 * 1024; // 5MB

function validateFile(file: File) {
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
}
```

## API Security

### Rate Limiting
- IMPLEMENT rate limiting for APIs
- PREVENT abuse and DoS attacks
- USE appropriate limits

### API Keys
- REQUIRE authentication for sensitive endpoints
- ROTATE API keys regularly
- MONITOR API usage

## Logging and Monitoring

### Security Logging
- LOG security events
- MONITOR for suspicious activity
- IMPLEMENT alerting
- RETAIN logs appropriately

### What to Log
- Authentication attempts
- Form submissions
- Failed validations
- Error occurrences
- API requests

### What NOT to Log
- Passwords
- API keys
- Credit card numbers
- Personal sensitive data

## Security Checklist

Before deployment:
- [ ] No secrets in code or version control
- [ ] Environment variables properly configured
- [ ] Input validation implemented
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CSRF protection implemented
- [ ] XSS prevention measures in place
- [ ] Dependencies audited
- [ ] Error messages don't expose sensitive info
- [ ] Rate limiting implemented for forms
- [ ] Logging configured (without sensitive data)
- [ ] Content Security Policy configured
