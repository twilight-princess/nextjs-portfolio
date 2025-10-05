import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long')
});

export const createContact = async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    const contact = await prisma.contact.create({
      data: validatedData
    });

    // Here you could send an email notification
    // await sendContactNotification(contact);

    res.status(201).json({
      message: "Thank you for your message! I'll get back to you soon.",
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.issues  // ✅ Fixed this line
      });
    }
    
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
