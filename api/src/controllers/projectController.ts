// src/controllers/projectController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { featured } = req.query;

    const projects = await prisma.project.findMany({
      where: featured === 'true' ? { featured: true } : undefined,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    const formattedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      techStack: project.techStack.split(',').map(tech => tech.trim()),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
      imageUrl: project.imageUrl,
      createdAt: project.createdAt
    }));

    res.json({ projects: formattedProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const formattedProject = {
      id: project.id,
      title: project.title,
      description: project.description,
      techStack: project.techStack.split(',').map(tech => tech.trim()),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
      imageUrl: project.imageUrl,
      createdAt: project.createdAt
    };

    res.json({ project: formattedProject });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};
