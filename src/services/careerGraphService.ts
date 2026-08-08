import { companies, initialUserProfile, projects, roles, skillCatalog, type UserProfile } from '../data/careerGraphData';
import { getRecommendationWhy, calculateRoleRecommendations, getSkillGap, getNextSkillRecommendation, getProjectRecommendations, searchCatalog, buildCareerPath } from '../lib/careerGraph';

export const careerGraphService = {
  getDashboardSummary(profile: UserProfile) {
    return {
      profile,
      recommendations: calculateRoleRecommendations(profile.skills).slice(0, 4),
      nextSkill: getNextSkillRecommendation(profile.skills, profile.targetRoles[0]),
      summary: {
        totalSkills: profile.skills.length,
        totalProjects: profile.projects.length,
        targetRoles: profile.targetRoles.length,
      },
    };
  },

  getRoleRecommendations(profile: UserProfile) {
    return calculateRoleRecommendations(profile.skills);
  },

  getSkillGap(profile: UserProfile, targetRole: string) {
    return getSkillGap(targetRole, profile.skills);
  },

  getCareerPath(startRole: string, endRole: string) {
    return buildCareerPath(startRole, endRole);
  },

  getSearchResults(query: string) {
    return searchCatalog(query);
  },

  getProjectRecommendations(targetRole: string) {
    return getProjectRecommendations(targetRole);
  },

  getRecommendationReasoning(profile: UserProfile, role: string) {
    return getRecommendationWhy(profile.skills, role);
  },

  getCompaniesForProfile(profile: UserProfile) {
    return companies
      .map((company) => {
        const overlap = company.looksFor.filter((skill) => profile.skills.includes(skill)).length;
        return { company, overlap };
      })
      .filter((entry) => entry.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap);
  },

  getGraphOverview() {
    return {
      nodes: 237,
      relationships: 1248,
      skills: skillCatalog.length,
      roles: roles.length,
      companies: companies.length,
      technologies: 43,
      projects: projects.length,
    };
  },

  getUser() {
    return initialUserProfile;
  },
};
