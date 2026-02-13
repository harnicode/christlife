# Git and Version Control Standards

## Commit Messages

### Conventional Commits Format
- FOLLOW conventional commits specification
- USE consistent format: `type(scope): subject`
- KEEP subject line under 50 characters
- USE imperative mood ("add" not "added")

```bash
# Format
type(scope): subject

body (optional)

footer (optional)

# Types
feat     - New feature
fix      - Bug fix
docs     - Documentation changes
style    - Code style changes (formatting, no logic change)
refactor - Code refactoring
test     - Adding or updating tests
chore    - Maintenance tasks
perf     - Performance improvements
```

### Examples
```bash
# ✅ Good
feat(events): add event registration form
fix(contact): resolve email validation issue
docs(readme): update setup instructions
style(components): format EventCard component
refactor(api): extract email service to separate module

# ❌ Avoid
updated stuff
fixed bug
changes
WIP
```

### Commit Body and Footer
```bash
feat(events): add event registration form

- Add form validation with Zod
- Integrate with backend API
- Add success/error notifications
- Implement loading states

Closes #123
```

## Branch Naming

### Branch Prefixes
- USE consistent prefixes
- KEEP names descriptive but concise
- USE kebab-case

```bash
# Prefixes
feature/   - New features
bugfix/    - Bug fixes
hotfix/    - Urgent production fixes
refactor/  - Code refactoring
docs/      - Documentation updates
chore/     - Maintenance tasks

# ✅ Good
feature/event-registration
bugfix/contact-form-validation
hotfix/critical-security-patch
refactor/extract-email-service
docs/update-api-documentation

# ❌ Avoid
my-branch
test
new-feature
fix
```

## Workflow

### Branch Strategy
- MAIN branch is production-ready
- CREATE feature branches from main
- MERGE via pull requests only
- DELETE branches after merging

```bash
# Create feature branch
git checkout -b feature/event-registration

# Work on feature
git add .
git commit -m "feat(events): add registration form"

# Push to remote
git push origin feature/event-registration

# Create pull request
# After approval and merge, delete branch
git branch -d feature/event-registration
```

### Pull Requests
- CREATE descriptive PR titles
- PROVIDE context in PR description
- REFERENCE related issues
- REQUEST review before merging
- ENSURE CI passes

```markdown
## Description
Add event registration form with validation and API integration

## Changes
- Created EventRegistrationForm component
- Added Zod validation schema
- Integrated with backend API
- Added loading and error states

## Testing
- [ ] Tested form validation
- [ ] Tested successful submission
- [ ] Tested error handling
- [ ] Tested on mobile devices

## Related Issues
Closes #123
```

## What to Commit

### Include
- Source code files
- Configuration files
- Documentation
- Package manifests (package.json, yarn.lock)
- Public assets (images, fonts)

### Exclude (via .gitignore)
- `node_modules/`
- `.next/`
- `.env.local`
- `.env*.local`
- Build outputs
- IDE-specific files
- OS-specific files (.DS_Store)
- Log files

```bash
# .gitignore
node_modules/
.next/
.env.local
.env*.local
*.log
.DS_Store
.vscode/
.idea/
```

## Commit Frequency

### Best Practices
- COMMIT often with logical changes
- KEEP commits focused and atomic
- AVOID committing unrelated changes together
- COMMIT working code (don't break the build)

```bash
# ✅ Good - Atomic commits
git commit -m "feat(events): add EventCard component"
git commit -m "feat(events): add event filtering"
git commit -m "test(events): add EventCard tests"

# ❌ Avoid - Too many changes
git commit -m "add events page, contact form, and fix bugs"
```

## Code Review

### Before Requesting Review
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] No console.log statements
- [ ] TypeScript errors resolved
- [ ] ESLint passes
- [ ] Documentation updated
- [ ] Self-review completed

### Reviewing Code
- PROVIDE constructive feedback
- ASK questions for clarification
- SUGGEST improvements
- APPROVE when ready
- REQUEST changes if needed

## Merge Strategy

### Squash and Merge (Recommended)
- SQUASH feature branch commits
- CREATE clean, linear history
- KEEP main branch readable

### Merge Commit
- PRESERVE feature branch history
- USE for significant features
- MAINTAIN context

## Tags and Releases

### Semantic Versioning
- FOLLOW semver (MAJOR.MINOR.PATCH)
- TAG releases appropriately
- DOCUMENT changes in release notes

```bash
# Create tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag
git push origin v1.0.0
```

## Collaboration

### Communication
- COMMUNICATE in PR comments
- DISCUSS major changes before implementing
- UPDATE team on progress
- RESOLVE conflicts promptly

### Conflict Resolution
- PULL latest changes regularly
- RESOLVE conflicts carefully
- TEST after resolving conflicts
- ASK for help if unsure

```bash
# Update local branch with main
git checkout main
git pull origin main
git checkout feature/my-feature
git merge main

# Resolve conflicts
# Test changes
git commit -m "merge: resolve conflicts with main"
```

## Best Practices

### Do's
- ✅ Commit often with meaningful messages
- ✅ Pull latest changes before starting work
- ✅ Create feature branches for new work
- ✅ Write descriptive commit messages
- ✅ Review your own code before requesting review
- ✅ Keep commits focused and atomic
- ✅ Update documentation with code changes

### Don'ts
- ❌ Commit directly to main
- ❌ Commit secrets or sensitive data
- ❌ Commit generated files (build outputs)
- ❌ Use vague commit messages
- ❌ Commit broken code
- ❌ Force push to shared branches
- ❌ Ignore merge conflicts

## Emergency Procedures

### Reverting Commits
```bash
# Revert last commit
git revert HEAD

# Revert specific commit
git revert <commit-hash>
```

### Hotfixes
```bash
# Create hotfix branch from main
git checkout -b hotfix/critical-bug main

# Fix and commit
git commit -m "hotfix: resolve critical security issue"

# Merge to main
git checkout main
git merge hotfix/critical-bug

# Tag release
git tag -a v1.0.1 -m "Hotfix: critical security patch"
```

## Git Hooks (Future)

### Pre-commit Hooks
- RUN linting before commit
- RUN type checking
- FORMAT code automatically

### Pre-push Hooks
- RUN tests before push
- VERIFY build succeeds
