# Deploying TechWear Hub as Separate Applications

## Overview

This guide explains how to deploy the TechWear Hub platform as two separate Vercel applications:
1. **Public Site** (web app) - Customer-facing affiliate website
2. **Admin CMS** (admin app) - Content management system

## Step 1: Deploy the Public Site

### Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import repository: `KCJMP23/wearables-accessories-affiliate`
3. Configure deployment:
   - **Project Name**: techwear-hub
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm install && pnpm db:generate && cd apps/web && pnpm build`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `cd ../.. && pnpm install`

4. Add environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://hdvruoskquplrtddmwnj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your anon key]
   NODE_ENV=production
   ```

5. Deploy!

### Your Public Site URLs:
- Production: `https://techwear-hub.vercel.app`
- Preview: `https://techwear-hub-*.vercel.app`

## Step 2: Deploy the Admin CMS

### Via Vercel Dashboard

1. Go to https://vercel.com/new again
2. Import the same repository: `KCJMP23/wearables-accessories-affiliate`
3. Configure deployment:
   - **Project Name**: techwear-hub-admin
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/admin`
   - **Build Command**: `cd ../.. && pnpm install && pnpm db:generate && cd apps/admin && pnpm build`
   - **Output Directory**: `apps/admin/.next`
   - **Install Command**: `cd ../.. && pnpm install`

4. Add environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://hdvruoskquplrtddmwnj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your anon key]
   SUPABASE_SERVICE_ROLE_KEY=[your service role key]
   
   # Database
   DATABASE_URL=[your database url]
   DIRECT_URL=[your direct url]
   
   # Auth
   NEXTAUTH_SECRET=[your generated secret]
   NEXTAUTH_URL=https://techwear-hub-admin.vercel.app
   
   # AI Services
   OPENAI_API_KEY=[your openai key]
   
   # Amazon
   AMAZON_PARTNER_TAG=techwearhub-20
   
   NODE_ENV=production
   ```

5. Deploy!

### Your Admin URLs:
- Production: `https://techwear-hub-admin.vercel.app`
- Preview: `https://techwear-hub-admin-*.vercel.app`

## Environment Variables Reference

### Public Site (web) - Minimal Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key

### Admin CMS (admin) - Full Variables
All variables from `.env.production` including:
- All Supabase keys (including service role)
- Database URLs
- NextAuth configuration
- AI service keys
- Amazon affiliate configuration

## Post-Deployment Steps

1. **Update NEXTAUTH_URL**: 
   - After admin deployment, update `NEXTAUTH_URL` to the actual Vercel URL

2. **Test Both Apps**:
   - Public site: Browse products, view pages
   - Admin CMS: Sign in, manage content

3. **Configure Custom Domains** (Optional):
   - Public site: `www.techwear-hub.com`
   - Admin CMS: `admin.techwear-hub.com`

## Benefits of Separate Deployments

1. **Security**: Admin has sensitive keys, public site doesn't
2. **Performance**: Each app scales independently
3. **Development**: Teams can work on each app separately
4. **Cost**: Only pay for what each app uses

## Troubleshooting

### Build Errors
- Ensure you're using the correct root directory for each app
- Verify all required environment variables are set
- Check that the build commands include the monorepo navigation

### Connection Issues
- Verify Supabase URLs and keys are correct
- Check that DATABASE_URL is properly formatted
- Ensure NEXTAUTH_URL matches the deployment URL

## Quick Reference

| App | Root Directory | Deployment URL |
|-----|---------------|----------------|
| Public Site | `apps/web` | `techwear-hub.vercel.app` |
| Admin CMS | `apps/admin` | `techwear-hub-admin.vercel.app` |