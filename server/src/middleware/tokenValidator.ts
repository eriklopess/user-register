import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/token';

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      error: {
        message: 'No token provided',
      },
    });
  }

  try {
    verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: 'Invalid token',
      },
    });
  }
};

export default tokenValidator;
