// src/app/projects/page.tsx - Projects page
'use client';
import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import { useProjects } from '@/hooks/useProjects';

export default function Projects() {
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const { projects, loading, error } = useProjects(showFeaturedOnly ? true : undefined);

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="My Projects" 
        subtitle="A collection of work that showcases my skills and passion for development"
      />

      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Filter */}
          <div className="mb-12 text-center">
            <div className="inline-flex bg-slate-800/50 rounded-lg p-1 border border-blue-800/30">
              <button
                onClick={() => setShowFeaturedOnly(false)}
                className={`px-6 py-3 rounded-md transition-colors ${
                  !showFeaturedOnly
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setShowFeaturedOnly(true)}
                className={`px-6 py-3 rounded-md transition-colors ${
                  showFeaturedOnly
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Featured Only
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              <p className="text-slate-300 mt-4">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="text-red-400 text-lg mb-4">⚠️ Error loading projects</div>
              <p className="text-slate-400">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl text-slate-300 mb-4">No projects found</h3>
              <p className="text-slate-400">Check back soon for new projects!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
