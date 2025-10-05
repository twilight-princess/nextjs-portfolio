// src/lib/api.ts - Fixed API client functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  imageUrl?: string;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Check if we're on the client side
const isClient = typeof window !== 'undefined';

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  // Return error if not on client side
  if (!isClient) {
    return { error: 'API calls must be made on the client side' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || `HTTP ${response.status}: ${response.statusText}` };
    }

    return { data };
  } catch (error) {
    console.error('API call failed:', error);
    
    // More specific error handling
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: 'Unable to connect to the server. Please check if the API is running.' };
    }
    
    return { error: 'Network error. Please try again.' };
  }
}

// Project API functions
export async function getProjects(featured?: boolean): Promise<ApiResponse<{ projects: Project[] }>> {
  const query = featured ? '?featured=true' : '';
  return apiCall<{ projects: Project[] }>(`/projects${query}`);
}

export async function getProject(id: number): Promise<ApiResponse<{ project: Project }>> {
  return apiCall<{ project: Project }>(`/projects/${id}`);
}

// Blog API functions
export async function getBlogs(): Promise<ApiResponse<{ blogs: BlogPost[] }>> {
  return apiCall<{ blogs: BlogPost[] }>('/blogs');
}

export async function getBlog(slug: string): Promise<ApiResponse<{ blog: BlogPost }>> {
  return apiCall<{ blog: BlogPost }>(`/blogs/${slug}`);
}

// Contact API function
export async function submitContact(contactData: ContactFormData): Promise<ApiResponse<{ message: string }>> {
  return apiCall<{ message: string }>('/contacts', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
}

// Mock data fallback for development (optional)
export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js and Node.js. Features a sleek design, smooth animations, and a REST API backend.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/darleneevans/portfolio',
    liveUrl: 'https://yourportfolio.com',
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A full-stack task management application with real-time updates and team collaboration features.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/taskapp',
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'E-commerce API',
    description: 'RESTful API for an e-commerce platform with payment processing and inventory management.',
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Stripe API'],
    githubUrl: 'https://github.com/yourusername/ecommerce-api',
    featured: false,
    createdAt: new Date().toISOString()
  }
];

// Fallback function that uses mock data when API is not available
export async function getProjectsWithFallback(featured?: boolean): Promise<ApiResponse<{ projects: Project[] }>> {
  const result = await getProjects(featured);
  
  // If API call fails, use mock data
  if (result.error) {
    console.warn('API not available, using mock data');
    const filteredProjects = featured 
      ? mockProjects.filter(p => p.featured)
      : mockProjects;
    
    return { data: { projects: filteredProjects } };
  }
  
  return result;
}