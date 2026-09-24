import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../data/portfolioData.ts';
import { Award, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

const FILTERS = ['All', 'Certifications', 'CTF', 'Challenges', 'Participation'] as const;

export const Certifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'All') return CERTIFICATIONS;
    return CERTIFICATIONS.filter((cert) => cert.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-slate-800/60 bg-[#0d131f] px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center lg:text-left">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-cyan-400 lg:justify-start">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Security Credentials</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Certifications &amp; Cybersecurity Achievements
          </h2>

          <div className="mx-auto mt-4 h-0.5 w-16 bg-cyan-500 lg:mx-0" />

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 lg:mx-0">
            “Verified certifications, cybersecurity challenges, and practical security achievements.”
          </p>
        </div>

        <div className="mb-8 overflow-x-auto pb-1">
          <div className="flex min-w-max items-center justify-center gap-2 lg:justify-start">
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-lg border px-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.14em] transition-all duration-200 ${
                    isActive
                      ? 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300 shadow-lg shadow-cyan-950/30'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-300'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCerts.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -8, rotateX: 3, rotateY: -3, transition: { duration: 0.2 } }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group relative rounded-[28px] border border-slate-800/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.9))] p-4 shadow-[0_18px_45px_rgba(2,6,23,0.45)] backdrop-blur-sm hover:border-cyan-500/40 hover:shadow-[0_24px_55px_rgba(34,211,238,0.12)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),transparent_42%)] opacity-80" />

              <div className="relative">
                <div className="relative h-56 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 shadow-inner">
                  {cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),transparent_50%),linear-gradient(135deg,#020617,#111827_45%,#0f172a)] p-6 text-center">
                      <div className="mb-3 rounded-full border border-cyan-500/30 bg-slate-900/80 p-3 text-cyan-300">
                        <Award className="h-7 w-7" />
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-cyan-300/80">
                        {cert.badgeLabel || cert.type}
                      </div>
                      <div className="mt-4 text-lg font-bold text-white">{cert.title}</div>
                    </div>
                  )}

                  <div className="absolute left-3 top-3 rounded-full border border-cyan-500/30 bg-slate-950/80 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-sm">
                    {cert.badgeLabel || cert.type}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-950/40 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.16em] text-cyan-300">
                      {cert.type}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{cert.title}</h3>

                  <div className="mt-3 space-y-2.5 text-[12px] text-slate-300">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Issuer</span>
                      <span className="font-medium text-slate-200">{cert.issuer}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Issued</span>
                      <span className="font-medium text-slate-200">{cert.date}</span>
                    </div>

                    {cert.achievement && (
                      <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 px-3 py-2 text-cyan-100">
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">
                          Achievement
                        </span>
                        <div className="mt-1 font-medium">{cert.achievement}</div>
                      </div>
                    )}

                    {cert.points && (
                      <div className="pt-1 text-sm text-slate-200">
                        <span className="font-mono text-cyan-300">{cert.points}</span>
                        {cert.rank && <span className="ml-2 text-slate-400">| Rank {cert.rank}</span>}
                      </div>
                    )}

                    {cert.team && (
                      <div className="text-xs text-slate-300">
                        Team: <span className="text-cyan-300">{cert.team}</span>
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{cert.description}</p>

                  {cert.credentialId && (
                    <div className="mt-3 text-[11px] font-mono text-slate-400">
                      ID: <span className="text-slate-200">{cert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                    {cert.category}
                  </span>

                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.12em] text-cyan-300 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-900/50 hover:text-cyan-200"
                    >
                      Verify Certificate
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500">
                      <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
