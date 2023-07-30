import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import UserModel from '../User.model';

const model = mockDeep<UserModel>();
beforeEach(() => {
  mockReset(model);
});

export default model;
