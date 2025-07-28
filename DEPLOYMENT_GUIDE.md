# TechWear Hub Deployment Guide

## Version 0.1.0 - Wearables & Accessories Affiliate Platform

### 🚀 Quick Start Deployment

Due to the monorepo structure, we recommend deploying through Vercel's web interface for the best experience.

## Step 1: Prepare Your Environment Variables

Create a `.env.production` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database URLs
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app

# AI Services (Optional)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
LEONARDO_API_KEY=your_leonardo_key

# Amazon Affiliate
AMAZON_PARTNER_TAG=techwearhub-20
AMAZON_ACCESS_KEY=your_amazon_key
AMAZON_SECRET_KEY=your_amazon_secret

# Email (Optional)
RESEND_API_KEY=your_resend_key
```

## Step 2: Deploy to Vercel

### Option A: Deploy via GitHub Integration (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select `KCJMP23/wearables-accessories-affiliate`
4. Configure the deployment:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `pnpm build`
   - **Output Directory**: Leave empty (auto-detected)
   - **Install Command**: `pnpm install`
5. Add all environment variables from Step 1
6. Click "Deploy"

### Option B: Deploy via CLI (Alternative)

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

When prompted:
- Set up and deploy: Yes
- Which scope: Select your account
- Link to existing project: No
- Project name: techwear-hub
- Directory: ./
- Override settings: Yes
  - Build Command: `pnpm build`
  - Output Directory: (leave empty)
  - Development Command: `pnpm dev`

## Step 3: Post-Deployment Setup

### 1. Update Environment Variables

After deployment, update your production URL:
```
NEXTAUTH_URL=https://techwear-hub.vercel.app
```

### 2. Configure Domains (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 3. Set Up Database

If you haven't already:
```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed initial data (optional)
pnpm db:seed
```

## Deployment Structure

This monorepo deploys two applications:

### Web App (Public Site)
- **Path**: `/apps/web`
- **URL**: Your main domain
- **Purpose**: Customer-facing affiliate site

### Admin App
- **Path**: `/apps/admin`
- **URL**: `/admin` or separate subdomain
- **Purpose**: Content management and analytics

## Troubleshooting

### Common Issues

1. **"workspace:*" error**: Ensure you're using pnpm as the package manager
2. **Build failures**: Check that all environment variables are set
3. **Database connection**: Verify your DATABASE_URL is correct
4. **Authentication issues**: Ensure NEXTAUTH_URL matches your deployment URL

### Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema pushed
- [ ] GitHub repository accessible
- [ ] Node.js version 20.x specified (.nvmrc)
- [ ] Build command uses pnpm

## Support

For issues or questions:
- Repository: https://github.com/KCJMP23/wearables-accessories-affiliate
- Issues: https://github.com/KCJMP23/wearables-accessories-affiliate/issues

## Version History

- **v0.1.0** (2025-07-28): Initial release with TechWear Hub branding