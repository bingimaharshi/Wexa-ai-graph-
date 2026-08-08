import { Router } from 'express';
import { getCareerPath, getGraphOverview } from '../controllers/graph.controller.js';

const router = Router();

router.get('/overview', getGraphOverview);
router.get('/career-path', getCareerPath);
router.get('/explore', (_req, res) => {
  res.json({
    success: true,
    data: {
      nodes: [
        { id: 'Python', type: 'Skill' },
        { id: 'Docker', type: 'Skill' },
        { id: 'Backend Engineer', type: 'Role' },
        { id: 'Amazon', type: 'Company' },
      ],
      edges: [
        { source: 'Python', target: 'Backend Engineer', type: 'REQUIRES' },
        { source: 'Docker', target: 'Backend Engineer', type: 'REQUIRES' },
        { source: 'Backend Engineer', target: 'Amazon', type: 'OFFERED_BY' },
      ],
    },
  });
});

export default router;
