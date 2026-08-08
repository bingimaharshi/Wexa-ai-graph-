import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('[CareerGraph API Error]', error.message);

  res.status(500).json({
    success: false,
    message: 'Unable to connect to CareerGraph database.',
  });
};
