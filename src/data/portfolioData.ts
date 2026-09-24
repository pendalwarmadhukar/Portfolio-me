import { Project, SkillCategory, SocAlert, Certification, GitHubRepo } from '../types.ts';

export const PERSONAL_INFO = {
  name: "Madhukar Pendalwar",
  role: "B.Tech Cyber Security Student (3rd Year)",
  heroRoleLine: "Cybersecurity | SOC & Blue Team | Cloud Security",
  tagline: "“Building secure systems and investigating digital threats.”",
  secondaryTagline: "SOC & Blue Team • Cloud Security • Digital Forensics • Cyber Investigation",
  email: "madhukarpendalwar43@gmail.com",
  github: "https://github.com/pendalwarmadhukar",
  githubUsername: "pendalwarmadhukar",
  linkedin: "https://www.linkedin.com/in/pendalwarmadhukar", // standard profile link
  resumeUrl: "/Download%20Resume/Madhukar_Pendalwar_Cybersecurity_Resume.pdf",
  resumeFilename: "Madhukar_Pendalwar_Cybersecurity_Resume.pdf",
  formspreeId: (import.meta as any).env?.VITE_FORMSPREE_ID || "",
  bio: "I am a 3rd-year B.Tech Cyber Security student with a strong interest in Cybersecurity, SOC & Blue Team operations, Cloud Security, Cyber Crime Investigation, and Digital Forensics.\n\nI focus on building practical security projects involving AWS security, security monitoring, Linux, networking, DevSecOps, and cybersecurity analysis.",
  careerFocus: [
    {
      title: "SOC & Blue Team",
      description: "Security monitoring, alert analysis, investigation and incident response.",
      icon: "ShieldAlert",
      accent: "cyan"
    },
    {
      title: "Cloud Security",
      description: "AWS security, IAM, CloudTrail, EC2, S3 and secure configurations.",
      icon: "Cloud",
      accent: "blue"
    },
    {
      title: "Cyber Investigation",
      description: "Cybersecurity investigation and analysis of suspicious activities.",
      icon: "Search",
      accent: "teal"
    },
    {
      title: "Digital Forensics",
      description: "Computer forensics and digital evidence concepts.",
      icon: "HardDrive",
      accent: "emerald"
    }
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "SOC & Cybersecurity",
    icon: "Shield",
    skills: [
      "Cybersecurity",
      "SOC & Blue Team",
      "Information Security Engineering",
      "Security Monitoring",
      "Incident Response",
      "Ethical Hacking",
      "Internet Security"
    ]
  },
  {
    title: "Cloud Security",
    icon: "Cloud",
    skills: [
      "Amazon Web Services (AWS)",
      "Cloud Security",
      "AWS IAM",
      "AWS CloudTrail",
      "Amazon S3",
      "Amazon EC2",
      "AWS CLI",
      "Security Groups",
      "Role-Based Access Control (RBAC)"
    ]
  },
  {
    title: "Networking & Linux",
    icon: "Terminal",
    skills: [
      "Linux",
      "Kali Linux",
      "TCP/IP",
      "Network Security",
      "Weblogs"
    ]
  },
  {
    title: "Security Tools",
    icon: "Wrench",
    skills: [
      "Splunk",
      "Wazuh",
      "Wireshark",
      "Nmap",
      "Docker",
      "Trivy",
      "GitHub"
    ]
  },
  {
    title: "DevSecOps",
    icon: "GitBranch",
    skills: [
      "DevSecOps",
      "CI/CD",
      "Docker",
      "Trivy",
      "GitHub",
      "Version Control"
    ]
  },
  {
    title: "Programming & Development",
    icon: "Code2",
    skills: [
      "Python",
      "C++",
      "C",
      "Java",
      "C#",
      "JavaScript",
      "SQL",
      "HTML",
      "CSS",
      "Node.js",
      "React.js",
      "MongoDB",
      "Flask"
    ]
  },
  {
    title: "Data & AI",
    icon: "BrainCircuit",
    skills: [
      "Machine Learning",
      "Pandas",
      "Data Analysis"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "cloudshield",
    title: "CloudShield",
    category: "Cloud Security",
    shortDescription: "An AWS-focused cloud security project designed around secure cloud configuration, IAM, encryption and security best practices.",
    overview: "CloudShield is an architectural security hardening initiative tailored for AWS environments. It implements least-privilege identity access management (IAM), automated encryption across storage repositories, and continuous security compliance verification.",
    problemStatement: "Cloud misconfigurations and over-privileged IAM policies represent the primary vector for unauthorized data exposure in modern enterprise cloud footprints.",
    solution: "Engineered a baseline configuration framework utilizing AWS CLI, tailored IAM role hierarchies with strict RBAC boundaries, client-side & server-side S3 encryption, and hardened EC2 security groups with restricted ingress vectoring.",
    technologies: ["AWS", "IAM", "S3", "EC2", "AWS CLI"],
    architectureSteps: [
      "AWS Cloud",
      "IAM",
      "EC2",
      "S3",
      "Security Controls"
    ],
    keyFeatures: [
      "Least-privilege IAM policies with zero wildcard administrative delegation",
      "Automated S3 bucket encryption (SSE-S3 / SSE-KMS) and public access blocking",
      "Hardened EC2 security group rules eliminating default open port 22/3389 exposures",
      "Scripted AWS CLI audit routines for identity validation and compliance assessment"
    ],
    githubUrl: "https://github.com/pendalwarmadhukar/CloudShield",
    imageFallbackGradient: "from-sky-950 via-slate-900 to-cyan-950",
    customVisualType: "cloudshield"
  },
  {
    id: "aws-cloud-security-monitoring",
    title: "AWS Cloud Security Monitoring and Alerting System",
    category: "AWS Security & Monitoring",
    shortDescription: "A cloud security monitoring system focused on AWS activity monitoring, security controls and alert notifications.",
    overview: "A proactive cloud infrastructure monitoring framework designed to capture administrative API calls, policy modifications, and suspicious resource provisioning across an AWS environment in near real-time.",
    problemStatement: "Organizations frequently lack real-time visibility into unauthorized configuration drifts and anomalous API interactions within their cloud workloads.",
    solution: "Configured AWS CloudTrail centralized audit logging streamed into metric filters and alarm thresholds that trigger Amazon SNS alert notifications directly to security personnel.",
    technologies: ["Amazon EC2", "AWS IAM", "Security Groups", "AWS CloudTrail", "Amazon SNS", "Linux"],
    architectureSteps: [
      "EC2",
      "CloudTrail",
      "Monitoring",
      "Detection",
      "SNS Alert"
    ],
    keyFeatures: [
      "Centralized event auditing across multi-region infrastructure using AWS CloudTrail",
      "Automated detection filters for sensitive actions (e.g. root login, security group changes)",
      "High-priority notification distribution through Amazon SNS email and webhook topics",
      "Linux-based log extraction and event triage scripts for security analysts"
    ],
    githubUrl: "https://github.com/pendalwarmadhukar",
    imageFallbackGradient: "from-blue-950 via-slate-900 to-indigo-950",
    customVisualType: "aws-monitoring"
  },
  {
    id: "devsecops-trivy-pipeline",
    title: "DevSecOps Secure CI/CD Pipeline with Trivy Security Scanning",
    category: "DevSecOps",
    shortDescription: "A secure CI/CD pipeline integrating container security scanning using Trivy.",
    overview: "An automated DevSecOps integration that introduces shift-left vulnerability assessment into the software delivery pipeline, catching CVEs and misconfigurations prior to container registry deployment.",
    problemStatement: "Vulnerable third-party packages and misconfigured container base images often bypass developer QA and compromise production container environments.",
    solution: "Integrated Trivy automated vulnerability scanner directly into the GitHub Actions CI/CD workflow to scan Docker image layers and enforce gate-blocking criteria on Critical and High severity findings.",
    technologies: ["GitHub", "Docker", "Trivy", "CI/CD", "Flask", "DevSecOps"],
    architectureSteps: [
      "Code",
      "GitHub",
      "Build",
      "Docker",
      "Trivy Scan",
      "Security Validation",
      "Deployment"
    ],
    keyFeatures: [
      "Automated container build pipeline with Docker multi-stage optimization",
      "Static vulnerability scanning with Trivy targeting OS packages and Python dependencies",
      "Policy gate enforcement to block deployment if Critical severity CVEs are detected",
      "Structured vulnerability report output and SARIF export for audit traceability"
    ],
    githubUrl: "https://github.com/pendalwarmadhukar",
    imageFallbackGradient: "from-teal-950 via-slate-900 to-cyan-950",
    customVisualType: "devsecops"
  },
  {
    id: "credit-card-fraud-detection",
    title: "Credit Card Fraud Detection",
    category: "Machine Learning & Security",
    shortDescription: "A machine learning project focused on identifying potentially fraudulent credit card transactions.",
    overview: "A predictive security analytics model designed to detect high-risk and fraudulent transaction behavior across highly imbalanced financial datasets.",
    problemStatement: "Legitimate transactions vastly outnumber fraudulent ones, making standard classification models prone to high false-negative rates in cyber fraud investigations.",
    solution: "Employed exploratory data analysis, class re-balancing techniques, and supervised machine learning algorithms with evaluation focused on Precision, Recall, and PR-AUC.",
    technologies: ["Python", "Pandas", "Machine Learning", "Data Analysis"],
    architectureSteps: [
      "Transaction",
      "Data Analysis",
      "ML Model",
      "Risk Detection",
      "Fraud Alert"
    ],
    keyFeatures: [
      "Data preprocessing and anomaly exploration using Python and Pandas",
      "Handling extreme class imbalance using precision-recall optimization",
      "Feature correlation analysis on transaction velocity and value deviations",
      "Real-time risk scoring output generating alerts for anomalous transactions"
    ],
    githubUrl: "https://github.com/pendalwarmadhukar/Credit-Card-Fraud-Detection",
    imageFallbackGradient: "from-violet-950 via-slate-900 to-slate-950",
    customVisualType: "fraud"
  },
  {
    id: "netsentinel",
    title: "NetSentinel",
    category: "Network Security",
    shortDescription: "A Linux-based network security monitoring project using Bash and Nmap for system auditing, network scanning, exposure analysis, log analysis and risk identification.",
    overview: "NetSentinel is a lightweight, script-driven host and network auditing utility developed in Bash to automate security discovery, reconnaissance, open port surface identification, and system log hygiene checks.",
    problemStatement: "Manual port scanning and raw log inspection are time-intensive, frequently causing administrators to overlook unauthorized open ports or abnormal authentication bursts.",
    solution: "Automated network scanning via Nmap routines with automated diff detection, parsing Linux `/var/log/auth.log` and system journals to flag exposure points and potential brute-force behavior.",
    technologies: ["Linux", "Bash", "Nmap", "Networking", "Security Monitoring"],
    architectureSteps: [
      "Network",
      "Scan",
      "Exposure Analysis",
      "Log Analysis",
      "Risk Identification"
    ],
    keyFeatures: [
      "Automated Nmap service version detection and top-port sweep scripting",
      "Attack surface exposure analysis and unauthorized port change alerts",
      "Bash regex parsing for SSH auth failures and privilege escalation attempts",
      "Formatted markdown and terminal summary output for blue team review"
    ],
    githubUrl: "https://github.com/pendalwarmadhukar/NetSentinel",
    imageFallbackGradient: "from-cyan-950 via-slate-900 to-emerald-950",
    customVisualType: "netsentinel"
  },
  {
    id: "spamguard-ai",
    title: "SpamGuard-AI",
    category: "AI / Security",
    shortDescription: "An AI-based project focused on detecting and analyzing spam-related activity.",
    overview: "SpamGuard-AI utilizes machine learning and natural language classification techniques to inspect electronic communications and filter deceptive, unsolicited, or phishing-adjacent text.",
    problemStatement: "Unsolicited spam and modern phishing payloads constantly evolve phrasing to bypass traditional keyword blacklists and static mail filters.",
    solution: "Constructed an NLP-driven machine learning classification pipeline in Python that tokenizes text messages, extracts statistical n-gram features, and assigns an accurate spam probability index.",
    technologies: ["Python", "Machine Learning", "AI"],
    architectureSteps: [
      "Message Input",
      "Text Processing",
      "Feature Extraction",
      "ML Classifier",
      "Spam / Ham Classification"
    ],
    keyFeatures: [
      "Text preprocessing pipeline including stop-word removal and vectorization",
      "Supervised ML classification with high true-positive precision",
      "Feature weight inspection identifying high-risk keyword clusters",
      "Modular Python codebase allowing easy integration into email ingestion queues"
    ],
    githubUrl: "https://github.com/pendalwarmadhukar/SpamGuard-AI",
    imageFallbackGradient: "from-blue-950 via-slate-900 to-slate-950",
    customVisualType: "spamguard"
  }
];

export const SOC_ALERTS: SocAlert[] = [
  {
    id: "ALERT-8491",
    title: "Multiple Failed Logins",
    severity: "High",
    timestamp: "2026-09-24 07:42:18 UTC",
    sourceIp: "198.51.100.42 (External - AS13335)",
    destination: "auth.corp.internal (10.0.1.15:22)",
    username: "admin_svc",
    eventType: "SSH Authentication Failure Burst",
    status: "Under Investigation",
    analystAction: "Rate-limited source IP at ingress edge firewall; verified targeted service account status and initiated user notification.",
    investigationDetails: {
      mitreTactic: "T1110 - Brute Force (Password Spraying)",
      detectionSource: "Linux auth.log / Wazuh HIDS Rule 5712",
      description: "Observed 147 failed SSH authentication attempts within 90 seconds originating from an untrusted public IP range targeting default privileged usernames.",
      recommendedPlaybook: [
        "Correlate source IP against external threat intelligence feeds (AbuseIPDB / VirusTotal)",
        "Check destination host authentication logs for any successful sessions immediately following failures",
        "Enforce fail2ban jail rule or apply perimeter security group block",
        "Verify SSH key-only enforcement on external-facing jump hosts"
      ]
    }
  },
  {
    id: "ALERT-8492",
    title: "Suspicious Login",
    severity: "Critical",
    timestamp: "2026-09-24 06:14:02 UTC",
    sourceIp: "203.0.113.88 (Geo: Unrecognized ASN)",
    destination: "aws:console.aws.amazon.com",
    username: "dev_lead@cloud.internal",
    eventType: "Impossible Travel & Concurrent Session",
    status: "Open",
    analystAction: "Revoked active IAM sessions via AWS CLI; initiated temporary credential invalidation and forced MFA re-authentication.",
    investigationDetails: {
      mitreTactic: "T1078 - Valid Accounts (Cloud Accounts)",
      detectionSource: "AWS CloudTrail ConsoleLogin Event",
      description: "IAM user logged in from Mumbai (IST) and subsequently generated a concurrent active session from an unfamiliar foreign IP within 12 minutes.",
      recommendedPlaybook: [
        "Invoke AWS IAM RevokeUserSessions command",
        "Review CloudTrail history for any unauthorized policy changes, role assumptions, or access key generation",
        "Contact account owner through verified out-of-band channel",
        "Rotate access keys and reset user console credentials"
      ]
    }
  },
  {
    id: "ALERT-8493",
    title: "Phishing Attempt",
    severity: "Medium",
    timestamp: "2026-09-24 04:55:30 UTC",
    sourceIp: "192.0.2.140 (Mail Relay)",
    destination: "finance-team@internal.org",
    username: "finance_payroll",
    eventType: "Inbound Email with Malicious Link / Typosquatted Domain",
    status: "Contained",
    analystAction: "Purged email artifact from employee mailboxes; added sender domain and associated URI to perimeter DNS sinkhole.",
    investigationDetails: {
      mitreTactic: "T1566.002 - Phishing: Spearphishing Link",
      detectionSource: "Secure Email Gateway (SEG) Heuristic Filter",
      description: "Inbound message purporting to be an urgent corporate payroll audit containing an obfuscated hyperlink pointing to a newly registered phishing domain.",
      recommendedPlaybook: [
        "Extract URL IOCs and submit for sandbox static inspection",
        "Query proxy and DNS query logs for any user click-throughs across the internal subnet",
        "Purge email from all recipient inboxes via message ID query",
        "Flag recipient account for targeted awareness reinforcement"
      ]
    }
  },
  {
    id: "ALERT-8494",
    title: "Malware Detection",
    severity: "Critical",
    timestamp: "2026-09-24 03:22:15 UTC",
    sourceIp: "10.0.4.112 (Workstation-ENG-08)",
    destination: "C:\\Users\\engineer\\AppData\\Local\\Temp\\updater.exe",
    username: "ws_user_m",
    eventType: "Endpoint AV Signature Match & Heuristic Dropper",
    status: "Under Investigation",
    analystAction: "Network-isolated infected host; captured memory dump and system triage artifact package for offline forensic analysis.",
    investigationDetails: {
      mitreTactic: "T1204 - User Execution / T1059 - Command & Scripting Interpreter",
      detectionSource: "EDR Agent (Trivy / Host Antivirus Event)",
      description: "Host agent alerted on suspicious binary execution spawned by a non-standard parent process attempting persistence via scheduled run keys.",
      recommendedPlaybook: [
        "Issue immediate endpoint host network quarantine",
        "Acquire volatile memory image and volatile process tree snapshot",
        "Calculate SHA256 file hashes and search SIEM for host lateral movement",
        "Remediate binary artifacts and restore host from verified clean baseline"
      ]
    }
  },
  {
    id: "ALERT-8495",
    title: "Unusual Network Traffic",
    severity: "Medium",
    timestamp: "2026-09-24 01:10:48 UTC",
    sourceIp: "10.0.2.85 (Database Staging Subnet)",
    destination: "185.220.101.5:443 (Known Tor Exit Node)",
    username: "system_db",
    eventType: "Anomalous Outbound Data Volume on Non-Standard Port",
    status: "Open",
    analystAction: "Blocked destination IP on VPC Network ACL; terminated outbound socket connection and initiated NetFlow packet inspection.",
    investigationDetails: {
      mitreTactic: "T1048 - Exfiltration Over Alternative Protocol",
      detectionSource: "VPC Flow Logs & Nmap / NetSentinel Audit",
      description: "Internal database host initiated an unscheduled 450 MB outbound encrypted transfer toward an external IP flagged as an anonymization gateway.",
      recommendedPlaybook: [
        "Immediately revoke egress security group allowance for target destination",
        "Examine NetFlow logs for total byte transfer volume and session duration",
        "Audit database query logs for large queries or table dump commands prior to connection",
        "Escalate to Incident Response Lead with complete NetFlow PCAP packet trace"
      ]
    }
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "advent-of-cyber-2025",
    title: "Advent of Cyber 2025",
    issuer: "TryHackMe",
    type: "Certificate of Completion",
    date: "25 January 2026",
    status: "Verified",
    description: "Completed 24 cybersecurity challenges and demonstrated understanding of cybersecurity fundamentals through consistency, tenacity, and continuous learning.",
    topics: [
      "Cybersecurity fundamentals",
      "Hands-on cyber challenges",
      "Continuous learning and problem solving"
    ],
    verificationNote: "Source certificate confirms these details.",
    badgeIcon: "Award",
    badgeLabel: "CYBERSECURITY CHALLENGE",
    category: "Challenges",
    achievement: "Completed 24 cybersecurity challenges",
    credentialId: "THM-CFDBNGQB34",
    imageUrl: "/certificates/advent-of-cyber-2025.png"
  },
  {
    id: "love-at-first-breach-ctf",
    title: "Love at First Breach - CTF",
    issuer: "TryHackMe",
    type: "Certificate of Completion",
    date: "24 February 2026",
    status: "Verified",
    description: "Completed real-world cybersecurity challenges demonstrating practical skills in offensive security and problem-solving.",
    topics: [
      "Offensive security",
      "Real-world challenge solving",
      "Security investigation and reasoning"
    ],
    verificationNote: "Source certificate confirms these details.",
    badgeIcon: "Award",
    badgeLabel: "CTF",
    category: "CTF",
    achievement: "600 Points | Rank 228",
    points: "600 Points",
    rank: "228",
    team: "cybers square",
    imageUrl: "/certificates/love-at-first-breach-ctf.png"
  },
  {
    id: "cybersecurity-fundamentals-ibm",
    title: "Cybersecurity Fundamentals",
    issuer: "IBM SkillsBuild",
    type: "Certification",
    date: "12 February 2026",
    status: "Verified",
    description: "A foundational cybersecurity learning credential covering key concepts and professional security awareness.",
    topics: [
      "Cybersecurity fundamentals",
      "Security concepts and awareness",
      "Practical learning and certification preparation"
    ],
    verificationNote: "The uploaded certificate confirms IBM SkillsBuild as the issuer and the Credly verification URL.",
    badgeIcon: "ShieldCheck",
    badgeLabel: "CERTIFICATION",
    category: "Certifications",
    achievement: "Verified IBM SkillsBuild credential",
    verificationUrl: "https://www.credly.com/badges/3b52f7a7-f5e1-4a74-b266-9d5169190310",
    imageUrl: "/certificates/cybersecurity-fundamentals-ibm.png"
  },
  {
    id: "hacker-holidays",
    title: "Hacker Holidays",
    issuer: "TryHackMe",
    type: "Certificate of Participation",
    date: "15 August 2026",
    status: "Verified",
    description: "Participated in Hacker Holidays, a TryHackMe cybersecurity challenge/event.",
    topics: [
      "Cybersecurity event participation",
      "Challenge-based learning",
      "Applied security thinking"
    ],
    verificationNote: "Source certificate confirms participation details.",
    badgeIcon: "Award",
    badgeLabel: "PARTICIPATION",
    category: "Participation",
    achievement: "Event participation",
    credentialId: "THM-DZ1VCVSWXX",
    imageUrl: "/certificates/hacker-holidays.png"
  },
  {
    id: "cold-start-ctf",
    title: "The Cold Start - CTF",
    issuer: "TryHackMe",
    type: "Certificate of Participation",
    date: "8 January 2026",
    status: "Verified",
    description: "Successfully completed The Cold Start CTF, solving real-world cybersecurity challenges and demonstrating practical skills in offensive security and problem-solving.",
    topics: [
      "CTF challenge execution",
      "Practical offensive security",
      "Problem solving under time constraints"
    ],
    verificationNote: "Source certificate confirms these details.",
    badgeIcon: "Award",
    badgeLabel: "CTF / PARTICIPATION",
    category: "CTF",
    achievement: "2160 Points",
    points: "2160 Points",
    imageUrl: "/certificates/cold-start-ctf.png"
  }
];

export const GITHUB_REPOS: GitHubRepo[] = [
  {
    name: "CloudShield",
    description: "An AWS-focused cloud security project designed around secure cloud configuration, IAM, encryption and security best practices.",
    technologies: ["AWS", "IAM", "S3", "EC2", "AWS CLI"],
    repoUrl: "https://github.com/pendalwarmadhukar/CloudShield",
    stars: 12,
    forks: 4,
    languageColor: "#3b82f6"
  },
  {
    name: "SpamGuard-AI",
    description: "An AI-based project focused on detecting and analyzing spam-related activity using machine learning algorithms.",
    technologies: ["Python", "Machine Learning", "NLP"],
    repoUrl: "https://github.com/pendalwarmadhukar/SpamGuard-AI",
    stars: 9,
    forks: 2,
    languageColor: "#10b981"
  },
  {
    name: "Credit-Card-Fraud-Detection",
    description: "A machine learning project focused on identifying potentially fraudulent credit card transactions across imbalanced data.",
    technologies: ["Python", "Pandas", "Scikit-Learn", "Data Analysis"],
    repoUrl: "https://github.com/pendalwarmadhukar/Credit-Card-Fraud-Detection",
    stars: 15,
    forks: 5,
    languageColor: "#06b6d4"
  },
  {
    name: "NetSentinel",
    description: "A Linux-based network security monitoring project using Bash and Nmap for system auditing, network scanning, and risk identification.",
    technologies: ["Bash", "Linux", "Nmap", "Networking"],
    repoUrl: "https://github.com/pendalwarmadhukar/NetSentinel",
    stars: 14,
    forks: 3,
    languageColor: "#8b5cf6"
  }
];
