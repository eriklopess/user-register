import { NextFunction, Request, Response } from 'express';

const idValidator = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!Number(id)) return res.status(400).json({ error: { message: 'Invalid id' } });
  return next();
};

export default idValidator;
