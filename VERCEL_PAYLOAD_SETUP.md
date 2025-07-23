# Payload CMS Vercel Deployment Guide

This guide will walk you through deploying Payload CMS to Vercel and obtaining your Payload secret key.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Supabase Database**: Your database should be set up and running

## Step 1: Generate Payload Secret Key

### Option A: Using Node.js (Recommended)
```bash
# In your terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Option B: Using Online Generator
Visit [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

### Option C: Using OpenSSL
```bash
openssl rand -hex 32
```

**Save this secret key** - you'll need it for the next steps.

## Step 2: Prepare Your Payload CMS for Vercel

### 1. Update Environment Variables

Create a `.env.local` file in the `packages/cms` directory:

```bash
# Navigate to the CMS package
cd packages/cms

# Create environment file
cat > .env.local << EOF
PAYLOAD_SECRET=your-generated-secret-key-here
DATABASE_URL=your-supabase-database-url
PAYLOAD_PUBLIC_SERVER_URL=https://your-vercel-domain.vercel.app
EOF
```

### 2. Test Locally

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Visit `http://localhost:3000/admin` to verify Payload CMS is working.

## Step 3: Deploy to Vercel

### Method A: Using Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy the CMS package**:
```bash
cd packages/cms
vercel
```

4. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `your-payload-cms`
   - Directory: `./` (current directory)
   - Override settings: `N`

### Method B: Using Vercel Dashboard

1. **Push your code to GitHub**
2. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project**:
   - Framework Preset: `Node.js`
   - Root Directory: `packages/cms`
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

## Step 4: Configure Environment Variables in Vercel

### 1. Go to Your Project Dashboard
Navigate to your Vercel project dashboard.

### 2. Add Environment Variables
Go to **Settings** → **Environment Variables** and add:

```
PAYLOAD_SECRET=your-generated-secret-key-here
DATABASE_URL=your-supabase-database-url
PAYLOAD_PUBLIC_SERVER_URL=https://your-vercel-domain.vercel.app
```

### 3. Redeploy
After adding environment variables, redeploy your project.

## Step 5: Access Your Payload CMS

### 1. Visit Your Admin Panel
Go to `https://your-vercel-domain.vercel.app/admin`

### 2. Create Your First Admin User
You'll be prompted to create your first admin user:
- **Email**: Your admin email
- **Password**: A secure password

### 3. Access the Admin Interface
Once created, you can:
- Create and manage content
- Upload media files
- Manage users
- Configure your site settings

## Step 6: Update Your Main Application

### 1. Update Environment Variables
In your main application's `.env.local`:

```bash
# Payload CMS URL
PAYLOAD_PUBLIC_SERVER_URL=https://your-vercel-domain.vercel.app

# Payload Secret (same as CMS)
PAYLOAD_SECRET=your-generated-secret-key-here
```

### 2. Test the Integration
Your main application should now be able to fetch content from Payload CMS.

## Troubleshooting

### Common Issues

1. **"Payload Secret is required"**
   - Ensure `PAYLOAD_SECRET` is set in Vercel environment variables
   - Redeploy after adding the variable

2. **Database Connection Issues**
   - Verify your `DATABASE_URL` is correct
   - Ensure your Supabase database is accessible
   - Check if your IP is whitelisted in Supabase

3. **CORS Errors**
   - Update the CORS settings in `packages/cms/src/config.ts`
   - Add your domain to the allowed origins

4. **Build Failures**
   - Check that all dependencies are installed
   - Verify TypeScript compilation
   - Check build logs in Vercel dashboard

### Debugging Steps

1. **Check Vercel Logs**:
   - Go to your project dashboard
   - Click on the latest deployment
   - Check "Functions" tab for errors

2. **Test Database Connection**:
```bash
# Test your DATABASE_URL locally
psql "your-database-url"
```

3. **Verify Environment Variables**:
```bash
# In Vercel dashboard, check that all variables are set
# and have correct values
```

## Security Best Practices

1. **Use Strong Secrets**: Generate a 32-character random string for `PAYLOAD_SECRET`
2. **Environment Variables**: Never commit secrets to your repository
3. **Database Security**: Use Supabase Row Level Security (RLS)
4. **HTTPS Only**: Ensure all connections use HTTPS in production
5. **Regular Updates**: Keep Payload CMS and dependencies updated

## Next Steps

After successful deployment:

1. **Create Content**: Add your first posts, pages, and media
2. **Configure Collections**: Set up your content structure
3. **Integrate with Frontend**: Connect your main application to fetch content
4. **Set up Webhooks**: Configure webhooks for content updates
5. **Monitor Performance**: Use Vercel Analytics to monitor your CMS

## Support

- **Payload CMS Docs**: [https://payloadcms.com/docs](https://payloadcms.com/docs)
- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)

## Your Payload Secret Key

**IMPORTANT**: Keep this secret key secure and never share it publicly:

```
your-generated-secret-key-here
```

Replace `your-generated-secret-key-here` with the actual 32-character hex string you generated in Step 1. 