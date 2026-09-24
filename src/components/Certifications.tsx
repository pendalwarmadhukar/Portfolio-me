import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data/portfolioData.ts';
import { Certification } from '../types.ts';
import { GraduationCap, ShieldCheck, Cloud, Award, ExternalLink, X, CheckCircle, ShieldAlert } from 'lucide-react';

export const Certifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-cyan-400" />;
      case 'CloudCheck':
        return <Cloud className="w-6 h-6 text-blue-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Award':
      default:
        return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  const getStatusBadge = (status: Certification['status']) => {
    switch (status) {
      case 'Verified Academic':
        return 'text-cyan-400 bg-cyan-950/50 border-cyan-500/30';
      case 'Active Credential':
        return 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30';
      case 'In Preparation':
        return 'text-amber-400 bg-amber-950/50 border-amber-500/30';
    }
  };

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d131f] relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            Qualifications & Learning Pathways
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Certifications & Academic Credentials
          </h2>
          <div className="h-0.5 w-12 bg-cyan-500 mt-3" />
          <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-xl">
            Verified academic milestones and hands-on laboratory specializations in security engineering and cloud defense.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#111827] border border-slate-800/90 shadow-lg hover:border-cyan-500/40 hover:shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                    {getBadgeIcon(cert.badgeIcon)}
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[11px] font-mono border ${getStatusBadge(cert.status)}`}>
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-mono group-hover:text-cyan-300 transition-colors mb-1.5">
                  {cert.title}
                </h3>

                <div className="text-xs text-slate-400 font-mono mb-3">
                  <span>{cert.issuer}</span>
                  {cert.date && (
                    <>
                      <span className="mx-2 text-slate-600">·</span>
                      <span className="text-slate-500">{cert.date}</span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Key Syllabus / Topics Preview */}
                <div className="space-y-1.5 mb-6">
                  {cert.topics.slice(0, 3).map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" />
                      <span className="truncate">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action / Verification link */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {cert.type}
                </span>

                <button
                  onClick={() => setActiveCert(cert)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#0f172a] border border-slate-700 p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  {getBadgeIcon(activeCert.badgeIcon)}
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase">
                    Official Verification Dossier
                  </span>
                  <h4 className="text-base font-bold text-white font-mono">
                    {activeCert.title}
                  </h4>
                </div>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="p-1.5 rounded-md text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-[#0a0e17] border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Issuing Body:</span>
                  <span className="text-slate-200">{activeCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Credential Classification:</span>
                  <span className="text-cyan-300">{activeCert.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-emerald-400">{activeCert.status}</span>
                </div>
                {activeCert.date && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timeline / Date:</span>
                    <span className="text-slate-200">{activeCert.date}</span>
                  </div>
                )}
              </div>

              <div>
                <span className="text-slate-400 uppercase tracking-wider block mb-2">
                  Verified Curricular Core:
                </span>
                <ul className="space-y-1.5">
                  {activeCert.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 font-sans text-xs">
                      <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-slate-300 font-sans text-xs leading-relaxed">
                <strong className="text-cyan-300 font-mono block mb-1">Candidate Note:</strong>
                {activeCert.verificationNote}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
