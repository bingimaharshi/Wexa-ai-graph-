import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'python', name: 'Python', category: 'Language' },
      { id: 'sql', name: 'SQL', category: 'Database' },
      { id: 'docker', name: 'Docker', category: 'DevOps' },
    ],
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.params.id,
      name: req.params.id,
      category: 'CareerGraph',
    },
  });
});

export default router;
