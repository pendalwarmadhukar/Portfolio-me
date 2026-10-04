import React, { useState, Suspense, lazy } from 'react';
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
import { ScrollToTopButton } from './components/ScrollToTopButton.tsx';
import { ScrollFadeIn } from './components/ScrollFadeIn.tsx';

// Lazy-load the heavy 3D/Three.js and data-intensive sections
// This keeps the initial bundle small for faster first paint
const Hero = lazy(() => import('./components/Hero.tsx').then(m => ({ default: m.Hero })));
const SocOperations = lazy(() => import('./components/SocOperations.tsx').then(m => ({ default: m.SocOperations })));
const LeetCodeSection = lazy(() => import('./components/LeetCodeSection.tsx').then(m => ({ default: m.LeetCodeSection })));

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

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Top Navbar */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

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

        {/* Floating Scroll to Top Action */}
        <ScrollToTopButton />

        {/* Interactive Resume Modal */}
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}

