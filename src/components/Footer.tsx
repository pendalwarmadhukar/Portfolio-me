import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { Shield, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0e17] border-t border-slate-800/80 text-xs font-mono text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 text-slate-400">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-200 font-semibold">{PERSONAL_INFO.name}</span>
          <span>·</span>
          <span>B.Tech Cyber Security (3rd Year)</span>
        </div>

        <div className="flex items-center gap-5 text-slate-400">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-cyan-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-4 text-center sm:text-left text-slate-600 text-[11px]">
        Built with modern React, Three.js & Tailwind CSS. Designed for clarity, authenticity, and technical rigor.
      </div>
    </footer>
  );
};
