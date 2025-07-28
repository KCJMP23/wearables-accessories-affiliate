# Vercel Deployment Guide - TechWear Hub

## Two Separate Deployments Required

This monorepo contains two Next.js applications that need to be deployed separately:
1. **Web App** - Public-facing affiliate site
2. **Admin CMS** - Content management system

## Step 1: Deploy Web App (Public Site)

### Via Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `KCJMP23/wearables-accessories-affiliate`
4. Configure deployment settings:

```
Project Name: techwear-hub
Framework Preset: Other
Root Directory: ./
Build Command: cd packages/db && pnpm prisma generate && pnpm build && cd ../../apps/web && pnpm next build
Output Directory: apps/web/.next
Install Command: pnpm install --frozen-lockfile
Environment Variables:
  TURBO_REMOTE_ONLY: 0
  TURBO_RUN_SUMMARY: 0
```

5. Add Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://hdvruoskquplrtddmwnj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnJ1b3NrcXVwbHJ0ZGRtd25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjMzOTYsImV4cCI6MjA2MzAzOTM5Nn0.SjZfXh3TKuY2eA2MyuIYsyXYUI6KDd6PD-eN0wIxwGs
DATABASE_URL=postgresql://postgres.hdvruoskquplrtddmwnj:C56emdFoC3ZaYeqr@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

6. Click "Deploy"

## Step 2: Deploy Admin CMS

### Via Vercel Dashboard

1. Go to https://vercel.com/new again
2. Click "Import Git Repository"
3. Select the SAME repository: `KCJMP23/wearables-accessories-affiliate`
4. Configure deployment settings:

```
Project Name: techwear-hub-admin
Framework Preset: Other
Root Directory: ./
Build Command: chmod +x vercel-build.sh && ./vercel-build.sh
Output Directory: apps/admin/.next
Install Command: pnpm install --frozen-lockfile
```

5. Add ALL Environment Variables:
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
NEXTAUTH_URL=https://techwear-hub-admin.vercel.app

# AI Services
OPENAI_API_KEY=[Your OpenAI API Key]

# Amazon
AMAZON_PARTNER_TAG=techwearhub-20
```

6. Click "Deploy"

## Important Notes

1. **Both apps use the same GitHub repository** but deploy from different directories
2. **The build commands navigate to the monorepo root** to install dependencies
3. **Type checking is disabled** in both apps to avoid build errors
4. **Environment variables are split** - web app only needs public keys

## Post-Deployment

1. Update `NEXTAUTH_URL` in admin app to match the actual Vercel URL
2. Test both deployments:
   - Web app: Browse products, check pages
   - Admin CMS: Sign in, manage content
3. Configure custom domains if desired

## Troubleshooting

If builds fail:
- Ensure Node.js 20.x is being used
- Check that pnpm is the package manager
- Verify all environment variables are set
- Review build logs for specific errors

## Expected URLs

- Web App: `https://techwear-hub.vercel.app`
- Admin CMS: `https://techwear-hub-admin.vercel.app`