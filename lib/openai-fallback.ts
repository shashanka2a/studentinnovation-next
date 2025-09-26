import { ChatMessage, ProjectRequirements } from './openai';

// Fallback responses when OpenAI API is not available
const FALLBACK_RESPONSES = {
  initial: [
    "👋 Hello! I'm your AI consultant at GatorInnovation, and I'm thrilled to help you bring your vision to life!\n\nI've reviewed your project details and I can already see the potential in what you're building. Let's dive deeper into your vision to ensure we create the perfect MVP for your needs.\n\n**To get started, I'd love to understand:**\n1. What's the main problem your product solves?\n2. Who is your target audience, and what are their biggest pain points?\n3. What's your vision for how users will interact with your product?\n\nFeel free to share as much detail as you'd like - the more I understand about your goals and challenges, the better I can guide you toward building something amazing! 🚀"
  ],
  
  fullApp: [
    "🚀 Excellent! I can see you're ready to take your project to the next level with full app development!\n\nI'm excited to help you build something truly comprehensive. Let's dive deeper into the technical requirements and create a roadmap for your full application.\n\n**To ensure we build exactly what you need, I'd love to understand:**\n1. What specific features do you need for your full application?\n2. What's your vision for the complete user experience?\n3. Are there any technical integrations or third-party services you need?\n4. What are your scalability and performance requirements?\n\nThe more details you can provide about your technical needs and business goals, the better I can guide you toward the perfect full-stack solution! 💡"
  ],

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
  ],

  completion: [
    "Fantastic! I have everything I need to create your project roadmap. Let me generate a comprehensive plan for your MVP...",
    "Excellent! I have a clear picture of your project now. Based on our discussion, I can see this is a comprehensive application with significant potential.",
    "Perfect! I have all the details I need to create your development roadmap. This is going to be an amazing project!",
    "Outstanding! I can see the full scope of your vision now. Let me create a detailed plan for your application development."
  ]
};

// Smart response selection based on conversation context
function selectFallbackResponse(messages: ChatMessage[], isFullApp: boolean = false): string {
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  const messageCount = messages.length;
  
  // Initial message
  if (messageCount <= 1) {
    return isFullApp ? FALLBACK_RESPONSES.fullApp[0] : FALLBACK_RESPONSES.initial[0];
  }
  
  // Completion after sufficient conversation
  if (messageCount >= 6) {
    return FALLBACK_RESPONSES.completion[Math.floor(Math.random() * FALLBACK_RESPONSES.completion.length)];
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

// Fallback functions that mimic the OpenAI API
export async function generateAIResponseFallback(
  messages: ChatMessage[],
  projectContext?: Partial<ProjectRequirements>
): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  return selectFallbackResponse(messages, false);
}

export async function generateInitialMessageFallback(): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return FALLBACK_RESPONSES.initial[0];
}

export async function generateFullAppConsultationMessageFallback(): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return FALLBACK_RESPONSES.fullApp[0];
}

// Enhanced fallback with better context awareness
export async function generateAIResponseEnhanced(
  messages: ChatMessage[],
  projectContext?: Partial<ProjectRequirements>
): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
  const messageCount = messages.length;
  
  // Enhanced responses based on specific keywords
  if (lastUserMessage.includes('carbon') || lastUserMessage.includes('environment')) {
    return "That's a fantastic idea! A carbon tracking app can really help people make more environmentally conscious decisions. What specific environmental metrics are you most interested in tracking? Are you thinking of individual carbon footprints, product carbon ratings, or both?";
  }
  
  if (lastUserMessage.includes('social') || lastUserMessage.includes('community')) {
    return "Excellent! Social features can really drive engagement and user retention. What kind of social interactions are you envisioning? User challenges, leaderboards, sharing achievements, or collaborative features?";
  }
  
  if (lastUserMessage.includes('gamification') || lastUserMessage.includes('points') || lastUserMessage.includes('achievements')) {
    return "Perfect! Gamification is a great way to encourage sustainable behavior. What kind of reward system are you thinking? Points, badges, levels, or perhaps real-world incentives?";
  }
  
  if (lastUserMessage.includes('offline') || lastUserMessage.includes('sync')) {
    return "That's a smart consideration! Offline functionality is crucial for environmental apps since users might be in areas with poor connectivity. What data do you think users would need access to offline?";
  }
  
  if (lastUserMessage.includes('budget') || lastUserMessage.includes('cost') || lastUserMessage.includes('price')) {
    return "Great question! Budget planning is essential for any successful project. What's your target budget range, and how do you envision monetizing the app? Are you thinking of freemium, subscription, or one-time purchase?";
  }
  
  if (lastUserMessage.includes('timeline') || lastUserMessage.includes('launch') || lastUserMessage.includes('deadline')) {
    return "Perfect! Timeline planning is crucial for project success. What's your target launch date, and are there any specific milestones or events you're working toward?";
  }
  
  // Default to smart fallback
  return selectFallbackResponse(messages, false);
}
