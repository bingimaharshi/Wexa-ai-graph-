import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'backend-engineer', name: 'Backend Engineer' },
      { id: 'full-stack-engineer', name: 'Full Stack Engineer' },
      { id: 'cloud-engineer', name: 'Cloud Engineer' },
    ],
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: { id: req.params.id, name: req.params.id },
  });
});

export default router;
