#!/usr/bin/env node

/**
 * Test Runner Script
 * Runs Playwright tests for the complete app flow
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Playwright Test Suite');
console.log('=====================================');

async function runTests() {
  try {
    console.log('📋 Running basic app flow tests...');
    
    // Run the basic flow test
    execSync('npx playwright test tests/e2e/basic-flow.spec.ts --headed', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Basic flow tests completed successfully!');
    
    console.log('📋 Running complete app flow tests...');
    
    // Run the complete flow test
    execSync('npx playwright test tests/e2e/complete-app-flow.spec.ts --headed', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Complete app flow tests completed successfully!');
    
    console.log('🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Tests failed:', error.message);
    process.exit(1);
  }
}

// Check if Playwright is installed
try {
  execSync('npx playwright --version', { stdio: 'pipe' });
} catch (error) {
  console.log('📦 Installing Playwright...');
  execSync('npx playwright install', { stdio: 'inherit' });
}

runTests();
