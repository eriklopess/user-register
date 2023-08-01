import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import UserService from '../User.service';

const service = mockDeep<UserService>();
beforeEach(() => {
  mockReset(service);
});

export default service;
