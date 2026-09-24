import React from 'react';
import { CyberHeroCanvas } from './CyberHeroCanvas.tsx';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ArrowRight, Download, Github, Linkedin, Mail, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
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
      {/* 3D WebGL / Three.js Canvas */}
      <CyberHeroCanvas />

      {/* Subtle radial depth gradient */}
      <div
        className="absolute inset-0 bg-radial from-transparent via-[#0a0e17]/60 to-[#0a0e17] pointer-events-none z-1"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Security Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Security Status: Active Verification</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">SOC & Cloud Defense</span>
        </div>

        {/* Primary Greeting */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 text-balance">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
            Madhukar Pendalwar
          </span>
        </h1>

        {/* Subtitle / Education */}
        <p className="text-lg sm:text-xl font-medium text-cyan-400/90 font-mono mb-4">
          B.Tech Cyber Security Student
        </p>

        {/* Main Role Line */}
        <div className="text-base sm:text-xl md:text-2xl font-semibold text-slate-200 mb-4 max-w-3xl">
          {PERSONAL_INFO.heroRoleLine}
        </div>

        {/* Short Tagline */}
        <blockquote className="text-base sm:text-lg italic text-slate-300 max-w-2xl mb-4 font-normal">
          {PERSONAL_INFO.tagline}
        </blockquote>

        {/* Secondary Focus Line */}
        <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide mb-8 text-balance">
          {PERSONAL_INFO.secondaryTagline}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 w-full max-w-md">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-cyan-500/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Download Resume</span>
            <Download className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 text-slate-400 mb-10">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-slate-800/60 transition-all"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-slate-800/60 transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-slate-800/60 transition-all"
            aria-label="Email Madhukar"
          >
            <Mail className="w-5 h-5" />
          </a>
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
