import {
  afterEach,
  beforeEach,
  describe, expect, test, vi,
} from 'vitest';
import { ZodError } from 'zod';
import UserService from '../../../services/User.service';
import model from '../../../model/__mocks__/User.model';
import {
  invalidUserEmail, invalidUserName, invalidUserPassword, newUser, oldUser,
} from '../../objects';

vi.mock('../../../model/User.model');

describe('UserService', () => {
  describe('UserService/CREATE', async () => {
    const service = new UserService(model);

    beforeEach(() => {
      model.create.mockResolvedValue({ ...newUser, id: 1 });
    });

    afterEach(() => {
      model.create.mockReset();
    });

    test('create should return the generated user', async () => {
      const user = await service.create(newUser);
      expect(user).toStrictEqual({ ...newUser, id: 1 });
    });

    test('create should return an invalid email error', async () => {
      const user = await service.create(invalidUserEmail) as { error: ZodError };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.errors[0].message).toEqual('Invalid email');
    });

    test('create should return an invalid name error', async () => {
      const user = await service.create(invalidUserName) as { error: ZodError };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.errors[0].message).toEqual('Name must contain at least 3 character(s)');
    });

    test('create should return an invalid password error', async () => {
      const user = await service.create(invalidUserPassword) as { error: ZodError };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.errors[0].message).toEqual('Password must contain at least 6 character(s)');
    });
  });

  describe('UserService/UPDATE', async () => {
    beforeEach(() => {
      model.update.mockResolvedValue({ ...newUser, id: 1 });
    });

    afterEach(() => {
      model.update.mockReset();
    });

    test('update should return the updated user', async () => {
      const service = new UserService(model);
      const user = await service.update(1, newUser);
      expect(user).toStrictEqual({ ...newUser, id: 1 });
    });

    test('update should return an invalid email error', async () => {
      const service = new UserService(model);
      const user = await service.update(1, invalidUserEmail) as { error: ZodError };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.errors[0].message).toEqual('Invalid email');
    });

    test('update should return an invalid name error', async () => {
      const service = new UserService(model);
      const user = await service.update(1, invalidUserName) as { error: ZodError };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.errors[0].message).toEqual('Name must contain at least 3 character(s)');
    });

    test('update should return an invalid password error', async () => {
      const service = new UserService(model);
      const user = await service.update(1, invalidUserPassword) as { error: ZodError };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.errors[0].message).toEqual('Password must contain at least 6 character(s)');
    });

    test('update should return an User not found error', async () => {
      model.findOne.mockResolvedValue(null);
      const service = new UserService(model);
      const user = await service.update(2, newUser) as { error: Error };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.message).toEqual('User not found');
    });
  });

  describe('UserService/DELETE', async () => {
    beforeEach(() => {
      model.delete.mockResolvedValue({ ...newUser, id: 1 });
    });

    afterEach(() => {
      model.delete.mockReset();
    });

    test('delete should return the deleted user', async () => {
      const service = new UserService(model);
      const user = await service.delete(1);
      expect(user).toStrictEqual({ ...newUser, id: 1 });
    });

    test('delete should return an User not found error', async () => {
      model.findOne.mockResolvedValue(null);
      const service = new UserService(model);
      const user = await service.delete(2) as { error: Error };
      expect(user).toHaveProperty('error');
      expect(user).toHaveProperty('error.message');
      expect(user.error.message).toEqual('User not found');
    });
  });

  describe('UserService/FIND', async () => {
    beforeEach(() => {
      model.find.mockResolvedValue([newUser]);
    });

    afterEach(() => {
      model.find.mockReset();
    });

    test('find should return the users', async () => {
      const service = new UserService(model);
      const users = await service.find();
      expect(users).toStrictEqual([newUser]);
    });

    test('find should return an empty array', async () => {
      model.find.mockResolvedValue([]);
      const service = new UserService(model);
      const users = await service.find();
      expect(users).toStrictEqual([]);
    });
  });

  describe('UserService/FIND_ONE', async () => {
    beforeEach(() => {
      model.findOne.mockResolvedValue({ ...newUser, id: 1 });
    });

    afterEach(() => {
      model.findOne.mockReset();
    });

    test('findOne should return the user', async () => {
      const service = new UserService(model);
      const user = await service.findOne(1);
      expect(user).toStrictEqual({ ...newUser, id: 1 });
    });

    test('findOne should return an User not found error', async () => {
      model.findOne.mockResolvedValue(null);
      const service = new UserService(model);
      const user = await service.findOne(2) as { error: Error };
      expect(user.error.message).toStrictEqual('User not found');
    });
  });
});
