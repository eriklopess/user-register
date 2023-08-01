import {
  beforeEach,
  describe, expect, test, vi,
} from 'vitest';
import request from 'supertest';
import App from '../../../api/App';
import {
  invalidUserEmail, invalidUserName, invalidUserPassword, newUser,
} from '../../objects';
import { seed, usersData } from '../../../database/seed';
import prisma from '../../../database/prisma';

vi.mock('../../../services/User.service');

describe('UserController', () => {
  const app = new App().getApp();
  beforeEach(async () => {
    await prisma.$queryRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE');
  });

  describe('UserController/POST', () => {
    test('post should return the generated user', async () => {
      const response = await request(app).post('/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ ...newUser, id: 1 });
    });

    test('post should return an invalid name error', async () => {
      const response = await request(app).post('/users').send(invalidUserName);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.errors');
      expect(Array.isArray(response.body.error.errors)).toBe(true);
      expect(response.body.error.errors[0].message).toEqual('Name must contain at least 3 character(s)');
    });

    test('post should return an invalid email error', async () => {
      const response = await request(app).post('/users').send(invalidUserEmail);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.errors');
      expect(Array.isArray(response.body.error.errors)).toBe(true);
      expect(response.body.error.errors[0].message).toEqual('Invalid email');
    });

    test('post should return an invalid password error', async () => {
      const response = await request(app).post('/users').send(invalidUserPassword);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.errors');
      expect(Array.isArray(response.body.error.errors)).toBe(true);
      expect(response.body.error.errors[0].message).toEqual('Password must contain at least 6 character(s)');
    });

    test('post should return an user already exists error', async () => {
      await request(app).post('/users').send(newUser);
      const response = await request(app).post('/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User already exists');
    });
  });

  describe('UserController/GET', () => {
    test('get should return an array', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([...usersData]);
    });
  });

  describe('UserController/GET/:id', () => {
    test('get should return an user', async () => {
      const response = await request(app).get('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...newUser, id: 1 });
    });

    test('get should return an user not found error', async () => {
      const response = await request(app).get('/users/1').send(newUser);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User not found');
    });
  });

  describe('UserController/PUT/:id', () => {
    test('put should return the updated user', async () => {
      const response = await request(app).put('/users/1').send(newUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...newUser, id: 1 });
    });

    test('put should return an invalid name error', async () => {
      const response = await request(app).put('/users/1').send(invalidUserName);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Name must contain at least 3 character(s)');
    });

    test('put should return an invalid email error', async () => {
      const response = await request(app).put('/users/1').send(invalidUserEmail);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Invalid email');
    });

    test('put should return an invalid password error', async () => {
      const response = await request(app).put('/users/1').send(invalidUserPassword);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('Password must contain at least 6 character(s)');
    });

    test('put should return an user not found error', async () => {
      const response = await request(app).put('/users/1').send(newUser);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User not found');
    });
  });

  describe('UserController/DELETE/:id', () => {
    test('delete should return the deleted user', async () => {
      await seed();
      const response = await request(app).delete('/users/1');

      expect(response.status).toBe(204);
    });

    test('delete should return an user not found error', async () => {
      const response = await request(app).delete('/users/1');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('error.message');
      expect(response.body.error.message).toEqual('User not found');
    });
  });
});
