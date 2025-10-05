'use client';
import { useState, useEffect } from 'react';
import { getProjects, getProjectsWithFallback, Project, mockProjects } from '@/lib/api';

export function useProjects(featured?: boolean) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      
      // Try API first
      const result = await getProjects(featured);
      
      if (result.error) {
        // If API fails, use mock data instead of showing error
        console.warn('API not available, using mock data:', result.error);
        const filteredProjects = featured 
          ? mockProjects.filter(p => p.featured)
          : mockProjects;
        setProjects(filteredProjects);
        // Don't set error - just use mock data silently
      } else {
        setProjects(result.data?.projects || []);
      }
      
      setLoading(false);
    }

    fetchProjects();
  }, [featured]);

  return { projects, loading, error };
}