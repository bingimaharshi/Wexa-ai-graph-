export const recommendationService = {
  async getRoleRecommendations(userSkills: string[]) {
    const roleFit = [
      { roleName: 'Backend Engineer', score: 87, matchedSkills: ['Python', 'SQL', 'Docker'], missingSkills: ['Redis', 'AWS', 'System Design'] },
      { roleName: 'Software Engineer', score: 81, matchedSkills: ['Python', 'JavaScript', 'Git'], missingSkills: ['System Design', 'Docker'] },
      { roleName: 'Data Engineer', score: 69, matchedSkills: ['Python', 'SQL'], missingSkills: ['AWS', 'Data Engineering'] },
      { roleName: 'Cloud Engineer', score: 58, matchedSkills: ['Docker', 'AWS'], missingSkills: ['Kubernetes', 'Linux'] },
    ];

    return roleFit
      .filter((entry) => userSkills.some((skill) => entry.matchedSkills.includes(skill)) || entry.score > 50)
      .map((entry) => ({ ...entry }));
  },

  async getSkillGapForRole(roleName: string, userSkills: string[]) {
    const required = {
      'Backend Engineer': ['Python', 'SQL', 'REST APIs', 'Docker', 'Redis', 'AWS', 'System Design'],
      'Full Stack Engineer': ['JavaScript', 'React', 'Node.js', 'SQL', 'Docker', 'AWS'],
      'Cloud Engineer': ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'System Design'],
    };

    const targetSkills = required[roleName as keyof typeof required] ?? ['Python'];
    const matchedSkills = targetSkills.filter((skill) => userSkills.includes(skill));
    const missingSkills = targetSkills.filter((skill) => !userSkills.includes(skill));

    return {
      roleName,
      missingSkills,
      matchedSkills,
      readiness: Math.round((matchedSkills.length / targetSkills.length) * 100),
    };
  },
};
