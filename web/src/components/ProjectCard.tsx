import { Project } from '@/lib/api';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-blue-800/30 hover:border-blue-600/50 transition-all hover:transform hover:scale-105 group">
      <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <span className="text-4xl z-10">🚀</span>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 group-hover:from-blue-400/30 group-hover:to-indigo-600/30 transition-colors"></div>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              GitHub
            </a>
          )}
        </div>
        {project.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
    </div>
  );
}
