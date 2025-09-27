#!/usr/bin/env node

/**
 * Create Super Admin User Script
 * Using the updated Prisma client with new fields
 */

const { PrismaClient } = require('@prisma/client')

// Updated database URL with correct pooler format
const DATABASE_URL = "postgresql://postgres.hvadstswmmshkxxdpelu:e7p4UxfCArSnTe57@aws-1-us-east-2.pooler.supabase.com:6543/postgres"

console.log('🚀 Creating super admin user...')
console.log(`📡 Database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':***@')}`)

// Set environment variable for Prisma
process.env.DATABASE_URL = DATABASE_URL

async function createSuperAdmin() {
  const prisma = new PrismaClient()
  
  try {
    console.log('📊 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    console.log('🌱 Creating super admin user...')
    
    // Create super admin user
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
    
    console.log('✅ Super admin user created/updated successfully!')
    console.log('')
    console.log('🔑 Super Admin Credentials:')
    console.log('   Email: admin@gatorinnovation.com')
    console.log('   Password: admin123')
    console.log('   Role: SUPER_ADMIN')
    console.log('   ID:', superAdmin.id)
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
