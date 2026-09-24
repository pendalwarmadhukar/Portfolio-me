import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '', compact = false }) => {
  const { language, setLanguage, isHindi } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-lg bg-slate-900/90 border border-slate-800 p-0.5 shadow-inner transition-colors ${className}`}
      role="group"
      aria-label="Language selection toggle"
    >
      <div className="flex items-center pl-2 pr-1 text-slate-400 pointer-events-none" aria-hidden="true">
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
          !isHindi
            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-pressed={!isHindi}
        aria-label="Switch to English"
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-2 py-1 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
          isHindi
            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-pressed={isHindi}
        aria-label="Switch to Hindi (हिन्दी)"
      >
        {compact ? 'HI' : 'हिन्दी'}
      </button>
    </div>
  );
};
