---
description: Setup development environment for ChristLife
---

# Setup Development Environment

Follow these steps to set up your local development environment for the ChristLife project.

## Prerequisites

Ensure you have the following installed:
- Node.js 20+ (check with `node --version`)
- Yarn 4.12.0+ (managed via packageManager in package.json)

## Setup Steps

1. Clone the repository (if not already done)
```bash
git clone <repository-url>
cd christlife
```

2. Install dependencies
// turbo
```bash
yarn install
```

3. Create environment file
```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your configuration
```bash
# Add your environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Start the development server
// turbo
```bash
yarn dev
```

6. Open your browser to http://localhost:3000

## Verification

- Development server should be running on port 3000
- Hot reload should work when you edit files
- No TypeScript errors should appear in the terminal

## Troubleshooting

**Port already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependency issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
yarn install
```
