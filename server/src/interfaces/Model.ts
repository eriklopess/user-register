/* eslint-disable no-unused-vars */

export interface IModel<T> {
    findOne(id: number): Promise<T | null>;
    find(skip: number, take: number): Promise<T[]>;
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<T>;
}
