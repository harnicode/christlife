# README

This directory contains the coding standards and best practices for the ChristLife City Cathedral web application.

## Rule Categories

### [typescript.md](./typescript.md)
TypeScript standards including strict mode, type definitions, interfaces vs types, generics, and import/export conventions.

### [components.md](./components.md)
React component standards covering functional components, props, hooks, composition, performance optimization, and server vs client components.

### [styling.md](./styling.md)
Styling standards for Tailwind CSS, design tokens, responsive design, component variants, animations, and accessibility in styling.

### [accessibility.md](./accessibility.md)
WCAG 2.1 AA compliance standards including semantic HTML, ARIA labels, keyboard navigation, forms, color contrast, and testing.

### [performance.md](./performance.md)
Performance standards covering Core Web Vitals, bundle size limits, image optimization, code splitting, caching, and monitoring.

### [seo.md](./seo.md)
SEO best practices including metadata management, structured data, semantic HTML, URLs, sitemaps, and local SEO for church context.

### [security.md](./security.md)
Security standards covering environment variables, input validation, XSS prevention, CSRF protection, HTTPS, data protection, and dependency security.

### [git.md](./git.md)
Git and version control standards including conventional commits, branch naming, workflow, pull requests, and code review practices.

## How to Use These Rules

1. **Read relevant rules** before starting work on a feature
2. **Reference rules** during code review
3. **Update rules** as the project evolves (via pull request)
4. **Enforce rules** through automated tooling where possible

## Rule Priority

When conflicts arise, prioritize in this order:
1. **Security** - Never compromise security
2. **Accessibility** - Ensure all users can access content
3. **Performance** - Maintain fast, responsive experience
4. **User Experience** - Prioritize user needs
5. **Code Quality** - Maintain clean, maintainable code

## Automated Enforcement

Many rules are enforced through:
- **TypeScript** - Type safety and strict mode
- **ESLint** - Code quality and style
- **Prettier** - Code formatting
- **Git hooks** - Pre-commit and pre-push checks (future)

## Contributing to Rules

To propose changes to these rules:
1. Create a feature branch (`docs/update-typescript-rules`)
2. Make your changes with clear justification
3. Create a pull request
4. Discuss with the team
5. Update after approval

## Questions?

If you're unsure about how to apply a rule or if a rule doesn't cover your use case, ask the team for clarification.
