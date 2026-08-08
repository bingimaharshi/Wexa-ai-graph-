export interface UserProfileRequest {
  id: string;
  name: string;
  experienceLevel: string;
  location: string;
  education: string;
  skills: string[];
  targetRoles: string[];
}

export interface RecommendationResponse {
  roleName: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface GraphOverviewResponse {
  nodes: number;
  relationships: number;
  skills: number;
  roles: number;
  companies: number;
  technologies: number;
}
