import { IUser } from '../interfaces/User';

export const newUser: IUser = {
  name: 'John Doe',
  email: 'john@gmail.com',
  birthDate: new Date(),
  photoUrl: 'https://google.com',
  password: '123456',
};

export const oldUser: IUser = {
  name: 'Teste',
  email: 'Teste@gmail.com',
  birthDate: new Date(),
  photoUrl: 'https://google.com',
  password: '123456',
};

export const invalidUserEmail: IUser = {
  name: 'John Doe',
  email: 'johngmail.com',
  birthDate: new Date(),
  photoUrl: 'https://google.com',
  password: '123456',
};

export const invalidUserName: IUser = {
  name: 'Jo',
  email: 'john@gmail.com',
  birthDate: new Date(),
  photoUrl: 'https://google.com',
  password: '123456',
};

export const invalidUserPassword: IUser = {
  name: 'John Doe',
  email: 'john@gmail.com',
  birthDate: new Date(),
  photoUrl: 'https://google.com',
  password: '12345',
};
