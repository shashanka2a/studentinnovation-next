/**
 * AI Chat Demo
 * Demonstrates the AI chat functionality with fallback responses
 */

// Mock AI responses for demonstration
const FALLBACK_RESPONSES = {
  initial: "👋 Hello! I'm your AI project consultant at GatorInnovation, and I'm thrilled to help you bring your vision to life!\n\nI've reviewed your project details and I can already see the potential in what you're building. Let's dive deeper into your vision to ensure we create the perfect MVP for your needs.\n\n**To get started, I'd love to understand:**\n1. What's the main problem your product solves?\n2. Who is your target audience, and what are their biggest pain points?\n3. What's your vision for how users will interact with your product?\n\nFeel free to share as much detail as you'd like - the more I understand about your goals and challenges, the better I can guide you toward building something amazing! 🚀",
  
  fullApp: "🚀 Excellent! I can see you're ready to take your project to the next level with full app development!\n\nI'm excited to help you build something truly comprehensive. Let's dive deeper into the technical requirements and create a roadmap for your full application.\n\n**To ensure we build exactly what you need, I'd love to understand:**\n1. What specific features do you need for your full application?\n2. What's your vision for the complete user experience?\n3. Are there any technical integrations or third-party services you need?\n4. What are your scalability and performance requirements?\n\nThe more details you can provide about your technical needs and business goals, the better I can guide you toward the perfect full-stack solution! 💡",

  requirementGathering: [
    "That's a fantastic insight! I can see how that would be valuable for your target audience. What specific features do you think would be most important for your users?",
    "Excellent point! Based on what you've shared, I'm thinking we should focus on a clean, intuitive interface. What's your vision for the user experience?",
    "Perfect! I'm getting a clear picture of your project. Let me ask - what's your biggest concern about launching this product?",
    "That makes total sense! I can already see how we can structure this. What would success look like for you in the first month after launch?",
    "Great question! For the technical architecture, are you thinking of a web app, mobile app, or both? This will help me recommend the best technology stack.",
    "Excellent! What about your target users - are they primarily tech-savvy individuals, or do you need to design for a broader audience?",
    "Perfect! I'm getting a comprehensive understanding of your vision. What's your timeline for getting this to market?",
    "That's a great approach! What about monetization - are you thinking of a subscription model, one-time purchase, or freemium approach?"
  ],

  technicalDiscussion: [
    "That's a great feature! How do you envision user authentication working? Do you need social login, email/password, or both?",
    "Excellent choice. For the database, what type of data will you be storing? User profiles, content, transactions, or analytics?",
    "Perfect! What about real-time features? Do you need live updates, notifications, or real-time collaboration?",
    "Great! For the payment system, what payment methods do you want to support? Credit cards, PayPal, or cryptocurrency?",
    "Excellent! What about the user interface? Do you have specific design preferences or should we create a modern, intuitive design?",
    "Perfect! One last question - what's your target timeline for the full application? This will help us plan the development phases.",
    "That's a solid foundation! What about scalability - how many users are you expecting in the first year?",
    "Great thinking! What about data security and privacy - are there any specific compliance requirements we need to consider?"
  ]
};

// Smart response selection based on conversation context
function selectResponse(messages, isFullApp = false) {
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  const messageCount = messages.length;
  
  // Initial message
  if (messageCount <= 1) {
    return isFullApp ? FALLBACK_RESPONSES.fullApp : FALLBACK_RESPONSES.initial;
  }
  
  // Technical discussion keywords
  const technicalKeywords = ['backend', 'database', 'api', 'authentication', 'security', 'scalability', 'performance', 'integration'];
  const hasTechnicalKeywords = technicalKeywords.some(keyword => lastUserMessage.includes(keyword));
  
  if (hasTechnicalKeywords || isFullApp) {
    return FALLBACK_RESPONSES.technicalDiscussion[Math.floor(Math.random() * FALLBACK_RESPONSES.technicalDiscussion.length)];
  }
  
  // General requirement gathering
  return FALLBACK_RESPONSES.requirementGathering[Math.floor(Math.random() * FALLBACK_RESPONSES.requirementGathering.length)];
}

// Simulate AI chat conversation
async function simulateAIChat() {
  console.log('🤖 AI Chat Demo - Requirement Gathering\n');

  // Mock conversation
  const conversation = [
    {
      role: 'user',
      content: 'I want to build a carbon tracking app for environmentally conscious individuals'
    }
  ];

  console.log('👤 User:', conversation[0].content);
  console.log('');

  // Get AI response
  const response1 = selectResponse(conversation);
  console.log('🤖 AI Consultant:', response1);
  console.log('');

  // Add AI response to conversation
  conversation.push({
    role: 'assistant',
    content: response1
  });

  // User follow-up
  conversation.push({
    role: 'user',
    content: 'The main problem is that people want to be environmentally conscious but don\'t know how to track their impact or find better alternatives.'
  });

  console.log('👤 User:', conversation[2].content);
  console.log('');

  // Get AI response
  const response2 = selectResponse(conversation);
  console.log('🤖 AI Consultant:', response2);
  console.log('');

  // Add AI response to conversation
  conversation.push({
    role: 'assistant',
    content: response2
  });

  // User technical question
  conversation.push({
    role: 'user',
    content: 'I need a robust backend to handle user data, product database, and carbon footprint calculations. The app should work offline and sync when online.'
  });

  console.log('👤 User:', conversation[4].content);
  console.log('');

  // Get AI response
  const response3 = selectResponse(conversation);
  console.log('🤖 AI Consultant:', response3);
  console.log('');

  // Add AI response to conversation
  conversation.push({
    role: 'assistant',
    content: response3
  });

  // User full app question
  conversation.push({
    role: 'user',
    content: 'I want to upgrade to full app development with advanced features like real-time collaboration, payment processing, and admin dashboard.'
  });

  console.log('👤 User:', conversation[6].content);
  console.log('');

  // Get AI response for full app
  const response4 = selectResponse(conversation, true);
  console.log('🤖 AI Consultant:', response4);
  console.log('');

  console.log('🎉 AI Chat Demo Complete!');
  console.log('\n📊 Demo Summary:');
  console.log('   ✅ Initial requirement gathering');
  console.log('   ✅ Follow-up questions');
  console.log('   ✅ Technical discussion');
  console.log('   ✅ Full app consultation');
  console.log('\n💡 Key Features Demonstrated:');
  console.log('   - Focused on project requirements');
  console.log('   - Educational and guiding responses');
  console.log('   - Technical expertise');
  console.log('   - Professional consultation style');
  console.log('   - Context-aware responses');
  console.log('   - Requirement gathering focus');
}

// Run the demo
simulateAIChat();
