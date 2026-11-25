import React from 'react';
import { X } from 'lucide-react';
import { CyberVerse3DView } from './CyberVerse3DView.tsx';
import { useDialog } from '../hooks/useDialog.ts';

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
  const dialogRef = useDialog(isOpen, onClose);
  if (!isOpen) return null;

  const modalH = Math.min(Math.max(window.innerHeight - 120, 480), 700);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="CyberVerse 3D Environment"
      className="verse-dialog"
      style={{ padding: 0, overflow: 'hidden', background: '#04091a' }}
    >
      {/* Header */}
      <header className="verse-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #1e3a5f' }}>
        <div>
          <h2 id="verse-title" style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: 15, margin: 0 }}>
            CYBERVERSE 3D ENVIRONMENT
          </h2>
          <p style={{ color: '#64748b', fontFamily: 'monospace', fontSize: 11, margin: 0 }}>
            360° Recruiter Interactive Experience · Madhukar Pendalwar
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close CyberVerse"
          style={{ background: 'none', border: '1px solid #334155', borderRadius: 8, color: '#94a3b8', cursor: 'pointer', padding: '4px 8px', display: 'flex', alignItems: 'center' }}
        >
          <X size={18} />
        </button>
      </header>

      {/* 3D Canvas — full width, explicit pixel height */}
      <div style={{ width: '100%' }}>
        <CyberVerse3DView
          onOpenResume={onOpenResume}
          onOpenTerminal={onOpenTerminal}
          isFullscreen={true}
          height={modalH}
        />
      </div>
    </div>
  );
};
