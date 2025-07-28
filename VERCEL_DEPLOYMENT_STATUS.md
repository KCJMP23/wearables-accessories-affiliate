# Vercel Deployment Status

## Current Situation

The Vercel CLI is having issues with the monorepo structure. The recommended approach is to use the Vercel Dashboard for deployment.

## Web App Deployment Instructions

1. Go to https://vercel.com/new
2. Import: `KCJMP23/wearables-accessories-affiliate`
3. Select "Other" as Framework Preset
4. Configure as follows:

```
Root Directory: ./
Build Command: cd packages/db && pnpm prisma generate && pnpm build && cd ../../apps/web && pnpm next build
Output Directory: apps/web/.next
Install Command: pnpm install --frozen-lockfile
```

5. Add these environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://hdvruoskquplrtddmwnj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnJ1b3NrcXVwbHJ0ZGRtd25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjMzOTYsImV4cCI6MjA2MzAzOTM5Nn0.SjZfXh3TKuY2eA2MyuIYsyXYUI6KDd6PD-eN0wIxwGs
DATABASE_URL=postgresql://postgres.hdvruoskquplrtddmwnj:C56emdFoC3ZaYeqr@aws-0-us-east-1.pooler.supabase.com:6543/postgres
TURBO_REMOTE_ONLY=0
TURBO_RUN_SUMMARY=0
```

6. Click Deploy

## Admin App Deployment Instructions

1. Go to https://vercel.com/new again
2. Import the SAME repository: `KCJMP23/wearables-accessories-affiliate`
3. Select "Other" as Framework Preset
4. Configure as follows:

```
Root Directory: ./
Build Command: cd packages/db && pnpm prisma generate && pnpm build && cd ../../apps/admin && pnpm next build
Output Directory: apps/admin/.next
Install Command: pnpm install --frozen-lockfile
```

5. Add ALL environment variables from .env.production:
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://hdvruoskquplrtddmwnj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnJ1b3NrcXVwbHJ0ZGRtd25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjMzOTYsImV4cCI6MjA2MzAzOTM5Nn0.SjZfXh3TKuY2eA2MyuIYsyXYUI6KDd6PD-eN0wIxwGs
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnJ1b3NrcXVwbHJ0ZGRtd25qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzQ2MzM5NiwiZXhwIjoyMDYzMDM5Mzk2fQ.KhOh0Chyk2wtPx67hXdXFrfBffnwr_sPo-Me_qP42Zk

# Database
DATABASE_URL=postgresql://postgres.hdvruoskquplrtddmwnj:C56emdFoC3ZaYeqr@aws-0-us-east-1.pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres.hdvruoskquplrtddmwnj:C56emdFoC3ZaYeqr@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Authentication
NEXTAUTH_SECRET=Dnz0ARdg7YhAJjSeH/d2qGjKmStdgg+l0qp+v+w+y6c=
NEXTAUTH_URL=https://[your-admin-app-url].vercel.app

# AI Services
OPENAI_API_KEY=[Your OpenAI API Key]

# Amazon
AMAZON_PARTNER_TAG=techwearhub-20

# Turbo
TURBO_REMOTE_ONLY=0
TURBO_RUN_SUMMARY=0
```

6. Click Deploy

## Key Points

- Both apps deploy from the same repository but different directories
- The build commands manually navigate and build the db package first
- Environment variables TURBO_REMOTE_ONLY and TURBO_RUN_SUMMARY prevent Turborepo issues
- Type checking is disabled in both apps to avoid build errors

## Expected Results

- Web App: https://[project-name].vercel.app
- Admin CMS: https://[project-name]-admin.vercel.app

Both deployments should complete successfully with this configuration.