#!/bin/bash

echo "Adding environment variables for web app..."

cd apps/web

# Add environment variables
echo "https://hdvruoskquplrtddmwnj.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdnJ1b3NrcXVwbHJ0ZGRtd25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjMzOTYsImV4cCI6MjA2MzAzOTM5Nn0.SjZfXh3TKuY2eA2MyuIYsyXYUI6KDd6PD-eN0wIxwGs" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

echo "✅ Environment variables added!"