import type { Request, Response } from 'express';
import { successResponse } from '../utils/response.js';

export const getHealth = (_req: Request, res: Response) => {
  res.json(
    successResponse({
      status: 'ok',
      service: 'CareerGraph AI API',
      timestamp: new Date().toISOString(),
    }),
  );
};
