import React, { useEffect } from 'react';
import { X, Sparkles, Terminal, FileText } from 'lucide-react';
import { CyberVerse3DView } from './CyberVerse3DView.tsx';

interface CyberVerseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const CyberVerseModal: React.FC<CyberVerseModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenTerminal,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CyberVerse 3D Interactive Environment"
      className="fixed inset-0 z-50 flex flex-col bg-[#030712] text-white overflow-hidden animate-fadeIn"
    >
      {/* Top Bar Navigation */}
      <div className="relative z-30 px-4 sm:px-6 py-3 bg-[#050c1c] border-b border-cyan-500/30 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-sm font-bold tracking-wider text-cyan-300">
              CYBERVERSE 3D ENVIRONMENT
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            360° Recruiter Interactive Experience · Madhukar Pendalwar
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenTerminal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 hover:text-white hover:border-cyan-400 font-mono text-xs transition cursor-pointer"
            title="Launch Terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal [ ` ]</span>
          </button>

          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 font-mono text-xs transition cursor-pointer"
            title="Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-white transition cursor-pointer"
            title="Close 3D View (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-300 hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* Full 3D Interactive Viewport */}
      <div className="relative flex-1 min-h-0 w-full h-full overflow-hidden">
        <CyberVerse3DView
          isFullscreen={true}
          onOpenResume={onOpenResume}
          onOpenTerminal={onOpenTerminal}
        />
      </div>
    </div>
  );
};
