// src/routes/chat.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

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

// Simple response function
function getSimpleResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes('experience') || msg.includes('background')) {
    return "Elizabeth has experience in full-stack development, working with React, Node.js, C#, and cloud technologies like AWS. She transitioned from chemistry/math to computer science and has been coding for many years!";
  } else if (msg.includes('skills') || msg.includes('technologies')) {
    return "Her technical skills include React & Next.js, JavaScript/TypeScript, Node.js, C# & .NET, SQL & NoSQL databases, AWS, Terraform, and more. Check out her About page for the full list!";
  } else if (msg.includes('projects')) {
    return "Elizabeth has worked on various full-stack and frontend applications, API integrations, and DevOps projects. You can see her project portfolio and GitHub history for examples of her work.";
  } else if (msg.includes('contact') || msg.includes('reach')) {
    return "You can reach Elizabeth at 3lizabeth3vans@gmail.com or connect with her on LinkedIn. She's always open to discussing new opportunities!";
  } else if (msg.includes('resume')) {
    return "Elizabeth has specialized resumes for different roles - frontend, fullstack, and backend. You can view and download them from the Resume page.";
  } else {
    return "That's a great question! For more detailed information, I'd recommend checking out Elizabeth's About page, Resume, or reaching out to her directly. Is there anything specific about her technical skills or experience you'd like to know?";
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
    
    // Get bot response
    const botResponse = getSimpleResponse(message);
    
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