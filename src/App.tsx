import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Projects } from './components/Projects.tsx';
import { SocOperations } from './components/SocOperations.tsx';
import { Certifications } from './components/Certifications.tsx';
import { GitHubSection } from './components/GitHubSection.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { ScrollToTopButton } from './components/ScrollToTopButton.tsx';
import { ScrollFadeIn } from './components/ScrollFadeIn.tsx';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e17] text-white flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Top Navbar */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        {/* Main Sections */}
        <main className="flex-grow">
          <Hero onOpenResume={() => setResumeOpen(true)} />

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
            <SocOperations />
          </ScrollFadeIn>

          <ScrollFadeIn>
            <Certifications />
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

