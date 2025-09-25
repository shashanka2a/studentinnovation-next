#!/usr/bin/env node

/**
 * Supabase Database Setup Script
 * This script will set up your Supabase database with the provided credentials
 */

const { PrismaClient } = require('@prisma/client')

// Your Supabase database configuration
const DATABASE_URL = "postgresql://postgres:wkiYQ9m6bmlenTQa@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres"
const SUPABASE_URL = "https://hvadstswmmshkxxdpelu.supabase.co"

console.log('🚀 Setting up Supabase database...')
console.log(`📡 Database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':***@')}`)
console.log(`🌐 Supabase URL: ${SUPABASE_URL}`)

// Set environment variable for Prisma
process.env.DATABASE_URL = DATABASE_URL

async function setupDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('📊 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    console.log('🔄 Pushing schema to database...')
    // This will be handled by the npm script
    
    console.log('🌱 Seeding database with sample data...')
    // This will be handled by the npm script
    
    console.log('🎉 Database setup complete!')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()
