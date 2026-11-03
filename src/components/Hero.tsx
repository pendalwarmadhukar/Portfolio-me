import React from 'react';
import { CyberVerseGlobeCanvas } from './CyberVerseGlobeCanvas.tsx';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
  FileText,
  Activity,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon.tsx';

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
      className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050b18]"
    >
      {/* Deep Cinematic Ambient Glow Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute top-[35%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[650px] h-[350px] rounded-full bg-sky-950/20 blur-[150px]" />
      </div>

      {/* Top Tag & Typography Header */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center pt-2 sm:pt-4">
        {/* Defensive Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070f20]/80 border border-cyan-500/25 text-xs font-mono text-cyan-300 mb-5 backdrop-blur-md shadow-lg shadow-cyan-950/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CYBERVERSE // GLOBAL THREAT DEFENSE & DETECTION</span>
          <span className="text-slate-500">·</span>
          <span className="text-emerald-400 font-semibold">SHIELD ACTIVE</span>
        </div>

        {/* Clean High-Contrast White Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3 text-balance leading-tight">
          Building Resilient Systems.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500">
            Defending Digital Borders.
          </span>
        </h1>

        {/* Monospace Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed mb-6">
          3rd-Year B.Tech Cyber Security student specializing in{' '}
          <strong className="text-white font-medium">SOC Tier 1/2 Operations</strong>,{' '}
          <strong className="text-white font-medium">Cloud Security (AWS)</strong>, and{' '}
          <strong className="text-white font-medium">Full-Stack Security Engineering</strong>.
        </p>

        {/* Primary Recruiter Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="btn-primary px-6 py-2.5 font-mono text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <span>{t.hero.viewProjects}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onOpenResume}
            className="btn-secondary px-6 py-2.5 font-mono text-xs flex items-center gap-2"
            title="Open Resume Dossier"
            aria-label="Preview and download Resume Dossier"
          >
            <FileText className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>{t.hero.resumeBtn}</span>
          </button>
        </div>

        {/* Social Icons Strip */}
        <div className="flex items-center justify-center gap-2.5 text-slate-400 mb-2">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon p-2 hover:text-cyan-400"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon p-2 hover:text-cyan-400"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon p-2 hover:text-amber-400 hover:border-amber-500/40"
            aria-label="LeetCode Profile"
          >
            <LeetCodeIcon className="h-4 w-4 text-amber-400" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="btn-icon p-2 hover:text-cyan-400"
            aria-label="Email Madhukar"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Central 3D Globe Stage with Floating Glass Panels */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 min-h-[440px] sm:min-h-[500px] flex items-center justify-center my-4">
        {/* 3D Globe Canvas */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0">
          <CyberVerseGlobeCanvas />
        </div>

        {/* 3D Drag Hint Overlay */}
        <div className="absolute top-2 right-4 text-[11px] font-mono text-slate-400/90 pointer-events-none z-10 bg-[#070f20]/80 border border-cyan-500/20 backdrop-blur-md px-3 py-1 rounded-full shadow-md hidden sm:block">
          ↔ Click & Drag to Rotate Globe 360°
        </div>

        {/* Left Floating Subtle Glass Panel: Live SOC Telemetry */}
        <div className="absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 w-64 lg:w-72 rounded-2xl p-4 bg-[#0a1428]/60 backdrop-blur-xl border border-cyan-500/25 shadow-2xl shadow-cyan-950/40 hidden md:block z-10 font-mono text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 text-cyan-300">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>SOC TELEMETRY</span>
            </div>
            <span className="text-[10px] text-slate-400">REALTIME</span>
          </div>

          <div className="space-y-3 pt-3 text-slate-300 text-[11px]">
            <div className="bg-[#060c18]/80 p-2.5 rounded-lg border border-slate-800/80">
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>INGRESS SURVEILLANCE</span>
                <span className="text-emerald-400 font-bold">NORMAL</span>
              </div>
              <div className="text-white font-bold text-sm mt-0.5">1,420 events/sec</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-[68%]" />
              </div>
            </div>

            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-cyan-400">MITRE T1110 (Brute Force):</span>
                <span className="text-emerald-400 font-bold">147 BLOCKED</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-cyan-400">CloudTrail Anomaly:</span>
                <span className="text-emerald-400 font-bold">SESSION REVOKED</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-cyan-400">WAF Rule Enforcement:</span>
                <span className="text-emerald-400 font-bold">PROTECTED</span>
              </div>
            </div>

            <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-200">
              🛡️ SentinelDesk Ingestion active across internal subnets.
            </div>
          </div>
        </div>

        {/* Right Floating Subtle Glass Panel: Verified Candidate Dossier */}
        <div className="absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 w-64 lg:w-72 rounded-2xl p-4 bg-[#0a1428]/60 backdrop-blur-xl border border-cyan-500/25 shadow-2xl shadow-cyan-950/40 hidden md:block z-10 font-mono text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 text-cyan-300">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SECURITY DOSSIER</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">VERIFIED</span>
          </div>

          <div className="space-y-3 pt-3 text-slate-300 text-[11px]">
            <div>
              <div className="text-white font-bold text-sm">Madhukar Pendalwar</div>
              <div className="text-cyan-400 text-[11px]">B.Tech Cyber Security (3rd Year)</div>
              <div className="text-slate-400 text-[10px]">Parul University · 2023–2027</div>
            </div>

            <div className="bg-[#060c18]/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5">
              <div className="text-[10px] text-slate-400 font-bold">CORE COMPETENCIES</div>
              <div className="flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[9px] border border-cyan-800">
                  SIEM (Wazuh/Splunk)
                </span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[9px] border border-cyan-800">
                  Wireshark
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[9px] border border-blue-800">
                  AWS Cloud
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px] border border-emerald-800">
                  React & Node.js
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[9px] border border-amber-800">
                  LeetCode 390+
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px]">
              <span className="text-slate-400">READINESS:</span>
              <span className="text-emerald-400 font-bold">● Available for Internships</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metric Strip (Recruiter Quick Glance) */}
      <div className="w-full max-w-5xl mx-auto rounded-xl bg-[#081022]/70 border border-slate-800/80 backdrop-blur-md px-4 py-2.5 z-20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">BASE:</span>
            <span className="text-white font-semibold">Vadodara / Pune, India</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-400">CREDENTIALS:</span>
            <span className="text-cyan-300 font-semibold">5 Verified (TryHackMe / IBM)</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <span className="text-slate-400">LEETCODE:</span>
            <span className="text-amber-400 font-semibold">390+ Solved</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span>DEFENSIVE TLS 1.3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>
    </section>
  );
};
