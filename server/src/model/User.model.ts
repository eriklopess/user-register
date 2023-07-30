/* eslint-disable class-methods-use-this */
import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/User';
import prismaClient from '../database/prisma';

export default class UserModel {
  private repository;

  constructor(repository: PrismaClient) {
    this.repository = repository;
  }

  create = async (data: IUser): Promise<IUser> => prismaClient.user.create({
    data,
  });

  update = async (id: number, data: IUser): Promise<IUser> => prismaClient.user.update({
    where: { id },
    data,
  });

  findOne = async (id: number): Promise<IUser | null> => prismaClient.user.findFirst({
    where: { id },
  });

  find = async (): Promise<IUser[]> => prismaClient.user.findMany({ });

  delete = async (id: number): Promise<IUser> => prismaClient.user.delete({
    where: { id },
  });
}
