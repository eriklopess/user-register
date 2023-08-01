/* eslint-disable import/no-extraneous-dependencies */
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe, expect, test, vi,
} from 'vitest';
import request from 'supertest';

import {
  invalidUserEmail, invalidUserName, invalidUserPassword, newUser,
} from '../../objects';
import { seed, usersData } from '../../../database/seed';
import prisma from '../../../database/prisma';
import { PORT } from '../../../enviroment';

vi.mock('../../../services/User.service');

describe('UserController', () => {
  const URL = `http://localhost:${PORT}/api/v1`;

  beforeAll(async () => {
    await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
  });

  describe('UserController/POST', () => {
    afterEach(async () => {
      await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
    });
    test('post should return the generated user', async () => {
      await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
      const response = await request(URL).post('/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...newUser,
        id: 1,
        birthDate: new Date(newUser.birthDate).toISOString(),
      });
    });

    test('post should return an invalid name error', async () => {
      const response = await request(URL).post('/users').send(invalidUserName);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Name must contain at least 3 character(s)');
    });

    test('post should return an invalid email error', async () => {
      const response = await request(URL).post('/users').send(invalidUserEmail);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Invalid email');
    });

    test('post should return an invalid password error', async () => {
      const response = await request(URL).post('/users').send(invalidUserPassword);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Password must contain at least 6 character(s)');
    });

    test('post should return an user already exists error', async () => {
      await request(URL).post('/users').send(newUser);
      const response = await request(URL).post('/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User already exists');
    });
  });

  describe('UserController/GET', () => {
    test('get should return an array', async () => {
      const response = await request(URL).get('/users');

      expect(response.status).toBe(200);
    });
  });

  describe('UserController/GET/:id', () => {
    beforeEach(async () => {
      await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
      await seed();
    });
    test('get should return an user', async () => {
      const response = await request(URL).get('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...usersData[0],
        id: 1,
        birthDate: new Date(usersData[0].birthDate).toISOString(),
      });
    });

    test('get should return an user not found error', async () => {
      const response = await request(URL).get('/users/99999').send(newUser);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User not found');
    });
  });

  describe('UserController/PUT/:id', () => {
    beforeEach(async () => {
      await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
      await seed();
    });
    test('put should return the updated user', async () => {
      const response = await request(URL).put('/users/1').send(newUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        ...newUser,
        id: 1,
        birthDate: new Date(newUser.birthDate).toISOString(),
      });
    });

    test('put should return an invalid name error', async () => {
      const response = await request(URL).put('/users/1').send(invalidUserName);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Name must contain at least 3 character(s)');
    });

    test('put should return an invalid email error', async () => {
      const response = await request(URL).put('/users/1').send(invalidUserEmail);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Invalid email');
    });

    test('put should return an invalid password error', async () => {
      const response = await request(URL).put('/users/1').send(invalidUserPassword);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Password must contain at least 6 character(s)');
    });

    test('put should return an user not found error', async () => {
      const response = await request(URL).put('/users/1000').send(newUser);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User not found');
    });
  });

  describe('UserController/DELETE/:id', () => {
    test('delete should return the deleted user', async () => {
      await seed();
      const response = await request(URL).delete('/users/1');

      expect(response.status).toBe(204);
    });

    test('delete should return an user not found error', async () => {
      const response = await request(URL).delete('/users/1');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User not found');
    });
  });
});
