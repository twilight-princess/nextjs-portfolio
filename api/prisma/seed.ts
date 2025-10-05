import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create projects
  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with Next.js and Node.js. Features a sleek design, smooth animations, and a REST API backend.',
        techStack: 'Next.js, TypeScript, Node.js, Express, Prisma, SQLite',
        githubUrl: 'https://github.com/yourusername/portfolio',
        liveUrl: 'https://yourportfolio.com',
        featured: true
      },
      {
        title: 'Task Management App',
        description: 'A full-stack task management application with real-time updates and team collaboration features.',
        techStack: 'React, Node.js, Socket.io, MongoDB',
        githubUrl: 'https://github.com/yourusername/taskapp',
        featured: true
      },
      {
        title: 'E-commerce API',
        description: 'RESTful API for an e-commerce platform with payment processing and inventory management.',
        techStack: 'Node.js, Express, PostgreSQL, Stripe API',
        githubUrl: 'https://github.com/yourusername/ecommerce-api',
        featured: false
      }
    ]
  });

  // Create blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Getting Back into Coding: My Journey',
        content: 'After taking a break from software development, I\'m excited to share my journey back into the world of coding. Here\'s what I\'ve learned and what I\'m working on...',
        slug: 'getting-back-into-coding',
        published: true
      },
      {
        title: 'Building a Modern Portfolio with Next.js and Node.js',
        content: 'In this post, I\'ll walk through the process of building a portfolio website using Next.js for the frontend and Node.js with Express for the API backend...',
        slug: 'building-modern-portfolio-nextjs-nodejs',
        published: true
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });