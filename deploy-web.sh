#!/bin/bash

echo "🚀 Deploying TechWear Hub Web App"
echo "================================"

# Ensure we're in the root directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm db:generate

# Build the web app
echo "🏗️  Building web app..."
cd apps/web
pnpm build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod --yes

echo "✅ Deployment complete!"