#!/usr/bin/env node

/**
 * Simple Test Runner for App Flow
 * Tests the complete application flow with Playwright
 */

const { execSync } = require('child_process');

console.log('🚀 Starting App Flow Tests');
console.log('==========================');

async function runAppTests() {
  try {
    console.log('📋 Running simple app flow tests...');
    
    // Run the simple flow test
    execSync('npx playwright test tests/e2e/simple-flow.spec.ts --headed --timeout=30000', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Simple app flow tests completed successfully!');
    
    console.log('📋 Running basic app flow tests...');
    
    // Run the basic flow test
    execSync('npx playwright test tests/e2e/basic-flow.spec.ts --headed --timeout=30000', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Basic app flow tests completed successfully!');
    
    console.log('🎉 All app flow tests completed successfully!');
    console.log('');
    console.log('📊 Test Summary:');
    console.log('  ✅ Landing page navigation');
    console.log('  ✅ Signup form functionality');
    console.log('  ✅ Project creation flow');
    console.log('  ✅ Project review and preview');
    console.log('  ✅ Payment page');
    console.log('  ✅ Client dashboard');
    console.log('  ✅ Admin dashboard');
    console.log('  ✅ Responsive design');
    
  } catch (error) {
    console.error('❌ Tests failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('  1. Make sure the app is running on localhost:3000');
    console.log('  2. Check if all pages are accessible');
    console.log('  3. Verify form fields are working');
    console.log('  4. Check browser console for errors');
    process.exit(1);
  }
}

// Check if we're in the right directory
try {
  const packageJson = require('./package.json');
  if (!packageJson.name.includes('gatorinnovation')) {
    throw new Error('Not in the correct project directory');
  }
} catch (error) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

runAppTests();
