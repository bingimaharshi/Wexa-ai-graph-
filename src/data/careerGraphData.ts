export type Skill = {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  related: string[];
};

export type Role = {
  id: string;
  name: string;
  description: string;
  level: string;
  averageSalary: number;
  requiredSkills: string[];
  technologies: string[];
  relatedRoles: string[];
};

export type Company = {
  id: string;
  name: string;
  industry: string;
  size: string;
  website: string;
  roles: string[];
  technologies: string[];
  looksFor: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  demonstrates: string[];
};

export type UserProfile = {
  id: string;
  name: string;
  experienceLevel: string;
  location: string;
  education: string;
  skills: string[];
  targetRoles: string[];
  projects: string[];
};

export const skillCatalog: Skill[] = [
  { id: 'python', name: 'Python', category: 'Language', description: 'General-purpose backend language used widely in AI and web services.', difficulty: 'Intermediate', related: ['FastAPI', 'SQL', 'Docker', 'AWS', 'Machine Learning'] },
  { id: 'javascript', name: 'JavaScript', category: 'Language', description: 'Core language for front-end development and full-stack applications.', difficulty: 'Intermediate', related: ['TypeScript', 'React', 'Node.js', 'Express', 'Full Stack'] },
  { id: 'typescript', name: 'TypeScript', category: 'Language', description: 'Typed JavaScript used in modern scalable web applications.', difficulty: 'Intermediate', related: ['JavaScript', 'React', 'Node.js', 'System Design', 'AWS'] },
  { id: 'react', name: 'React', category: 'Frontend', description: 'Component-driven UI library for interactive user interfaces.', difficulty: 'Intermediate', related: ['TypeScript', 'JavaScript', 'Node.js', 'Redux', 'Next.js'] },
  { id: 'nodejs', name: 'Node.js', category: 'Runtime', description: 'Server-side JavaScript runtime for APIs and services.', difficulty: 'Intermediate', related: ['Express', 'JavaScript', 'TypeScript', 'REST APIs', 'Docker'] },
  { id: 'sql', name: 'SQL', category: 'Database', description: 'Core relational query language used for data access and analysis.', difficulty: 'Intermediate', related: ['PostgreSQL', 'MySQL', 'Database Design', 'Data Engineering', 'Python'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', description: 'Open-source relational database widely used in production systems.', difficulty: 'Intermediate', related: ['SQL', 'Redis', 'Docker', 'Backend Engineer', 'Data Engineer'] },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', description: 'NoSQL document database for flexible application data models.', difficulty: 'Intermediate', related: ['Node.js', 'Express', 'Full Stack Engineer', 'React', 'JavaScript'] },
  { id: 'redis', name: 'Redis', category: 'Cache', description: 'In-memory data store for caching and session management.', difficulty: 'Intermediate', related: ['Docker', 'AWS', 'Caching', 'Backend Engineer', 'System Design'] },
  { id: 'docker', name: 'Docker', category: 'DevOps', description: 'Container platform for packaging and deploying applications.', difficulty: 'Intermediate', related: ['Kubernetes', 'AWS', 'CI/CD', 'Linux', 'DevOps Engineer'] },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', description: 'Container orchestration system for scalable workloads.', difficulty: 'Advanced', related: ['Docker', 'AWS', 'Cloud Engineer', 'DevOps Engineer', 'Linux'] },
  { id: 'aws', name: 'AWS', category: 'Cloud', description: 'Flexible cloud platform used in modern application deployment.', difficulty: 'Intermediate', related: ['Docker', 'Kubernetes', 'Lambda', 'Cloud Engineer', 'DevOps Engineer'] },
  { id: 'azure', name: 'Azure', category: 'Cloud', description: 'Microsoft cloud platform supporting distributed services and DevOps.', difficulty: 'Intermediate', related: ['Docker', 'Kubernetes', 'Cloud Engineer', 'System Design', 'Software Engineer'] },
  { id: 'git', name: 'Git', category: 'Tooling', description: 'Version control system for collaborative development workflows.', difficulty: 'Beginner', related: ['GitHub', 'CI/CD', 'DevOps Engineer', 'Full Stack Engineer'] },
  { id: 'linux', name: 'Linux', category: 'Operating System', description: 'Core operating system environment used in server operations.', difficulty: 'Intermediate', related: ['Docker', 'AWS', 'Kubernetes', 'DevOps Engineer', 'System Design'] },
  { id: 'rest-apis', name: 'REST APIs', category: 'Backend', description: 'Architecture for resource-based communication between services.', difficulty: 'Intermediate', related: ['Python', 'Node.js', 'FastAPI', 'Backend Engineer', 'Full Stack Engineer'] },
  { id: 'graphql', name: 'GraphQL', category: 'API', description: 'Query language for efficient client-server data fetching.', difficulty: 'Intermediate', related: ['React', 'Node.js', 'Full Stack Engineer', 'API Design', 'Software Engineer'] },
  { id: 'system-design', name: 'System Design', category: 'Architecture', description: 'Designing scalable services, data flows, and application boundaries.', difficulty: 'Advanced', related: ['AWS', 'Redis', 'Docker', 'Backend Engineer', 'Cloud Engineer'] },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', description: 'Modern Python framework for building high-performance APIs.', difficulty: 'Intermediate', related: ['Python', 'REST APIs', 'PostgreSQL', 'Backend Engineer', 'AI Engineer'] },
  { id: 'machine-learning', name: 'Machine Learning', category: 'AI', description: 'Data-driven model building and prediction systems.', difficulty: 'Advanced', related: ['Python', 'AI Engineer', 'Deep Learning', 'LLMs', 'Data Engineer'] },
  { id: 'deep-learning', name: 'Deep Learning', category: 'AI', description: 'Neural network techniques for complex pattern recognition tasks.', difficulty: 'Advanced', related: ['Machine Learning', 'AI Engineer', 'LLMs', 'Python', 'Data Engineer'] },
  { id: 'llms', name: 'LLMs', category: 'AI', description: 'Large language model systems and prompt engineering patterns.', difficulty: 'Advanced', related: ['Python', 'FastAPI', 'Machine Learning', 'AI Engineer', 'Data Engineer'] },
  { id: 'java', name: 'Java', category: 'Language', description: 'Versatile enterprise language used in backend and distributed systems.', difficulty: 'Intermediate', related: ['Spring Boot', 'System Design', 'Backend Engineer', 'AWS', 'Microservices'] },
  { id: 'go', name: 'Go', category: 'Language', description: 'Efficient systems programming language for cloud-native services.', difficulty: 'Intermediate', related: ['Kubernetes', 'Cloud Engineer', 'System Design', 'Docker', 'Backend Engineer'] },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', description: 'React framework for server-rendered and production-ready web apps.', difficulty: 'Intermediate', related: ['React', 'TypeScript', 'Full Stack Engineer', 'Node.js', 'AWS'] },
  { id: 'ci-cd', name: 'CI/CD', category: 'DevOps', description: 'Automated build, test, and deployment pipelines.', difficulty: 'Intermediate', related: ['Git', 'Docker', 'AWS', 'DevOps Engineer', 'Cloud Engineer'] },
  { id: 'data-engineering', name: 'Data Engineering', category: 'Data', description: 'Building resilient data pipelines and storage systems.', difficulty: 'Advanced', related: ['SQL', 'Python', 'AWS', 'Machine Learning', 'Data Engineer'] },
  { id: 'mlops', name: 'MLOps', category: 'AI', description: 'Operationalizing and monitoring machine learning systems in production.', difficulty: 'Advanced', related: ['Docker', 'AWS', 'Machine Learning', 'AI Engineer', 'Cloud Engineer'] },
  { id: 'dsa', name: 'DSA', category: 'CS', description: 'Data structures and algorithms fundamentals for engineering interviews and problem solving.', difficulty: 'Intermediate', related: ['Java', 'Python', 'Software Engineer', 'Backend Engineer', 'System Design'] },
  { id: 'security', name: 'Security', category: 'Cybersecurity', description: 'Principles and practices for secure application design and deployment.', difficulty: 'Intermediate', related: ['Linux', 'AWS', 'System Design', 'Cybersecurity Engineer', 'Cloud Engineer'] },
  { id: 'caching', name: 'Caching', category: 'Backend', description: 'Improving system speed and responsiveness with shared memory stores.', difficulty: 'Intermediate', related: ['Redis', 'System Design', 'Backend Engineer', 'Docker', 'AWS'] },
  { id: 'api-design', name: 'API Design', category: 'Backend', description: 'Designing clean interfaces for internal and external consumers.', difficulty: 'Intermediate', related: ['REST APIs', 'GraphQL', 'System Design', 'Backend Engineer', 'Full Stack Engineer'] },
  { id: 'database-design', name: 'Database Design', category: 'Database', description: 'Creating schemas and data models that scale with application needs.', difficulty: 'Intermediate', related: ['SQL', 'PostgreSQL', 'MongoDB', 'System Design', 'Data Engineer'] },
  { id: 'deployment', name: 'Deployment', category: 'DevOps', description: 'Shipping software reliably to production environments.', difficulty: 'Intermediate', related: ['Docker', 'AWS', 'CI/CD', 'Cloud Engineer', 'DevOps Engineer'] }
];

export const roles: Role[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    description: 'Builds reliable, scalable applications with a broad technical skillset.',
    level: 'Mid-Level',
    averageSalary: 170000,
    requiredSkills: ['Python', 'JavaScript', 'SQL', 'Git', 'System Design', 'Docker'],
    technologies: ['React', 'Node.js', 'AWS', 'Docker'],
    relatedRoles: ['Backend Engineer', 'Full Stack Engineer', 'Cloud Engineer']
  },
  {
    id: 'backend-engineer',
    name: 'Backend Engineer',
    description: 'Designs APIs, data flows, and resilient server-side systems.',
    level: 'Mid-Level',
    averageSalary: 190000,
    requiredSkills: ['Python', 'SQL', 'REST APIs', 'Docker', 'Redis', 'AWS', 'System Design'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
    relatedRoles: ['Software Engineer', 'Full Stack Engineer', 'Cloud Engineer', 'Data Engineer']
  },
  {
    id: 'frontend-engineer',
    name: 'Frontend Engineer',
    description: 'Creates polished user interfaces and responsive client experiences.',
    level: 'Mid-Level',
    averageSalary: 165000,
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Git', 'REST APIs', 'CSS'],
    technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    relatedRoles: ['Full Stack Engineer', 'Software Engineer', 'AI Engineer']
  },
  {
    id: 'full-stack-engineer',
    name: 'Full Stack Engineer',
    description: 'Builds end-to-end features spanning frontend, backend, and deployment.',
    level: 'Mid-Level',
    averageSalary: 180000,
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'REST APIs', 'Docker', 'AWS'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    relatedRoles: ['Backend Engineer', 'Frontend Engineer', 'Software Engineer', 'Cloud Engineer']
  },
  {
    id: 'cloud-engineer',
    name: 'Cloud Engineer',
    description: 'Builds and manages cloud-based infrastructure and automation.',
    level: 'Mid-Level',
    averageSalary: 185000,
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'System Design'],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Linux'],
    relatedRoles: ['DevOps Engineer', 'Backend Engineer', 'Software Engineer']
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'Automates infrastructure, deployments, and software delivery pipelines.',
    level: 'Mid-Level',
    averageSalary: 195000,
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD', 'Git'],
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Linux'],
    relatedRoles: ['Cloud Engineer', 'Backend Engineer', 'Software Engineer']
  },
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    description: 'Builds AI-enabled products, integrations, and ML-powered workflows.',
    level: 'Mid-Level',
    averageSalary: 200000,
    requiredSkills: ['Python', 'Machine Learning', 'LLMs', 'FastAPI', 'SQL', 'Docker'],
    technologies: ['Python', 'FastAPI', 'AWS', 'Docker', 'LLMs'],
    relatedRoles: ['Data Engineer', 'Backend Engineer', 'Software Engineer']
  },
  {
    id: 'data-engineer',
    name: 'Data Engineer',
    description: 'Builds reliable pipelines and data systems that power analytics and product features.',
    level: 'Mid-Level',
    averageSalary: 175000,
    requiredSkills: ['SQL', 'Python', 'Data Engineering', 'AWS', 'PostgreSQL', 'Docker'],
    technologies: ['PostgreSQL', 'AWS', 'Python', 'Docker'],
    relatedRoles: ['AI Engineer', 'Backend Engineer', 'Software Engineer']
  },
  {
    id: 'ml-engineer',
    name: 'ML Engineer',
    description: 'Operationalizes models and scales machine learning applications.',
    level: 'Mid-Level',
    averageSalary: 210000,
    requiredSkills: ['Python', 'Machine Learning', 'MLOps', 'System Design', 'SQL', 'Docker'],
    technologies: ['Python', 'AWS', 'Docker', 'LLMs'],
    relatedRoles: ['AI Engineer', 'Data Engineer', 'Backend Engineer']
  },
  {
    id: 'cybersecurity-engineer',
    name: 'Cybersecurity Engineer',
    description: 'Protects infrastructure, services, and product systems against threats.',
    level: 'Mid-Level',
    averageSalary: 180000,
    requiredSkills: ['Security', 'Linux', 'AWS', 'System Design', 'Python', 'Git'],
    technologies: ['AWS', 'Linux', 'Docker', 'Kubernetes'],
    relatedRoles: ['Cloud Engineer', 'Software Engineer', 'DevOps Engineer']
  }
];

export const companies: Company[] = [
  { id: 'amazon', name: 'Amazon', industry: 'Technology', size: 'Enterprise', website: 'amazon.com', roles: ['Software Engineer', 'Backend Engineer', 'Cloud Engineer'], technologies: ['AWS', 'Docker', 'Kubernetes', 'Python'], looksFor: ['System Design', 'AWS', 'SQL', 'Python'] },
  { id: 'microsoft', name: 'Microsoft', industry: 'Technology', size: 'Enterprise', website: 'microsoft.com', roles: ['Software Engineer', 'Full Stack Engineer', 'Cloud Engineer'], technologies: ['Azure', 'Docker', 'React', 'TypeScript'], looksFor: ['Azure', 'TypeScript', 'System Design', 'Cloud Engineering'] },
  { id: 'google', name: 'Google', industry: 'Technology', size: 'Enterprise', website: 'google.com', roles: ['Software Engineer', 'Data Engineer', 'AI Engineer'], technologies: ['Python', 'Docker', 'Kubernetes', 'SQL'], looksFor: ['Python', 'System Design', 'Machine Learning', 'SQL'] },
  { id: 'wexa-ai', name: 'Wexa AI', industry: 'AI', size: 'Growth', website: 'wexa.ai', roles: ['AI Engineer', 'Data Engineer', 'Software Engineer'], technologies: ['Python', 'FastAPI', 'LLMs', 'Docker'], looksFor: ['LLMs', 'FastAPI', 'Machine Learning', 'AWS'] },
  { id: 'tcs', name: 'TCS', industry: 'IT Services', size: 'Enterprise', website: 'tcs.com', roles: ['Software Engineer', 'Full Stack Engineer', 'Backend Engineer'], technologies: ['Java', 'AWS', 'React', 'SQL'], looksFor: ['Java', 'SQL', 'System Design', 'JavaScript'] },
  { id: 'infosys', name: 'Infosys', industry: 'IT Services', size: 'Enterprise', website: 'infosys.com', roles: ['Software Engineer', 'Cloud Engineer', 'Data Engineer'], technologies: ['Java', 'AWS', 'Docker', 'SQL'], looksFor: ['Java', 'AWS', 'SQL', 'Docker'] },
  { id: 'deloitte', name: 'Deloitte', industry: 'Consulting', size: 'Enterprise', website: 'deloitte.com', roles: ['Cloud Engineer', 'Data Engineer', 'Software Engineer'], technologies: ['Azure', 'Docker', 'Python', 'SQL'], looksFor: ['Azure', 'Python', 'Cloud', 'System Design'] },
  { id: 'accenture', name: 'Accenture', industry: 'Consulting', size: 'Enterprise', website: 'accenture.com', roles: ['Full Stack Engineer', 'DevOps Engineer', 'Cloud Engineer'], technologies: ['Azure', 'Docker', 'Kubernetes', 'JavaScript'], looksFor: ['Docker', 'Kubernetes', 'JavaScript', 'CI/CD'] },
  { id: 'wipro', name: 'Wipro', industry: 'IT Services', size: 'Enterprise', website: 'wipro.com', roles: ['Software Engineer', 'Backend Engineer', 'DevOps Engineer'], technologies: ['Java', 'AWS', 'Docker', 'Linux'], looksFor: ['Java', 'Docker', 'AWS', 'Linux'] },
  { id: 'salesforce', name: 'Salesforce', industry: 'CRM', size: 'Enterprise', website: 'salesforce.com', roles: ['Full Stack Engineer', 'AI Engineer', 'Backend Engineer'], technologies: ['JavaScript', 'Node.js', 'React', 'AWS'], looksFor: ['React', 'Node.js', 'API Design', 'SQL'] }
];

export const projects: Project[] = [
  { id: 'ai-trip-planner', name: 'AI Trip Planner', description: 'Multi-stop itinerary planner with AI recommendations and route optimization.', technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'AWS', 'Docker'], demonstrates: ['Full Stack Engineer', 'Backend Engineer', 'Cloud Engineer', 'AI Engineer'] },
  { id: 'fleet-analytics', name: 'Fleet Analytics', description: 'Data warehouse for operational telemetry and forecasting.', technologies: ['Python', 'PostgreSQL', 'Docker', 'AWS'], demonstrates: ['Data Engineer', 'Backend Engineer', 'Cloud Engineer'] },
  { id: 'secure-api-gateway', name: 'Secure API Gateway', description: 'Gateway service with authentication, rate limits, and observability.', technologies: ['Node.js', 'Docker', 'AWS', 'Redis'], demonstrates: ['Backend Engineer', 'Cloud Engineer', 'DevOps Engineer'] },
  { id: 'ml-ops-dashboard', name: 'ML Ops Dashboard', description: 'Monitoring and deployment interface for ML model pipelines.', technologies: ['React', 'Python', 'Docker', 'AWS'], demonstrates: ['AI Engineer', 'ML Engineer', 'Cloud Engineer'] },
  { id: 'microservice-shop', name: 'Microservice Shop', description: 'Distributed commerce platform with multi-service architecture.', technologies: ['Java', 'Docker', 'Kubernetes', 'AWS'], demonstrates: ['Software Engineer', 'Backend Engineer', 'Cloud Engineer'] }
];

export const initialUserProfile: UserProfile = {
  id: 'alex-01',
  name: 'Alex Morgan',
  experienceLevel: 'Entry Level',
  location: 'Hyderabad',
  education: 'B.Tech in Computer Science',
  skills: ['Python', 'SQL', 'React', 'Docker', 'Git'],
  targetRoles: ['Backend Engineer', 'Full Stack Engineer', 'Cloud Engineer'],
  projects: ['AI Trip Planner', 'Secure API Gateway']
};

export const graphNodes = [
  { id: 'Python', type: 'skill', x: 160, y: 200 },
  { id: 'SQL', type: 'skill', x: 290, y: 110 },
  { id: 'Docker', type: 'skill', x: 450, y: 200 },
  { id: 'AWS', type: 'skill', x: 620, y: 110 },
  { id: 'Backend Engineer', type: 'role', x: 340, y: 300 },
  { id: 'Cloud Engineer', type: 'role', x: 560, y: 300 },
  { id: 'Full Stack Engineer', type: 'role', x: 420, y: 430 },
  { id: 'Amazon', type: 'company', x: 760, y: 250 },
  { id: 'Wexa AI', type: 'company', x: 760, y: 420 },
  { id: 'FastAPI', type: 'skill', x: 150, y: 430 }
];

export const graphConnections = [
  ['Python', 'Backend Engineer'],
  ['SQL', 'Backend Engineer'],
  ['Docker', 'Backend Engineer'],
  ['AWS', 'Cloud Engineer'],
  ['Docker', 'Cloud Engineer'],
  ['Python', 'AI Engineer'],
  ['FastAPI', 'Backend Engineer'],
  ['Backend Engineer', 'Amazon'],
  ['Cloud Engineer', 'Amazon'],
  ['Backend Engineer', 'Full Stack Engineer'],
  ['Full Stack Engineer', 'Wexa AI'],
  ['Docker', 'AWS']
];

export const technologyCatalog = ['Python', 'React', 'Node.js', 'Docker', 'AWS', 'Kubernetes', 'Azure', 'TypeScript', 'PostgreSQL', 'Redis'];

export const careerPathExamples: Record<string, string[]> = {
  'Frontend Engineer': ['Full Stack Engineer', 'Backend Engineer', 'AI Engineer'],
  'Software Engineer': ['Backend Engineer', 'Cloud Engineer', 'AI Engineer'],
  'Backend Engineer': ['Cloud Engineer', 'AI Engineer', 'Data Engineer'],
  'Cloud Engineer': ['DevOps Engineer', 'AI Engineer', 'Backend Engineer']
};

export const globalSearchCatalog = [...skillCatalog.map(item => item.name), ...roles.map(role => role.name), ...companies.map(company => company.name), ...projects.map(project => project.name), ...technologyCatalog];

export const roleLookup = Object.fromEntries(roles.map((role) => [role.name, role]));
