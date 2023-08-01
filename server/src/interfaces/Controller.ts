/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

export interface RequestWithBody<T> extends Request {
    body: T;
}

export type ResponseError = {
    error: unknown;
};

export enum ControllerErrors {
    NOT_FOUND = 'Not found',
    USER_ALREADY_EXISTS = 'User already exists',
    INVALID_CREDENTIALS = 'Invalid credentials',
    INVALID_EMAIL = 'Invalid email',
    INVALID_NAME = 'Invalid name',
    INVALID_PASSWORD = 'Invalid password',
    INVALID_BIRTHDATE = 'Invalid birthdate',
    INVALID_PHOTO_URL = 'Invalid photo url',
}

export interface IController<T> {
    create: (req: RequestWithBody<T>, res: Response<T | ResponseError>) => Promise<typeof res>;
    find: (_req: Request, res: Response<T[] | ResponseError>) => Promise<typeof res>;
    findOne: (req: Request<{ id: string }>,
              res: Response<T | ResponseError>) => Promise<typeof res>;
    update: (req: RequestWithBody<T>, res: Response<T | ResponseError>) => Promise<typeof res>;
    delete: (req: Request<{ id: string }>, res: Response<T | ResponseError>) => Promise<typeof res>;
}
