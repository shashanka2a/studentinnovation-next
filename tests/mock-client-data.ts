// Mock client data for testing the complete user journey
export const mockClient = {
  // User information
  user: {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    password: "SecurePass123!",
    userType: "student-entrepreneur"
  },

  // Project information
  project: {
    name: "EcoTrack",
    description: "A mobile app to track carbon footprint and suggest eco-friendly alternatives for environmentally conscious individuals",
    website: "https://ecotrack.app",
    category: "Mobile App",
    targetAudience: "Environmentally conscious individuals aged 18-35",
    keyFeatures: [
      "Carbon footprint calculator",
      "Eco-friendly product recommendations", 
      "Progress tracking dashboard",
      "Social sharing features",
      "Gamification elements"
    ],
    techStack: ["React Native", "Firebase", "Node.js", "MongoDB"],
    timeline: "2 weeks",
    budget: "$2,500 - $5,000"
  },

  // AI Chat conversations
  aiConsultation: {
    initialMessage: "👋 Hello! I'm your AI consultant and I'm thrilled to help you bring your vision to life! I've reviewed your project details and I can already see the potential in what you're building. Let's dive deeper into your vision - what's the main problem your product solves, and how do you envision it making a difference for your users?",
    userResponses: [
      "The main problem is that people want to be environmentally conscious but don't know how to track their impact or find better alternatives. I envision EcoTrack helping users understand their carbon footprint and making it easy to find eco-friendly products.",
      "I want users to be able to scan products and get instant carbon footprint data, plus recommendations for greener alternatives.",
      "The app should have a social aspect where users can share their progress and challenge friends to be more eco-friendly.",
      "I'm thinking gamification elements like earning points for eco-friendly choices and unlocking achievements."
    ],
    aiResponses: [
      "Excellent! I can see EcoTrack has real potential to make environmental consciousness more accessible and engaging. The carbon footprint tracking combined with product scanning is a powerful combination. Let me understand more about your target users - are you primarily targeting college students, or do you see this appealing to a broader demographic?",
      "Perfect! The social and gamification elements will definitely increase user engagement and retention. For the product scanning feature, are you thinking of using barcode scanning, or would you prefer image recognition for more detailed analysis?",
      "That's a great approach! The social challenges feature could be a key differentiator. How do you envision users discovering and joining these challenges? Through the app directly, or would you want integration with social media platforms?",
      "Excellent! I have a clear picture of EcoTrack now. Based on our discussion, I can see this is a comprehensive mobile application with significant potential. The combination of tracking, recommendations, social features, and gamification creates a compelling user experience. Are you ready to proceed with the technical consultation for full app development?"
    ]
  },

  // Full app consultation
  fullAppConsultation: {
    initialMessage: "🚀 Excellent! I can see you're ready to take your project to the next level with full app development! I'm excited to help you build something amazing. Let's dive deeper into the technical requirements - what specific features do you need for your full application, and what's your vision for the complete user experience?",
    userResponses: [
      "I need a robust backend to handle user data, product database, and carbon footprint calculations. The app should work offline and sync when online.",
      "I want push notifications for daily tips and challenges, plus integration with fitness trackers to automatically track transportation emissions.",
      "The app should have admin features for me to manage the product database and user challenges, plus analytics to track user engagement.",
      "I need a web dashboard for users to view detailed reports and export their data, plus API access for potential partnerships with other eco-friendly apps."
    ],
    aiResponses: [
      "Perfect! A robust backend with offline capabilities is essential for a carbon tracking app. I can see you're thinking about scalability and user experience. For the offline functionality, are you planning to store data locally and sync when connectivity is restored?",
      "Excellent ideas! Push notifications and fitness tracker integration will significantly enhance user engagement. For the fitness tracker integration, are you thinking of Apple Health, Google Fit, or both?",
      "Great thinking ahead! Admin features and analytics are crucial for app management and growth. What kind of analytics are most important to you - user engagement, carbon footprint trends, or feature usage?",
      "Outstanding! A web dashboard and API access will definitely open up partnership opportunities. This is a comprehensive vision that will require a full-stack development approach. Are you ready to see the detailed roadmap and pricing for your full application?"
    ]
  },

  // Payment information
  payment: {
    cardNumber: "4242424242424242",
    expiryDate: "12/25",
    cvv: "123",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    address: "123 University Ave",
    city: "Gainesville",
    zipCode: "32601"
  },

  // Expected outcomes
  expectedOutcomes: {
    landingPage: {
      title: "Build your MVP fast",
      ctaText: "Start your project",
      projects: ["GatorEx", "Rydify", "Vybr"]
    },
    signupPage: {
      formFields: ["name", "email", "password", "confirmPassword", "userType"],
      oauthButtons: ["Google", "Apple"]
    },
    dashboardPage: {
      steps: 3,
      step1Fields: ["name", "description", "website", "logo"],
      step2Fields: ["features", "targetAudience"],
      step3Fields: ["budget", "timeline"]
    },
    aiConsultationPage: {
      chatInterface: true,
      welcomeMessage: true,
      userInput: true,
      aiResponse: true
    },
    projectReviewPage: {
      projectSummary: true,
      confirmButton: true,
      editOption: true
    },
    awaitingDeveloperPage: {
      progressBar: true,
      timeline: true,
      upgradeOption: true
    },
    fullAppConsultationPage: {
      advancedChat: true,
      technicalDiscussion: true,
      roadmapButton: true
    },
    fullAppRoadmapPage: {
      phases: 7,
      pricingPlans: 3,
      paymentButton: true
    },
    paymentPage: {
      paymentForm: true,
      orderSummary: true,
      securityBadges: true,
      successScreen: true
    }
  }
};

// Test scenarios for different user types
export const testScenarios = {
  studentEntrepreneur: {
    userType: "student-entrepreneur",
    project: "EcoTrack",
    budget: "$2,500 - $5,000",
    timeline: "2 weeks"
  },
  businessOwner: {
    userType: "business-owner", 
    project: "InventoryPro",
    budget: "$5,000 - $10,000",
    timeline: "1 month"
  },
  startup: {
    userType: "startup",
    project: "HealthTracker",
    budget: "$10,000+",
    timeline: "2 months"
  }
};

// Mock API responses
export const mockApiResponses = {
  signup: {
    success: { data: { user: { id: "test-user-123" } }, error: null },
    error: { data: null, error: { message: "Email already exists" } }
  },
  project: {
    create: { data: { id: "project-123", name: "EcoTrack" }, error: null },
    update: { data: { id: "project-123", status: "updated" }, error: null }
  },
  consultation: {
    create: { data: { id: "consultation-123" }, error: null },
    message: { data: { id: "message-123", content: "AI response" }, error: null }
  },
  payment: {
    success: { data: { sessionId: "cs_test_123" }, error: null },
    error: { data: null, error: { message: "Payment failed" } }
  }
};
