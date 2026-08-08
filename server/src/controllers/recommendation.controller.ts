import type { Request, Response } from 'express';
import { recommendationService } from '../services/recommendation.service.js';
import { successResponse } from '../utils/response.js';

export const getRecommendations = async (req: Request, res: Response) => {
  const userSkills = Array.isArray(req.query.skills)
    ? req.query.skills.map(String)
    : typeof req.query.skills === 'string'
      ? [req.query.skills]
      : ['Python', 'SQL', 'React', 'Docker'];

  const data = await recommendationService.getRoleRecommendations(userSkills);
  res.json(successResponse(data));
};

export const getSkillGap = async (req: Request, res: Response) => {
  const roleName = String(req.params.roleName ?? 'Backend Engineer');
  const userSkills = Array.isArray(req.query.skills)
    ? req.query.skills.map(String)
    : typeof req.query.skills === 'string'
      ? [req.query.skills]
      : ['Python', 'SQL', 'Docker'];

  const data = await recommendationService.getSkillGapForRole(roleName, userSkills);
  res.json(successResponse(data));
};
