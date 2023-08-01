/* eslint-disable no-unused-vars */

import { ZodError } from 'zod';

export interface ServiceError {
    error: ZodError | Error;
}
export interface Service<T> {
    create: (data: T) => Promise<T | ServiceError>;
    find: (skip: number, limit: number) => Promise<T[]>;
    findOne: (id: number) => Promise<T | ServiceError>;
    update: (id: number, data: T) => Promise<T | ServiceError>;
    delete: (id: number) => Promise<T | ServiceError>;
}
