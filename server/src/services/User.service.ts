import UserModel from '../model/User.model';
import UserDTO, { userSchema } from '../schemas/User.schema';
import { IUser, IUserSelect } from '../interfaces/User';
import { Service, ServiceError, UserFindParams } from '../interfaces/Service';
import UserUpdateDTO, { userUpdateSchema } from '../schemas/UserUpdate.schema';
import { generateToken } from '../helpers/token';
import { LoginResponse } from '../interfaces/Controller';

export default class UserService implements Service<IUser, IUserSelect> {
  private model;

  constructor(model = new UserModel()) {
    this.model = model;
  }

  create = async (data: UserDTO): Promise<IUser | ServiceError> => {
    const user = await this.model.findByEmail(data.email);
    if (user) {
      return {
        error: new Error('User already exists'),
      };
    }
    const parsedData = userSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        error: parsedData.error,
      };
    }

    const userData: IUser = {
      name: data.name,
      email: data.email,
      birthDate: new Date(data.birthDate),
      password: data.password,
      photoUrl: data.photoUrl || '',
    };

    return this.model.create(userData);
  };

  find = async (params: UserFindParams): Promise<IUserSelect[]> => this.model.find(params);

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

  login = async (email: string, password: string): Promise<LoginResponse | ServiceError> => {
    const user = await this.model.findByEmail(email);
    if (!user) {
      return {
        error: new Error('User not found'),
      };
    }
    if (user.password !== password) {
      return {
        error: new Error('Password does not match'),
      };
    }

    const token = generateToken(user.email);
    return {
      token,
      user: {
        name: user.name,
        photoUrl: user.photoUrl,
        email: user.email,
      },
    };
  };
}
