import PageHeader from '@/components/PageHeader';

export default function About() {
  const skills = {
    frontend: ['React & Next.js', 'JavaScript/TypeScript', 'HTML5 & CSS3', 'Sass/SCSS', 'Responsive Design', 'Accessibility', 'UI/UX', 'Performance Optimization'],
    backend: ['Node.js & Express', 'C# & .NET', 'RESTful APIs', 'Authentication', 'API Integration', 'Microservices & Monoliths', 'SQL & NoSQL Databases', 'Caching'],
    tools: ['Git & GitHub', 'PostgreSQL', 'AWS', 'VS Code', 'Deployment Platforms', 'Docker', 'Terraform', 'Agile & Scrum']
  };

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="About Me" 
        subtitle="Learn more about my background, skills, and passion for development"
      />

      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Story */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">My Journey</h2>
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                  <p>
                    I&apos;m a software engineer passionate about creating clean, maintainable code and intuitive user experiences.
                    I enjoy breaking down complex projects into manageable pieces and delivering solutions that prioritize quality, performance, and simplicity.
                  </p>
                  <p>
                    I started in chemistry and math before moving into computer science, applying analytical thinking to programming. 
                    I&apos;ve built full-stack and frontend applications, worked with APIs, and gained experience in DevOps, Terraform, and cloud technologies.
                    My <a href="https://github.com/twilight-princess" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">old GitHub history</a> shows 
                    projects spanning many years, reflecting my long-term passion for coding and continuous learning.
                  </p>
                  <p>
                    I thrive on tackling challenging problems, learning new technologies, and contributing to projects that make an impact. 
                    Whether it&apos;s optimizing performance, improving user experience, or mentoring teammates, I approach every project with curiosity, precision, and a love for elegant solutions.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-slate-900 rounded-2xl border border-slate-700 p-6 overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-green-400">
                    <div className="mb-2">$ npm run dev</div>
                    <div className="mb-2 text-slate-400">Starting development server...</div>
                    <div className="mb-2">✓ Ready in 1.2s</div>
                    <div className="text-blue-400">▲ Local: http://localhost:3000</div>
                    <div className="mt-4 animate-pulse">_</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-800/30 hover:border-blue-600/50 transition-colors">
                <div className="text-4xl mb-4 text-center">🎨</div>
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Frontend</h3>
                <ul className="space-y-3">
                  {skills.frontend.map((skill, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-800/30 hover:border-blue-600/50 transition-colors">
                <div className="text-4xl mb-4 text-center">⚙️</div>
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Backend</h3>
                <ul className="space-y-3">
                  {skills.backend.map((skill, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-800/30 hover:border-blue-600/50 transition-colors">
                <div className="text-4xl mb-4 text-center">🛠️</div>
                <h3 className="text-xl font-semibold text-white mb-6 text-center">Tools & More</h3>
                <ul className="space-y-3">
                  {skills.tools.map((skill, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">What Drives Me</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Problem Solving</h3>
                <p className="text-slate-300">I love breaking down complex challenges into manageable solutions and finding elegant ways to solve real-world problems.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Continuous Learning</h3>
                <p className="text-slate-300">Technology evolves rapidly, and I&apos;m committed to staying current with new tools, frameworks, and best practices.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Collaboration</h3>
                <p className="text-slate-300">Great software is built by great teams. I value clear communication and collaborative problem-solving.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Quality Code</h3>
                <p className="text-slate-300">I believe in writing clean, maintainable code that not only works today but can be easily understood and extended tomorrow.</p>
              </div>
            </div>
          </div>

          {/* Personal Story */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Outside of Work</h2>
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                  <p>
                    My lifelong love of gaming sparked my curiosity in technology. I&apos;ve been fascinated by creating and exploring digital worlds since I was very young. 
                    I have been teaching myself to code, Linux, and Windows for over 20 years.
                    I bring a positive attitude and energy to everything I do, whether it&apos;s tackling a tricky coding challenge or trying something new.
                  </p>
                  <p>
                    I enjoy traveling, hiking, and exploring new experiences. I love spending time with my husband, our son, and our furry family: our dog and two cats. 
                    These moments keep me inspired and ready to bring my best to every project.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative w-80 h-80 mx-auto">
                  {/* Travel polaroid - rotated left, in back */}
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg transform -rotate-6">
                    <img 
                      src="/travel.jpg" 
                      alt="Travel memories" 
                      width={180} 
                      height={180}
                      className="rounded object-cover"
                    />
                  </div>
                  {/* Family polaroid - moved lower, in front */}
                  <div className="absolute bottom-2 right-4 bg-white p-3 rounded-lg shadow-xl transform rotate-12">
                    <img 
                      src="/family.jpg" 
                      alt="Family photo" 
                      width={140} 
                      height={140}
                      className="rounded object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}