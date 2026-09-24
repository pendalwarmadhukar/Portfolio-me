import React, { useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { X, Download, Printer, Shield, Mail, Github, Linkedin, ExternalLink, Globe } from 'lucide-react';

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
===================================================================
MADHUKAR PENDALWAR - RESUME
3rd-Year B.Tech Cyber Security Student
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}
Portfolio: ${PERSONAL_INFO.portfolioUrl}
===================================================================

CAREER OBJECTIVE:
Aspiring SOC Analyst, Cloud Security Specialist, and Blue Team defender with strong foundations in AWS infrastructure, incident triage, DevSecOps automation, Linux systems, and cyber investigation.

EDUCATION:
Bachelor of Technology (B.Tech) in Cyber Security (3rd Year)
Academic Standing: Good standing with focus on practical security laboratory engineering.

TECHNICAL SKILLS:
- SOC & Security: Incident Response, Security Monitoring, Alert Triage, Information Security Engineering
- Cloud Security: AWS (IAM, CloudTrail, S3, EC2, Security Groups, VPC NACLs, AWS CLI)
- Security Tools: Splunk, Wazuh, Wireshark, Nmap, Docker, Trivy, GitHub
- Networking & OS: Linux (Ubuntu/Debian, Kali Linux), TCP/IP Protocols, Network Security, Weblogs
- DevSecOps: CI/CD Pipeline Security, Docker Container Hardening, Trivy Vulnerability Scanning
- Languages & Development: Python, C++, C, Java, C#, JavaScript, SQL, HTML, CSS, Node.js, React.js, Flask
- Data & AI: Machine Learning, Pandas, Data Analysis

KEY PROJECTS:
1. CloudShield (Cloud Security)
   AWS-focused security hardening framework utilizing AWS CLI, least-privilege IAM policies, S3 encryption, and hardened EC2 security groups.
   Architecture: AWS Cloud -> IAM -> EC2 -> S3 -> Security Controls

2. AWS Cloud Security Monitoring and Alerting System
   Proactive audit framework streaming AWS CloudTrail event logs to metric filters and Amazon SNS alarm notifications.
   Architecture: EC2 -> CloudTrail -> Monitoring -> Detection -> SNS Alert

3. DevSecOps Secure CI/CD Pipeline with Trivy Security Scanning
   Shift-left vulnerability assessment integrating Trivy container scanning into GitHub Actions to block high/critical CVE deployments.
   Architecture: Code -> GitHub -> Build -> Docker -> Trivy Scan -> Security Validation -> Deployment

4. NetSentinel (Network Security)
   Script-driven host & network security auditing tool in Bash and Nmap for exposure identification and auth log brute-force detection.
   Architecture: Network -> Scan -> Exposure Analysis -> Log Analysis -> Risk Identification

5. Credit Card Fraud Detection (Machine Learning & Security)
   Predictive ML model handling extreme class imbalance to identify fraudulent transaction patterns and generate risk scoring.

6. SpamGuard-AI (AI / Security)
   Natural language classification pipeline in Python detecting deceptive and phishing text payloads.

CERTIFICATIONS & VERIFIED PATHWAYS:
- B.Tech Cyber Security (3rd Year Academic Curriculum)
- Cloud & AWS Security Foundations (Hands-on Coursework)
- Container Security & DevSecOps Practices
- CompTIA Security+ / Blue Team Analyst Pathway (In Preparation)
===================================================================
    `.trim();

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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-sm cursor-pointer"
              title="Download Original PDF Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isHindi ? 'पीडीएफ डाउनलोड' : 'Download PDF'}</span>
            </a>
            <button
              onClick={handleDownloadText}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isHindi ? 'डाउनलोड (.txt)' : 'Download (.txt)'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHindi ? 'प्रिंट करें' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
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
                  madhukar-cybersecurity-alpha.vercel.app
                </a>
                <span className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  github.com/pendalwarmadhukar
                </span>
                <span className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  linkedin.com/in/pendalwarmadhukar
                </span>
              </div>
            </div>

            {/* Official Photo Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-28 rounded-xl overflow-hidden border border-cyan-500/40 shadow-md bg-slate-900">
                <img
                  src="/src/assets/images/student_suit_portrait_1790238192156.jpg"
                  alt="Madhukar Pendalwar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              {isHindi ? 'व्यावसायिक सारांश' : 'Professional Summary'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isHindi ? t.about.bioP1 + ' ' + t.about.bioP2 : PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              {isHindi ? 'शिक्षा' : 'Education'}
            </h2>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">
                  {isHindi ? 'बैचलर ऑफ टेक्नोलॉजी (बी.टेक) - साइबर सुरक्षा' : 'Bachelor of Technology (B.Tech) in Cyber Security'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isHindi ? 'इंजीनियरिंग विश्वविद्यालय पाठ्यक्रम · तृतीय वर्ष स्नातक' : 'Engineering University Curriculum · 3rd Year Undergraduate'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  {isHindi
                    ? 'प्रमुख पाठ्यक्रम: नेटवर्क सुरक्षा, ऑपरेटिंग सिस्टम, क्रिप्टोग्राफी, डेटाबेस सुरक्षा, डिजिटल फोरेंसिक, लिनक्स प्रशासन'
                    : 'Coursework: Network Security, Operating Systems, Cryptography, Database Security, Digital Forensics, Linux Administration'}
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 shrink-0 ml-3">
                {isHindi ? '2023 - वर्तमान' : '2023 - Present'}
              </span>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2.5 font-bold">
              {isHindi ? 'प्रमुख तकनीकी क्षमताएं' : 'Core Technical Competencies'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="p-3 rounded-lg bg-[#111827] border border-slate-800/80">
                  <div className="font-mono text-white font-semibold mb-1 text-[11px]">
                    {t.skills.categories[cat.title as keyof typeof t.skills.categories] || cat.title}
                  </div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">
                    {cat.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2.5 font-bold">
              {isHindi ? 'व्यावहारिक सुरक्षा प्रोजेक्ट्स' : 'Practical Security Projects'}
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white font-mono">
                      {proj.title}
                    </h3>
                    <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-slate-900">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    {proj.shortDescription}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400">
                    <strong className="text-slate-300">{isHindi ? 'पाइपलाइन: ' : 'Pipeline: '}</strong>
                    {proj.architectureSteps.join(' → ')}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1 text-[10px] font-mono text-slate-500">
                    {proj.technologies.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2.5 font-bold">
              {isHindi ? 'प्रमाणपत्र और तकनीकी मील के पत्थर' : 'Certifications & Technical Milestones'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="p-3 rounded-lg bg-[#111827] border border-slate-800 text-xs">
                  <div className="font-mono text-white font-semibold">
                    {cert.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {cert.issuer} {cert.date ? `· ${cert.date}` : ''}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 mt-1">
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
