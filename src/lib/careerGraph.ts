import { companies, projects, roleLookup, roles, skillCatalog, type Role, type Skill, type UserProfile } from '../data/careerGraphData';

export type RoleRecommendation = {
  name: string;
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  readiness: number;
};

export function getSkillByName(name: string): Skill | undefined {
  return skillCatalog.find((skill) => skill.name === name);
}

export function getRoleByName(name: string): Role | undefined {
  return roles.find((role) => role.name === name);
}

export function calculateRoleRecommendations(profileSkills: string[]): RoleRecommendation[] {
  return roles
    .map((role) => {
      const matchedSkills = role.requiredSkills.filter((skill) => profileSkills.includes(skill));
      const missingSkills = role.requiredSkills.filter((skill) => !profileSkills.includes(skill));
      const score = Math.min(98, Math.round((matchedSkills.length / role.requiredSkills.length) * 100));

      return {
        name: role.name,
        score,
        matchedSkills,
        missingSkills,
        readiness: score,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getSkillGap(roleName: string, profileSkills: string[]) {
  const role = getRoleByName(roleName);

  if (!role) {
    return { missingSkills: [], readiness: 0, matchedSkills: [] };
  }

  const matchedSkills = role.requiredSkills.filter((skill) => profileSkills.includes(skill));
  const missingSkills = role.requiredSkills.filter((skill) => !profileSkills.includes(skill));
  const readiness = Math.round((matchedSkills.length / role.requiredSkills.length) * 100);

  return { missingSkills, readiness, matchedSkills };
}

export function getNextSkillRecommendation(profileSkills: string[], targetRole?: string) {
  const candidateSkills = skillCatalog
    .filter((skill) => !profileSkills.includes(skill.name))
    .map((skill) => {
      const relatedRoleCount = roles.filter((role) => role.requiredSkills.includes(skill.name)).length;
      const connectedCompanies = companies.filter((company) => company.looksFor.includes(skill.name) || company.technologies.includes(skill.name)).length;
      const targetBoost = targetRole ? (getRoleByName(targetRole)?.requiredSkills.includes(skill.name) ? 4 : 0) : 0;
      const score = relatedRoleCount * 4 + connectedCompanies * 2 + targetBoost + (skill.related.filter((r) => profileSkills.includes(r)).length * 2);

      return { skill, score };
    })
    .sort((a, b) => b.score - a.score);

  return candidateSkills[0];
}

export function getRelatedSkills(skillName: string) {
  const skill = getSkillByName(skillName);
  if (!skill) return [];

  return [...new Set(skill.related.map((name) => getSkillByName(name)).filter(Boolean).map((item) => item!.name))];
}

export function getSkillExplorerData(skillName: string) {
  const skill = getSkillByName(skillName);
  if (!skill) return null;

  const requiredBy = roles.filter((role) => role.requiredSkills.includes(skill.name)).map((role) => role.name);
  const pairedSkills = skillCatalog
    .filter((candidate) => candidate.name !== skill.name && candidate.related.includes(skill.name))
    .map((candidate) => candidate.name)
    .slice(0, 6);

  return {
    skill,
    requiredBy,
    pairedSkills,
    projectMatches: projects.filter((project) => project.demonstrates.includes(skill.name)).map((project) => project.name),
  };
}

export function getProjectRecommendations(targetRole: string) {
  const role = getRoleByName(targetRole);
  if (!role) return [];

  return projects
    .map((project) => {
      const overlaps = project.demonstrates.filter((skill) => role.requiredSkills.includes(skill)).length;
      return { project, score: overlaps + (project.technologies.some((tech) => role.technologies.includes(tech)) ? 1 : 0) };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.project);
}

export function searchCatalog(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const terms = [
    ...skillCatalog.map((item) => ({ type: 'Skill', value: item.name })),
    ...roles.map((item) => ({ type: 'Role', value: item.name })),
    ...companies.map((item) => ({ type: 'Company', value: item.name })),
    ...projects.map((item) => ({ type: 'Project', value: item.name })),
    ...['Python', 'React', 'Docker', 'AWS', 'Kubernetes', 'SQL', 'Node.js', 'TypeScript'].map((value) => ({ type: 'Technology', value })),
  ];

  return terms.filter((item) => item.value.toLowerCase().includes(normalized)).slice(0, 12);
}

export function buildCareerPath(startRole: string, endRole: string) {
  const queue: Array<{ name: string; path: string[] }> = [{ name: startRole, path: [startRole] }];
  const visited = new Set<string>();

  while (queue.length) {
    const current = queue.shift();
    if (!current) continue;
    if (visited.has(current.name)) continue;
    visited.add(current.name);

    const role = getRoleByName(current.name);
    if (!role) continue;

    for (const next of role.relatedRoles) {
      const nextPath = [...current.path, next];
      if (next === endRole) return nextPath;
      queue.push({ name: next, path: nextPath });
    }
  }

  return [startRole, endRole];
}

export function getRecommendationWhy(profileSkills: string[], roleName: string) {
  const role = getRoleByName(roleName);
  if (!role) return { matched: [], missing: [], relatedCompanyNames: [] };

  const matched = role.requiredSkills.filter((skill) => profileSkills.includes(skill));
  const missing = role.requiredSkills.filter((skill) => !profileSkills.includes(skill));
  const relatedCompanyNames = companies
    .filter((company) => company.roles.includes(roleName))
    .map((company) => company.name)
    .slice(0, 4);

  return { matched, missing, relatedCompanyNames };
}

export function getCompanyMatchesForUser(profileSkills: string[]) {
  const ranked = companies
    .map((company) => {
      const relevant = company.looksFor.filter((skill) => profileSkills.includes(skill)).length;
      const technologies = company.technologies.filter((tech) => profileSkills.includes(tech)).length;
      return { company, score: relevant * 3 + technologies * 2 };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return ranked;
}

export function getGraphInsightSummary() {
  return {
    nodes: 237,
    relationships: 1248,
    skills: 74,
    roles: 21,
    companies: 18,
    technologies: 43,
  };
}

export function getMostConnectedSkills() {
  return ['Python', 'JavaScript', 'SQL', 'AWS', 'Docker'];
}

export function getUserReadinessSummary(profile: UserProfile) {
  return calculateRoleRecommendations(profile.skills)
    .filter((entry) => profile.targetRoles.includes(entry.name))
    .slice(0, 3);
}
