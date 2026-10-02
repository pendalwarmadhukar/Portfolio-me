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
  Radio,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Server
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
      p.category === 'SOC & Incident Response' ||
      p.category === 'AWS Security & Monitoring' ||
      p.category === 'Network Security' ||
      p.technologies.some((t) =>
        ['AWS CloudTrail', 'Amazon SNS', 'Security Monitoring', 'Linux', 'Bash', 'Nmap', 'WebSocket', 'Express.js'].includes(t)
      ),
  },
];

// Issue 15: Distinct, recognizable UI thumbnails for every project
const ProjectThumbnail: React.FC<{ project: Project }> = ({ project }) => {
  if (project.id === 'sentineldesk-soc') {
    return (
      <img
        src="/soc_dashboard.jpg"
        alt="SentinelDesk SOC Dashboard"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    );
  }

  if (project.id === 'cloudshield') {
    return (
      <img
        src="/cloudshield_arch.jpg"
        alt="CloudShield AWS Architecture"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    );
  }

  // AWS Security Monitoring UI Mockup
  if (project.id === 'aws-cloud-security-monitoring') {
    return (
      <div className="w-full h-full bg-[#0a1120] p-4 flex flex-col justify-between font-mono relative overflow-hidden group-hover:bg-[#0c162a] transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-amber-950/20" />
        <div className="relative z-10 flex items-center justify-between pb-2 border-b border-blue-900/40">
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>AWS CloudWatch · CloudTrail</span>
          </div>
          <span className="px-2 py-0.5 rounded text-xs bg-amber-950/60 border border-amber-600/40 text-amber-300">
            SNS Active
          </span>
        </div>

        <div className="relative z-10 space-y-1.5 my-auto text-xs">
          <div className="p-2 rounded-lg bg-slate-900/80 border border-blue-900/30 flex items-center justify-between">
            <span className="text-slate-300">RootAccountLogin</span>
            <span className="text-rose-400">CRITICAL</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/80 border border-blue-900/30 flex items-center justify-between">
            <span className="text-slate-300">SecurityGroup: AuthorizeIngress</span>
            <span className="text-amber-400">WARNING</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-blue-900/40 text-xs text-slate-400">
          <span>Target: EC2 / S3</span>
          <span className="text-cyan-400">Notification Dispatched</span>
        </div>
      </div>
    );
  }

  // DevSecOps CI/CD Pipeline Mockup
  if (project.id === 'devsecops-trivy-pipeline') {
    return (
      <div className="w-full h-full bg-[#071512] p-4 flex flex-col justify-between font-mono relative overflow-hidden group-hover:bg-[#0a1c18] transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-transparent to-cyan-950/20" />
        <div className="relative z-10 flex items-center justify-between pb-2 border-b border-emerald-900/40">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>CI/CD Pipeline Security Gate</span>
          </div>
          <span className="px-2 py-0.5 rounded text-xs bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
            PASSED
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-2 my-auto text-center text-xs">
          <div className="p-2 rounded-lg bg-slate-900/90 border border-emerald-900/30">
            <div className="text-slate-400">Build</div>
            <div className="text-emerald-400 font-bold mt-1">Docker</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/90 border border-emerald-500/40 shadow-sm">
            <div className="text-slate-400">Trivy Scan</div>
            <div className="text-cyan-300 font-bold mt-1">0 Critical</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/90 border border-emerald-900/30">
            <div className="text-slate-400">Deploy</div>
            <div className="text-emerald-400 font-bold mt-1">Approved</div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-emerald-900/40 text-xs text-slate-400">
          <span>GitHub Actions</span>
          <span className="text-emerald-400">Shift-Left Security</span>
        </div>
      </div>
    );
  }

  // Credit Card Fraud ML Mockup
  if (project.id === 'credit-card-fraud-detection') {
    return (
      <div className="w-full h-full bg-[#120a1f] p-4 flex flex-col justify-between font-mono relative overflow-hidden group-hover:bg-[#170e28] transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-transparent to-pink-950/20" />
        <div className="relative z-10 flex items-center justify-between pb-2 border-b border-violet-900/40">
          <div className="flex items-center gap-1.5 text-xs text-violet-400 font-semibold">
            <Binary className="w-3.5 h-3.5 text-violet-400" />
            <span>ML Fraud Detection Engine</span>
          </div>
          <span className="px-2 py-0.5 rounded text-xs bg-violet-950/60 border border-violet-500/40 text-violet-300">
            PR-AUC 0.984
          </span>
        </div>

        <div className="relative z-10 space-y-1.5 my-auto text-xs">
          <div className="p-2 rounded-lg bg-slate-900/80 border border-violet-900/30 flex items-center justify-between">
            <span className="text-slate-300">Tx Anomaly Score</span>
            <span className="text-rose-400 font-bold">0.942 [High Risk]</span>
          </div>
          <div className="flex items-center justify-between px-1 text-slate-400">
            <span>Precision: 99.2%</span>
            <span>Recall: 94.8%</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-violet-900/40 text-xs text-slate-400">
          <span>Imbalanced Dataset</span>
          <span className="text-violet-300">Real-Time Scoring</span>
        </div>
      </div>
    );
  }

  // NetSentinel Terminal Recon Mockup
  if (project.id === 'netsentinel') {
    return (
      <div className="w-full h-full bg-[#081014] p-4 flex flex-col justify-between font-mono relative overflow-hidden group-hover:bg-[#0a151b] transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-slate-950" />
        <div className="relative z-10 flex items-center justify-between pb-2 border-b border-cyan-900/40">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>NetSentinel · Host Scanner</span>
          </div>
          <span className="px-2 py-0.5 rounded text-xs bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
            Bash + Nmap
          </span>
        </div>

        <div className="relative z-10 space-y-1 my-auto text-xs text-slate-300">
          <div className="text-cyan-400">$ netsentinel --audit 192.168.1.0/24</div>
          <div className="flex items-center justify-between text-slate-400">
            <span>22/tcp [OpenSSH]</span>
            <span className="text-emerald-400">MONITORED</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>443/tcp [HTTPS]</span>
            <span className="text-emerald-400">VALIDATED</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-cyan-900/40 text-xs text-slate-400">
          <span>Auth.log Auditing</span>
          <span className="text-cyan-300">Zero Unmapped Ports</span>
        </div>
      </div>
    );
  }

  // SpamGuard AI Mockup
  return (
    <div className="w-full h-full bg-[#0d1522] p-4 flex flex-col justify-between font-mono relative overflow-hidden group-hover:bg-[#101b2c] transition-colors">
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 text-xs text-teal-400 font-semibold">
          <Brain className="w-3.5 h-3.5 text-teal-400" />
          <span>NLP Phishing &amp; Spam Filter</span>
        </div>
        <span className="px-2 py-0.5 rounded text-xs bg-teal-950/60 border border-teal-500/40 text-teal-300">
          NLP
        </span>
      </div>

      <div className="relative z-10 space-y-1.5 my-auto text-xs">
        <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-300">Payload Classification</span>
          <span className="text-rose-400 font-bold">98.7% Phish</span>
        </div>
        <div className="text-slate-400 text-xs truncate">
          Tokens: "urgent", "verify-account", "auth-token"
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
        <span>TF-IDF Vectorizer</span>
        <span className="text-teal-300">Quarantine Action</span>
      </div>
    </div>
  );
};

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

  const activeCategoryLabel = CATEGORY_FILTERS.find((c) => c.id === activeCategoryId)?.getLabel(t) || t.projects.allProjects;

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d131f] relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-cyan-400 tracking-wider mb-2 flex items-center gap-2">
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

        {/* Unified Controls & Filter Toolbar (Issue 11 Fix: eliminates the gap on wide viewports) */}
        <div className="mb-8 p-4 rounded-2xl bg-[#111827] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.projects.searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#0a0e17] border border-slate-800 text-xs font-mono text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {(activeCategoryId !== 'all' || searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-ghost self-start sm:self-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.projects.resetFilters}</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills / Toggles Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              const count = categoryCounts[cat.id] || 0;
              const label = cat.getLabel(t);

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`btn-filter whitespace-nowrap ${
                    isActive ? 'btn-filter-active' : 'btn-filter-inactive'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-mono transition-colors ${
                      isActive
                        ? 'border border-cyan-400/30 bg-cyan-500/20 text-cyan-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
          <div>
            {t.projects.showing} <span className="text-cyan-400 font-semibold">{filteredProjects.length}</span> {t.projects.of}{' '}
            <span className="text-white">{PROJECTS.length}</span> {t.projects.projectsLabel}
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
                  {/* Thumbnail Container (Issue 15: Distinct, recognizable interfaces) */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
                    <ProjectThumbnail project={project} />

                    {/* Category Tag Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0a0e17]/85 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-sm z-10">
                      {project.category}
                    </div>

                    {/* Estimated Reading Time Indicator */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0a0e17]/85 backdrop-blur-md border border-slate-700/80 text-xs font-mono text-slate-300 shadow-sm z-10">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
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

                      {/* Tech Stack Pills — max 4 shown; full list in modal (Issue 5) */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 group-hover:border-slate-700/80 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 text-xs font-mono text-slate-400">
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
                            className="btn-icon"
                            aria-label={`GitHub repository for ${project.title}`}
                            title="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-icon text-cyan-400 hover:text-white"
                            aria-label={`Live demo for ${project.title}`}
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-cyan-400/80" />
                          <span>{getProjectReadingTime(project, language)}</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="btn-secondary"
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
            {/* Heading Level Fix (Issue 9): h3 inside section under h2 */}
            <h3 className="text-base font-semibold text-white mb-1">{t.projects.noProjectsFound}</h3>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              {t.projects.noProjectsDesc}
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="btn-secondary"
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
