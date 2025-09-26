import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ProjectRequirements {
  projectName: string;
  description: string;
  targetAudience: string;
  keyFeatures: string[];
  technicalRequirements: string[];
  budget: string;
  timeline: string;
  userType: string;
  businessGoals: string[];
  successMetrics: string[];
}

// System prompt for focused requirement gathering
const SYSTEM_PROMPT = `You are an expert project consultant for GatorInnovation, a company that builds MVPs for student entrepreneurs and business owners. Your role is to:

1. **GATHER COMPREHENSIVE PROJECT REQUIREMENTS** - Ask detailed questions about:
   - Project vision and goals
   - Target audience and user personas
   - Core features and functionality
   - Technical requirements and constraints
   - Business objectives and success metrics
   - Budget and timeline expectations

2. **EDUCATE AND GUIDE CLIENTS** - Help them understand:
   - What makes a successful MVP
   - Technical considerations for their project type
   - Industry best practices
   - Potential challenges and solutions
   - Feature prioritization

3. **STAY FOCUSED ON PROJECT SCOPE** - Only discuss:
   - Project development and requirements
   - Technical architecture and implementation
   - Business strategy and user experience
   - MVP planning and feature definition
   - Development timeline and budget

4. **AVOID OFF-TOPIC DISCUSSIONS** - Do not discuss:
   - General business advice unrelated to their project
   - Personal topics or unrelated services
   - Technical support for existing products
   - Non-development related questions

5. **ASK PROBING QUESTIONS** to uncover:
   - Hidden requirements
   - User pain points
   - Technical constraints
   - Business priorities
   - Success criteria

6. **PROVIDE VALUABLE INSIGHTS** about:
   - Feature prioritization
   - Technical architecture recommendations
   - User experience best practices
   - Development approach suggestions

Remember: You are helping them build their dream project. Be encouraging, professional, and focused on gathering all necessary details to create an amazing MVP.`;

export async function generateAIResponse(
  messages: ChatMessage[],
  projectContext?: Partial<ProjectRequirements>
): Promise<string> {
  try {
    // Add system prompt to the beginning of messages
    const systemMessage: ChatMessage = {
      role: 'system',
      content: SYSTEM_PROMPT
    };

    // Add project context if available
    let contextPrompt = '';
    if (projectContext) {
      contextPrompt = `\n\nCURRENT PROJECT CONTEXT:
- Project Name: ${projectContext.projectName || 'Not specified'}
- Description: ${projectContext.description || 'Not specified'}
- Target Audience: ${projectContext.targetAudience || 'Not specified'}
- User Type: ${projectContext.userType || 'Not specified'}
- Budget: ${projectContext.budget || 'Not specified'}
- Timeline: ${projectContext.timeline || 'Not specified'}

Use this context to ask more targeted questions and provide relevant guidance.`;
    }

    const messagesWithSystem = [
      systemMessage,
      ...messages.slice(-10), // Keep last 10 messages for context
    ];

    // Add context to the last user message if available
    if (contextPrompt && messagesWithSystem.length > 1) {
      const lastMessage = messagesWithSystem[messagesWithSystem.length - 1];
      if (lastMessage.role === 'user') {
        lastMessage.content += contextPrompt;
      }
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messagesWithSystem,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I encountered an issue generating a response. Please try again.';
    
    return response;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Use fallback when API fails
    const { generateAIResponseEnhanced } = await import('./openai-fallback');
    console.log('Using fallback AI responses...');
    return generateAIResponseEnhanced(messages, projectContext);
  }
}

export async function generateInitialMessage(projectContext?: Partial<ProjectRequirements>): Promise<string> {
  try {
    const initialMessage = `👋 Hello! I'm your AI project consultant at GatorInnovation, and I'm thrilled to help you bring your vision to life!

I've reviewed your project details and I can already see the potential in what you're building. Let's dive deeper into your vision to ensure we create the perfect MVP for your needs.

**To get started, I'd love to understand:**
1. What's the main problem your product solves?
2. Who is your target audience, and what are their biggest pain points?
3. What's your vision for how users will interact with your product?

Feel free to share as much detail as you'd like - the more I understand about your goals and challenges, the better I can guide you toward building something amazing! 🚀`;

    return initialMessage;
  } catch (error) {
    console.error('Error generating initial message:', error);
    const { generateInitialMessageFallback } = await import('./openai-fallback');
    return generateInitialMessageFallback();
  }
}

export async function generateFullAppConsultationMessage(projectContext?: Partial<ProjectRequirements>): Promise<string> {
  try {
    const initialMessage = `🚀 Excellent! I can see you're ready to take your project to the next level with full app development!

I'm excited to help you build something truly comprehensive. Let's dive deeper into the technical requirements and create a roadmap for your full application.

**To ensure we build exactly what you need, I'd love to understand:**
1. What specific features do you need for your full application?
2. What's your vision for the complete user experience?
3. Are there any technical integrations or third-party services you need?
4. What are your scalability and performance requirements?

The more details you can provide about your technical needs and business goals, the better I can guide you toward the perfect full-stack solution! 💡`;

    return initialMessage;
  } catch (error) {
    console.error('Error generating full app consultation message:', error);
    const { generateFullAppConsultationMessageFallback } = await import('./openai-fallback');
    return generateFullAppConsultationMessageFallback();
  }
}

// Helper function to extract requirements from conversation
export function extractRequirementsFromConversation(messages: ChatMessage[]): Partial<ProjectRequirements> {
  const requirements: Partial<ProjectRequirements> = {};
  
  // Simple keyword extraction (in a real app, you'd use more sophisticated NLP)
  const conversation = messages.map(m => m.content).join(' ');
  
  // Extract potential features
  const featureKeywords = ['feature', 'functionality', 'capability', 'function'];
  const features = conversation.match(/(?:feature|functionality|capability|function)[^.!?]*[.!?]/gi) || [];
  
  if (features.length > 0) {
    requirements.keyFeatures = features.slice(0, 10); // Limit to 10 features
  }
  
  // Extract technical requirements
  const techKeywords = ['database', 'API', 'authentication', 'security', 'performance', 'scalability'];
  const techRequirements = techKeywords.filter(keyword => 
    conversation.toLowerCase().includes(keyword)
  );
  
  if (techRequirements.length > 0) {
    requirements.technicalRequirements = techRequirements;
  }
  
  return requirements;
}
