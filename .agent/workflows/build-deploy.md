---
description: Build and deploy the ChristLife application
---

# Build and Deploy

Follow these steps to build and deploy the ChristLife application to production.

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Environment variables configured
- [ ] SEO metadata complete for all pages
- [ ] Images optimized
- [ ] Accessibility audit passed
- [ ] Performance audit passed (Lighthouse score > 90)

## Local Production Build

1. Run ESLint to check for errors
// turbo
```bash
yarn lint
```

2. Build the production bundle
```bash
yarn build
```

3. Analyze bundle size (optional)
```bash
# Install bundle analyzer
yarn add -D @next/bundle-analyzer

# Update next.config.ts to use analyzer
# Then run build with analysis
ANALYZE=true yarn build
```

4. Test production build locally
```bash
yarn start
```

5. Verify the application at http://localhost:3000

## Deploy to Vercel (Recommended)

### Initial Setup

1. Install Vercel CLI (if not already installed)
```bash
yarn global add vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Link project to Vercel
```bash
vercel link
```

### Deploy to Production

1. Deploy to production
```bash
vercel --prod
```

2. Verify deployment URL provided by Vercel

### Environment Variables

1. Set environment variables in Vercel dashboard
   - Go to Project Settings → Environment Variables
   - Add all required variables:
     - `NEXT_PUBLIC_SITE_URL`
     - `NEXT_PUBLIC_API_URL`
     - Any private server-side variables

2. Redeploy after adding environment variables
```bash
vercel --prod
```

## Automatic Deployments

### Setup GitHub Integration

1. Connect repository to Vercel
   - Go to Vercel dashboard
   - Import Git Repository
   - Select ChristLife repository

2. Configure deployment settings
   - **Production Branch**: `main`
   - **Preview Branches**: All other branches
   - **Build Command**: `yarn build`
   - **Output Directory**: `.next`

3. Enable automatic deployments
   - Push to `main` → Production deployment
   - Push to other branches → Preview deployment
   - Pull requests → Preview deployment with unique URL

## Post-Deployment Verification

1. Check deployment status in Vercel dashboard

2. Verify production URL
```bash
curl -I https://christlifecathedral.com
```

3. Run Lighthouse audit
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for Performance, Accessibility, SEO

4. Test critical user flows
   - [ ] Homepage loads correctly
   - [ ] Navigation works
   - [ ] Events page displays
   - [ ] Contact form submits
   - [ ] Gallery loads images

5. Monitor for errors
   - Check Vercel logs
   - Monitor error tracking (if configured)

## Rollback Procedure

If deployment has issues:

1. Go to Vercel dashboard → Deployments

2. Find previous working deployment

3. Click "Promote to Production"

Or via CLI:
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

## Performance Monitoring

After deployment, monitor:
- Core Web Vitals in Vercel Analytics
- Error rates in Vercel logs
- User feedback and bug reports

## Domain Configuration

1. Add custom domain in Vercel
   - Go to Project Settings → Domains
   - Add `christlifecathedral.com`
   - Add `www.christlifecathedral.com`

2. Update DNS records
   - Add A record pointing to Vercel IP
   - Add CNAME record for www subdomain

3. Enable HTTPS (automatic with Vercel)

4. Verify SSL certificate is active
