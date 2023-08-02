/* eslint-disable class-methods-use-this */
import { PrismaClient } from '@prisma/client';
import { IUser, IUserUpdate } from '../interfaces/User';
import prismaClient from '../database/prisma';
import { IModel } from '../interfaces/Model';
import { UserFindParams } from '../interfaces/Service';

export default class UserModel implements IModel<IUser> {
  private repository;

  constructor(repository = new PrismaClient()) {
    this.repository = repository;
  }

  create = async (data: IUser): Promise<IUser> => prismaClient.user.create({
    data,
  });

  update = async (id: number, data: IUserUpdate): Promise<IUser> => prismaClient.user.update({
    where: { id },
    data,
  });

  findOne = async (id: number): Promise<IUser | null> => prismaClient.user.findFirst({
    where: { id },
  });

  find = async (
    {
      skip = 0,
      limit = 10,
      email = '',
      name = '',
    }: UserFindParams,
  ): Promise<IUser[]> => prismaClient.user.findMany({
    skip,
    take: limit,
    where: {
      email: {
        contains: email,
      },
      name: {
        contains: name,
      },
    },
  });

  findByEmail = async (email: string): Promise<IUser | null> => prismaClient.user.findFirst({
    where: { email },
  });

  delete = async (id: number): Promise<IUser> => prismaClient.user.delete({
    where: { id },
  });
}
