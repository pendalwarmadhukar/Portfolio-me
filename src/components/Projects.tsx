import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData.ts';
import { Project } from '../types.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  Github,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Terminal,
  GitBranch,
  Binary,
  Brain,
  Filter,
  Search,
  X,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { getProjectReadingTime } from '../utils/readingTime.ts';

interface CategoryFilter {
  id: string;
  getLabel: (t: ReturnType<typeof useLanguage>['t']) => string;
  matcher: (p: Project) => boolean;
}

const CATEGORY_FILTERS: CategoryFilter[] = [
  {
    id: 'all',
    getLabel: (t) => t.projects.allProjects,
    matcher: () => true,
  },
  {
    id: 'cloud-security',
    getLabel: (t) => t.projects.cloudSecurity,
    matcher: (p) =>
      p.category === 'Cloud Security' ||
      p.category === 'AWS Security & Monitoring' ||
      p.technologies.some((t) =>
        ['AWS', 'Amazon EC2', 'AWS IAM', 'Amazon S3', 'AWS CloudTrail', 'AWS CLI', 'Cloud Security'].includes(t)
      ),
  },
  {
    id: 'devsecops',
    getLabel: (t) => t.projects.devsecops,
    matcher: (p) =>
      p.category === 'DevSecOps' ||
      p.technologies.some((t) => ['DevSecOps', 'CI/CD', 'Docker', 'Trivy'].includes(t)),
  },
  {
    id: 'machine-learning',
    getLabel: (t) => t.projects.machineLearning,
    matcher: (p) =>
      p.category === 'Machine Learning & Security' ||
      p.category === 'AI / Security' ||
      p.technologies.some((t) => ['Machine Learning', 'AI', 'Pandas', 'Data Analysis'].includes(t)),
  },
  {
    id: 'network-security',
    getLabel: (t) => t.projects.networkSecurity,
    matcher: (p) =>
      p.category === 'Network Security' ||
      p.technologies.some((t) => ['Linux', 'Bash', 'Nmap', 'Networking', 'Security Monitoring'].includes(t)),
  },
  {
    id: 'soc-monitoring',
    getLabel: (t) => t.projects.socMonitoring,
    matcher: (p) =>
      p.category === 'AWS Security & Monitoring' ||
      p.category === 'Network Security' ||
      p.technologies.some((t) =>
        ['AWS CloudTrail', 'Amazon SNS', 'Security Monitoring', 'Linux', 'Bash', 'Nmap'].includes(t)
      ),
  },
];

export const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate project counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORY_FILTERS.forEach((cat) => {
      counts[cat.id] = PROJECTS.filter(cat.matcher).length;
    });
    return counts;
  }, []);

  // Filtered list based on active category and optional search query
  const filteredProjects = useMemo(() => {
    const activeFilter = CATEGORY_FILTERS.find((c) => c.id === activeCategoryId) || CATEGORY_FILTERS[0];
    return PROJECTS.filter((p) => {
      const matchesCategory = activeFilter.matcher(p);
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inTitle = p.title.toLowerCase().includes(q);
      const inCategory = p.category.toLowerCase().includes(q);
      const inDesc = p.shortDescription.toLowerCase().includes(q);
      const inTech = p.technologies.some((tech) => tech.toLowerCase().includes(q));

      return inTitle || inCategory || inDesc || inTech;
    });
  }, [activeCategoryId, searchQuery]);

  // Toggle category: clicking active category toggles back to 'all'
  const handleCategoryClick = (categoryId: string) => {
    if (activeCategoryId === categoryId && categoryId !== 'all') {
      setActiveCategoryId('all');
    } else {
      setActiveCategoryId(categoryId);
    }
  };

  const resetAllFilters = () => {
    setActiveCategoryId('all');
    setSearchQuery('');
  };

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

  const activeCategoryLabel = CATEGORY_FILTERS.find((c) => c.id === activeCategoryId)?.getLabel(t) || t.projects.allProjects;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d131f] relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" />
              <span>{t.projects.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.projects.title}
            </h2>
            <div className="h-0.5 w-12 bg-cyan-500 mt-3" />
            <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.projects.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#111827] border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills / Toggles Bar */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            const count = categoryCounts[cat.id] || 0;
            const label = cat.getLabel(t);

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-950/40'
                    : 'bg-[#111827] text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30'
                      : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Active Filter Indicator & Reset */}
          {(activeCategoryId !== 'all' || searchQuery.trim() !== '') && (
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-colors ml-auto cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.projects.resetFilters}</span>
            </button>
          )}
        </div>

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
          <div>
            {t.projects.showing} <span className="text-cyan-400 font-semibold">{filteredProjects.length}</span> {t.projects.of}{' '}
            <span className="text-slate-300">{PROJECTS.length}</span> {t.projects.projectsLabel}
            {activeCategoryId !== 'all' && (
              <span className="ml-2 text-slate-400">
                {t.projects.inCategory} <span className="text-cyan-300">"{activeCategoryLabel}"</span>
              </span>
            )}
            {searchQuery.trim() && (
              <span className="ml-2 text-slate-400">
                {t.projects.matching} <span className="text-cyan-300">"{searchQuery}"</span>
              </span>
            )}
          </div>
        </div>

        {/* 3D Project Cards Grid with Animated Presence */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="flex flex-col rounded-2xl bg-[#111827] border border-slate-800/90 shadow-xl hover:border-cyan-500/40 hover:shadow-cyan-950/20 transition-colors duration-300 group overflow-hidden"
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
                      <div
                        className={`w-full h-full bg-gradient-to-br ${project.imageFallbackGradient} flex flex-col items-center justify-center p-6 relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 cyber-dots opacity-30" />
                        <div className="relative z-10 p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 shadow-inner group-hover:scale-110 transition-transform">
                          {getCardIcon(project.customVisualType)}
                        </div>
                        <div className="relative z-10 mt-3 text-[11px] font-mono text-cyan-300/80 tracking-wide uppercase">
                          {project.architectureSteps[0]} →{' '}
                          {project.architectureSteps[project.architectureSteps.length - 1]}
                        </div>
                      </div>
                    )}

                    {/* Category Tag Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0a0e17]/85 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-sm">
                      {project.category}
                    </div>

                    {/* Estimated Reading Time Indicator */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0a0e17]/85 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-slate-300 shadow-sm">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{getProjectReadingTime(project, language)}</span>
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

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 group-hover:border-slate-700/80 transition-colors"
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

                      <div className="flex items-center gap-2.5">
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                          <Clock className="w-3 h-3 text-cyan-400/80" />
                          <span>{getProjectReadingTime(project, language)}</span>
                        </span>

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-400 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer"
                        >
                          <span>{t.projects.readMore}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="p-12 rounded-2xl bg-[#111827]/60 border border-slate-800 text-center flex flex-col items-center">
            <Filter className="w-10 h-10 text-slate-600 mb-3" />
            <h4 className="text-base font-semibold text-white mb-1">{t.projects.noProjectsFound}</h4>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              {t.projects.noProjectsDesc}
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-medium text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.projects.showAllProjects}</span>
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

