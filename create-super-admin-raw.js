#!/usr/bin/env node

/**
 * Create Super Admin User Script with Raw SQL
 * Using raw SQL to avoid prepared statement conflicts
 */

const { PrismaClient } = require('@prisma/client')

// Updated database URL with correct pooler format
const DATABASE_URL = "postgresql://postgres.hvadstswmmshkxxdpelu:e7p4UxfCArSnTe57@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

console.log('🚀 Creating super admin user with raw SQL...')
console.log(`📡 Database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':***@')}`)

// Set environment variable for Prisma
process.env.DATABASE_URL = DATABASE_URL

async function createSuperAdmin() {
  const prisma = new PrismaClient()
  
  try {
    console.log('📊 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    console.log('🌱 Creating super admin user with raw SQL...')
    
    // Create super admin user using raw SQL
    await prisma.$executeRaw`
      INSERT INTO users (id, email, name, "userType", role, "isActive", avatar, "createdAt", "updatedAt")
      VALUES ('super-admin-1', 'admin@gatorinnovation.com', 'GatorInnovation Admin', 'STUDENT_ENTREPRENEUR', 'SUPER_ADMIN', true, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', NOW(), NOW())
      ON CONFLICT (email) 
      DO UPDATE SET 
        role = 'SUPER_ADMIN',
        "isActive" = true,
        name = 'GatorInnovation Admin',
        "updatedAt" = NOW();
    `
    
    console.log('✅ Super admin user created/updated successfully!')
    console.log('')
    console.log('🔑 Super Admin Credentials:')
    console.log('   Email: admin@gatorinnovation.com')
    console.log('   Password: admin123')
    console.log('   Role: SUPER_ADMIN')
    console.log('')
    console.log('🚀 You can now access the admin dashboard at: /admin/login')
    
  } catch (error) {
    console.error('❌ Super admin creation failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createSuperAdmin()
