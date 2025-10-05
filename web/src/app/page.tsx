
// src/app/page.tsx - New homepage
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { projects, loading } = useProjects(true); // Get featured projects

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-4xl">
                <Image 
                  src="/circle_profile.png" 
                  alt="Profile picture" 
                  width={192} 
                  height={192}
                  className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Hi, I&apos;m
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent block">
                Elizabeth Evans
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-300 mb-8 font-light">
              Software Engineer
            </p>
            
            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Passionate about building elegant solutions and getting back into the world of modern development. 
              Ready to create amazing digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/projects" 
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold"
              >
                View My Work
              </Link>
              <Link 
                href="/contact" 
                className="px-10 py-4 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-all font-semibold"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick About */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">About Me</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            I’m a software engineer with experience in frontend, backend, and full-stack development, including building and integrating APIs, as well as DevOps. 
            I enjoy creating reliable systems, designing user-friendly applications, and delivering solutions that make a real impact.
          </p>
          <Link 
            href="/about" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            Learn more about me 
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-300">Some of my recent work</p>
          </div>
          
          {loading ? (
            <div className="text-center text-slate-300">Loading projects...</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, 3).map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link 
                  href="/projects" 
                  className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-all"
                >
                  View All Projects
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}