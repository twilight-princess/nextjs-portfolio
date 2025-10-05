
// src/controllers/blogController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        createdAt: true
      }
    });

    const formattedBlogs = blogs.map(blog => ({
      ...blog,
      excerpt: blog.content.substring(0, 200) + (blog.content.length > 200 ? '...' : '')
    }));

    res.json({ blogs: formattedBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const blog = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};
