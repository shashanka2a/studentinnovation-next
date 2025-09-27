# 🧪 App Flow Tests

This directory contains Playwright tests for the complete application flow, including client journey, admin dashboard, and project management functionality.

## 📋 Test Files

### `e2e/simple-flow.spec.ts`
- **Purpose**: Basic page navigation and content verification
- **Tests**: Landing page, signup, project creation, admin dashboard
- **Duration**: ~2-3 minutes
- **Best for**: Quick smoke tests

### `e2e/basic-flow.spec.ts`
- **Purpose**: Complete client journey from signup to payment
- **Tests**: Full project creation flow, form validation, preview functionality
- **Duration**: ~5-7 minutes
- **Best for**: Comprehensive testing

### `e2e/complete-app-flow.spec.ts`
- **Purpose**: Full application testing with mock data
- **Tests**: Complete user journey, admin functionality, responsive design
- **Duration**: ~10-15 minutes
- **Best for**: Full regression testing

## 🚀 Running Tests

### Quick Test (Recommended)
```bash
# Run simple flow tests
node test-app.js
```

### Individual Test Files
```bash
# Run simple flow tests
npx playwright test tests/e2e/simple-flow.spec.ts --headed

# Run basic flow tests
npx playwright test tests/e2e/basic-flow.spec.ts --headed

# Run complete flow tests
npx playwright test tests/e2e/complete-app-flow.spec.ts --headed
```

### All Tests
```bash
# Run all e2e tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

## 🎯 What the Tests Cover

### Client Journey
- ✅ Landing page navigation
- ✅ Signup form functionality
- ✅ Project type selection
- ✅ Multi-step project form
- ✅ Project review and preview
- ✅ Payment page
- ✅ Client dashboard

### Admin Functionality
- ✅ Admin login (no authentication required)
- ✅ Admin dashboard access
- ✅ Project management interface
- ✅ Project status updates

### Form Validation
- ✅ Project form steps navigation
- ✅ Required field validation
- ✅ Form data persistence
- ✅ Preview functionality

### Responsive Design
- ✅ Mobile viewport (375px)
- ✅ Tablet viewport (768px)
- ✅ Desktop viewport (1920px)

## 🔧 Test Configuration

### Mock Data
The tests use realistic mock data for:
- **Client Information**: Name, email, project type
- **Project Details**: Landing page content, branding, technical requirements
- **Admin Access**: Dashboard functionality

### Test Environment
- **Base URL**: `http://localhost:3000`
- **Browser**: Chromium (default)
- **Viewport**: Responsive testing
- **Timeout**: 30 seconds per test

## 📊 Test Results

### Expected Outcomes
- ✅ All pages load correctly
- ✅ Forms submit successfully
- ✅ Navigation works properly
- ✅ Preview functionality works
- ✅ Admin dashboard accessible
- ✅ Responsive design works

### Common Issues
- **Page not found**: Ensure app is running on localhost:3000
- **Form submission fails**: Check if API routes are working
- **Authentication errors**: Admin routes should be open (no auth required)
- **Timeout errors**: Increase timeout or check page load speed

## 🛠️ Troubleshooting

### Prerequisites
1. **App Running**: Ensure the Next.js app is running on localhost:3000
2. **Database**: Ensure database is accessible (for admin functionality)
3. **Dependencies**: Install Playwright if not already installed

### Common Fixes
```bash
# Install Playwright
npx playwright install

# Check if app is running
curl http://localhost:3000

# Run tests with debug
npx playwright test --debug

# Run specific test
npx playwright test tests/e2e/simple-flow.spec.ts --headed --timeout=60000
```

### Debug Mode
```bash
# Run with debug mode
npx playwright test --debug

# Run with UI mode
npx playwright test --ui

# Run with trace
npx playwright test --trace on
```

## 📈 Test Reports

After running tests, you can view detailed reports:
- **HTML Report**: `playwright-report/index.html`
- **Screenshots**: `test-results/`
- **Videos**: `test-results/` (if enabled)

## 🎉 Success Criteria

Tests pass when:
- ✅ All pages load without errors
- ✅ Forms submit successfully
- ✅ Navigation works correctly
- ✅ Preview functionality works
- ✅ Admin dashboard is accessible
- ✅ Responsive design works on all viewports

---

**Note**: These tests are designed to work with the current app configuration where authentication is disabled for MVP testing.
