import React, { useEffect } from 'react';
import { Project } from '../types.ts';
import { getProjectReadingTime } from '../utils/readingTime.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { X, Github, ExternalLink, ArrowRight, ShieldCheck, Layers, AlertCircle, Lightbulb, Clock } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t, language, isHindi } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const readingTime = getProjectReadingTime(project, language);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f172a] border border-slate-700/80 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono text-cyan-400 font-medium">
                {project.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{t.projects.estimatedReadTime}: {readingTime}</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={t.projects.closeModal}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Quick Recruiter Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong className="text-white">{t.projects.estimatedReadTime}:</strong> {readingTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isHindi ? 'विस्तृत तकनीकी विनिर्देश नीचे उपलब्ध हैं' : 'Full Technical Specifications Available Below'}</span>
            </div>
          </div>

          {/* Architecture Visual Pipeline */}
          <div className="p-5 rounded-xl bg-[#0a0e17] border border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-400">
              <Layers className="w-4 h-4" />
              <span>{t.projects.modalArchTitle}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-2">
              {project.architectureSteps.map((step, idx) => (
                <React.Fragment key={step}>
                  <div className="px-3.5 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-xs sm:text-sm font-mono text-slate-200 shadow-sm">
                    {step}
                  </div>
                  {idx < project.architectureSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              {isHindi ? 'परियोजना अवलोकन' : 'Project Overview'}
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-rose-900/30">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>{t.projects.modalProblemTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-900/30">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-2">
                <Lightbulb className="w-4 h-4" />
                <span>{t.projects.modalSolutionTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              {t.projects.modalFeaturesTitle}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
              {t.projects.modalTechTitle}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.projects.viewGithub}</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t.projects.liveDemo}</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {t.projects.closeModal}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
