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

    // Get IP address from request (handles proxies like nginx)
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                      req.headers['x-real-ip'] as string ||
                      req.socket.remoteAddress ||
                      'unknown';

    const contact = await prisma.contact.create({
      data: {
        ...validatedData,
        ipAddress
      }
    });

    // Send Discord notification
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              title: '📬 New Contact Form Submission',
              color: 0x3b82f6,
              fields: [
                { name: 'Name', value: contact.name, inline: true },
                { name: 'Email', value: contact.email, inline: true },
                { name: 'IP Address', value: ipAddress, inline: true },
                { name: 'Message', value: contact.message }
              ],
              timestamp: new Date().toISOString()
            }]
          })
        });
      } catch (error) {
        console.error('Failed to send Discord notification:', error);
      }
    }

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
