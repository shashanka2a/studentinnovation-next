#!/usr/bin/env node

/**
 * Database Migration Script with TLS/SSL Connection
 * This script will try different connection methods with SSL
 */

const { PrismaClient } = require('@prisma/client')

// Try different database URLs with SSL parameters
const DATABASE_URLS = [
  "postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres?sslmode=require",
  "postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:6543/postgres?sslmode=require",
  "postgresql://postgres.e7p4UxfCArSnTe57@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require",
  "postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres?sslmode=prefer",
  "postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:6543/postgres?sslmode=prefer"
]

console.log('🚀 Starting database migration with TLS/SSL connection attempts...')

async function tryConnection(url, index) {
  console.log(`📡 Attempt ${index + 1}: ${url.replace(/:[^:]*@/, ':***@')}`)
  
  process.env.DATABASE_URL = url
  const prisma = new PrismaClient()
  
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    return prisma
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`)
    await prisma.$disconnect()
    return null
  }
}

async function migrateDatabase() {
  let prisma = null
  
  // Try each connection URL
  for (let i = 0; i < DATABASE_URLS.length; i++) {
    prisma = await tryConnection(DATABASE_URLS[i], i)
    if (prisma) break
  }
  
  if (!prisma) {
    console.error('❌ All connection attempts failed!')
    console.log('')
    console.log('🔧 Troubleshooting steps:')
    console.log('1. Check if your Supabase project is paused')
    console.log('2. Verify the database URL in your Supabase dashboard')
    console.log('3. Check if your IP is whitelisted')
    console.log('4. Try using the connection pooler URL')
    console.log('5. Check if SSL/TLS is required')
    process.exit(1)
  }
  
  try {
    console.log('🔄 Starting schema migration...')
    
    // Add new columns to users table
    console.log('📝 Adding columns to users table...')
    await prisma.$executeRaw`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'CLIENT',
      ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;
    `
    
    // Add new columns to projects table
    console.log('📝 Adding columns to projects table...')
    await prisma.$executeRaw`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS "projectType" TEXT DEFAULT 'landing-page',
      ADD COLUMN IF NOT EXISTS "heroHeadline" TEXT,
      ADD COLUMN IF NOT EXISTS "heroSubheadline" TEXT,
      ADD COLUMN IF NOT EXISTS "heroImage" TEXT,
      ADD COLUMN IF NOT EXISTS "primaryCTA" TEXT,
      ADD COLUMN IF NOT EXISTS "secondaryCTA" TEXT,
      ADD COLUMN IF NOT EXISTS "aboutContent" TEXT,
      ADD COLUMN IF NOT EXISTS "benefits" TEXT[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS "testimonials" TEXT[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS "teamInfo" TEXT,
      ADD COLUMN IF NOT EXISTS "contactEmail" TEXT,
      ADD COLUMN IF NOT EXISTS "contactPhone" TEXT,
      ADD COLUMN IF NOT EXISTS "socialTwitter" TEXT,
      ADD COLUMN IF NOT EXISTS "socialLinkedin" TEXT,
      ADD COLUMN IF NOT EXISTS "socialInstagram" TEXT,
      ADD COLUMN IF NOT EXISTS "socialFacebook" TEXT,
      ADD COLUMN IF NOT EXISTS "brandPrimaryColor" TEXT DEFAULT '#3B82F6',
      ADD COLUMN IF NOT EXISTS "brandSecondaryColor" TEXT DEFAULT '#1E40AF',
      ADD COLUMN IF NOT EXISTS "brandAccentColor" TEXT DEFAULT '#F59E0B',
      ADD COLUMN IF NOT EXISTS "brandVoice" TEXT DEFAULT 'professional',
      ADD COLUMN IF NOT EXISTS "layoutStyle" TEXT DEFAULT 'modern',
      ADD COLUMN IF NOT EXISTS "imageStyle" TEXT DEFAULT 'photography',
      ADD COLUMN IF NOT EXISTS "domain" TEXT,
      ADD COLUMN IF NOT EXISTS "hosting" TEXT DEFAULT 'managed',
      ADD COLUMN IF NOT EXISTS "seoEnabled" BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS "analyticsEnabled" BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS "landingPageUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "screenshots" TEXT[] DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;
    `
    
    // Create UserRole enum
    console.log('📝 Creating UserRole enum...')
    await prisma.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'ADMIN', 'SUPER_ADMIN');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `
    
    // Update users table to use the enum
    console.log('📝 Updating users table to use UserRole enum...')
    await prisma.$executeRaw`
      ALTER TABLE users 
      ALTER COLUMN role TYPE "UserRole" USING role::"UserRole";
    `
    
    // Create super admin user
    console.log('🌱 Creating super admin user...')
    const superAdmin = await prisma.user.upsert({
      where: { email: 'admin@gatorinnovation.com' },
      update: {
        role: 'SUPER_ADMIN',
        isActive: true,
        name: 'GatorInnovation Admin'
      },
      create: {
        id: 'super-admin-1',
        email: 'admin@gatorinnovation.com',
        name: 'GatorInnovation Admin',
        userType: 'STUDENT_ENTREPRENEUR',
        role: 'SUPER_ADMIN',
        isActive: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    })
    
    console.log('✅ Super admin user created/updated:', superAdmin.email)
    console.log('🎉 Database migration completed successfully!')
    console.log('')
    console.log('🔑 Super Admin Credentials:')
    console.log('   Email: admin@gatorinnovation.com')
    console.log('   Password: admin123')
    console.log('   Role: SUPER_ADMIN')
    console.log('')
    console.log('🚀 You can now access the admin dashboard at: /admin/login')
    
  } catch (error) {
    console.error('❌ Database migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

migrateDatabase()
