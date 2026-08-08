import type { Request, Response } from 'express';
import { successResponse } from '../utils/response.js';

const mockUser = {
  id: 'alex-01',
  name: 'Alex Morgan',
  experienceLevel: 'Entry Level',
  location: 'Hyderabad',
  education: 'B.Tech in Computer Science',
  skills: ['Python', 'SQL', 'React', 'Docker', 'Git'],
  targetRoles: ['Backend Engineer', 'Full Stack Engineer', 'Cloud Engineer'],
};

export const getUserProfile = (_req: Request, res: Response) => {
  res.json(successResponse(mockUser));
};

export const updateUserProfile = (req: Request, res: Response) => {
  const payload = req.body ?? {};
  res.json(successResponse({ ...mockUser, ...payload }));
};
