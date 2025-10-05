// src/server.ts - Simple working version without route imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contacts.js';
import blogRoutes from './routes/blog.js';

// Load environment variables first
dotenv.config();

console.log('🚀 Starting server...');
console.log('📍 Current directory:', process.cwd());
console.log('🔧 Node version:', process.version);
console.log('📦 Environment:', process.env.NODE_ENV || 'development');

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/chat', chatRoutes);

// Simple test route first
app.get('/api/health', (req, res) => {
  console.log('📡 Health check requested');
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Server is running!'
  });
});

app.get('/health', (req, res) => {
  console.log('🔍 Docker health check');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/blog', blogRoutes);

// Simple projects endpoint for testing (without Prisma for now)
app.get('/api/projects', (req, res) => {
  console.log('📊 Projects requested');

  const mockProjects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and Node.js.',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'Express'],
      githubUrl: 'https://github.com/yourusername/portfolio',
      liveUrl: 'https://yourportfolio.com',
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A full-stack task management application with real-time updates.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/yourusername/taskapp',
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'E-commerce API',
      description: 'RESTful API for an e-commerce platform with payment processing.',
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'Stripe API'],
      githubUrl: 'https://github.com/yourusername/ecommerce-api',
      featured: false,
      createdAt: new Date().toISOString()
    }
  ];

  const { featured } = req.query;
  const filteredProjects = featured === 'true'
    ? mockProjects.filter(p => p.featured)
    : mockProjects;

  res.json({ projects: filteredProjects });
});


// 404 handler
app.use((req, res) => {
  console.log('❌ 404 - Route not found:', req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('💥 Server Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server with better error handling
const server = app.listen(PORT, () => {
  console.log(`\n🎉 Server is running!`);
  console.log(`📍 Local:            http://localhost:${PORT}`);
  console.log(`🏥 Health check:     http://localhost:${PORT}/api/health`);
  console.log(`📊 Projects API:     http://localhost:${PORT}/api/projects`);
  console.log(`\n🛑 Press Ctrl+C to stop\n`);
});

// Handle server startup errors
server.on('error', (error: any) => {
  console.error('💥 Server failed to start:', error.message);

  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try:`);
    console.error(`   - Kill the process using port ${PORT}`);
    console.error(`   - Or change the port in your .env file`);
  }

  process.exit(1);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});