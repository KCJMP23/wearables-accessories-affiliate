#!/bin/bash

echo "🚀 Deploying TechWear Hub to Vercel"
echo "=================================="

# Deploy to Vercel
vercel --prod --yes

echo ""
echo "📋 Next Steps:"
echo "============="
echo "1. Go to your Vercel dashboard: https://vercel.com/dashboard"
echo "2. Click on the 'affiliate-template-72325' project"
echo "3. Go to Settings > Environment Variables"
echo "4. Add the following variables:"
echo ""
echo "   NEXT_PUBLIC_SUPABASE_URL"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   SUPABASE_SERVICE_ROLE_KEY"
echo "   DATABASE_URL"
echo "   DIRECT_URL"
echo "   NEXTAUTH_SECRET"
echo "   NEXTAUTH_URL (update with your deployment URL)"
echo "   OPENAI_API_KEY"
echo "   AMAZON_PARTNER_TAG"
echo ""
echo "5. Redeploy from the Vercel dashboard after adding environment variables"
echo ""
echo "Environment variables are in .env.production file"