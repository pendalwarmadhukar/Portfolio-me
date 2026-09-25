import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Mail, Linkedin, Github, FileText, Send, CheckCircle2, Copy, Check, Download, AlertCircle, Loader2, Globe, ExternalLink } from 'lucide-react';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const formspreeId = PERSONAL_INFO.formspreeId || (import.meta as any).env?.VITE_FORMSPREE_ID;

    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _replyto: formData.email,
            message: formData.message,
            _subject: `New Cybersecurity Portfolio Contact from ${formData.name}`
          })
        });

        if (response.ok) {
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
        } else {
          const resData = await response.json().catch(() => ({}));
          throw new Error(resData.error || 'Submission to email service failed. Please try emailing directly.');
        }
      } catch (err: any) {
        console.error('Contact form submission error:', err);
        setErrorMessage(err.message || 'Unable to deliver message automatically. You can send it directly via email.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback: direct mailto route straight to Madhukar's inbox
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Sender: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.open(mailtoUrl, '_blank');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d131f] relative border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            {t.contact.tag}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.contact.title}
          </h2>
          <div className="h-0.5 w-12 bg-cyan-500 mt-3 sm:mx-0 mx-auto" />
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card with Quick Copy */}
            <div className="p-5 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmailToClipboard}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-center gap-3 group"
            >
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 group-hover:border-blue-500/40 transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">LinkedIn</div>
                <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  linkedin.com/in/pendalwarmadhukar
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-center gap-3 group"
            >
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">GitHub</div>
                <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  github.com/pendalwarmadhukar
                </div>
              </div>
            </a>

            {/* Live Portfolio */}
            <a
              href={PERSONAL_INFO.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/30 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Live Portfolio</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    portfolio-madhukar.vercel.app
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </a>

            {/* Resume Button Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/40 via-[#111827] to-slate-900 border border-cyan-500/40 hover:border-cyan-400 transition-all space-y-3.5 shadow-lg shadow-cyan-950/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400">{t.contact.resumeCardTitle}</div>
                  <div className="text-sm font-semibold text-white">
                    Madhukar_Pendalwar_Resume.pdf
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  download={PERSONAL_INFO.resumeFilename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm font-semibold"
                  title="Download Resume PDF"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-500/40 transition-colors cursor-pointer"
                  title="Preview Dossier"
                >
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111827] border border-slate-800 shadow-xl">
              <h3 className="text-lg font-bold text-white font-mono mb-2">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {t.contact.formDesc}
              </p>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white font-mono">
                    {t.contact.successTitle}
                  </h4>
                  <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
                    {t.contact.successDesc}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div>{errorMessage}</div>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(
                            formData.name
                          )}&body=${encodeURIComponent(
                            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
                          )}`}
                          className="inline-flex items-center gap-1 font-semibold text-cyan-300 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Click here to send directly via email</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0a0e17] border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0a0e17] border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      {t.contact.msgLabel}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={t.contact.msgPlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0a0e17] border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-mono font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.sendBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
