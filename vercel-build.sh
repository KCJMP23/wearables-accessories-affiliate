#!/bin/bash
set -e

echo "🚀 Vercel Build Script for Monorepo"
echo "================================="

# Determine which app we're building based on VERCEL_PROJECT_NAME
if [[ "$VERCEL_PROJECT_NAME" == *"admin"* ]]; then
  APP="admin"
else
  APP="web"
fi

echo "Building app: $APP"

# Navigate to root directory
cd ../..

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
cd packages/db
pnpm prisma generate
cd ../..

# Build the db package first
echo "🔨 Building @affiliate-template/db package..."
cd packages/db
pnpm build
cd ../..

# Build the specific app
echo "🏗️ Building $APP app..."
cd apps/$APP
pnpm build

echo "✅ Build complete!"