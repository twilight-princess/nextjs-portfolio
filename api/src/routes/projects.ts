import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// Submit contact form
router.post('/', async (req: Request<{}, {}, ContactRequest>, res: Response) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required' 
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address' 
      });
    }
    
    const contact = await prisma.contact.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      }
    });
    
    // You could add email notification logic here
    console.log('New contact form submission:', { name, email });
    
    res.status(201).json({
      message: "Thank you for your message! I'll get back to you soon.",
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email
      }
    });
    
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contacts (admin only - you might want to add auth)
router.get('/', async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

export default router;
