import { Router } from 'express';

const router = Router();

router.get('/skills', (_req, res) => {
  res.json({
    success: true,
    data: [
      { skill: 'Python', connectedRoles: 12 },
      { skill: 'AWS', connectedRoles: 9 },
      { skill: 'Docker', connectedRoles: 8 },
    ],
  });
});

export default router;
