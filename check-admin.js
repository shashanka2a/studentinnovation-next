#!/usr/bin/env node

/**
 * Check if super admin user exists
 */

const { PrismaClient } = require('@prisma/client')

console.log('🔍 Checking if super admin user exists...')

async function checkAdmin() {
  const prisma = new PrismaClient()
  
  try {
    // Check if super admin user exists
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@gatorinnovation.com' }
    })
    
    if (admin) {
      console.log('✅ Super admin user found:')
      console.log('   Email:', admin.email)
      console.log('   Name:', admin.name)
      console.log('   Role:', admin.role)
      console.log('   Active:', admin.isActive)
      console.log('   ID:', admin.id)
    } else {
      console.log('❌ Super admin user not found')
    }
    
  } catch (error) {
    console.error('❌ Check failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdmin()
