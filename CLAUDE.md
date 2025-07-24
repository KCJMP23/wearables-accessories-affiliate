# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Note**: This project also has `.cursorrules` with additional development guidelines that should be followed.

## Commands

### Essential Development Commands

```bash
# Install all dependencies (run from root)
pnpm install

# Generate Prisma client (required before first run)
pnpm db:generate

# Start both apps in development mode
pnpm dev
# Admin: http://localhost:3001
# Web: http://localhost:3000

# Run individual apps
pnpm dev --filter=admin    # Admin only
pnpm dev --filter=web      # Web only
```

### Build & Production
```bash
# Build all apps
pnpm build

# Build specific app
pnpm build --filter=admin
pnpm build --filter=web

# Start production servers
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint

# Format code
pnpm format
```

### Database Management
```bash
# Generate Prisma client from schema
pnpm db:generate

# Push schema changes to database
pnpm db:push

# Run database migrations
pnpm db:migrate

# Open Prisma Studio (database GUI)
pnpm db:studio

# Reset database (WARNING: deletes all data)
pnpm db:reset
```

### Testing
```bash
# Run all tests
pnpm test

# Unit tests only
pnpm test:unit

# Integration tests
pnpm test:integration

# E2E tests (ensure apps are running first)
pnpm test:e2e

# Test coverage
pnpm test:coverage

# Run tests in specific app
pnpm test --filter=admin
pnpm test --filter=web
```

### Common Development Workflows

1. **Initial Setup**:
   ```bash
   pnpm install
   cp .env.example .env  # Configure environment variables
   pnpm db:generate
   pnpm db:push
   pnpm dev
   ```

2. **Adding New Features**:
   - Database changes: Update `packages/db/schema.prisma` → `pnpm db:generate` → `pnpm db:push`
   - New API routes: Add to `apps/[app]/app/api/`
   - Shared components: Add to `packages/ui/src/components/`
   - Type definitions: Add to `packages/shared-types/src/`

3. **Before Committing**:
   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   ```

4. **Troubleshooting**:
   - Clear all caches: `pnpm clean`
   - Fresh install: `pnpm clean:full`
   - Database issues: `pnpm db:generate && pnpm db:push`

## Architecture Overview

This is a **Universal Affiliate Marketing Template Platform** built as a Turborepo monorepo. The platform allows users to create and manage multiple niche affiliate websites from a single admin dashboard.

### Monorepo Structure

```
affiliate-template-72325/
├── apps/
│   ├── admin/          # Admin dashboard (localhost:3001)
│   └── web/            # Public affiliate site (localhost:3000)
├── packages/
│   ├── ai/             # AI integrations (OpenAI, Claude, Leonardo)
│   ├── cms/            # Payload CMS configuration
│   ├── db/             # Prisma ORM & database schema
│   ├── shared-types/   # Shared TypeScript types
│   ├── ui/             # Shared UI components
│   └── eslint-config-custom/
```

### Technology Stack

- **Monorepo**: Turborepo with pnpm workspaces
- **Frontend**: Next.js 15.4.3 (web) / 14.0.0 (admin), React 19/18, TypeScript 5.4.0
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Database**: Prisma ORM with comprehensive schema (40+ tables)
- **Styling**: Tailwind CSS 3.4.1 (IMPORTANT: Must use v3, NOT v4)
- **Testing**: Jest, React Testing Library, Playwright

### Key Features

1. **Multi-Site Management**: Single admin dashboard managing multiple affiliate sites
2. **AI Content Generation**: Automated blog posts via OpenAI/Claude APIs
3. **Image Generation**: Leonardo.AI integration for featured images
4. **Affiliate Integration**: Amazon Associates API support
5. **Analytics**: Click tracking, conversions, revenue tracking
6. **Content Workflow**: Approval system for AI-generated content
7. **SEO Optimized**: Built for search engine rankings

### Development Patterns

- **Database Access**: All queries through Prisma client (`@affiliate-template/db`)
- **Type Safety**: Shared types package ensures consistency
- **Component Sharing**: UI components in shared package
- **API Routes**: Next.js API routes for backend logic
- **Row Level Security**: Supabase RLS for multi-tenant data isolation

## Important Context

- This is a **Universal Affiliate Template** - no hardcoded content, works for any niche
- Can be configured for any industry: tech, fitness, beauty, home, pets, etc.
- All site content is database-driven and configurable
- See `UNIVERSAL_TEMPLATE_GUIDE.md` for configuration examples
- Full PRD and architecture details in `docs/architecture.md`
- Recently underwent **complete casino theme redesign** (winvio branding)
- Both apps currently running successfully on ports 3000 and 3001
- Database connected and functional with Supabase
- Some Payload CMS features using mock data temporarily
- Production-ready with comprehensive error handling

## Code Structure Guidelines

### API Routes Pattern
All API endpoints follow Next.js App Router conventions:
```
apps/[app]/app/api/[resource]/route.ts
```

### Database Access Pattern
Always use the Prisma client from the shared package:
```typescript
import { prisma } from '@affiliate-template/db';

// Example query with proper error handling
try {
  const sites = await prisma.site.findMany({
    where: { userId: session.user.id }
  });
} catch (error) {
  console.error('Database error:', error);
  throw new Error('Failed to fetch sites');
}
```

### Type Safety
Use shared types for consistency across apps:
```typescript
import type { Site, Product, BlogPost } from '@affiliate-template/shared-types';
```

### Component Organization
- **Shared components**: `packages/ui/src/components/`
- **App-specific**: `apps/[app]/src/components/`
- **Naming**: Use PascalCase for components, kebab-case for files

### Environment Variables
Required environment variables (see `.env.example`):
- **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Database**: `DATABASE_URL`, `DIRECT_URL`
- **AI Services**: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `LEONARDO_API_KEY`
- **Auth**: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- **Amazon**: `AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_PARTNER_TAG`

## Security Considerations

1. **Row Level Security (RLS)**: All site-specific data is protected by Supabase RLS policies
2. **API Key Storage**: Sensitive keys stored in Supabase Vault, never in code
3. **Authentication**: NextAuth.js with Supabase adapter
4. **Input Validation**: Zod schemas for all user inputs
5. **CORS**: Properly configured for production domains

## Testing Strategy

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test API routes with database
3. **E2E Tests**: Full user flows with Playwright
4. **Test Data**: Use factories for consistent test data generation

### Running Tests Efficiently
```bash
# Run tests for changed files only
pnpm test --watch

# Run specific test file
pnpm test -- path/to/test.spec.ts

# Debug E2E tests
pnpm test:e2e --debug
```

## Performance Optimization

1. **Database Queries**: Use Prisma's `select` and `include` wisely
2. **Image Optimization**: Next.js Image component for all images
3. **Code Splitting**: Dynamic imports for heavy components
4. **Caching**: Implement proper cache headers for API routes
5. **Bundle Size**: Monitor with `pnpm analyze`

## Deployment

The platform is designed for Vercel deployment with:
- Automatic preview deployments for PRs
- Environment variable management
- Edge functions for optimal performance
- Integrated analytics and monitoring

### Deployment Checklist
1. Ensure all environment variables are set in Vercel
2. Database migrations are run: `pnpm db:migrate deploy`
3. Build succeeds locally: `pnpm build`
4. All tests pass: `pnpm test`
5. TypeScript has no errors: `pnpm type-check`

## Universal Template Context

This is a **completely universal affiliate marketing template** designed to work for ANY niche:
- No hardcoded casino/gambling content - everything is configurable
- See `UNIVERSAL_TEMPLATE_GUIDE.md` for configuration examples
- Full PRD and architecture details in `docs/architecture.md`
- Database schema supports any product type or content niche

## Development Principles (from .cursorrules)

### Core Requirements
1. **Production-ready code only** - No shortcuts, mocks, placeholders, or TODOs
2. **Maximum 500 lines per file** - Split large files into smaller modules
3. **Full error handling** - Every function must handle all error cases
4. **Complete TypeScript types** - No `any` types, proper interfaces for all data
5. **Responsive design** - Must work on all screen sizes
6. **Accessibility compliance** - WCAG 2.1 AA standards

### Before Implementation Checklist
- ✓ Understand the complete user story
- ✓ Review existing code patterns
- ✓ Plan error handling approach
- ✓ Consider edge cases
- ✓ Design for scalability
- ✓ Ensure type safety

### Problem Resolution Strategy
1. **Research First**: Check existing implementations in the codebase
2. **Use Proven Patterns**: Follow established patterns in the project
3. **Test Thoroughly**: Write tests for all new functionality
4. **Document Complex Logic**: Add clear comments for non-obvious code

## Key User Stories to Focus On

From the PRD, prioritize these critical user journeys:
1. **Admin Dashboard**: Site management, content approval, analytics
2. **Content Generation**: AI-powered blog posts with SEO optimization
3. **Product Management**: Import, update, and track affiliate products
4. **Public Site**: Fast, SEO-optimized pages with excellent UX
5. **Analytics**: Track clicks, conversions, and revenue

## CSS/Tailwind Troubleshooting Guide

### CRITICAL: Tailwind CSS Configuration

This project MUST use **Tailwind CSS v3** (specifically v3.4.1). Do NOT upgrade to Tailwind v4 as it has breaking changes and incompatible syntax.

#### Common CSS Issues and Solutions

1. **PostCSS Configuration Error**
   - **Symptom**: `Cannot find module '@tailwindcss/postcss'` or similar errors
   - **Solution**: Ensure postcss.config.mjs uses v3 syntax:
   ```javascript
   const config = {
     plugins: {
       tailwindcss: {},     // NOT "@tailwindcss/postcss": {}
       autoprefixer: {},
     },
   };
   export default config;
   ```

2. **Tailwind Classes Not Working**
   - **Symptom**: Utility classes like `font-semibold` throw errors
   - **Solution**: 
     - Check package.json has `"tailwindcss": "^3.4.1"` (NOT v4)
     - Ensure globals.css has proper directives:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
     - Clean and reinstall: `rm -rf .next node_modules && pnpm install`

3. **Build Cache Issues**
   - **Symptom**: CSS changes not reflecting, persistent errors after fixes
   - **Solution**:
   ```bash
   # Stop all servers
   pkill -f "next dev"
   # Clean everything
   rm -rf apps/*/.next apps/*/node_modules packages/*/node_modules node_modules
   # Reinstall
   pnpm install
   # Start fresh
   pnpm dev
   ```

4. **Version Consistency**
   - **ALWAYS** check ALL package.json files (root, apps/*, packages/*) for Tailwind version
   - **NEVER** mix Tailwind v3 and v4 syntax
   - **PostCSS** plugin must be `tailwindcss` not `@tailwindcss/postcss` for v3

#### Permanent Fix Checklist

When CSS issues occur:
1. ✓ Stop all development servers
2. ✓ Clean all .next directories and node_modules
3. ✓ Verify Tailwind v3.4.1 in ALL package.json files
4. ✓ Ensure postcss.config.mjs uses v3 syntax
5. ✓ Check @tailwind directives in globals.css
6. ✓ Remove any Tailwind debug logs (tailwindcss-*.log)
7. ✓ Run fresh install with `pnpm install`
8. ✓ Start servers and verify CSS renders correctly

## CRITICAL: Work Tracking Requirements

1. **ALWAYS update CHANGELOG.md** after completing significant work:
   - Add entry under [Unreleased] section with today's date
   - Include what was added, changed, or fixed
   - Be specific about which files or features were modified
   - This prevents confusion about what work has been completed

2. **Update TODO.md** when identifying new tasks or completing existing ones
3. **Keep documentation current** - archive outdated files instead of leaving them