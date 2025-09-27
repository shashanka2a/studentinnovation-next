#!/usr/bin/env node

/**
 * Simple Seed Script
 * Creates the super admin user
 */

const { PrismaClient } = require('@prisma/client')

console.log('🌱 Seeding database with super admin user...')

async function seed() {
  const prisma = new PrismaClient()
  
  try {
    // Create super admin user
    console.log('📝 Creating super admin user...')
    
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
    console.log('')
    console.log('🔑 Super Admin Credentials:')
    console.log('   Email: admin@gatorinnovation.com')
    console.log('   Password: admin123')
    console.log('   Role: SUPER_ADMIN')
    console.log('')
    console.log('🚀 You can now access the admin dashboard at: /admin/login')
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
