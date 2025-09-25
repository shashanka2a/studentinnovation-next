#!/bin/bash

# GatorInnovation Supabase Setup Script
echo "🚀 Setting up GatorInnovation with your Supabase database..."

# Set environment variables
export DATABASE_URL="postgresql://postgres:wkiYQ9m6bmlenTQa@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres"
export NEXT_PUBLIC_SUPABASE_URL="https://hvadstswmmshkxxdpelu.supabase.co"

echo "📡 Database URL configured"
echo "🌐 Supabase URL configured"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "📊 Pushing schema to database..."
npx prisma db push

# Seed database
echo "🌱 Seeding database with sample data..."
npx tsx prisma/seed.ts

# Open Prisma Studio
echo "🎉 Setup complete! Opening Prisma Studio..."
echo "📝 Next steps:"
echo "1. Get your Supabase API keys from: https://supabase.com/dashboard/project/hvadstswmmshkxxdpelu"
echo "2. Create .env.local with your API keys (see SUPABASE_SETUP.md)"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "🔗 Supabase Dashboard: https://supabase.com/dashboard/project/hvadstswmmshkxxdpelu"
echo "📊 Database Studio: Opening Prisma Studio..."

npx prisma studio
