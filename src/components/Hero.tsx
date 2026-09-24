import React from 'react';
import { NetworkNodesCanvas } from './NetworkNodesCanvas.tsx';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ArrowRight, Download, Github, Linkedin, Mail, ShieldCheck, Terminal as TerminalIcon, FileText } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { t } = useLanguage();

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid"
    >
      {/* Interactive 3D Network Nodes Visualization (React Three Fiber) */}
      <NetworkNodesCanvas />

      {/* Subtle radial depth gradient */}
      <div
        className="absolute inset-0 bg-radial from-transparent via-[#0a0e17]/60 to-[#0a0e17] pointer-events-none z-1"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Security Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t.hero.statusBadge}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">{t.hero.statusSub}</span>
        </div>

        {/* Profile Portrait Avatar */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-400 opacity-60 blur-sm group-hover:opacity-100 transition duration-500" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-cyan-400 bg-slate-900 shadow-xl shadow-cyan-950/50">
            <img
              src="/profile.png"
              alt="Madhukar Pendalwar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute bottom-0 right-0 p-1 rounded-full bg-slate-900 border border-cyan-400 text-cyan-400" title={t.hero.verifiedCandidate}>
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* Primary Greeting */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 text-balance">
          {t.hero.greeting}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
            {t.hero.name}
          </span>
        </h1>

        {/* Subtitle / Education */}
        <p className="text-lg sm:text-xl font-medium text-cyan-400/90 font-mono mb-4">
          {t.hero.studentTitle}
        </p>

        {/* Main Role Line */}
        <div className="text-base sm:text-xl md:text-2xl font-semibold text-slate-200 mb-4 max-w-3xl">
          {t.hero.roleLine}
        </div>

        {/* Short Tagline */}
        <blockquote className="text-base sm:text-lg italic text-slate-300 max-w-2xl mb-4 font-normal">
          {t.hero.tagline}
        </blockquote>

        {/* Secondary Focus Line */}
        <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide mb-8 text-balance">
          {t.hero.secondaryTagline}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 mb-10">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:flex-1"
          >
            <span>{t.hero.viewProjects}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex w-full sm:flex-1 items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download={PERSONAL_INFO.resumeFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/40 hover:text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group"
              title="Download Resume PDF"
            >
              <span>{t.hero.resumeBtn}</span>
              <Download className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center justify-center p-3 rounded-lg text-slate-400 hover:text-cyan-300 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/40 transition-all cursor-pointer shrink-0"
              title="Preview Resume Dossier"
              aria-label="Preview Resume Dossier"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mb-8 flex items-center justify-center gap-3 text-slate-400 sm:gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 transition-all hover:border-cyan-500/40 hover:bg-slate-800/60 hover:text-cyan-400 sm:p-3"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 transition-all hover:border-cyan-500/40 hover:bg-slate-800/60 hover:text-cyan-400 sm:p-3"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 transition-all hover:border-cyan-500/40 hover:bg-slate-800/60 hover:text-cyan-400 sm:p-3"
            aria-label="Email Madhukar"
          >
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mb-10">
          {[
            { value: '3+', label: 'Security projects' },
            { value: 'SOC', label: 'Blue team focus' },
            { value: 'AWS', label: 'Cloud security' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-800/80 bg-slate-900/65 px-4 py-3 backdrop-blur-sm shadow-[0_12px_25px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-cyan-500/30"
            >
              <div className="text-xl font-bold text-cyan-300 font-mono">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-300">
          {['Blue Team', 'Cloud Security', 'SOC Readiness', 'Digital Forensics'].map((tag) => (
            <span key={tag} className="rounded-full border border-slate-800 bg-slate-900/70 px-2.5 py-1.5 shadow-sm shadow-slate-950/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Minimal Terminal / Telemetry Box */}
        <div className="w-full max-w-xl mx-auto rounded-xl bg-[#0f172a]/80 border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden text-left text-xs font-mono">
          <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] text-slate-300">analyst-terminal@pendalwar:~$</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/60" />
            </div>
          </div>
          <div className="p-3.5 space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">&gt;</span>
              <span className="text-slate-400">candidate_profile --target</span>
              <span className="text-emerald-400">"Madhukar Pendalwar"</span>
            </div>
            <div className="text-slate-400 pl-4">
              Academic Status: 3rd-Year B.Tech Cyber Security
            </div>
            <div className="text-slate-400 pl-4">
              Operational Focus: SOC L1 Analysis · AWS Cloud Security · DevSecOps
            </div>
            <div className="text-slate-400 pl-4 flex items-center gap-2">
              <span>Security Readiness:</span>
              <span className="text-cyan-300">Ready for Internships & Blue Team Roles</span>
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
