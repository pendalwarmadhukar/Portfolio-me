import React, { useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { X, Download, Printer, Shield, Mail, Github, Linkedin, ExternalLink, Globe } from 'lucide-react';
import { LeetCodeIcon } from './LeetCodeIcon.tsx';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { t, isHindi } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const resumeContent = `
MADHUKAR PENDALWAR
SOC Analyst Intern Candidate | B.Tech Cyber Security Student
Hyderabad, Telangana, India | 7032275226 | ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}
Portfolio: ${PERSONAL_INFO.portfolioUrl}
LeetCode: ${PERSONAL_INFO.leetcode}

PROFESSIONAL SUMMARY
Third-year B.Tech Computer Science and Engineering (Cyber Security) student seeking a SOC Analyst Intern role. Hands-on academic project experience in security-alert monitoring, Linux authentication-log review, network auditing, vulnerability assessment, and incident workflow documentation. Familiar with Linux/Kali Linux, networking, Nmap, Wireshark, Wazuh/Splunk fundamentals, Python, and cloud-security concepts. Interested in L1 alert triage, investigation, escalation, and defensive security operations.

EDUCATION
B.Tech, Computer Science and Engineering (Cyber Security), Third Year
Siddhartha Institute of Technology & Sciences, Hyderabad, Telangana
Expected Graduation: 2028 | CGPA: 6.56/10

TECHNICAL SKILLS
SOC & Blue Team: Security monitoring, alert triage, incident investigation, incident documentation, escalation, threat-detection fundamentals
Security Tools: Wazuh, Splunk (fundamentals), Wireshark, Nmap, Kali Linux, Git, GitHub
Systems & Networking: Linux, TCP/IP, SSH authentication logs, network security, Bash
Cloud & DevSecOps: AWS IAM, CloudTrail, S3, EC2, AWS CLI, Docker, Trivy, CI/CD security fundamentals
Programming: Python, C++, JavaScript, SQL | Data: Pandas, machine-learning fundamentals

SELECTED SECURITY PROJECTS
1. SentinelDesk — SOC Monitoring & Incident Response Dashboard
   Built a SOC dashboard prototype to review simulated security alerts, filter by severity, track investigation status, and document investigation and escalation workflows.
   GitHub: https://github.com/pendalwarmadhukar/SentinelDesk
   Demo: https://sentineldesk-soc-nu.vercel.app/

2. NetSentinel — Linux Host & Network Auditing
   Created a Bash-based utility using Nmap to audit hosts and identify exposed ports and services; reviewed Linux authentication logs for repeated SSH failures.
   GitHub: https://github.com/pendalwarmadhukar/NetSentinel

3. VulnRemedy AI — Vulnerability Findings & Remediation Workflow
   Built a workflow for authorised web-target scanning, severity-based finding management, remediation notes, and re-scan verification. AI-generated remediation changes are proposals for human review.
   GitHub: https://github.com/pendalwarmadhukar/VulnRemedy-AI

ACADEMIC / INDUSTRY-ORIENTED PROJECT TRAINING
Vulnerability Assessment Training (Third Year): Practised identifying and analysing potential security weaknesses in systems and applications.
Blue Team Project Training (Second Year): Applied defensive-security concepts including security monitoring and threat detection.

CERTIFICATIONS & SECURITY LEARNING
IBM SkillsBuild — Cybersecurity Fundamentals
TryHackMe — Advent of Cyber 2025 (24 challenges completed)
TryHackMe — Love at First Breach CTF (600 points; Rank 228)
TryHackMe — The Cold Start CTF (2,160 points)
TryHackMe — Hacker Holidays (Participation)

ADDITIONAL ACHIEVEMENT
LeetCode: 390+ problems solved | C++ problem-solving practice.
    `.trim();;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Madhukar_Pendalwar_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0f172a] border border-slate-700 shadow-2xl text-left flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <Shield className="w-4 h-4" />
            <span>{isHindi ? 'मधुकर पेंडलवार · आधिकारिक बायोडाटा' : 'Madhukar Pendalwar · Official Resume Dossier'}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download={PERSONAL_INFO.resumeFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              title="Download Original PDF Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isHindi ? 'पीडीएफ डाउनलोड' : 'Download PDF'}</span>
            </a>
            <button
              onClick={handleDownloadText}
              className="btn-secondary hidden sm:inline-flex"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isHindi ? 'डाउनलोड (.txt)' : 'Download (.txt)'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-ghost hidden sm:inline-flex"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHindi ? 'प्रिंट करें' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="btn-icon"
              aria-label={t.resume.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-6 sm:p-10 bg-[#0d131f] text-slate-200 space-y-8 font-sans">
          {/* Header Block */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono mb-1">
                Madhukar Pendalwar
              </h1>
              <p className="text-sm font-semibold text-cyan-400 font-mono mb-3">
                {isHindi ? 'तृतीय वर्ष बी.टेक साइबर सुरक्षा छात्र' : '3rd-Year B.Tech Cyber Security Student'}
              </p>
              <p className="text-xs text-slate-400 font-mono mb-4 max-w-xl">
                {isHindi
                  ? 'लक्ष्य: एसओसी विश्लेषक | साइबर सुरक्षा पेशेवर | क्लाउड सुरक्षा | ब्लू टीम | डिजिटल फोरेंसिक'
                  : 'Aspiring: SOC Analyst | Cybersecurity Professional | Cloud Security | Blue Team | Cyber Crime Investigation | Digital Forensics'}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {PERSONAL_INFO.email}
                </span>
                <a
                  href={PERSONAL_INFO.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  portfolio-madhukar.vercel.app
                </a>
                <span className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  github.com/pendalwarmadhukar
                </span>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  linkedin.com/in/madhukar-pendalwar-2a5746348/
                </a>
                <a
                  href={PERSONAL_INFO.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
                >
                  <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                  leetcode.com/u/Pendalwar_Madhukar126
                </a>
              </div>
            </div>

            {/* Official Photo Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-28 rounded-xl overflow-hidden border border-cyan-500/40 shadow-md bg-slate-900 flex items-center justify-center">
                <img
                  src="/profile.png"
                  alt="Madhukar Pendalwar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackUsed) {
                      img.dataset.fallbackUsed = '1';
                      img.src = '/src/assets/images/profile.png';
                    } else {
                      // Show initials placeholder
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent && !parent.querySelector('.initials-fallback')) {
                        const div = document.createElement('div');
                        div.className = 'initials-fallback w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900 to-slate-900 text-cyan-300 font-mono font-bold text-2xl';
                        div.textContent = 'MP';
                        parent.appendChild(div);
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 mb-2 font-bold">
              {isHindi ? 'व्यावसायिक सारांश' : 'Professional Summary'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isHindi ? t.about.bioP1 + ' ' + t.about.bioP2 : PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 mb-2 font-bold">
              {isHindi ? 'शिक्षा' : 'Education'}
            </h2>
            <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">
                  {isHindi ? 'बैचलर ऑफ टेक्नोलॉजी (बी.टेक) - साइबर सुरक्षा' : 'Bachelor of Technology (B.Tech) in Cyber Security'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isHindi ? 'इंजीनियरिंग विश्वविद्यालय पाठ्यक्रम · तृतीय वर्ष स्नातक' : 'Siddhartha Institute of Technology & Sciences, Hyderabad · 3rd Year Undergraduate · CGPA: 6.56/10'}
                </p>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {isHindi
                    ? 'प्रमुख पाठ्यक्रम: नेटवर्क सुरक्षा, ऑपरेटिंग सिस्टम, क्रिप्टोग्राफी, डेटाबेस सुरक्षा, डिजिटल फोरेंसिक, लिनक्स प्रशासन'
                    : 'Coursework: Network Security, Operating Systems, Cryptography, Database Security, Digital Forensics, Linux Administration'}
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 shrink-0 ml-3">
                {isHindi ? '2023 - वर्तमान' : 'Expected Graduation: 2028'}
              </span>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 mb-2.5 font-bold">
              {isHindi ? 'प्रमुख तकनीकी क्षमताएं' : 'Core Technical Competencies'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="p-3.5 rounded-lg bg-[#111827] border border-slate-800/80">
                  <div className="font-mono text-white font-semibold mb-1 text-xs">
                    {t.skills.categories[cat.title as keyof typeof t.skills.categories] || cat.title}
                  </div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    {cat.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 mb-2.5 font-bold">
              {isHindi ? 'व्यावहारिक सुरक्षा प्रोजेक्ट्स' : 'Practical Security Projects'}
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-[#111827] border border-slate-800">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white font-mono">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    {proj.shortDescription}
                  </p>
                  <div className="text-xs font-mono text-slate-400">
                    <strong className="text-slate-300">{isHindi ? 'पाइपलाइन: ' : 'Pipeline: '}</strong>
                    {proj.architectureSteps.join(' → ')}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1 text-xs font-mono text-slate-400">
                    {proj.technologies.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 mb-2.5 font-bold">
              {isHindi ? 'प्रमाणपत्र और तकनीकी मील के पत्थर' : 'Certifications & Technical Milestones'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="p-3.5 rounded-lg bg-[#111827] border border-slate-800 text-xs">
                  <div className="font-mono text-white font-semibold">
                    {cert.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {cert.issuer} {cert.date ? `· ${cert.date}` : ''}
                  </div>
                  <div className="text-xs font-mono text-cyan-400 mt-1">
                    {cert.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
