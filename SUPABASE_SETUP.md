# Supabase Setup Guide

This guide will help you connect your affiliate marketing platform directly to Supabase instead of using a local PostgreSQL setup.

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Node.js**: Version 18+ installed

## Step 1: Create Supabase Project

### 1. Go to Supabase Dashboard
Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)

### 2. Create New Project
- Click "New Project"
- Choose your organization
- Enter project name: `jmpkc-affiliate-platform`
- Enter database password (save this!)
- Choose region (closest to your users)
- Click "Create new project"

### 3. Wait for Setup
- Database setup takes 2-3 minutes
- You'll receive an email when ready

## Step 2: Get Your Supabase Credentials

### 1. Go to Project Settings
- In your Supabase dashboard, go to **Settings** → **API**

### 2. Copy Your Credentials
You'll need these values:

**Project URL**:
```
https://your-project-ref.supabase.co
```

**Anon Key** (public):
```
your-supabase-anon-key
```

**Service Role Key** (private):
```
your-supabase-service-role-key
```

**Database Password**:
```
your-database-password
```

## Step 3: Update Environment Variables

### 1. Update Root `.env.local`
```bash
# Navigate to your project root
cd /Users/mhaniff/affiliate-template-72325

# Edit the .env.local file
nano .env.local
```

Replace the placeholders with your actual values:

```bash
# Supabase Configuration
SUPABASE_URL=https://your-actual-project-ref.supabase.co
SUPABASE_ANON_KEY=your-actual-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-supabase-service-role-key

# Database URL (replace with your actual values)
DATABASE_URL=postgresql://postgres.your-project-ref:your-database-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 2. Update All App Environment Files
Repeat the same process for:
- `apps/web/.env.local`
- `apps/admin/.env.local`
- `packages/db/.env.local`
- `packages/cms/.env.local`

## Step 4: Run Database Migrations

### 1. Install Dependencies
```bash
# From project root
pnpm install
```

### 2. Generate Prisma Client
```bash
cd packages/db
pnpm prisma generate
```

### 3. Run Migrations
```bash
# Push the schema to Supabase
pnpm prisma db push
```

### 4. Verify Connection
```bash
# Test the connection
pnpm prisma studio
```

## Step 5: Set Up Row Level Security (RLS)

### 1. Enable RLS on Tables
In your Supabase dashboard, go to **Authentication** → **Policies** and enable RLS on these tables:

- `sites`
- `content`
- `products`
- `affiliate_links`
- `conversions`

### 2. Create Basic Policies
For each table, create policies like:

**Sites Table**:
```sql
-- Allow authenticated users to read sites
CREATE POLICY "Users can read sites" ON sites
FOR SELECT USING (auth.role() = 'authenticated');

-- Allow site owners to update their sites
CREATE POLICY "Site owners can update sites" ON sites
FOR UPDATE USING (auth.uid()::text = created_by);
```

## Step 6: Test Your Connection

### 1. Test Web App
```bash
cd apps/web
pnpm dev
```

Visit `http://localhost:3000` and check the console for database connection errors.

### 2. Test Admin App
```bash
cd apps/admin
pnpm dev
```

Visit `http://localhost:3002` and test the admin interface.

### 3. Test Database Package
```bash
cd packages/db
pnpm prisma studio
```

This will open Prisma Studio in your browser to view/edit data.

## Step 7: Seed Initial Data

### 1. Create Seed Script
```bash
cd packages/db
```

Create a basic seed script in `src/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test site
  const site = await prisma.site.create({
    data: {
      name: 'JMPKC Affiliate Site',
      domain: 'localhost:3000',
      siteTitle: 'JMPKC Affiliate Platform',
      siteDescription: 'Your trusted source for affiliate products',
      heroTitle: 'Welcome to JMPKC',
      heroSubtitle: 'Discover amazing products and earn commissions',
    },
  });

  console.log('Created site:', site);

  // Create test categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Wearable Tech',
        description: 'Smartwatches, fitness trackers, and health monitors',
        slug: 'wearable-tech',
      },
    }),
    prisma.category.create({
      data: {
        name: 'General Merchandise',
        description: 'General products and accessories',
        slug: 'general-merchandise',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Hot Honey Products',
        description: 'Hot honey and related products',
        slug: 'hot-honey',
      },
    }),
  ]);

  console.log('Created categories:', categories);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 2. Run Seed
```bash
pnpm tsx src/seed.ts
```

## Step 8: Configure Supabase Auth (Optional)

### 1. Set Up Authentication
In your Supabase dashboard:

1. Go to **Authentication** → **Settings**
2. Configure your site URL: `http://localhost:3000`
3. Add redirect URLs: `http://localhost:3000/auth/callback`

### 2. Create Auth Policies
```sql
-- Example policy for user data
CREATE POLICY "Users can view own data" ON users
FOR SELECT USING (auth.uid()::text = id);
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check your `DATABASE_URL` format
   - Verify your Supabase project is active
   - Check if your IP is whitelisted

2. **Authentication Errors**
   - Verify your API keys are correct
   - Check if RLS policies are blocking access
   - Ensure you're using the correct key (anon vs service role)

3. **Migration Errors**
   - Check your database password
   - Verify the schema syntax
   - Ensure you have proper permissions

### Debugging Steps

1. **Test Connection**:
```bash
cd packages/db
pnpm prisma db pull
```

2. **Check Environment Variables**:
```bash
# Verify your .env.local files are loaded
echo $DATABASE_URL
```

3. **View Logs**:
```bash
# Check Supabase logs in dashboard
# Go to Logs → Database
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env.local` files
2. **API Keys**: Use service role key only on server-side
3. **RLS Policies**: Always enable RLS on sensitive tables
4. **Connection Pooling**: Use Supabase's connection pooling
5. **Backup**: Enable automatic backups in Supabase

## Next Steps

After successful Supabase setup:

1. **Deploy Payload CMS** to Vercel
2. **Test manual Amazon link conversion**
3. **Create initial content** in Payload CMS
4. **Set up monitoring** and analytics
5. **Configure production environment**

## Support

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Prisma Docs**: [https://prisma.io/docs](https://prisma.io/docs)
- **Discord**: Join Supabase Discord for community support

## Your Supabase Credentials

**IMPORTANT**: Keep these secure and never share them publicly:

```
Project URL: https://your-project-ref.supabase.co
Anon Key: your-supabase-anon-key
Service Role Key: your-supabase-service-role-key
Database Password: your-database-password
```

Replace the placeholders with your actual Supabase credentials from your dashboard. 