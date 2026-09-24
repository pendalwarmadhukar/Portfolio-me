export interface Project {
  id: string;
  title: string;
  category: 'Cloud Security' | 'AWS Security & Monitoring' | 'DevSecOps' | 'Machine Learning & Security' | 'Network Security' | 'AI / Security';
  shortDescription: string;
  overview: string;
  problemStatement: string;
  solution: string;
  technologies: string[];
  architectureSteps: string[];
  keyFeatures: string[];
  githubUrl: string;
  demoUrl?: string;
  imageFallbackGradient: string;
  customVisualType: 'cloudshield' | 'aws-monitoring' | 'devsecops' | 'fraud' | 'netsentinel' | 'spamguard';
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface SocAlert {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  timestamp: string;
  sourceIp: string;
  destination: string;
  username: string;
  eventType: string;
  status: 'Open' | 'Under Investigation' | 'Contained' | 'Closed';
  analystAction: string;
  investigationDetails: {
    mitreTactic: string;
    detectionSource: string;
    description: string;
    recommendedPlaybook: string[];
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  type: 'Academic Certification' | 'Technical Specialization' | 'Foundational Credential';
  date?: string;
  credentialId?: string;
  status: 'Verified Academic' | 'Active Credential' | 'In Preparation';
  description: string;
  topics: string[];
  verificationNote: string;
  badgeIcon: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  stars?: number;
  forks?: number;
  languageColor: string;
}
