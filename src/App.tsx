import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Projects } from './components/Projects.tsx';
import { Certifications } from './components/Certifications.tsx';
import { GitHubSection } from './components/GitHubSection.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { CyberTerminalModal } from './components/CyberTerminalModal.tsx';
import { ScrollToTopButton } from './components/ScrollToTopButton.tsx';
import { ScrollFadeIn } from './components/ScrollFadeIn.tsx';

// Lazy-load the heavy 3D/Three.js and data-intensive sections
// This keeps the initial bundle small for faster first paint
const Hero = lazy(() => import('./components/Hero.tsx').then((m) => ({ default: m.Hero })));
const SocOperations = lazy(() =>
  import('./components/SocOperations.tsx').then((m) => ({ default: m.SocOperations }))
);
const LeetCodeSection = lazy(() =>
  import('./components/LeetCodeSection.tsx').then((m) => ({ default: m.LeetCodeSection }))
);

// Minimal dark-themed skeleton used while lazy sections load
const SectionFallback: React.FC<{ minH?: string }> = ({ minH = '400px' }) => (
  <div className="flex items-center justify-center w-full" style={{ minHeight: minH }}>
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
      <span className="text-xs font-mono text-slate-500">Loading...</span>
    </div>
  </div>
);

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keyboard shortcut: Backtick (`) toggles terminal when not typing in an input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || (e.ctrlKey && e.key === '~')) {
        const target = e.target as HTMLElement;
        const isInputField =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable;
        if (!isInputField) {
          e.preventDefault();
          setTerminalOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Top Navbar */}
        <Navbar
          onOpenResume={() => setResumeOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Main Sections */}
        <main className="flex-grow">
          <Suspense fallback={<SectionFallback minH="100vh" />}>
            <Hero onOpenResume={() => setResumeOpen(true)} />
          </Suspense>

          <ScrollFadeIn>
            <About />
          </ScrollFadeIn>

          <ScrollFadeIn>
            <Skills />
          </ScrollFadeIn>

          <ScrollFadeIn>
            <Projects />
          </ScrollFadeIn>

          <ScrollFadeIn>
            <Suspense fallback={<SectionFallback />}>
              <SocOperations />
            </Suspense>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <Certifications />
          </ScrollFadeIn>

          <ScrollFadeIn>
            <Suspense fallback={<SectionFallback minH="600px" />}>
              <LeetCodeSection />
            </Suspense>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <GitHubSection />
          </ScrollFadeIn>

          <ScrollFadeIn>
            <Contact onOpenResume={() => setResumeOpen(true)} />
          </ScrollFadeIn>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Quick Terminal Launcher (Bottom-Left) */}
        <button
          type="button"
          onClick={() => setTerminalOpen((prev) => !prev)}
          className="fixed bottom-6 left-6 z-40 group flex items-center gap-2 px-3 py-2 rounded-full bg-[#111827]/90 hover:bg-[#152238] border border-cyan-500/40 hover:border-cyan-400 shadow-xl shadow-cyan-950/40 backdrop-blur-md text-cyan-400 hover:text-white transition-all cursor-pointer font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          title="Toggle Cyber Terminal [ ` ]"
          aria-label="Toggle Cyber Terminal"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-cyan-400 font-bold">&gt;_</span>
          <span className="hidden sm:inline text-slate-300">Terminal</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-slate-800 text-[10px] text-cyan-300 rounded border border-slate-700">
            `
          </kbd>
        </button>

        {/* Floating Scroll to Top Action (Bottom-Right) */}
        <ScrollToTopButton />

        {/* Interactive Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />

        {/* Interactive Cyber Terminal CLI Modal */}
        <CyberTerminalModal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onOpenResume={() => setResumeOpen(true)}
        />
      </div>
    </LanguageProvider>
  );
}
