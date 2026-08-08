import type { Request, Response } from 'express';
import { graphRepository } from '../repositories/graph.repository.js';
import { successResponse } from '../utils/response.js';

export const searchEntities = async (req: Request, res: Response) => {
  const query = String(req.query.q ?? '').trim();

  if (!query) {
    res.json(successResponse([]));
    return;
  }

  const data = await graphRepository.search(query);
  res.json(successResponse(data));
};
