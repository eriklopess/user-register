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
      expect(response.body).toContain({
        ...newUser,
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
    beforeEach(async () => {
      await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
      await seed();
    });
    test('get should return an array', async () => {
      const response = await request(URL).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('info');
      expect(response.body).toHaveProperty('info.limit');
      expect(response.body).toHaveProperty('info.page');
      expect(response.body).toHaveProperty('info.totalPages');
      expect(response.body).toHaveProperty('info.nextPage');

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('get should return page two', async () => {
      const response = await request(URL).get('/users/?page=2');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('info');
      expect(response.body).toHaveProperty('info.limit');
      expect(response.body).toHaveProperty('info.page');
      expect(response.body.info.page).toBe(2);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data.length > 0).toBe(true);
    });

    test("get shouldn't return next page", async () => {
      const response = await request(URL).get('/users/?page=2');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('info');
      expect(response.body).toHaveProperty('info.nextPage');
      expect(response.body.info.nextPage.length).toBe(0);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data.length > 0).toBe(true);
    });

    test('get should return an empty array', async () => {
      const response = await request(URL).get('/users/?page=99999');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');

      expect(response.body.data.length).toBe(0);
    });

    test('get should return an item in array - filter name', async () => {
      await seed();
      const response = await request(URL).get(`/users/?name=${usersData[0].name}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);

      expect(response.body.data[0]).toStrictEqual({
        ...usersData[0],
        id: 1,
        birthDate: new Date(usersData[0].birthDate).toISOString(),
      });
    });

    test('get should return an item in array - filter email', async () => {
      const response = await request(URL).get(`/users/?email=${usersData[0].email}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);

      expect(response.body.data[0]).toStrictEqual({
        ...usersData[0],
        id: 1,
        birthDate: new Date(usersData[0].birthDate).toISOString(),
      });
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

    test('get should return an error invalid id', async () => {
      const response = await request(URL).get('/users/invalidId');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toBe('Invalid id');
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

    test('put should return an invalid id error', async () => {
      const response = await request(URL).put('/users/invalidId').send(invalidUserName);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toBe('Invalid id');
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

    test('delete should return an invalid id error', async () => {
      const response = await request(URL).delete('/users/invalidId');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Invalid id');
    });
  });

  describe('UserController/LOGIN', () => {
    beforeEach(async () => {
      await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
      await seed();
    });

    test('login should return the user', async () => {
      const response = await request(URL).post('/users/login').send({
        email: usersData[0].email,
        password: usersData[0].password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toEqual({
        photoUrl: usersData[0].photoUrl,
        name: usersData[0].name,
        email: usersData[0].email,
      });
    });

    test('login should return an invalid password error', async () => {
      const response = await request(URL).post('/users/login').send({
        email: usersData[0].email,
        password: 'invalidUserPassword',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Password does not match');
    });

    test('login should return an user not found error', async () => {
      const response = await request(URL).post('/users/login').send({
        email: 'notFoundUserEmail',
        password: usersData[0].password,
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User not found');
    });
  });
});
