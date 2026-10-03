import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, FileText, Download, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { LanguageToggle } from './LanguageToggle.tsx';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { LeetCodeIcon } from './LeetCodeIcon.tsx';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Primary nav links - shown in desktop bar
  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.soc, href: '#soc' },
    { label: t.nav.certifications, href: '#certifications' },
    { label: t.nav.leetcode, href: '#leetcode', isLeetCode: true },
    { label: t.nav.github, href: '#github' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy
      const sections = navLinks.map(l => l.href.substring(1));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      role="banner"
      aria-label="Site header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0a0e17]/95 backdrop-blur-xl border-b border-cyan-950/40 shadow-[0_16px_30px_rgba(2,6,23,0.35)] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">

          {/* Zone 1: Logo / Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md shrink-0"
            aria-label="Madhukar Pendalwar - Home"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/60 bg-slate-900 shrink-0 group-hover:border-cyan-300 transition-all duration-300 shadow-[0_0_18px_rgba(34,211,238,0.28)] group-hover:scale-105">
              <img
                src="/profile.png"
                alt="Madhukar Pendalwar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap hidden sm:block">
              Madhukar Pendalwar
            </span>
          </a>

          {/* Zone 2: Desktop Navigation Links — shown at xl (1280px+), hidden below */}
          <nav aria-label="Primary navigation" className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link: any) => {
              const isActive = activeSection === link.href.substring(1);
              const isLeet = link.isLeetCode;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`btn-nav flex items-center gap-1 ${isActive ? 'btn-nav-active' : ''} ${
                    isLeet ? 'leetcode-nav-link' : ''
                  }`}
                >
                  {isLeet && <LeetCodeIcon className="w-3 h-3 text-amber-400 shrink-0" />}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 2b: Compact nav for lg screens (1024–1279px) — shows icons or shorter labels */}
          <nav aria-label="Compact navigation" className="hidden lg:flex xl:hidden items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link: any) => {
              const isActive = activeSection === link.href.substring(1);
              const isLeet = link.isLeetCode;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  title={link.label}
                  className={`btn-nav-compact flex items-center gap-1 ${isActive ? 'btn-nav-active' : ''} ${
                    isLeet ? 'leetcode-nav-link' : ''
                  }`}
                >
                  {isLeet && <LeetCodeIcon className="w-3 h-3 text-amber-400 shrink-0" />}
                  <span className="text-[11px]">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions + Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            {/* Resume Action Group */}
            <div className="flex items-center gap-1">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download={PERSONAL_INFO.resumeFilename}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs px-3 py-2"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{t.nav.resume}</span>
              </a>
              <button
                type="button"
                onClick={onOpenResume}
                className="btn-icon"
                title="Preview Resume Dossier"
                aria-label="Preview Resume Dossier"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button — shown below lg (1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer — visible below lg */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d131f]/98 border-b border-cyan-950/60 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          {/* Language + Close row */}
          <div className="pt-1 pb-2 border-b border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Language / भाषा</span>
            <LanguageToggle compact={false} />
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-1 pt-1">
            {navLinks.map((link: any) => {
              const isActive = activeSection === link.href.substring(1);
              const isLeet = link.isLeetCode;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/60 font-semibold'
                      : isLeet
                      ? 'text-amber-300 hover:text-amber-200 hover:bg-amber-950/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {isLeet && <LeetCodeIcon className="w-4 h-4 text-amber-400 shrink-0" />}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Resume Actions */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download={PERSONAL_INFO.resumeFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn-icon"
              title="Preview Dossier"
              aria-label="Preview Resume Dossier"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
