import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockClient, testScenarios } from '../mock-client-data';

// Import all the pages we need to test
import Page from '@/app/page';
import SignupPage from '@/app/signup/page';
import DashboardPage from '@/app/dashboard/page';
import AIConsultationPage from '@/app/ai-consultation/page';
import ProjectReviewPage from '@/app/project-review/page';
import AwaitingDeveloperPage from '@/app/awaiting-developer/page';
import FullAppConsultationPage from '@/app/full-app-consultation/page';
import FullAppRoadmapPage from '@/app/full-app-roadmap/page';
import PaymentPage from '@/app/payment/page';

describe('Complete User Journey - EcoTrack Project', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('1. Landing Page', () => {
    test('should display hero section with correct content', () => {
      render(<Page />);
      
      expect(screen.getByText('Build your MVP fast')).toBeInTheDocument();
      expect(screen.getByText('Websites, mobile apps, and brands for student entrepreneurs and business owners.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start your project/i })).toBeInTheDocument();
    });

    test('should display project showcase', () => {
      render(<Page />);
      
      expect(screen.getByText('GatorEx')).toBeInTheDocument();
      expect(screen.getByText('Rydify')).toBeInTheDocument();
      expect(screen.getByText('Vybr')).toBeInTheDocument();
    });

    test('should navigate to signup when CTA is clicked', async () => {
      render(<Page />);
      
      const startButton = screen.getByRole('button', { name: /start your project/i });
      await user.click(startButton);
      
      // Should show loading state
      expect(screen.getByText('Starting your project...')).toBeInTheDocument();
    });
  });

  describe('2. Signup Page', () => {
    test('should render all form fields', () => {
      render(<SignupPage />);
      
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/user type/i)).toBeInTheDocument();
    });

    test('should render OAuth buttons', () => {
      render(<SignupPage />);
      
      expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue with apple/i })).toBeInTheDocument();
    });

    test('should handle form submission with mock client data', async () => {
      render(<SignupPage />);
      
      // Fill form with mock client data
      await user.type(screen.getByLabelText(/full name/i), mockClient.user.name);
      await user.type(screen.getByLabelText(/email/i), mockClient.user.email);
      await user.type(screen.getByLabelText(/password/i), mockClient.user.password);
      await user.type(screen.getByLabelText(/confirm password/i), mockClient.user.password);
      
      const submitButton = screen.getByRole('button', { name: /create account/i });
      await user.click(submitButton);
      
      // Should show loading state
      expect(screen.getByText('Creating your account...')).toBeInTheDocument();
    });
  });

  describe('3. Dashboard Page', () => {
    test('should render 3-step process', () => {
      render(<DashboardPage />);
      
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
      expect(screen.getByText('Project Details')).toBeInTheDocument();
    });

    test('should handle project setup with mock data', async () => {
      render(<DashboardPage />);
      
      // Step 1: Project details
      await user.type(screen.getByLabelText(/project name/i), mockClient.project.name);
      await user.type(screen.getByLabelText(/description/i), mockClient.project.description);
      await user.type(screen.getByLabelText(/website/i), mockClient.project.website);
      
      const nextButton = screen.getByRole('button', { name: /next step/i });
      await user.click(nextButton);
      
      // Should move to step 2
      expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
    });

    test('should complete all 3 steps', async () => {
      render(<DashboardPage />);
      
      // Step 1
      await user.type(screen.getByLabelText(/project name/i), mockClient.project.name);
      await user.type(screen.getByLabelText(/description/i), mockClient.project.description);
      await user.click(screen.getByRole('button', { name: /next step/i }));
      
      // Step 2
      await user.type(screen.getByLabelText(/target audience/i), mockClient.project.targetAudience);
      await user.click(screen.getByRole('button', { name: /next step/i }));
      
      // Step 3
      await user.click(screen.getByRole('button', { name: /start ai consultation/i }));
      
      // Should show loading and redirect
      expect(screen.getByText('Starting AI consultation...')).toBeInTheDocument();
    });
  });

  describe('4. AI Consultation Page', () => {
    test('should display welcome message', () => {
      render(<AIConsultationPage />);
      
      expect(screen.getByText(/hello! i'm your ai consultant/i)).toBeInTheDocument();
    });

    test('should handle chat interaction', async () => {
      render(<AIConsultationPage />);
      
      const chatInput = screen.getByPlaceholderText(/type your message/i);
      const sendButton = screen.getByRole('button', { name: /send/i });
      
      // Send user message
      await user.type(chatInput, mockClient.aiConsultation.userResponses[0]);
      await user.click(sendButton);
      
      // Should show user message
      expect(screen.getByText(mockClient.aiConsultation.userResponses[0])).toBeInTheDocument();
      
      // Should show AI response after delay
      await waitFor(() => {
        expect(screen.getByText(/excellent! i can see ecotrack has real potential/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    test('should complete consultation and show review button', async () => {
      render(<AIConsultationPage />);
      
      // Simulate completing consultation
      const chatInput = screen.getByPlaceholderText(/type your message/i);
      const sendButton = screen.getByRole('button', { name: /send/i });
      
      // Send multiple messages to complete consultation
      for (const response of mockClient.aiConsultation.userResponses) {
        await user.type(chatInput, response);
        await user.click(sendButton);
        await user.clear(chatInput);
      }
      
      // Should show completion screen
      await waitFor(() => {
        expect(screen.getByText(/consultation complete/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /review project details/i })).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });

  describe('5. Project Review Page', () => {
    test('should display project summary', () => {
      render(<ProjectReviewPage />);
      
      expect(screen.getByText('EcoTrack')).toBeInTheDocument();
      expect(screen.getByText(/mobile app to track carbon footprint/i)).toBeInTheDocument();
      expect(screen.getByText('Mobile App')).toBeInTheDocument();
    });

    test('should show project features', () => {
      render(<ProjectReviewPage />);
      
      expect(screen.getByText('Carbon footprint calculator')).toBeInTheDocument();
      expect(screen.getByText('Eco-friendly product recommendations')).toBeInTheDocument();
      expect(screen.getByText('Progress tracking dashboard')).toBeInTheDocument();
    });

    test('should handle confirmation', async () => {
      render(<ProjectReviewPage />);
      
      const confirmButton = screen.getByRole('button', { name: /confirm & start development/i });
      await user.click(confirmButton);
      
      // Should show loading state
      expect(screen.getByText('Processing your request...')).toBeInTheDocument();
    });
  });

  describe('6. Awaiting Developer Page', () => {
    test('should display progress tracking', () => {
      render(<AwaitingDeveloperPage />);
      
      expect(screen.getByText(/development in progress/i)).toBeInTheDocument();
      expect(screen.getByText(/1 day, 23 hours/i)).toBeInTheDocument();
    });

    test('should show upgrade option', () => {
      render(<AwaitingDeveloperPage />);
      
      expect(screen.getByText(/start full app development/i)).toBeInTheDocument();
    });

    test('should handle upgrade to full app', async () => {
      render(<AwaitingDeveloperPage />);
      
      const upgradeButton = screen.getByRole('button', { name: /start full app development/i });
      await user.click(upgradeButton);
      
      // Should show loading and redirect
      expect(screen.getByText('Redirecting to full app consultation...')).toBeInTheDocument();
    });
  });

  describe('7. Full App Consultation Page', () => {
    test('should display advanced consultation interface', () => {
      render(<FullAppConsultationPage />);
      
      expect(screen.getByText(/excellent! i can see you're ready to take your project/i)).toBeInTheDocument();
    });

    test('should handle technical discussion', async () => {
      render(<FullAppConsultationPage />);
      
      const chatInput = screen.getByPlaceholderText(/type your message/i);
      const sendButton = screen.getByRole('button', { name: /send/i });
      
      // Send technical requirements
      await user.type(chatInput, mockClient.fullAppConsultation.userResponses[0]);
      await user.click(sendButton);
      
      // Should show user message
      expect(screen.getByText(mockClient.fullAppConsultation.userResponses[0])).toBeInTheDocument();
    });

    test('should complete consultation and show roadmap button', async () => {
      render(<FullAppConsultationPage />);
      
      // Simulate completing full consultation
      const chatInput = screen.getByPlaceholderText(/type your message/i);
      const sendButton = screen.getByRole('button', { name: /send/i });
      
      for (const response of mockClient.fullAppConsultation.userResponses) {
        await user.type(chatInput, response);
        await user.click(sendButton);
        await user.clear(chatInput);
      }
      
      // Should show completion and roadmap button
      await waitFor(() => {
        expect(screen.getByText(/consultation complete/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /view full app roadmap/i })).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });

  describe('8. Full App Roadmap Page', () => {
    test('should display development phases', () => {
      render(<FullAppRoadmapPage />);
      
      expect(screen.getByText('Database Architecture')).toBeInTheDocument();
      expect(screen.getByText('Authentication System')).toBeInTheDocument();
      expect(screen.getByText('Core Features')).toBeInTheDocument();
    });

    test('should show pricing plans', () => {
      render(<FullAppRoadmapPage />);
      
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
      expect(screen.getByText('Standard Plan')).toBeInTheDocument();
      expect(screen.getByText('Premium Plan')).toBeInTheDocument();
    });

    test('should handle plan selection', async () => {
      render(<FullAppRoadmapPage />);
      
      const standardPlan = screen.getByText('Standard Plan');
      await user.click(standardPlan);
      
      // Should show selected plan
      expect(screen.getByText('Standard Plan')).toHaveClass('ring-2');
    });

    test('should proceed to payment', async () => {
      render(<FullAppRoadmapPage />);
      
      const paymentButton = screen.getByRole('button', { name: /proceed to payment/i });
      await user.click(paymentButton);
      
      // Should show loading and redirect
      expect(screen.getByText('Redirecting to payment...')).toBeInTheDocument();
    });
  });

  describe('9. Payment Page', () => {
    test('should display payment form', () => {
      render(<PaymentPage />);
      
      expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    });

    test('should show order summary', () => {
      render(<PaymentPage />);
      
      expect(screen.getByText('Order Summary')).toBeInTheDocument();
      expect(screen.getByText('EcoTrack - Full App Development')).toBeInTheDocument();
    });

    test('should handle payment with mock data', async () => {
      render(<PaymentPage />);
      
      // Fill payment form
      await user.type(screen.getByLabelText(/card number/i), mockClient.payment.cardNumber);
      await user.type(screen.getByLabelText(/expiry date/i), mockClient.payment.expiryDate);
      await user.type(screen.getByLabelText(/cvv/i), mockClient.payment.cvv);
      await user.type(screen.getByLabelText(/full name/i), mockClient.payment.name);
      await user.type(screen.getByLabelText(/email/i), mockClient.payment.email);
      
      const payButton = screen.getByRole('button', { name: /pay now/i });
      await user.click(payButton);
      
      // Should show processing state
      expect(screen.getByText('Processing payment...')).toBeInTheDocument();
    });

    test('should show success screen after payment', async () => {
      render(<PaymentPage />);
      
      // Simulate payment completion
      const payButton = screen.getByRole('button', { name: /pay now/i });
      await user.click(payButton);
      
      // Should show success screen
      await waitFor(() => {
        expect(screen.getByText(/payment successful/i)).toBeInTheDocument();
        expect(screen.getByText(/thank you for your payment/i)).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });
});

describe('Different User Scenarios', () => {
  test('Student Entrepreneur Journey', () => {
    const scenario = testScenarios.studentEntrepreneur;
    expect(scenario.userType).toBe('student-entrepreneur');
    expect(scenario.project).toBe('EcoTrack');
    expect(scenario.budget).toBe('$2,500 - $5,000');
  });

  test('Business Owner Journey', () => {
    const scenario = testScenarios.businessOwner;
    expect(scenario.userType).toBe('business-owner');
    expect(scenario.project).toBe('InventoryPro');
    expect(scenario.budget).toBe('$5,000 - $10,000');
  });

  test('Startup Journey', () => {
    const scenario = testScenarios.startup;
    expect(scenario.userType).toBe('startup');
    expect(scenario.project).toBe('HealthTracker');
    expect(scenario.budget).toBe('$10,000+');
  });
});
