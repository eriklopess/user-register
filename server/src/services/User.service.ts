import UserModel from '../model/User.model';
import UserDTO, { userSchema } from '../schemas/User.schema';
import { IUser } from '../interfaces/User';
import { Service, ServiceError } from '../interfaces/Service';
import UserUpdateDTO, { userUpdateSchema } from '../schemas/UserUpdate.schema';

export default class UserService implements Service<IUser> {
  private model;

  constructor(model = new UserModel()) {
    this.model = model;
  }

  create = async (data: UserDTO): Promise<IUser | ServiceError> => {
    const parsedData = userSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        error: parsedData.error,
      };
    }

    return this.model.create(parsedData.data);
  };

  find = async (): Promise<IUser[]> => this.model.find();

  findOne = async (id: number): Promise<IUser | ServiceError> => {
    const user = await this.model.findOne(id);
    if (!user) {
      return {
        error: new Error('User not found'),
      };
    }

    return user;
  };

  update = async (id: number, data: UserUpdateDTO) => {
    const parsedData = userUpdateSchema.safeParse(data);
    const user = await this.model.findOne(id);
    if (!parsedData.success) {
      return {
        error: parsedData.error,
      };
    }
    if (user === null) {
      return {
        error: new Error('User not found'),
      };
    }
    return this.model.update(id, data);
  };

  delete = async (id: number): Promise<IUser | ServiceError> => {
    const user = await this.model.findOne(id);
    if (user === null) {
      return {
        error: new Error('User not found'),
      };
    }
    return this.model.delete(id);
  };
}
