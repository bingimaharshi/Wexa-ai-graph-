import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'amazon', name: 'Amazon', industry: 'Technology' },
      { id: 'microsoft', name: 'Microsoft', industry: 'Technology' },
      { id: 'wexa-ai', name: 'Wexa AI', industry: 'AI' },
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
