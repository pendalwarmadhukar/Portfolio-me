import React from 'react';
import { CyberGlobeCanvas } from './CyberGlobeCanvas.tsx';
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
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon.tsx';

interface HeroProps {
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
  onOpenCyberVerse?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenTerminal,
  onOpenCyberVerse,
}) => {
  const { t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050b18]"
    >
      {/* Cinematic Deep Navy Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[650px] h-[650px] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute top-[30%] right-[10%] w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[400px] rounded-full bg-sky-950/25 blur-[160px]" />
      </div>

      {/* Top Title & Headline Area */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center space-y-3 pt-2">
        {/* Defensive Shield Live Status Badge & 3D Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-badge text-xs font-mono text-cyan-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CYBERVERSE // GLOBAL THREAT DEFENSE</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">SOC ANALYST INTERN CANDIDATE</span>
          {onOpenCyberVerse && (
            <button
              type="button"
              onClick={onOpenCyberVerse}
              className="ml-1.5 px-2 py-0.5 rounded-md bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 flex items-center gap-1 cursor-pointer transition text-[10px]"
              title="Expand Full 3D Interactive Environment"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Full 3D Mode</span>
            </button>
          )}
        </div>

        {/* Clean White Typography Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
          Building Resilient Systems. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500">
            Defending Digital Borders.
          </span>
        </h1>

        {/* Candidate Profile Avatar & Institution */}
        <div className="flex items-center gap-3 pt-1">
          <div className="relative group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-950/50">
              <img
                src="/profile.png"
                alt="Madhukar Pendalwar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-900 border border-cyan-400 text-cyan-400"
              title="Verified Candidate"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-left font-mono">
            <div className="text-white font-bold text-sm tracking-wide">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-xs text-cyan-400/90 font-medium">
              B.Tech Cyber Security (3rd Year) · Siddhartha Institute of Technology & Sciences, Hyderabad
            </div>
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Developing practical skills in <strong className="text-white font-medium">SOC & Blue Team operations</strong>,{' '}
          <strong className="text-white font-medium">security monitoring and alert triage</strong>, and{' '}
          <strong className="text-white font-medium">Linux and network analysis</strong>. Building projects to practise investigation, documentation, and escalation.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="btn-primary px-5 py-2.5 rounded-xl font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>{t.hero.viewProjects}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {onOpenCyberVerse && (
            <button
              type="button"
              onClick={onOpenCyberVerse}
              className="btn-secondary px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 cursor-pointer border-cyan-500/40 text-cyan-300 hover:text-white"
            >
              <Maximize2 className="w-4 h-4 text-cyan-400" />
              <span>Enter 3D CyberVerse</span>
            </button>
          )}

          <a
            href="#soc"
            onClick={(e) => scrollToSection(e, 'soc')}
            className="btn-secondary px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>SOC Simulator</span>
          </a>

          <button
            type="button"
            onClick={onOpenResume}
            className="glass-badge hover:border-cyan-400 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-2 cursor-pointer"
            title="Preview and download official Resume PDF"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{t.hero.resumeBtn}</span>
          </button>
        </div>

        {/* Social Profile Links */}
        <div className="flex items-center justify-center gap-2.5 pt-1 text-slate-400">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-badge hover:text-cyan-400 hover:border-cyan-400 transition"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-badge hover:text-cyan-400 hover:border-cyan-400 transition"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-badge hover:text-amber-400 hover:border-amber-400 transition"
            aria-label="LeetCode Profile"
          >
            <LeetCodeIcon className="w-4 h-4 text-amber-400" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2 rounded-lg glass-badge hover:text-cyan-400 hover:border-cyan-400 transition"
            aria-label="Email Madhukar"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Central 3D Globe Stage with Floating Glass Panels */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 min-h-[460px] sm:min-h-[520px] flex items-center justify-center my-4">
        {/* Interactive 3D Hologram Globe Canvas */}
        <CyberGlobeCanvas />

        {/* 360° Drag Hint Overlay */}
        <div className="absolute top-2 right-4 text-[11px] font-mono text-slate-400/80 pointer-events-none z-10 glass-badge px-3 py-1 rounded-full">
          ↔ Click &amp; Drag to Orbit Globe 360°
        </div>

        {/* Left Floating Glass Panel: Live SOC Telemetry */}
        <div className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-64 sm:w-72 glass-panel rounded-2xl p-4 hidden md:block z-10 font-mono text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 text-cyan-300">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>SOC TELEMETRY</span>
            </div>
            <span className="text-[10px] text-slate-400">REALTIME</span>
          </div>

          <div className="space-y-3 pt-3 text-slate-300 text-[11px]">
            <div className="bg-[#070e1c]/80 p-2.5 rounded-lg border border-slate-800/80">
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
                <span className="text-cyan-400">WAF Threat Rules:</span>
                <span className="text-emerald-400 font-bold">ENFORCED</span>
              </div>
            </div>

            <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-200">
              🛡️ SentinelDesk Ingestion pipeline active across 4 edge subnets.
            </div>
          </div>
        </div>

        {/* Right Floating Glass Panel: Candidate Verified Profile */}
        <div className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-64 sm:w-72 glass-panel rounded-2xl p-4 hidden md:block z-10 font-mono text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-cyan-500/20 text-cyan-300">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SECURITY DOSSIER</span>
            </div>
            <span className="text-[10px] text-slate-400">VERIFIED</span>
          </div>

          <div className="space-y-3 pt-3 text-slate-300 text-[11px]">
            <div>
              <div className="text-white font-bold text-sm">Madhukar Pendalwar</div>
              <div className="text-cyan-400 text-[11px]">B.Tech Cyber Security (3rd Year)</div>
              <div className="text-slate-400 text-[10px]">Siddhartha Institute of Technology &amp; Sciences, Hyderabad · 2023–2027</div>
            </div>

            <div className="bg-[#070e1c]/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5">
              <div className="text-[10px] text-slate-400 font-bold">KEY COMPETENCIES</div>
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
                  React &amp; Node.js
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[9px] border border-amber-800">
                  LeetCode 390+
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px]">
              <span className="text-slate-400">AVAILABILITY:</span>
              <span className="text-emerald-400 font-bold">● Open for Internships</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metric Ticker */}
      <div className="relative z-20 w-full max-w-5xl mx-auto glass-badge rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">LOCATION:</span>
            <span className="text-white font-semibold">Hyderabad, India (17.385°N, 78.487°E)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">INSTITUTION:</span>
            <span className="text-cyan-300 font-semibold">Siddhartha Institute of Technology &amp; Sciences</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-400">SOC READY:</span>
            <span className="text-emerald-400 font-semibold">Wazuh SIEM &amp; AWS CloudTrail</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-slate-400 text-[11px]">ENCRYPTED TLS 1.3</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>
    </section>
  );
};
