import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData.ts';
import { Project } from '../types.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { Github, ExternalLink, ArrowRight, ShieldCheck, Cpu, Terminal, GitBranch, Binary, Brain } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Cloud Security', 'AWS Security & Monitoring', 'DevSecOps', 'Machine Learning & Security', 'Network Security', 'AI / Security'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const getCardIcon = (type: Project['customVisualType']) => {
    switch (type) {
      case 'cloudshield':
        return <ShieldCheck className="w-8 h-8 text-cyan-400" />;
      case 'aws-monitoring':
        return <Cpu className="w-8 h-8 text-blue-400" />;
      case 'devsecops':
        return <GitBranch className="w-8 h-8 text-emerald-400" />;
      case 'fraud':
        return <Binary className="w-8 h-8 text-violet-400" />;
      case 'netsentinel':
        return <Terminal className="w-8 h-8 text-cyan-400" />;
      case 'spamguard':
        return <Brain className="w-8 h-8 text-teal-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d131f] relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Engineering Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Practical Security Projects
            </h2>
            <div className="h-0.5 w-12 bg-cyan-500 mt-3" />
            <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl">
              Production-oriented implementations encompassing cloud defense, vulnerability automation, network auditing, and ML threat detection.
            </p>
          </div>

          {/* Category Filter Pills/Buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#111827] border border-slate-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-950 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-2xl bg-[#111827] border border-slate-800/90 shadow-xl hover:border-cyan-500/40 hover:shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
                {project.id === 'cloudshield' ? (
                  <img
                    src="/src/assets/images/cloudshield_arch_diagram_1790236901244.jpg"
                    alt="CloudShield Architecture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.imageFallbackGradient} flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
                    <div className="absolute inset-0 cyber-dots opacity-30" />
                    <div className="relative z-10 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 shadow-inner group-hover:scale-110 transition-transform">
                      {getCardIcon(project.customVisualType)}
                    </div>
                    <div className="relative z-10 mt-3 text-[11px] font-mono text-cyan-300/80 tracking-wide uppercase">
                      {project.architectureSteps[0]} → {project.architectureSteps[project.architectureSteps.length - 1]}
                    </div>
                  </div>
                )}

                {/* Quiet Category metadata */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0a0e17]/85 backdrop-blur-md border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-mono group-hover:text-cyan-300 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[11px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-400 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
