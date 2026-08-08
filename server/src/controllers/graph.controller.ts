import type { Request, Response } from 'express';
import { graphQueryService } from '../services/graphQuery.service.js';
import { successResponse } from '../utils/response.js';

export const getGraphOverview = async (_req: Request, res: Response) => {
  const data = await graphQueryService.getGraphOverview();
  res.json(successResponse(data));
};

export const getCareerPath = async (req: Request, res: Response) => {
  const startRole = String(req.query.startRole ?? 'Frontend Engineer');
  const endRole = String(req.query.endRole ?? 'AI Engineer');
  const data = await graphQueryService.getCareerPath(startRole, endRole);
  res.json(successResponse(data));
};
