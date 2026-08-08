export const careerSeedData = {
  users: [
    { id: 'u1', name: 'Alex Morgan', experienceLevel: 'Entry Level', location: 'Hyderabad', education: 'B.Tech' },
    { id: 'u2', name: 'Priya Sharma', experienceLevel: 'Junior', location: 'Bengaluru', education: 'M.Tech' },
    { id: 'u3', name: 'Rahul Iyer', experienceLevel: 'Mid-Level', location: 'Pune', education: 'B.E.' },
  ],
  skills: [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
    'Kubernetes', 'AWS', 'Azure', 'Git', 'Linux', 'REST APIs', 'GraphQL', 'System Design', 'Machine Learning',
    'Deep Learning', 'LLMs', 'Java', 'Go', 'Next.js', 'CI/CD', 'Data Engineering', 'MLOps', 'DSA', 'Security',
    'Caching', 'API Design', 'Database Design', 'Deployment'
  ],
  roles: [
    'Software Engineer', 'Backend Engineer', 'Frontend Engineer', 'Full Stack Engineer', 'Cloud Engineer',
    'DevOps Engineer', 'AI Engineer', 'Data Engineer', 'ML Engineer', 'Cybersecurity Engineer'
  ],
  companies: [
    'Amazon', 'Microsoft', 'Google', 'Wexa AI', 'TCS', 'Infosys', 'Deloitte', 'Accenture', 'Wipro', 'Salesforce'
  ],
  technologies: [
    'Python', 'React', 'Node.js', 'Docker', 'AWS', 'Kubernetes', 'Azure', 'TypeScript', 'PostgreSQL', 'Redis', 'MongoDB', 'Java', 'Go'
  ],
  projects: [
    'AI Trip Planner', 'Fleet Analytics', 'Secure API Gateway', 'ML Ops Dashboard', 'Microservice Shop'
  ],
  certifications: [
    'AWS Cloud Practitioner', 'AWS Solutions Architect', 'Azure Fundamentals', 'Google Cloud Associate', 'Kubernetes Administrator'
  ],
  courses: [
    'Python for Backend Development', 'Advanced SQL', 'System Design Foundations', 'Kubernetes for Developers', 'LLM Applications'
  ],
};

export const relationSeed = {
  userToSkill: [
    ['u1', 'Python'], ['u1', 'SQL'], ['u1', 'React'], ['u1', 'Docker'], ['u1', 'Git'],
    ['u2', 'JavaScript'], ['u2', 'TypeScript'], ['u2', 'React'], ['u2', 'Node.js'], ['u2', 'AWS'],
    ['u3', 'Python'], ['u3', 'SQL'], ['u3', 'Docker'], ['u3', 'Kubernetes'], ['u3', 'System Design'],
  ],
  roleToSkill: [
    ['Backend Engineer', 'Python'], ['Backend Engineer', 'SQL'], ['Backend Engineer', 'REST APIs'], ['Backend Engineer', 'Docker'], ['Backend Engineer', 'Redis'], ['Backend Engineer', 'AWS'], ['Backend Engineer', 'System Design'],
    ['Full Stack Engineer', 'JavaScript'], ['Full Stack Engineer', 'React'], ['Full Stack Engineer', 'Node.js'], ['Full Stack Engineer', 'SQL'], ['Full Stack Engineer', 'Docker'], ['Full Stack Engineer', 'AWS'],
    ['Cloud Engineer', 'AWS'], ['Cloud Engineer', 'Docker'], ['Cloud Engineer', 'Kubernetes'], ['Cloud Engineer', 'Linux'], ['Cloud Engineer', 'CI/CD'], ['Cloud Engineer', 'System Design'],
    ['AI Engineer', 'Python'], ['AI Engineer', 'Machine Learning'], ['AI Engineer', 'LLMs'], ['AI Engineer', 'FastAPI'], ['AI Engineer', 'SQL'], ['AI Engineer', 'Docker'],
  ],
  companyToRole: [
    ['Amazon', 'Software Engineer'], ['Amazon', 'Backend Engineer'], ['Amazon', 'Cloud Engineer'],
    ['Google', 'Software Engineer'], ['Google', 'Data Engineer'], ['Google', 'AI Engineer'],
    ['Wexa AI', 'AI Engineer'], ['Wexa AI', 'Data Engineer'], ['Wexa AI', 'Software Engineer'],
  ],
  roleToCompany: [
    ['Backend Engineer', 'Amazon'], ['Cloud Engineer', 'Amazon'], ['AI Engineer', 'Wexa AI'], ['Software Engineer', 'Google'],
  ],
};
