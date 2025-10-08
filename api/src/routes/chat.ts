// src/routes/chat.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/genai';

const router = express.Router();
const prisma = new PrismaClient();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const SYSTEM_PROMPT = `You are an AI assistant on Elizabeth Evans' portfolio website. Your role is to help visitors learn about Elizabeth's professional background and skills.

Key information about Elizabeth:
- Software engineer with full-stack development experience
- Works at Bloomerang on donor management software
- Tech stack: React, Next.js, TypeScript, Node.js, C#, .NET, MySQL, PostgreSQL, AWS, Docker, Terraform
- Background: Transitioned from chemistry and math to computer science
- 20+ years of self-taught coding experience
- Portfolio site: https://lizz.codes
- Email: 3lizabeth3vans@gmail.com

Keep responses concise, friendly, and professional. If asked about topics outside Elizabeth's professional profile, politely redirect the conversation.`;

// TypeScript interfaces
interface CreateConversationRequest {
  sessionId?: string;
}

interface SendMessageRequest {
  message: string;
}

interface ConversationParams {
  id: string;
}

// AI response function
async function getAIResponse(message: string, conversationHistory: string[] = []): Promise<string> {
  try {
    // Build context with conversation history
    const context = conversationHistory.length > 0
      ? `Previous messages:\n${conversationHistory.join('\n')}\n\nUser: ${message}`
      : `User: ${message}`;

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: "Understood! I'm here to help visitors learn about Elizabeth's background and skills. How can I help?" }]
        }
      ]
    });

    const result = await chat.sendMessage(context);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI error:', error);
    return "I apologize, but I'm having trouble processing your question right now. Please try asking about Elizabeth's experience, skills, or projects, or reach out directly at 3lizabeth3vans@gmail.com.";
  }
}

// Create new conversation
router.post('/conversations', async (req: Request<{}, {}, CreateConversationRequest>, res: Response) => {
  try {
    const sessionId = req.body.sessionId || `session_${Date.now()}`;
    
    const conversation = await prisma.chatConversation.create({
      data: { sessionId }
    });
    
    res.json({ 
      conversationId: conversation.id, 
      sessionId: conversation.sessionId 
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Send message and get response
router.post('/conversations/:id/messages', async (req: Request<ConversationParams, {}, SendMessageRequest>, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    
    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const conversationId = parseInt(id, 10);
    
    // Store user message
    await prisma.chatMessage.create({
      data: {
        conversationId,
        message: message.trim(),
        isBot: false
      }
    });

    // Get conversation history for context
    const previousMessages = await prisma.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: 10 // Last 10 messages for context
    });

    const history = previousMessages.map(msg =>
      `${msg.isBot ? 'Assistant' : 'User'}: ${msg.message}`
    );

    // Get AI response
    const botResponse = await getAIResponse(message, history);

    // Store bot response
    await prisma.chatMessage.create({
      data: {
        conversationId,
        message: botResponse,
        isBot: true
      }
    });

    res.json({ message: botResponse });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get conversation history (optional - for admin or returning users)
router.get('/conversations/:id/messages', async (req: Request<ConversationParams>, res: Response) => {
  try {
    const { id } = req.params;
    const conversationId = parseInt(id, 10);
    
    const messages = await prisma.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' }
    });
    
    res.json(messages);
  } catch (error) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;