export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    soc: string;
    certifications: string;
    github: string;
    contact: string;
    resume: string;
    switchLangAria: string;
    langLabel: string;
  };
  // Hero
  hero: {
    statusBadge: string;
    statusSub: string;
    greeting: string;
    name: string;
    studentTitle: string;
    roleLine: string;
    tagline: string;
    secondaryTagline: string;
    viewProjects: string;
    resumeBtn: string;
    verifiedCandidate: string;
    openTerminal: string;
    terminalBadge: string;
  };
  // About
  about: {
    tag: string;
    title: string;
    badgeYear: string;
    badgeStatus: string;
    badgeActive: string;
    role: string;
    degreeLabel: string;
    degreeValue: string;
    focusLabel: string;
    focusValue: string;
    toolsLabel: string;
    toolsValue: string;
    statusLabel: string;
    statusValue: string;
    bioP1: string;
    bioP2: string;
    quote: string;
    coreFocusTitle: string;
    downloadCv: string;
    focus: {
      socTitle: string;
      socDesc: string;
      cloudTitle: string;
      cloudDesc: string;
      investigationTitle: string;
      investigationDesc: string;
      forensicsTitle: string;
      forensicsDesc: string;
    };
  };
  // Skills
  skills: {
    tag: string;
    title: string;
    subtitle: string;
    categories: Record<string, string>;
  };
  // Projects
  projects: {
    tag: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allProjects: string;
    cloudSecurity: string;
    devsecops: string;
    machineLearning: string;
    networkSecurity: string;
    socMonitoring: string;
    resetFilters: string;
    showing: string;
    of: string;
    projectsLabel: string;
    inCategory: string;
    matching: string;
    readMore: string;
    estimatedReadTime: string;
    noProjectsFound: string;
    noProjectsDesc: string;
    showAllProjects: string;
    modalArchTitle: string;
    modalProblemTitle: string;
    modalSolutionTitle: string;
    modalFeaturesTitle: string;
    modalTechTitle: string;
    viewGithub: string;
    liveDemo: string;
    closeModal: string;
  };
  // SOC Operations
  soc: {
    tag: string;
    title: string;
    subtitle: string;
    simulatedBadge: string;
    simulatedBanner: string;
    educationalLab: string;
    workflowTitle: string;
    incidentQueueTitle: string;
    alertsActive: string;
    telemetry: {
      timestamp: string;
      targetUser: string;
      sourceIp: string;
      destination: string;
    };
    classification: string;
    mitre: string;
    detectionMech: string;
    analystActionTitle: string;
    playbookTitle: string;
    interactive: string;
    actions: {
      contain: string;
      escalate: string;
      resolve: string;
    };
    sandboxMode: string;
    alertQueueTitle: string;
    filterAll: string;
    filterCritical: string;
    filterHigh: string;
    filterMedium: string;
    statusOpen: string;
    statusInvestigating: string;
    statusContained: string;
    detailsTitle: string;
    mitreLabel: string;
    detectionLabel: string;
    analystActionLabel: string;
    selectAlertPrompt: string;
  };
  // Certifications
  certifications: {
    tag: string;
    title: string;
    subtitle: string;
    viewDetails: string;
    verifyCredential: string;
    officialDossier: string;
    issuingOrg: string;
    status: string;
    skillsValidated: string;
    close: string;
    activeCredential: string;
    inPreparation: string;
    topicsCovered: string;
    verificationNotice: string;
    closeModal: string;
  };
  // GitHub
  github: {
    tag: string;
    title: string;
    subtitle: string;
    viewOnGithub: string;
    viewProfile: string;
    viewRepo: string;
    stars: string;
    forks: string;
    visitProfile: string;
  };
  // Contact
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    statusActive: string;
    statusText: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    locationValue: string;
    copyEmail: string;
    emailCopied: string;
    formTitle: string;
    formDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    msgLabel: string;
    msgPlaceholder: string;
    messagePlaceholder: string;
    sendMessage: string;
    sendBtn: string;
    sending: string;
    messageSentSuccess: string;
    successTitle: string;
    messageSentDesc: string;
    successDesc: string;
    resumeCardTitle: string;
    resumeCardDesc: string;
    resumeCardView: string;
  };
  // Footer
  footer: {
    tagline: string;
    quickLinks: string;
    securityFocus: string;
    rightsReserved: string;
    designedWith: string;
    backToTop: string;
  };
  // Resume Modal
  resume: {
    title: string;
    subtitle: string;
    downloadPdf: string;
    close: string;
    tabSummary: string;
    tabSkills: string;
    tabEducation: string;
    tabProjects: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      soc: "SOC",
      certifications: "Certifications",
      github: "GitHub",
      contact: "Contact",
      resume: "Resume",
      switchLangAria: "Switch to Hindi language",
      langLabel: "EN | हिन्दी",
    },
    hero: {
      statusBadge: "Security Status: Active Verification",
      statusSub: "SOC & Cloud Defense",
      greeting: "Hi, I'm",
      name: "Madhukar Pendalwar",
      studentTitle: "B.Tech Cyber Security Student",
      roleLine: "Cybersecurity | SOC & Blue Team | Cloud Security",
      tagline: "“Building secure systems and investigating digital threats.”",
      secondaryTagline: "SOC & Blue Team • Cloud Security • Digital Forensics • Cyber Investigation",
      viewProjects: "View Projects",
      resumeBtn: "Resume",
      verifiedCandidate: "Verified Candidate",
      openTerminal: "Live Terminal",
      terminalBadge: "Terminal Ready",
    },
    about: {
      tag: "Profile Overview",
      title: "About Me",
      badgeYear: "3rd Year B.Tech",
      badgeStatus: "Cyber Defense",
      badgeActive: "Active",
      role: "B.Tech Cyber Security Student (3rd Year)",
      degreeLabel: "Degree:",
      degreeValue: "B.Tech Cyber Security",
      focusLabel: "Focus:",
      focusValue: "Blue Team & Cloud Defense",
      toolsLabel: "Primary Tooling:",
      toolsValue: "AWS, Linux, Trivy, Docker",
      statusLabel: "Status:",
      statusValue: "Seeking Internship & Entry Roles",
      bioP1: "I am a 3rd-year B.Tech Cyber Security student focused on practical cybersecurity and security operations. My current interests include SOC & Blue Team operations, threat detection, security monitoring, digital forensics, cybercrime investigation, Linux, networking, and cloud security.",
      bioP2: "I build hands-on security projects to understand how security events are detected, investigated, documented, and escalated in real-world environments. I am currently developing my skills toward SOC Analyst and Cybersecurity Internship opportunities.",
      quote: "“Security is not a product, but an ongoing process of vigilance and resilience.”",
      coreFocusTitle: "Core Career Specializations",
      downloadCv: "Download Detailed CV",
      focus: {
        socTitle: "SOC & Blue Team",
        socDesc: "Security monitoring, alert analysis, investigation and incident response.",
        cloudTitle: "Cloud Security",
        cloudDesc: "AWS security, IAM, CloudTrail, EC2, S3 and secure configurations.",
        investigationTitle: "Cyber Investigation",
        investigationDesc: "Cybersecurity investigation and analysis of suspicious activities.",
        forensicsTitle: "Digital Forensics",
        forensicsDesc: "Computer forensics and digital evidence concepts.",
      },
    },
    skills: {
      tag: "Technical Capabilities",
      title: "Skills & Proficiencies",
      subtitle: "Hands-on competency across enterprise security tools, defensive cloud controls, systems programming, and investigative workflows.",
      categories: {
        "SOC & Cybersecurity": "SOC & Cybersecurity",
        "Cloud Security": "Cloud Security",
        "Networking & Linux": "Networking & Linux",
        "Security Tools": "Security Tools",
        "DevSecOps": "DevSecOps",
        "Programming & Development": "Programming & Development",
        "Data & AI": "Data & AI",
      },
    },
    projects: {
      tag: "Engineering Showcase",
      title: "Practical Security Projects",
      subtitle: "Production-oriented implementations encompassing cloud defense, vulnerability automation, network auditing, and ML threat detection.",
      searchPlaceholder: "Search tech, AWS, Docker...",
      allProjects: "All Projects",
      cloudSecurity: "Cloud Security",
      devsecops: "DevSecOps",
      machineLearning: "Machine Learning",
      networkSecurity: "Network Security",
      socMonitoring: "SOC & Monitoring",
      resetFilters: "Reset Filters",
      showing: "Showing",
      of: "of",
      projectsLabel: "projects",
      inCategory: "in",
      matching: "matching",
      readMore: "Read More",
      estimatedReadTime: "Estimated reading time",
      noProjectsFound: "No matching projects found",
      noProjectsDesc: "Try selecting another category or clearing your search term to view all projects.",
      showAllProjects: "Show All Projects",
      modalArchTitle: "Architecture & Verification Flow",
      modalProblemTitle: "Problem Statement",
      modalSolutionTitle: "Engineered Solution",
      modalFeaturesTitle: "Key Implementation Features",
      modalTechTitle: "Core Technologies Utilized",
      viewGithub: "View GitHub Repository",
      liveDemo: "Launch Live Demo",
      closeModal: "Close Project Details",
    },
    soc: {
      tag: "SOC Operations",
      title: "Security Operations Center (L1 Triage & Playbooks)",
      subtitle: "Interactive simulation demonstrating security telemetry analysis, MITRE ATT&CK mapping, and procedural blue team incident containment playbooks.",
      simulatedBadge: "Live SOC Monitor Active",
      simulatedBanner: "Simulated SOC Investigation",
      educationalLab: "Educational Lab",
      workflowTitle: "Standard Tier-1 SOC Workflow Protocol",
      incidentQueueTitle: "SIMULATED INCIDENT QUEUE",
      alertsActive: "ALERTS ACTIVE",
      telemetry: {
        timestamp: "Timestamp",
        targetUser: "Target Username",
        sourceIp: "Source IP / Host",
        destination: "Destination Target",
      },
      classification: "Event Classification",
      mitre: "MITRE ATT&CK Tactic",
      detectionMech: "Detection Mechanism",
      analystActionTitle: "Analyst Action Taken",
      playbookTitle: "Incident Response Playbook Checklist",
      interactive: "Interactive",
      actions: {
        contain: "Simulate Containment",
        escalate: "Escalate to Tier 2",
        resolve: "Mark Resolved",
      },
      sandboxMode: "Mode: Sandbox Demo",
      alertQueueTitle: "Security Telemetry Queue",
      filterAll: "All Alerts",
      filterCritical: "Critical",
      filterHigh: "High",
      filterMedium: "Medium",
      statusOpen: "Open",
      statusInvestigating: "Under Investigation",
      statusContained: "Contained",
      detailsTitle: "Incident Triage & Forensic Analysis",
      mitreLabel: "MITRE ATT&CK Technique:",
      detectionLabel: "Detection Vector:",
      analystActionLabel: "Analyst Mitigation Action Taken:",
      selectAlertPrompt: "Select an incident alert from the queue to inspect detailed forensics and mitigation steps.",
    },
    certifications: {
      tag: "Qualifications & Learning Pathways",
      title: "Certifications & Academic Credentials",
      subtitle: "Verified academic milestones and hands-on laboratory specializations in security engineering and cloud defense.",
      viewDetails: "View Credential Details",
      verifyCredential: "Verify Credential",
      officialDossier: "Official Verification Dossier",
      issuingOrg: "Issuing Body",
      status: "Status",
      skillsValidated: "Verified Curricular Core",
      close: "Close Verification",
      activeCredential: "Active Credential",
      inPreparation: "In Preparation",
      topicsCovered: "Core Topics Covered",
      verificationNotice: "Credential Verification Notice",
      closeModal: "Close Credential Window",
    },
    github: {
      tag: "Version Control & Open Source",
      title: "GitHub Projects",
      subtitle: "Selected public repositories by",
      viewOnGithub: "View Repository on GitHub",
      viewProfile: "View GitHub Profile",
      viewRepo: "Repository",
      stars: "Stars",
      forks: "Forks",
      visitProfile: "Visit Full GitHub Profile",
    },
    contact: {
      tag: "Get In Touch",
      title: "Let's Connect",
      subtitle: "I’m open to cybersecurity internships, SOC opportunities, cloud security opportunities, and cybersecurity collaborations.",
      statusActive: "Available for Roles",
      statusText: "Currently open to Summer & Fall 2026 internships and full-time entry roles.",
      emailLabel: "Email Address",
      phoneLabel: "Phone / Direct Line",
      locationLabel: "Location",
      locationValue: "India (Open to Remote & Relocation)",
      copyEmail: "Copy Email",
      emailCopied: "Copied!",
      formTitle: "Send a Message",
      formDesc: "Direct inquiry for internships, roles, or technical collaboration.",
      nameLabel: "Your Name",
      namePlaceholder: "e.g. Alex Carter",
      emailInputLabel: "Your Email Address",
      emailPlaceholder: "e.g. recruiter@company.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Cybersecurity Role / Project Collaboration",
      messageLabel: "Message",
      msgLabel: "Message",
      msgPlaceholder: "Hi Madhukar, we are looking for a SOC Analyst / Cloud Security intern...",
      messagePlaceholder: "Describe the role, project, or inquiry...",
      sendMessage: "Transmit Secure Message",
      sendBtn: "Send Message",
      sending: "Sending...",
      messageSentSuccess: "Message Dispatched Successfully",
      successTitle: "Message Sent Successfully",
      messageSentDesc: "Thank you for reaching out! Your message has been received and I will respond shortly.",
      successDesc: "Thank you for reaching out. Madhukar will review your inquiry and get back to you promptly.",
      resumeCardTitle: "Curriculum Vitae",
      resumeCardDesc: "Download & Inspect Resume",
      resumeCardView: "View →",
    },
    footer: {
      tagline: "Dedicated to defensive engineering, cloud workload resilience, and digital threat forensics.",
      quickLinks: "Navigation Links",
      securityFocus: "Security Focus",
      rightsReserved: "All rights reserved. Built with precision and modern security standards.",
      designedWith: "Designed with React, TypeScript & Tailwind CSS",
      backToTop: "Back to Top",
    },
    resume: {
      title: "Madhukar Pendalwar — Technical Resume",
      subtitle: "B.Tech Cyber Security | SOC & Cloud Defense Specialist",
      downloadPdf: "Download Resume PDF",
      close: "Close Resume",
      tabSummary: "Summary",
      tabSkills: "Skills Breakdown",
      tabEducation: "Education",
      tabProjects: "Key Projects",
    },
  },
  hi: {
    nav: {
      home: "होम",
      about: "परिचय",
      skills: "कौशल",
      projects: "प्रोजेक्ट्स",
      soc: "एसओसी",
      certifications: "प्रमाणन",
      github: "गिटहब",
      contact: "संपर्क",
      resume: "बायोडाटा",
      switchLangAria: "अंग्रेजी भाषा में बदलें",
      langLabel: "हिन्दी | EN",
    },
    hero: {
      statusBadge: "सुरक्षा स्थिति: सक्रिय सत्यापन",
      statusSub: "एसओसी और क्लाउड रक्षा",
      greeting: "नमस्ते, मैं हूँ",
      name: "मधुकर पेंडलवार",
      studentTitle: "बी.टेक साइबर सुरक्षा छात्र",
      roleLine: "साइबर सुरक्षा | एसओसी और ब्लू टीम | क्लाउड सुरक्षा",
      tagline: "“सुरक्षित प्रणालियों का निर्माण और डिजिटल खतरों की जांच।”",
      secondaryTagline: "एसओसी और ब्लू टीम • क्लाउड सुरक्षा • डिजिटल फोरेंसिक • साइबर जांच",
      viewProjects: "प्रोजेक्ट्स देखें",
      resumeBtn: "बायोडाटा",
      verifiedCandidate: "सत्यापित उम्मीदवार",
      openTerminal: "लाइव टर्मिनल",
      terminalBadge: "टर्मिनल तैयार",
    },
    about: {
      tag: "प्रोफ़ाइल अवलोकन",
      title: "मेरे बारे में",
      badgeYear: "तृतीय वर्ष बी.टेक",
      badgeStatus: "साइबर रक्षा",
      badgeActive: "सक्रिय",
      role: "बी.टेक साइबर सुरक्षा छात्र (तृतीय वर्ष)",
      degreeLabel: "डिग्री:",
      degreeValue: "बी.टेक साइबर सुरक्षा",
      focusLabel: "मुख्य क्षेत्र:",
      focusValue: "ब्लू टीम और क्लाउड सुरक्षा",
      toolsLabel: "प्रमुख टूल्स:",
      toolsValue: "AWS, लिनक्स, Trivy, Docker",
      statusLabel: "वर्तमान स्थिति:",
      statusValue: "इंटर्नशिप और जॉब्स हेतु उपलब्ध",
      bioP1: "मैं साइबर सुरक्षा, एसओसी और ब्लू टीम संचालन, क्लाउड सुरक्षा, साइबर अपराध जांच और डिजिटल फोरेंसिक में गहरी रुचि रखने वाला बी.टेक साइबर सुरक्षा का तृतीय वर्ष का छात्र हूँ।",
      bioP2: "मेरा मुख्य ध्यान एडब्ल्यूएस सुरक्षा, सुरक्षा निगरानी, लिनक्स, नेटवर्किंग, देवसेकऑप्स और साइबर सुरक्षा विश्लेषण से जुड़े व्यावहारिक सुरक्षा प्रोजेक्ट्स बनाने पर है।",
      quote: "“सुरक्षा केवल एक उत्पाद नहीं, बल्कि निरंतर सतर्कता और लचीलेपन की एक सतत प्रक्रिया है।”",
      coreFocusTitle: "प्रमुख करियर विशेषज्ञताएं",
      downloadCv: "विस्तृत सीवी डाउनलोड करें",
      focus: {
        socTitle: "एसओसी और ब्लू टीम",
        socDesc: "सुरक्षा निगरानी, अलर्ट विश्लेषण, जांच और सुरक्षा घटना प्रतिक्रिया।",
        cloudTitle: "क्लाउड सुरक्षा",
        cloudDesc: "एडब्ल्यूएस सुरक्षा, आईएएम, क्लाउडट्रेल, ईसी2, एस3 और सुरक्षित विन्यास।",
        investigationTitle: "साइबर जांच",
        investigationDesc: "संदिग्ध गतिविधियों और साइबर खतरों की विस्तृत जांच व विश्लेषण।",
        forensicsTitle: "डिजिटल फोरेंसिक",
        forensicsDesc: "कंप्यूटर फोरेंसिक और डिजिटल साक्ष्य विश्लेषण के मूल सिद्धांत।",
      },
    },
    skills: {
      tag: "तकनीकी क्षमताएं",
      title: "कौशल और प्रवीणताएं",
      subtitle: "एंटरप्राइज सुरक्षा टूल्स, रक्षात्मक क्लाउड नियंत्रण, सिस्टम प्रोग्रामिंग और साइबर जांच कार्यप्रणाली में व्यावहारिक दक्षता।",
      categories: {
        "SOC & Cybersecurity": "एसओसी और साइबर सुरक्षा",
        "Cloud Security": "क्लाउड सुरक्षा",
        "Networking & Linux": "नेटवर्किंग और लिनक्स",
        "Security Tools": "सुरक्षा उपकरण",
        "DevSecOps": "देवसेकऑप्स",
        "Programming & Development": "प्रोग्रामिंग और विकास",
        "Data & AI": "डेटा और एआई",
      },
    },
    projects: {
      tag: "इंजीनियरिंग शोकेस",
      title: "व्यावहारिक सुरक्षा प्रोजेक्ट्स",
      subtitle: "क्लाउड डिफेंस, स्वचालित भेद्यता स्कैनिंग, नेटवर्क ऑडिटिंग और मशीन लर्निंग खतरे का पता लगाने वाले उत्पादन-स्तरीय प्रोजेक्ट्स।",
      searchPlaceholder: "तकनीक, AWS, Docker खोजें...",
      allProjects: "सभी प्रोजेक्ट्स",
      cloudSecurity: "क्लाउड सुरक्षा",
      devsecops: "देवसेकऑप्स",
      machineLearning: "मशीन लर्निंग",
      networkSecurity: "नेटवर्क सुरक्षा",
      socMonitoring: "एसओसी और निगरानी",
      resetFilters: "फ़िल्टर रीसेट करें",
      showing: "प्रदर्शित",
      of: "कुल",
      projectsLabel: "प्रोजेक्ट्स",
      inCategory: "में",
      matching: "मिलान",
      readMore: "विस्तार से पढ़ें",
      estimatedReadTime: "अनुमानित पढ़ने का समय",
      noProjectsFound: "कोई संबंधित प्रोजेक्ट नहीं मिला",
      noProjectsDesc: "कृपया कोई अन्य श्रेणी चुनें या सभी प्रोजेक्ट्स देखने के लिए सर्च बॉक्स साफ करें।",
      showAllProjects: "सभी प्रोजेक्ट्स देखें",
      modalArchTitle: "आर्किटेक्चर और सत्यापन प्रक्रिया",
      modalProblemTitle: "समस्या विवरण",
      modalSolutionTitle: "इंजीनियर समाधान",
      modalFeaturesTitle: "प्रमुख कार्यान्वयन विशेषताएं",
      modalTechTitle: "उपयोग की गई तकनीकें",
      viewGithub: "गिटहब रिपॉजिटरी देखें",
      liveDemo: "लाइव डेमो शुरू करें",
      closeModal: "प्रोजेक्ट विवरण बंद करें",
    },
    soc: {
      tag: "एसओसी ऑपरेशन्स",
      title: "सुरक्षा संचालन केंद्र (L1 विश्लेषण व प्लेबुक्स)",
      subtitle: "सुरक्षा टेलीमेट्री विश्लेषण, MITRE ATT&CK मैपिंग और ब्लू टीम घटना शमन प्लेबुक का इंटरैक्टिव सिमुलेशन।",
      simulatedBadge: "लाइव एसओसी मॉनिटर सक्रिय",
      simulatedBanner: "सिम्युलेटेड एसओसी जांच",
      educationalLab: "शैक्षणिक प्रयोगशाला",
      workflowTitle: "मानक टीयर-1 एसओसी कार्यप्रणाली प्रोटोकॉल",
      incidentQueueTitle: "सिम्युलेटेड घटना कतार",
      alertsActive: "सक्रिय अलर्ट",
      telemetry: {
        timestamp: "टाइमस्टैम्प",
        targetUser: "लक्षित उपयोगकर्ता",
        sourceIp: "स्रोत आईपी / होस्ट",
        destination: "गंतव्य लक्ष्य",
      },
      classification: "घटना वर्गीकरण",
      mitre: "MITRE ATT&CK रणनीति",
      detectionMech: "पहचान तंत्र",
      analystActionTitle: "विश्लेषक द्वारा की गई कार्रवाई",
      playbookTitle: "घटना प्रतिक्रिया प्लेबुक चेकलिस्ट",
      interactive: "इंटरैक्टिव",
      actions: {
        contain: "शमन का अनुकरण करें",
        escalate: "टीयर 2 पर भेजें",
        resolve: "समाधान चिह्नित करें",
      },
      sandboxMode: "मोड: सैंडबॉक्स डेमो",
      alertQueueTitle: "सुरक्षा टेलीमेट्री कतार",
      filterAll: "सभी अलर्ट",
      filterCritical: "अत्यधिक गंभीर (Critical)",
      filterHigh: "गंभीर (High)",
      filterMedium: "मध्यम (Medium)",
      statusOpen: "खुला (Open)",
      statusInvestigating: "जांच जारी (Under Investigation)",
      statusContained: "नियंत्रित (Contained)",
      detailsTitle: "घटना विश्लेषण और फोरेंसिक विवरण",
      mitreLabel: "MITRE ATT&CK तकनीक:",
      detectionLabel: "पहचान स्रोत:",
      analystActionLabel: "सुरक्षा विश्लेषक द्वारा की गई कार्रवाई:",
      selectAlertPrompt: "विस्तृत फोरेंसिक और रोकथाम चरणों का निरीक्षण करने के लिए कतार से एक अलर्ट चुनें।",
    },
    certifications: {
      tag: "योग्यताएं और अध्ययन मार्ग",
      title: "प्रमाणपत्र और शैक्षणिक योग्यताएं",
      subtitle: "सत्यापित शैक्षणिक मील के पत्थर और सुरक्षा इंजीनियरिंग व क्लाउड रक्षा में व्यावहारिक विशेषज्ञता।",
      viewDetails: "योग्यता विवरण देखें",
      verifyCredential: "प्रमाणपत्र सत्यापित करें",
      officialDossier: "आधिकारिक सत्यापन दस्तावेज़",
      issuingOrg: "जारीकर्ता संस्था",
      status: "स्थिति",
      skillsValidated: "सत्यापित पाठ्यक्रम कोर",
      close: "सत्यापन बंद करें",
      activeCredential: "सक्रिय प्रमाणपत्र",
      inPreparation: "तैयारी जारी",
      topicsCovered: "मुख्य विषय शामिल",
      verificationNotice: "योग्यता सत्यापन सूचना",
      closeModal: "खिड़की बंद करें",
    },
    github: {
      tag: "वर्जन कंट्रोल और ओपन सोर्स",
      title: "गिटहब प्रोजेक्ट्स",
      subtitle: "द्वारा चयनित सार्वजनिक रिपॉजिटरी",
      viewOnGithub: "गिटहब पर रिपॉजिटरी देखें",
      viewProfile: "गिटहब प्रोफ़ाइल देखें",
      viewRepo: "रिपॉजिटरी",
      stars: "स्टार्स",
      forks: "फ़ोर्क्स",
      visitProfile: "संपूर्ण गिटहब प्रोफ़ाइल देखें",
    },
    contact: {
      tag: "संपर्क करें",
      title: "मुझसे जुड़ें",
      subtitle: "मैं साइबर सुरक्षा इंटर्नशिप, एसओसी भूमिकाओं, क्लाउड सुरक्षा अवसरों और तकनीकी सहयोग के लिए उपलब्ध हूँ।",
      statusActive: "अवसरों हेतु उपलब्ध",
      statusText: "वर्तमान में समर और फॉल 2026 इंटर्नशिप और पूर्णकालिक भूमिकाओं के लिए उपलब्ध।",
      emailLabel: "ईमेल पता",
      phoneLabel: "फ़ोन नंबर",
      locationLabel: "स्थान",
      locationValue: "भारत (रिमोट और रीलोकेशन के लिए तैयार)",
      copyEmail: "ईमेल कॉपी करें",
      emailCopied: "कॉपी हो गया!",
      formTitle: "संदेश भेजें",
      formDesc: "इंटर्नशिप, भूमिकाओं या तकनीकी सहयोग के लिए सीधा संपर्क।",
      nameLabel: "आपका नाम",
      namePlaceholder: "उदा. राहुल शर्मा",
      emailInputLabel: "आपका ईमेल पता",
      emailPlaceholder: "उदा. recruiter@company.com",
      subjectLabel: "विषय",
      subjectPlaceholder: "साइबर सुरक्षा भूमिका / प्रोजेक्ट सहयोग",
      messageLabel: "संदेश",
      msgLabel: "संदेश",
      msgPlaceholder: "नमस्ते मधुकर, हम एक एसओसी विश्लेषक / क्लाउड सुरक्षा इंटर्न की तलाश कर रहे हैं...",
      messagePlaceholder: "भूमिका, परियोजना या पूछताछ का विवरण दें...",
      sendMessage: "सुरक्षित संदेश प्रेषित करें",
      sendBtn: "संदेश भेजें",
      sending: "भेजा जा रहा है...",
      messageSentSuccess: "संदेश सफलतापूर्वक भेजा गया",
      successTitle: "संदेश सफलतापूर्वक भेजा गया",
      messageSentDesc: "संपर्क करने के लिए धन्यवाद! आपका संदेश प्राप्त हो गया है और मैं शीघ्र ही उत्तर दूंगा।",
      successDesc: "संपर्क करने के लिए धन्यवाद। मधुकर आपके संदेश की समीक्षा करेंगे और शीघ्र ही उत्तर देंगे।",
      resumeCardTitle: "बायोडाटा (CV)",
      resumeCardDesc: "बायोडाटा डाउनलोड करें व देखें",
      resumeCardView: "देखें →",
    },
    footer: {
      tagline: "रक्षात्मक सुरक्षा इंजीनियरिंग, लचीले क्लाउड इन्फ्रास्ट्रक्चर और डिजिटल खतरे की फोरेंसिक जांच को समर्पित।",
      quickLinks: "नेविगेशन लिंक्स",
      securityFocus: "सुरक्षा मुख्य बिंदु",
      rightsReserved: "सर्वाधिकार सुरक्षित। आधुनिक सुरक्षा मानकों और सटीकता के साथ निर्मित।",
      designedWith: "React, TypeScript और Tailwind CSS के साथ डिज़ाइन किया गया",
      backToTop: "शीर्ष पर जाएं",
    },
    resume: {
      title: "मधुकर पेंडलवार — तकनीकी बायोडाटा",
      subtitle: "बी.टेक साइबर सुरक्षा | एसओसी और क्लाउड रक्षा विशेषज्ञ",
      downloadPdf: "बायोडाटा पीडीएफ डाउनलोड करें",
      close: "बायोडाटा बंद करें",
      tabSummary: "सारांश",
      tabSkills: "कौशल विवरण",
      tabEducation: "शिक्षा",
      tabProjects: "प्रमुख प्रोजेक्ट्स",
    },
  },
};
