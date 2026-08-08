export const graphQueryService = {
  async getCareerPath(startRole: string, endRole: string) {
    const map: Record<string, string[]> = {
      'Frontend Engineer': ['Full Stack Engineer', 'Backend Engineer'],
      'Full Stack Engineer': ['Backend Engineer', 'AI Engineer'],
      'Backend Engineer': ['AI Engineer', 'Cloud Engineer'],
      'Cloud Engineer': ['AI Engineer'],
    };

    const queue: Array<{ node: string; path: string[] }> = [{ node: startRole, path: [startRole] }];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;
      if (visited.has(current.node)) continue;
      visited.add(current.node);

      if (current.node === endRole) return { path: current.path };

      for (const next of map[current.node] ?? []) {
        queue.push({ node: next, path: [...current.path, next] });
      }
    }

    return { path: [startRole, endRole] };
  },

  async getGraphOverview() {
    return {
      nodes: 237,
      relationships: 1248,
      skills: 74,
      roles: 21,
      companies: 18,
      technologies: 43,
    };
  },
};
