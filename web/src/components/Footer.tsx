import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-blue-800/30 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Elizabeth Evans</h3>
            <p className="text-slate-300 mb-4">
              Software Engineer passionate about creating elegant solutions and modern web applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/darleneevans" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-300 transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/elizabeth-darlene-evans" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-300 transition-colors">
                LinkedIn
              </a>
              <a href="mailto:3lizabeth3vans@gmail.com" className="text-slate-400 hover:text-blue-300 transition-colors">
                Email
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-slate-400 hover:text-blue-300 transition-colors">
                About Me
              </Link>
              <Link href="/resume" className="block text-slate-400 hover:text-blue-300 transition-colors">
                Resume
              </Link>
              <Link href="/projects" className="block text-slate-400 hover:text-blue-300 transition-colors">
                My Projects
              </Link>
              <Link href="/contact" className="block text-slate-400 hover:text-blue-300 transition-colors">
                Get In Touch
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'React', 'C#', 'SQL', 'AWS', 'Terraform'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-800/30 text-center text-slate-400">
          <p>&copy; 2024 Elizabeth Evans. Built with Next.js and Node.js.</p>
        </div>
      </div>
    </footer>
  );
}