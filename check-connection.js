#!/usr/bin/env node

/**
 * Connection Check Script
 * This script will help diagnose the database connection issue
 */

const { PrismaClient } = require('@prisma/client')

console.log('🔍 Database Connection Diagnostic Tool')
console.log('=====================================')

// Test different connection methods
const connectionTests = [
  {
    name: 'Direct Connection (Port 5432)',
    url: 'postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres'
  },
  {
    name: 'Connection Pooler (Port 6543)',
    url: 'postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:6543/postgres'
  },
  {
    name: 'AWS Pooler',
    url: 'postgresql://postgres.e7p4UxfCArSnTe57@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
  },
  {
    name: 'Direct with SSL',
    url: 'postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres?sslmode=require'
  },
  {
    name: 'Pooler with SSL',
    url: 'postgresql://postgres:e7p4UxfCArSnTe57@db.hvadstswmmshkxxdpelu.supabase.co:6543/postgres?sslmode=require'
  }
]

async function testConnection(test) {
  console.log(`\n📡 Testing: ${test.name}`)
  console.log(`🔗 URL: ${test.url.replace(/:[^:]*@/, ':***@')}`)
  
  process.env.DATABASE_URL = test.url
  const prisma = new PrismaClient()
  
  try {
    await prisma.$connect()
    console.log('✅ Connection successful!')
    await prisma.$disconnect()
    return true
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`)
    await prisma.$disconnect()
    return false
  }
}

async function runDiagnostics() {
  console.log('\n🚀 Running connection diagnostics...')
  
  let successfulConnection = null
  
  for (const test of connectionTests) {
    const success = await testConnection(test)
    if (success && !successfulConnection) {
      successfulConnection = test
    }
  }
  
  console.log('\n📊 Diagnostic Results:')
  console.log('=====================')
  
  if (successfulConnection) {
    console.log('✅ Found working connection!')
    console.log(`🔗 Working URL: ${successfulConnection.url.replace(/:[^:]*@/, ':***@')}`)
    console.log('\n🎯 Next Steps:')
    console.log('1. Update your .env file with the working URL')
    console.log('2. Run the migration script')
  } else {
    console.log('❌ All connection attempts failed!')
    console.log('\n🔧 Possible Issues:')
    console.log('1. Supabase project is paused or deleted')
    console.log('2. Database URL has changed')
    console.log('3. Network restrictions or firewall')
    console.log('4. IP address not whitelisted')
    console.log('5. Project moved to different region')
    
    console.log('\n🛠️ Recommended Solutions:')
    console.log('1. Check Supabase dashboard: https://supabase.com/dashboard/project/hvadstswmmshkxxdpelu')
    console.log('2. Verify project status (not paused)')
    console.log('3. Get current database URL from Settings > Database')
    console.log('4. Check if your IP is whitelisted')
    console.log('5. Consider creating a new Supabase project')
  }
}

runDiagnostics()
