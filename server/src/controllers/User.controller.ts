import { Response, Request } from 'express';
import { IController, RequestWithBody, ResponseError } from '../interfaces/Controller';
import { IUser } from '../interfaces/User';
import UserService from '../services/User.service';

export default class UserController implements IController<IUser> {
  private service;

  constructor(service = new UserService()) {
    this.service = service;
  }

  create(req: RequestWithBody<IUser>, res: Response<IUser | ResponseError>): Promise<typeof res> {
    return Promise.resolve(undefined);
  }

  delete(req: Request<{
    id: string
  }>, res: Response<IUser | ResponseError>): Promise<typeof res> {
    return Promise.resolve(undefined);
  }

  find(_req: Request, res: Response<IUser[] | ResponseError>): Promise<typeof res> {
    return Promise.resolve([]);
  }

  findOne(req: Request<{
    id: string
  }>, res: Response<IUser | ResponseError>): Promise<typeof res> {
    return Promise.resolve(undefined);
  }

  update(req: RequestWithBody<IUser>, res: Response<IUser | ResponseError>): Promise<any> {
    return Promise.resolve(undefined);
  }
}
