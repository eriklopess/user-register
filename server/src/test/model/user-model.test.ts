// eslint-disable-next-line import/no-extraneous-dependencies
import {
  describe, expect, test, vi,
} from 'vitest';
import UserModel from '../../model/User.model';
import { IUser } from '../../interfaces/User';
import prisma from '../../database/__mocks__/prisma';

vi.mock('../../database/prisma');

const newUser: IUser = {
  name: 'John Doe',
  email: 'john@gmail.com',
  birthDate: new Date(),
  photoUrl: 'https://google.com',
  password: '123456',
};

describe('UserModel', async () => {
  test('create should return the generated user', async () => {
    prisma.user.create.mockResolvedValue({ ...newUser, id: 1 });
    const model = new UserModel(prisma);
    const user = await model.create(newUser);
    expect(user).toStrictEqual({ ...newUser, id: 1 });
  });

  test('update should return the updated user', async () => {
    prisma.user.update.mockResolvedValue({ ...newUser, id: 1 });
    const model = new UserModel(prisma);
    const user = await model.update(1, newUser);
    expect(user).toStrictEqual({ ...newUser, id: 1 });
  });

  test('findOne should return the user', async () => {
    prisma.user.findFirst.mockResolvedValue({ ...newUser, id: 1 });
    const model = new UserModel(prisma);
    const user = await model.findOne(1);
    expect(user).toStrictEqual({ ...newUser, id: 1 });
  });

  test('find should return an empty array', async () => {
    prisma.user.findMany.mockResolvedValue([]);
    const model = new UserModel(prisma);
    const user = await model.find();
    expect(user).toStrictEqual([]);
  });

  test('find should return an array', async () => {
    prisma.user.findMany.mockResolvedValue([{ ...newUser, id: 1 }]);
    const model = new UserModel(prisma);
    const user = await model.find();
    expect(user).toStrictEqual([{ ...newUser, id: 1 }]);
  });

  test('delete should return the deleted user', async () => {
    prisma.user.delete.mockResolvedValue({ ...newUser, id: 1 });
    const model = new UserModel(prisma);
    const user = await model.delete(1);
    expect(user).toStrictEqual({ ...newUser, id: 1 });
  });
});
