#!/bin/bash

echo "🚀 Deploying TechWear Hub Applications"
echo "====================================="

# Ensure we have the latest code
git add -A
git commit -m "chore: prepare for deployment" || true
git push wearables main || true

echo ""
echo "📱 Deploy Web App (Public Site)"
echo "=============================="
echo "1. Go to: https://vercel.com/new"
echo "2. Import: KCJMP23/wearables-accessories-affiliate"
echo "3. Configure:"
echo "   - Project Name: techwear-hub"
echo "   - Framework: Next.js"
echo "   - Root Directory: apps/web"
echo "   - Build Command: cd ../.. && pnpm install && pnpm db:generate && cd apps/web && pnpm build"
echo "   - Install Command: cd ../.. && pnpm install"
echo ""
echo "4. Environment Variables:"
echo "   NEXT_PUBLIC_SUPABASE_URL=https://hdvruoskquplrtddmwnj.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=[from .env.production]"
echo "   DATABASE_URL=[from .env.production]"
echo ""

echo ""
echo "🔧 Deploy Admin CMS"
echo "=================="
echo "1. Go to: https://vercel.com/new"
echo "2. Import: KCJMP23/wearables-accessories-affiliate (same repo)"
echo "3. Configure:"
echo "   - Project Name: techwear-hub-admin"
echo "   - Framework: Next.js"
echo "   - Root Directory: apps/admin"
echo "   - Build Command: cd ../.. && pnpm install && pnpm db:generate && cd apps/admin && pnpm build"
echo "   - Install Command: cd ../.. && pnpm install"
echo ""
echo "4. Add ALL environment variables from apps/admin/.env.production"
echo ""

echo "✅ Deployment URLs:"
echo "- Web: https://techwear-hub.vercel.app"
echo "- Admin: https://techwear-hub-admin.vercel.app"