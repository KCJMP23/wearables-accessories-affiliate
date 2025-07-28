#!/bin/bash

# Production Deployment Script for TechWear Hub
# Version 0.1.0

echo "🚀 Starting production deployment for TechWear Hub v0.1.0"
echo "=================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with required environment variables"
    exit 1
fi

# Build the project
echo "📦 Building project..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create deployment info
echo "📝 Creating deployment info..."
cat > deployment-info.json << EOF
{
  "version": "0.1.0",
  "niche": "wearables-accessories",
  "siteName": "TechWear Hub",
  "deployedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "repository": "https://github.com/KCJMP23/wearables-accessories-affiliate"
}
EOF

echo "🎉 Build complete! Ready for deployment."
echo ""
echo "📋 Deployment Instructions:"
echo "=========================="
echo "1. Go to https://vercel.com/new"
echo "2. Import the GitHub repository: KCJMP23/wearables-accessories-affiliate"
echo "3. Configure the following settings:"
echo ""
echo "   Framework Preset: Next.js"
echo "   Root Directory: ./"
echo "   Build Command: pnpm build"
echo "   Install Command: pnpm install"
echo ""
echo "4. Add the following environment variables from your .env file:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - DATABASE_URL"
echo "   - DIRECT_URL"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXTAUTH_URL"
echo "   - OPENAI_API_KEY (if using AI features)"
echo "   - AMAZON_PARTNER_TAG (if using Amazon affiliate)"
echo ""
echo "5. Deploy!"
echo ""
echo "🌐 Your site will be available at your Vercel domain"
echo "💡 Remember to update NEXTAUTH_URL after deployment"