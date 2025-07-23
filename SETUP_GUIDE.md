# Complete Setup Guide - Affiliate Template Platform

## 🚀 Quick Start

### 1. Environment Variables Setup

Copy the template and update with your real credentials:

```bash
cp env.template .env.local
```

Then edit `.env.local` with your actual API keys and credentials.

---

## 📊 Supabase Setup

### Step 1: Get Your Supabase Credentials

1. **Go to your Supabase project**: https://supabase.com/dashboard
2. **Navigate to Settings → API**
3. **Copy these values**:
   - Project URL (already in your DATABASE_URL)
   - Anon/public key
   - Service role key (for admin operations)

### Step 2: Update Environment Variables

In your `.env.local`, replace:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://hdvruoskquplrtddmwnj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

### Step 3: Push Database Schema

```bash
cd packages/db
pnpm db:push
```

### Step 4: Seed Database (Optional)

```bash
pnpm db:seed
```

---

## 📝 Payload CMS Setup

### Step 1: Generate Payload Secret

Generate a secure random string for Payload:

```bash
openssl rand -base64 32
```

Add it to your `.env.local`:
```bash
PAYLOAD_SECRET=your_generated_secret_here
```

### Step 2: Start Payload CMS Server

```bash
cd packages/cms
pnpm dev
```

Payload CMS will run on: http://localhost:3006

### Step 3: Create Admin User

1. Visit http://localhost:3006/admin
2. Create your first admin user
3. Start adding content (posts, products, pages)

### Step 4: Update Web App to Use CMS

The web app will automatically detect Payload CMS and use real data instead of mock data.

---

## 🛒 Amazon Associates Setup

### Step 1: Amazon Associates Account

1. **Sign up**: https://affiliate-program.amazon.com/
2. **Choose your store**: Select your preferred Amazon store (US, UK, etc.)
3. **Complete verification**: Provide required documentation
4. **Wait for approval**: Usually 1-3 business days

### Step 2: Get API Credentials

1. **AWS Console**: Go to https://console.aws.amazon.com/
2. **IAM Service**: Create a new user for API access
3. **Attach policies**: Add `AmazonProductAdvertisingAPIPolicy`
4. **Create access keys**: Generate Access Key ID and Secret Access Key

### Step 3: Update Environment Variables

In your `.env.local`:
```bash
AMAZON_ACCESS_KEY_ID=your_amazon_access_key_id
AMAZON_SECRET_ACCESS_KEY=your_amazon_secret_access_key
AMAZON_ASSOCIATE_TAG=your_associate_tag_here
AMAZON_REGION=us-east-1
```

### Step 4: Associate Tag Format

Your associate tag format depends on your store:
- **US**: `yourname-20`
- **UK**: `yourname-21`
- **Canada**: `yourname-22`
- **Germany**: `yourname-23`

### Step 5: API Testing

Test your Amazon API connection:

```bash
cd apps/admin
curl -X POST http://localhost:3001/api/products/test-amazon
```

---

## 🤖 AI Services Setup

### OpenAI (ChatGPT)

1. **Sign up**: https://platform.openai.com/
2. **Get API key**: https://platform.openai.com/api-keys
3. **Add to .env.local**:
   ```bash
   OPENAI_API_KEY=sk-your_openai_key_here
   ```

### Anthropic (Claude)

1. **Sign up**: https://console.anthropic.com/
2. **Get API key**: https://console.anthropic.com/account/keys
3. **Add to .env.local**:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-your_claude_key_here
   ```

### Leonardo.AI (Image Generation)

1. **Sign up**: https://leonardo.ai/
2. **Get API key**: https://app.leonardo.ai/settings/api
3. **Add to .env.local**:
   ```bash
   LEONARDO_API_KEY=your_leonardo_key_here
   ```

---

## 📧 Email Services Setup

### Resend (Recommended)

1. **Sign up**: https://resend.com/
2. **Get API key**: https://resend.com/api-keys
3. **Add to .env.local**:
   ```bash
   RESEND_API_KEY=re_your_resend_key_here
   ```

### SendGrid (Alternative)

1. **Sign up**: https://sendgrid.com/
2. **Get API key**: https://app.sendgrid.com/settings/api_keys
3. **Add to .env.local**:
   ```bash
   SENDGRID_API_KEY=SG_your_sendgrid_key_here
   ```

---

## 🔐 Security Setup

### NextAuth Secret

Generate a secure secret:

```bash
openssl rand -base64 32
```

Add to `.env.local`:
```bash
NEXTAUTH_SECRET=your_generated_secret_here
```

---

## 🚀 Start All Services

### Development Mode

```bash
# Terminal 1: Web App
cd apps/web && pnpm dev

# Terminal 2: Admin App  
cd apps/admin && pnpm dev

# Terminal 3: Payload CMS
cd packages/cms && pnpm dev
```

### Production Mode

```bash
# Build all packages
pnpm build

# Start production servers
pnpm start
```

---

## 📊 Verify Setup

### 1. Check Web App
- Visit: http://localhost:3000
- Should show real data from Payload CMS
- No database connection errors

### 2. Check Admin App
- Visit: http://localhost:3001
- Should have full functionality
- Database operations working

### 3. Check Payload CMS
- Visit: http://localhost:3006/admin
- Should be able to create/edit content
- Media uploads working

### 4. Test Amazon API
- Go to Admin → Products
- Try adding a product with Amazon URL
- Should auto-populate product details

---

## 🔧 Troubleshooting

### Database Connection Issues

1. **Check DATABASE_URL**: Ensure it's correct and accessible
2. **Test connection**: 
   ```bash
   cd packages/db && pnpm db:push
   ```
3. **Check Supabase**: Verify project is active and not paused

### Payload CMS Issues

1. **Check PAYLOAD_SECRET**: Must be set and secure
2. **Check DATABASE_URL**: Same as above
3. **Check port**: Ensure port 3006 is available
4. **Check logs**: Look for specific error messages

### Amazon API Issues

1. **Verify credentials**: Check Access Key ID and Secret
2. **Check associate tag**: Must be in correct format
3. **Verify approval**: Ensure Amazon Associates account is approved
4. **Check region**: Must match your associate account

### Environment Variables

1. **Copy to all apps**: Ensure `.env.local` is in:
   - `apps/web/`
   - `apps/admin/`
   - `packages/db/`
   - `packages/cms/`

2. **Restart servers**: After changing environment variables

---

## 📈 Next Steps

1. **Add Content**: Use Payload CMS to add blog posts and products
2. **Configure Analytics**: Set up Google Analytics tracking
3. **Set up Email**: Configure email marketing automation
4. **Deploy**: Deploy to Vercel or your preferred hosting
5. **Monitor**: Set up monitoring and error tracking

---

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Create GitHub issues for bugs
- **Questions**: Check the README.md for common questions

Your affiliate platform is now ready for production! 🎉 