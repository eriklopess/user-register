/* eslint-disable no-unused-vars */

import { UserFindParams } from './Service';

export interface IModel<T, U> {
    findOne(id: number): Promise<T | null>;
    find(params: UserFindParams): Promise<U[]>;
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<T>;
}
