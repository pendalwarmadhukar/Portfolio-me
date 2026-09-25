import React, { useEffect, useState } from 'react';
import { Certification } from '../types.ts';
import { X, ExternalLink, ShieldCheck, Award, Copy, Check, Download, Calendar, Tag, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  const handleCopyId = () => {
    if (cert.credentialId) {
      navigator.clipboard.writeText(cert.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0f172a] border border-cyan-500/40 shadow-2xl shadow-cyan-950/40 text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-7 py-4 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800">
          <div className="pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                <Award className="w-3 h-3 text-cyan-400" />
                <span>{cert.badgeLabel || cert.type}</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">{cert.issuer}</span>
            </div>
            <h3 id="cert-modal-title" className="text-lg sm:text-2xl font-bold text-white font-mono">
              {cert.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            aria-label="Close certificate modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Certificate Image Frame */}
          <div className="relative group rounded-xl border border-slate-800 bg-[#080d16] p-2 sm:p-3 overflow-hidden shadow-inner shadow-black/80">
            {cert.imageUrl ? (
              <div className="relative flex items-center justify-center rounded-lg overflow-hidden bg-slate-950">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full max-h-[60vh] object-contain rounded-lg transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-slate-900/50 rounded-lg">
                <Award className="w-12 h-12 text-cyan-400 mb-2" />
                <p className="text-sm text-slate-300">{cert.title}</p>
              </div>
            )}

            {/* Quick Actions Bar Overlay */}
            {cert.imageUrl && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Credential Document
                </span>
                <a
                  href={cert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Size Image</span>
                </a>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <Award className="w-3 h-3 text-cyan-400" />
                Issuer
              </div>
              <div className="text-sm font-semibold text-white">{cert.issuer}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-cyan-400" />
                Issue Date
              </div>
              <div className="text-sm font-semibold text-white">{cert.date || 'Verified'}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-cyan-400" />
                Category
              </div>
              <div className="text-sm font-semibold text-cyan-300">{cert.category || cert.type}</div>
            </div>
          </div>

          {/* Achievement / Points Card if exists */}
          {(cert.achievement || cert.points || cert.team) && (
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Key Achievement &amp; Performance
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
                {cert.achievement && <span className="font-semibold text-white">{cert.achievement}</span>}
                {cert.points && (
                  <span className="font-mono text-cyan-300">
                    Points: <strong>{cert.points}</strong>
                  </span>
                )}
                {cert.rank && (
                  <span className="text-slate-300">
                    Rank: <strong>{cert.rank}</strong>
                  </span>
                )}
                {cert.team && (
                  <span className="text-slate-300">
                    Team: <strong className="text-cyan-300">{cert.team}</strong>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Description &amp; Scope
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              {cert.description}
            </p>
          </div>

          {/* Topics Covered */}
          {cert.topics && cert.topics.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Skills &amp; Competencies Validated
              </h4>
              <div className="flex flex-wrap gap-2">
                {cert.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Credential ID row */}
          {cert.credentialId && (
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-400">Credential ID:</span>
                <span className="text-xs font-mono font-semibold text-slate-200">{cert.credentialId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Credential ID"
              >
                {copiedId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 bg-[#0f172a]/95 backdrop-blur-md border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authenticated Credential</span>
          </div>

          <div className="flex items-center gap-2.5">
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
              >
                <span>Verify on Credly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {cert.imageUrl && (
              <a
                href={cert.imageUrl}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
