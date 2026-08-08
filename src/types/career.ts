export type ExperienceLevel = 'Student' | 'Fresher' | 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';

export type NodeType = 'User' | 'Skill' | 'Role' | 'Company' | 'Technology' | 'Project' | 'Certification' | 'Course' | 'Industry' | 'Location';

export type RelationshipType =
  | 'HAS_SKILL'
  | 'BUILT'
  | 'TARGETS'
  | 'HAS_CERTIFICATION'
  | 'USES'
  | 'DEMONSTRATES'
  | 'REQUIRES'
  | 'RELATED_TO'
  | 'PREREQUISITE_OF'
  | 'TEACHES'
  | 'VALIDATES'
  | 'OFFERS'
  | 'LOOKS_FOR'
  | 'IN_INDUSTRY'
  | 'AVAILABLE_IN';

export interface UserProfileNode {
  id: string;
  name: string;
  experienceLevel: ExperienceLevel;
  location: string;
  education: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface RoleNode {
  id: string;
  name: string;
  description: string;
  level: string;
  averageSalary: number;
  difficulty?: 'Entry' | 'Intermediate' | 'Advanced';
}

export interface CompanyNode {
  id: string;
  name: string;
  industry: string;
  size: string;
  website: string;
}

export interface TechnologyNode {
  id: string;
  name: string;
  category: string;
}

export interface ProjectNode {
  id: string;
  name: string;
  description: string;
}

export interface CertificationNode {
  id: string;
  name: string;
  type: string;
}

export interface EntitySearchResult {
  type: NodeType | 'Technology';
  value: string;
}

export interface GraphAnalyticsSummary {
  nodes: number;
  relationships: number;
  skills: number;
  roles: number;
  companies: number;
  technologies: number;
}

export interface RecommendationResult {
  name: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  readiness: number;
}

export interface SkillGapResult {
  missingSkills: string[];
  readiness: number;
  matchedSkills: string[];
}

export interface PathResult {
  path: string[];
}
