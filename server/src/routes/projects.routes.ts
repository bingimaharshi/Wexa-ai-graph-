import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'ai-trip-planner', name: 'AI Trip Planner', description: 'AI-powered travel planner' },
      { id: 'fleet-analytics', name: 'Fleet Analytics', description: 'Analytics and monitoring dashboard' },
    ],
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    data: { ...req.body, id: 'new-project' },
  });
});

export default router;
