import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ShieldAlert, Cloud, Search, HardDrive, ShieldCheck, UserCheck } from 'lucide-react';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-cyan-400" />,
    Cloud: <Cloud className="w-5 h-5 text-blue-400" />,
    Search: <Search className="w-5 h-5 text-teal-400" />,
    HardDrive: <HardDrive className="w-5 h-5 text-emerald-400" />
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d131f] relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            Profile Overview
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            About Me
          </h2>
          <div className="h-0.5 w-12 bg-cyan-500 mt-3 sm:mx-0 mx-auto" />
        </div>

        {/* Grid: Profile Card + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
            <div className="w-full max-w-sm rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-xl relative group">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-slate-900 border border-slate-800">
                {!imgError ? (
                  <img
                    src="/src/assets/images/madhukar_profile_portrait_1790236890128.jpg"
                    alt="Madhukar Pendalwar - B.Tech Cyber Security Student"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950 p-6 text-center">
                    <UserCheck className="w-16 h-16 text-cyan-400 mb-3" />
                    <span className="font-mono text-sm text-slate-200 font-semibold">
                      Madhukar Pendalwar
                    </span>
                    <span className="text-xs text-cyan-400/80 mt-1">
                      Cybersecurity Engineer
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>3rd Year</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-mono">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-sm font-medium text-cyan-400">
                  {PERSONAL_INFO.role}
                </p>
                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Degree:</span>
                    <span className="text-slate-300">B.Tech Cyber Security</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Focus:</span>
                    <span className="text-slate-300">Blue Team & Cloud Defense</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="text-slate-300">India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111827] border border-slate-800 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Undergraduate Cyber Security Specialist</span>
              </div>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                I am a 3rd-year B.Tech Cyber Security student with a strong interest in{' '}
                <strong className="text-white font-semibold">Cybersecurity</strong>,{' '}
                <strong className="text-cyan-300 font-semibold">SOC & Blue Team operations</strong>,{' '}
                <strong className="text-blue-300 font-semibold">Cloud Security</strong>,{' '}
                <strong className="text-teal-300 font-semibold">Cyber Crime Investigation</strong>, and{' '}
                <strong className="text-emerald-300 font-semibold">Digital Forensics</strong>.
              </p>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                I focus on building practical security projects involving AWS security, security monitoring, Linux, networking, DevSecOps, and cybersecurity analysis.
              </p>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Hands-on Lab Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>AWS Architecture Hardening</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Defensive Incident Triage</span>
                </div>
              </div>
            </div>

            {/* Career Focus as 4 Cards */}
            <div>
              <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">
                Core Career Focus Areas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PERSONAL_INFO.careerFocus.map((focus) => (
                  <div
                    key={focus.title}
                    className="p-5 rounded-xl bg-[#111827]/80 hover:bg-[#151f33] border border-slate-800 hover:border-cyan-500/30 transition-all duration-200 shadow-md group"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                        {iconMap[focus.icon]}
                      </div>
                      <h4 className="text-base font-semibold text-white font-mono group-hover:text-cyan-300 transition-colors">
                        {focus.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {focus.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
