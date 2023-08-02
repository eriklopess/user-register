import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../enviroment';

export const generateToken = (email: string) => jwt.sign({ email }, JWT_SECRET as string, {
  expiresIn: '1d',
});

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET as string);
