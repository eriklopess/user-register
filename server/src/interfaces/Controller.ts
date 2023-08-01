/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

export interface RequestWithBody<T> extends Request {
    body: T;
}

export type ResponseError = {
    error: unknown;
};

export type LoginResponse = {
    token: string;
    user: {
        email: string;
        name: string;
        photoUrl: string;
    };
}

export type GetAllResponse<T> = {
    data: T[],
    info: {
        page: number,
        limit: number,
        totalPages: number,
        nextPage: string,
    }
}

export interface IController<T, > {
    create: (req: RequestWithBody<T>, res: Response<T | ResponseError>) => Promise<typeof res>;
    find: (_req: Request, res: Response<GetAllResponse<T> | ResponseError>) => Promise<typeof res>;
    findOne: (req: Request<{ id: string }>,
              res: Response<T | ResponseError>) => Promise<typeof res>;
    update: (req: RequestWithBody<T>, res: Response<T | ResponseError>) => Promise<typeof res>;
    delete: (req: Request<{ id: string }>, res: Response<T | ResponseError>) => Promise<typeof res>;
}
