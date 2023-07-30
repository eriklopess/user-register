import UserModel from '../model/User.model';
import UserDTO, { userSchema } from '../schemas/User.schema';

export default class UserService {
  private model;

  constructor(model = new UserModel()) {
    this.model = model;
  }

  create = async (data: UserDTO) => {
    throw new Error('Not implemented');
  };

  find = async () => {
    throw new Error('Not implemented');
  };

  findOne = async (id: number) => {
    throw new Error('Not implemented');
  };

  update = async (id: number, data: UserDTO) => {
    throw new Error('Not implemented');
  };

  delete = async (id: number) => {
    throw new Error('Not implemented');
  };
}
