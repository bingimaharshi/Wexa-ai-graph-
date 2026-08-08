export type GraphEntity = {
  name: string;
  type: 'Skill' | 'Role' | 'Company' | 'Project' | 'Technology';
};

export const graphRepository = {
  async getOverview() {
    return {
      nodes: 237,
      relationships: 1248,
      skills: 74,
      roles: 21,
      companies: 18,
      technologies: 43,
    };
  },

  async search(term: string) {
    const catalog = [
      'Python',
      'Backend Engineer',
      'AWS',
      'Amazon',
      'Docker',
      'React',
      'Cloud Engineer',
      'Wexa AI',
      'AI Engineer',
    ];

    return catalog
      .filter((item) => item.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 10)
      .map((item) => ({ value: item, type: item.includes('Engineer') ? 'Role' : item.includes('AI') || item.includes('Amazon') || item.includes('Wexa') ? 'Company' : 'Skill' }));
  },
};
