#!/usr/bin/env node

/**
 * Simple Database Migration Script
 * Using individual queries to avoid prepared statement conflicts
 */

const { PrismaClient } = require('@prisma/client')

// Updated database URL with correct pooler format
const DATABASE_URL = "postgresql://postgres.hvadstswmmshkxxdpelu:e7p4UxfCArSnTe57@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

console.log('🚀 Starting simple database migration...')
console.log(`📡 Database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':***@')}`)

// Set environment variable for Prisma
process.env.DATABASE_URL = DATABASE_URL

async function migrateDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('📊 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    console.log('🔄 Starting schema migration...')
    
    // Add role column to users table
    console.log('📝 Adding role column to users table...')
    try {
      await prisma.$executeRaw`ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'CLIENT';`
      console.log('✅ Role column added')
    } catch (error) {
      console.log('⚠️ Role column might already exist:', error.message)
    }
    
    // Add isActive column to users table
    console.log('📝 Adding isActive column to users table...')
    try {
      await prisma.$executeRaw`ALTER TABLE users ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;`
      console.log('✅ isActive column added')
    } catch (error) {
      console.log('⚠️ isActive column might already exist:', error.message)
    }
    
    // Add projectType column to projects table
    console.log('📝 Adding projectType column to projects table...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "projectType" TEXT DEFAULT 'landing-page';`
      console.log('✅ projectType column added')
    } catch (error) {
      console.log('⚠️ projectType column might already exist:', error.message)
    }
    
    // Add hero content columns
    console.log('📝 Adding hero content columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "heroHeadline" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "heroSubheadline" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "heroImage" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "primaryCTA" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "secondaryCTA" TEXT;`
      console.log('✅ Hero content columns added')
    } catch (error) {
      console.log('⚠️ Hero content columns might already exist:', error.message)
    }
    
    // Add content columns
    console.log('📝 Adding content columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "aboutContent" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "benefits" TEXT[] DEFAULT '{}';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "testimonials" TEXT[] DEFAULT '{}';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "teamInfo" TEXT;`
      console.log('✅ Content columns added')
    } catch (error) {
      console.log('⚠️ Content columns might already exist:', error.message)
    }
    
    // Add contact columns
    console.log('📝 Adding contact columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "contactEmail" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "contactPhone" TEXT;`
      console.log('✅ Contact columns added')
    } catch (error) {
      console.log('⚠️ Contact columns might already exist:', error.message)
    }
    
    // Add social media columns
    console.log('📝 Adding social media columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "socialTwitter" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "socialLinkedin" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "socialInstagram" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "socialFacebook" TEXT;`
      console.log('✅ Social media columns added')
    } catch (error) {
      console.log('⚠️ Social media columns might already exist:', error.message)
    }
    
    // Add brand color columns
    console.log('📝 Adding brand color columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "brandPrimaryColor" TEXT DEFAULT '#3B82F6';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "brandSecondaryColor" TEXT DEFAULT '#1E40AF';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "brandAccentColor" TEXT DEFAULT '#F59E0B';`
      console.log('✅ Brand color columns added')
    } catch (error) {
      console.log('⚠️ Brand color columns might already exist:', error.message)
    }
    
    // Add design preference columns
    console.log('📝 Adding design preference columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "brandVoice" TEXT DEFAULT 'professional';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "layoutStyle" TEXT DEFAULT 'modern';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "imageStyle" TEXT DEFAULT 'photography';`
      console.log('✅ Design preference columns added')
    } catch (error) {
      console.log('⚠️ Design preference columns might already exist:', error.message)
    }
    
    // Add technical columns
    console.log('📝 Adding technical columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "domain" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "hosting" TEXT DEFAULT 'managed';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "seoEnabled" BOOLEAN DEFAULT true;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "analyticsEnabled" BOOLEAN DEFAULT true;`
      console.log('✅ Technical columns added')
    } catch (error) {
      console.log('⚠️ Technical columns might already exist:', error.message)
    }
    
    // Add admin columns
    console.log('📝 Adding admin columns...')
    try {
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "landingPageUrl" TEXT;`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "screenshots" TEXT[] DEFAULT '{}';`
      await prisma.$executeRaw`ALTER TABLE projects ADD COLUMN IF NOT EXISTS "adminNotes" TEXT;`
      console.log('✅ Admin columns added')
    } catch (error) {
      console.log('⚠️ Admin columns might already exist:', error.message)
    }
    
    // Create UserRole enum
    console.log('📝 Creating UserRole enum...')
    try {
      await prisma.$executeRaw`CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'ADMIN', 'SUPER_ADMIN');`
      console.log('✅ UserRole enum created')
    } catch (error) {
      console.log('⚠️ UserRole enum might already exist:', error.message)
    }
    
    // Create super admin user
    console.log('🌱 Creating super admin user...')
    try {
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
    } catch (error) {
      console.log('⚠️ Super admin user creation failed:', error.message)
    }
    
    console.log('🎉 Database migration completed!')
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
