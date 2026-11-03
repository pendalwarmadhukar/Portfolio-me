import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft, Shield, Sparkles, ExternalLink, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface CyberTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface CommandOutput {
  id: string;
  command: string;
  htmlContent?: string;
  isError?: boolean;
}

export const CyberTerminalModal: React.FC<CyberTerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Auto-scroll output to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const availableCommands = [
    'help',
    'whoami',
    'skills',
    'projects',
    'certs',
    'nmap portfolio',
    'cat resume.txt',
    'contact',
    'sudo hire-madhukar',
    'clear',
    'exit',
  ];

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Save to command history for Up/Down arrow navigation
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'exit' || lower === 'quit') {
      onClose();
      setInputVal('');
      return;
    }

    let outputHtml = '';
    let isErr = false;

    switch (lower) {
      case 'help':
        outputHtml = `
<div class="space-y-1 text-slate-300">
  <p class="text-cyan-300 font-semibold mb-1">CYBER TERMINAL COMMAND MATRIX:</p>
  <p><span class="text-emerald-400 font-bold">whoami</span>              - Analyst credentials & background</p>
  <p><span class="text-emerald-400 font-bold">skills</span>              - Security toolset & full-stack technologies</p>
  <p><span class="text-emerald-400 font-bold">projects</span>            - Architectural summaries of key projects</p>
  <p><span class="text-emerald-400 font-bold">certs</span>               - Verified TryHackMe & IBM credentials</p>
  <p><span class="text-emerald-400 font-bold">nmap portfolio</span>      - Real-time simulated port & hardening audit</p>
  <p><span class="text-emerald-400 font-bold">cat resume.txt</span>      - Resume overview & launch dossier viewer</p>
  <p><span class="text-emerald-400 font-bold">contact</span>             - Direct channels (Email, LinkedIn, GitHub)</p>
  <p><span class="text-emerald-400 font-bold">sudo hire-madhukar</span>  - Fast-track recruiter onboarding workflow</p>
  <p><span class="text-emerald-400 font-bold">clear</span>               - Flush terminal buffer</p>
  <p><span class="text-emerald-400 font-bold">exit</span>                - Close terminal interface</p>
</div>`;
        break;

      case 'whoami':
        outputHtml = `
<div class="border-l-2 border-cyan-400 pl-3 py-1 space-y-1 text-slate-300">
  <p><span class="text-cyan-400 font-semibold">NAME:</span> ${PERSONAL_INFO.name}</p>
  <p><span class="text-cyan-400 font-semibold">ROLE:</span> ${PERSONAL_INFO.role}</p>
  <p><span class="text-cyan-400 font-semibold">EDUCATION:</span> B.Tech in Cyber Security (3rd Year, Parul University, 2023 - 2027)</p>
  <p><span class="text-cyan-400 font-semibold">TARGET:</span> SOC Analyst (L1/L2), Incident Responder, Cloud Security Engineer</p>
  <p><span class="text-cyan-400 font-semibold">LOCATION:</span> Vadodara / Pune, India</p>
  <p><span class="text-cyan-400 font-semibold">STATUS:</span> <span class="text-emerald-400 font-medium">● Open to Summer Internships & Security Opportunities</span></p>
</div>`;
        break;

      case 'skills':
        outputHtml = `
<div class="space-y-2 text-slate-300">
  <div class="bg-[#0b101b] p-2 rounded border border-cyan-500/20">
    <span class="text-cyan-400 font-bold">[SOC & Threat Defense]:</span>
    <p class="text-slate-300 text-xs mt-0.5">SIEM (Splunk, Wazuh), Wireshark, Snort, MITRE ATT&CK, Autopsy, Volatility, Incident Response, Log Triage</p>
  </div>
  <div class="bg-[#0b101b] p-2 rounded border border-cyan-500/20">
    <span class="text-cyan-400 font-bold">[Offensive & Vulnerability Auditing]:</span>
    <p class="text-slate-300 text-xs mt-0.5">Nmap, Burp Suite, Metasploit, Gobuster, SQLMap, John the Ripper, OWASP Top 10</p>
  </div>
  <div class="bg-[#0b101b] p-2 rounded border border-cyan-500/20">
    <span class="text-cyan-400 font-bold">[Full-Stack Development]:</span>
    <p class="text-slate-300 text-xs mt-0.5">TypeScript, React 19, Node.js, Express.js, Python, MongoDB, Tailwind CSS, REST APIs</p>
  </div>
  <div class="bg-[#0b101b] p-2 rounded border border-cyan-500/20">
    <span class="text-cyan-400 font-bold">[Networking & Cloud Security]:</span>
    <p class="text-slate-300 text-xs mt-0.5">TCP/IP, DNS, Subnetting, Firewalls, VPN, AWS (VPC, IAM, GuardDuty, WAF), Docker, Linux</p>
  </div>
</div>`;
        break;

      case 'projects':
        outputHtml = `
<div class="space-y-2.5 text-slate-300">
  <div class="p-2.5 rounded bg-[#0b101b] border border-cyan-500/30">
    <div class="flex items-center justify-between text-cyan-300 font-bold">
      <span>1. SentinelDesk - Enterprise SOC & Incident Management</span>
      <span class="text-xs text-emerald-400 font-mono">Full Stack SOC</span>
    </div>
    <p class="text-slate-300 text-xs mt-1">Full-stack SOC platform built with React, Node.js, Express, and MongoDB. Features live alert streaming, severity filtering, MITRE ATT&CK mapping, and analyst profile management with FIDO2 MFA.</p>
  </div>
  <div class="p-2.5 rounded bg-[#0b101b] border border-cyan-500/30">
    <div class="flex items-center justify-between text-cyan-300 font-bold">
      <span>2. CloudShield Architecture</span>
      <span class="text-xs text-emerald-400 font-mono">AWS Security</span>
    </div>
    <p class="text-slate-300 text-xs mt-1">Enterprise multi-tier zero-trust cloud infrastructure on AWS utilizing VPC peering, GuardDuty automated threat detection, and Web Application Firewall (WAF).</p>
  </div>
</div>`;
        break;

      case 'certs':
      case 'certifications':
        outputHtml = `
<div class="space-y-1 text-slate-300">
  <p class="text-cyan-300 font-semibold mb-1">VERIFIED CYBERSECURITY CREDENTIALS:</p>
  <p class="text-emerald-400">✔ TryHackMe - Advent of Cyber 2025 (Advanced Web Exploitation & SIEM)</p>
  <p class="text-emerald-400">✔ TryHackMe - Love at First Breach CTF (Packet Capture & Log Analysis)</p>
  <p class="text-emerald-400">✔ TryHackMe - Cold Start CTF (Forensics & Privilege Escalation)</p>
  <p class="text-emerald-400">✔ IBM - Cybersecurity Fundamentals (Defense-in-Depth & Crypto)</p>
  <p class="text-emerald-400">✔ TryHackMe - Hacker Holidays (Threat Hunting & Scripting)</p>
</div>`;
        break;

      case 'nmap':
      case 'nmap portfolio':
      case 'nmap portfolio-madhukar.vercel.app':
        outputHtml = `
<div class="bg-black/80 p-3 rounded border border-cyan-500/30 font-mono text-xs space-y-1">
  <p class="text-cyan-400">Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-03 21:20 IST</p>
  <p class="text-slate-400">Nmap scan report for portfolio-madhukar.vercel.app (76.76.21.21)</p>
  <p class="text-slate-500">Host is up (0.011s latency).</p>
  <br/>
  <p class="text-slate-300 font-bold">PORT      STATE  SERVICE       VERSION</p>
  <p><span class="text-emerald-400">22/tcp</span>    <span class="text-emerald-300">open</span>   ssh           OpenSSH 9.2 (2FA WebAuthn Enforced)</p>
  <p><span class="text-emerald-400">80/tcp</span>    <span class="text-emerald-300">open</span>   http          Vite + React 19 Client (301 Redirect to HTTPS)</p>
  <p><span class="text-emerald-400">443/tcp</span>   <span class="text-emerald-300">open</span>   https         TLS 1.3 / Strict-Transport-Security</p>
  <p><span class="text-emerald-400">514/udp</span>   <span class="text-emerald-300">open</span>   syslog        SentinelDesk Realtime Ingestion Engine</p>
  <br/>
  <p class="text-emerald-400">Nmap done: 1 IP address (1 host up) scanned in 0.72 seconds</p>
  <p class="text-cyan-300 font-semibold">Audit summary: 0 critical vulnerabilities · Defensive Posture: HARDENED</p>
</div>`;
        break;

      case 'cat resume.txt':
      case 'resume':
        outputHtml = `
<div class="bg-[#0b101b] p-3 rounded border border-cyan-500/40 space-y-1.5 text-slate-300">
  <p class="text-cyan-300 font-bold">MADHUKAR PENDALWAR - RESUME BRIEF</p>
  <p>Degree: B.Tech Cyber Security (3rd Year, Parul University, Vadodara)</p>
  <p>Core Expertise: SIEM Log Analysis, AWS Cloud Architecture, Threat Investigation, Full-Stack Dev</p>
  <p>LeetCode: 50+ DSA Problems Solved (Arrays, Two Pointers, Hash Maps, Strings)</p>
  <p class="text-emerald-400 font-semibold mt-2">→ Launching complete interactive Resume Dossier modal...</p>
</div>`;
        setTimeout(() => {
          onOpenResume();
        }, 600);
        break;

      case 'contact':
        outputHtml = `
<div class="space-y-1 text-slate-300">
  <p><span class="text-cyan-400 font-semibold">Email:</span> <a href="mailto:${PERSONAL_INFO.email}" class="text-cyan-300 underline hover:text-white">${PERSONAL_INFO.email}</a></p>
  <p><span class="text-cyan-400 font-semibold">LinkedIn:</span> <a href="${PERSONAL_INFO.linkedin}" target="_blank" rel="noopener noreferrer" class="text-cyan-300 underline hover:text-white">linkedin.com/in/madhukar-pendalwar-23192031a</a></p>
  <p><span class="text-cyan-400 font-semibold">GitHub:</span> <a href="${PERSONAL_INFO.github}" target="_blank" rel="noopener noreferrer" class="text-cyan-300 underline hover:text-white">github.com/pendalwarmadhukar</a></p>
  <p><span class="text-cyan-400 font-semibold">LeetCode:</span> <a href="${PERSONAL_INFO.leetcode}" target="_blank" rel="noopener noreferrer" class="text-cyan-300 underline hover:text-white">leetcode.com/u/Pendalwar_Madhukar126/</a></p>
</div>`;
        break;

      case 'sudo hire-madhukar':
      case 'hire':
        outputHtml = `
<div class="bg-emerald-950/40 border border-emerald-500/50 p-3 rounded space-y-2 text-emerald-200">
  <p class="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
    <span>🛡️</span> [AUTH OK]: ROOT PRIVILEGES GRANTED!
  </p>
  <p class="text-xs">Candidate Madhukar Pendalwar is ready to protect critical infrastructure, triage SOC incidents, and develop robust secure systems.</p>
  <p class="text-xs text-cyan-300 font-semibold">→ Scrolling to contact section to dispatch communication...</p>
</div>`;
        setTimeout(() => {
          onClose();
          const contactEl = document.getElementById('contact');
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1200);
        break;

      default:
        isErr = true;
        outputHtml = `<span class="text-rose-400">command not found: "${trimmed}"</span>. Type <button onclick="window.__cyberRunCmd && window.__cyberRunCmd('help')" class="text-cyan-300 underline hover:text-white font-bold">help</button> to view all supported commands.`;
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: trimmed,
        htmlContent: outputHtml,
        isError: isErr,
      },
    ]);
    setInputVal('');
  };

  // Expose global callback for buttons rendered in HTML
  useEffect(() => {
    (window as any).__cyberRunCmd = (cmd: string) => executeCommand(cmd);
    return () => {
      delete (window as any).__cyberRunCmd;
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up / Down command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Autocomplete command
      const match = availableCommands.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl rounded-xl border border-cyan-500/40 bg-[#0a0e17]/95 shadow-[0_0_40px_rgba(6,182,212,0.22)] flex flex-col max-h-[85vh] overflow-hidden relative font-mono text-xs sm:text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0e1626] border-b border-cyan-500/20 select-none shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition cursor-pointer"
                title="Close (Esc)"
                aria-label="Close"
              />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-cyan-400 font-semibold flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                madhukar@soc-analyst: ~ (bash v5.2)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                PRESS [ESC] TO CLOSE · [TAB] AUTOCOMPLETE
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-white transition p-1"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick-action chip bar */}
          <div className="px-4 py-2 bg-[#090d15] border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0 select-none">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider shrink-0 font-semibold mr-1">
              Quick:
            </span>
            {[
              'whoami',
              'skills',
              'projects',
              'certs',
              'nmap portfolio',
              'cat resume.txt',
              'sudo hire-madhukar',
              'clear',
            ].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className={`px-2 py-0.5 rounded text-[11px] transition whitespace-nowrap cursor-pointer ${
                  cmd.includes('hire')
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                    : cmd === 'clear'
                    ? 'bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white ml-auto'
                    : 'bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400'
                }`}
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Scrollable Body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] leading-relaxed select-text"
          >
            {/* Startup Banner */}
            <div className="text-cyan-400/90 font-mono select-none">
              <pre className="text-[10px] sm:text-xs leading-none text-cyan-400 font-bold overflow-x-auto">
{` __  __           _ _             _                  ____   ___   ____ 
|  \\/  | __ _  __| | |__  _   _  | | ____ _ _ __    / ___| / _ \\ / ___|
| |\\/| |/ _\` |/ _\` | '_ \\| | | | | |/ / _\` | '__|   \\___ \\| | | | |    
| |  | | (_| | (_| | | | | |_| | |   < (_| | |       ___) | |_| | |___ 
|_|  |_|\\__,_|\\__,_|_| |_|\\__,_| |_|\\_\\__,_|_|      |____/ \\___/ \\____|`}
              </pre>
              <p className="text-slate-400 text-xs mt-2">
                Madhukar Pendalwar · Cybersecurity Analyst & Full-Stack Engineer
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Type <span className="text-cyan-300 font-semibold">help</span> to view commands, or click any chip above.
              </p>
            </div>

            {/* History Output */}
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold shrink-0">madhukar@soc:~$</span>
                  <span className="text-white font-mono">{item.command}</span>
                </div>
                {item.htmlContent && (
                  <div
                    className="text-slate-300 pl-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.htmlContent }}
                  />
                )}
              </div>
            ))}

            {/* Live Prompt Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-semibold shrink-0">madhukar@soc:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck="false"
                className="flex-1 bg-transparent text-cyan-200 outline-none border-none font-mono text-xs sm:text-sm p-0 focus:ring-0 placeholder-slate-600"
                placeholder="type 'help' or command..."
              />
              <span className="w-2 h-4 bg-cyan-400 animate-pulse shrink-0" />
            </form>
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2 bg-[#0b101b] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 shrink-0 select-none">
            <span>
              Session: <strong className="text-emerald-400 font-normal">Active</strong>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenResume}
                className="hover:text-cyan-300 flex items-center gap-1 transition"
              >
                <FileText className="w-3 h-3 text-cyan-400" />
                <span>Resume Dossier</span>
              </button>
              <span>·</span>
              <span className="text-slate-400 font-normal">Cybersecurity B.Tech</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
