import { Response, Request } from 'express';
import { ZodError } from 'zod';
import {
  GetAllResponse, IController, LoginResponse, RequestWithBody, ResponseError,
} from '../interfaces/Controller';
import { IUser } from '../interfaces/User';
import UserService from '../services/User.service';

export default class UserController implements IController<IUser> {
  private service;

  constructor(service = new UserService()) {
    this.service = service;
  }

  create = async (
    req: RequestWithBody<IUser>,
    res: Response<IUser | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const user = await this.service.create({
        ...body,
        birthDate: new Date(body.birthDate),
      });

      if ('error' in user) {
        if (user.error instanceof ZodError) {
          return res.status(400).json({
            error: {
              message: user.error.issues[0].message,
            },
          });
        }

        return res.status(400).json({
          error: {
            message: user.error.message,
          },
        });
      }

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  delete = async (req: Request<{
    id: string
  }>, res: Response<IUser | ResponseError>): Promise<typeof res> => {
    try {
      const { id } = req.params;
      const data = await this.service.delete(Number(id));
      if ('error' in data) {
        return res.status(404).json({
          error: {
            message: data.error.message,
          },
        });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  find = async (
    req: Request,
    res: Response<GetAllResponse<IUser> | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const {
        limit, page, name, email,
      } = req.query;
      const limitNumber = Number(limit) || 10;
      const pageNumber = Number(page) && Number(page) > 0 ? Number(page) : 1;
      const skipNumber = limitNumber * pageNumber - limitNumber;
      const users = await this.service.find({
        skip: skipNumber,
        limit: limitNumber,
        name: name as string,
        email: email as string,
      });
      const usersLength = await this.service.find({
        skip: 0,
        limit: 999999999,
      });
      const totalPages = Math.ceil(usersLength.length / limitNumber);

      return res.status(200).json({
        info: {
          limit: limitNumber,
          page: pageNumber,
          totalPages,
          nextPage: totalPages >= pageNumber + 1 ? `/users?limit=${limitNumber}&page=${pageNumber + 1}` : '',
        },
        data: users,
      });
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  findOne = async (req: Request<{
    id: string
  }>, res: Response<IUser | ResponseError>): Promise<typeof res> => {
    try {
      const { id } = req.params;

      const user = await this.service.findOne(Number(id));
      if ('error' in user) {
        return res.status(404).json({
          error: {
            message: user.error.message,
          },
        });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  update = async (
    req: RequestWithBody<IUser>,
    res: Response<IUser | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { body } = req;
      const { id } = req.params;
      delete body.id;
      const user = await this.service.update(Number(id), {
        ...body,
        birthDate: body.birthDate && new Date(body.birthDate),
      });

      if ('error' in user) {
        if (user.error instanceof ZodError) {
          return res.status(400).json({
            error: {
              message: user.error.issues[0].message,
            },
          });
        }

        return res.status(404).json({
          error: {
            message: user.error.message,
          },
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  login = async (
    req: RequestWithBody<IUser>,
    res: Response<LoginResponse | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          error: {
            message: 'Email and password are required',
          },
        });
      }
      const user = await this.service.login(email, password);

      if ('error' in user) {
        const statusCode = user.error.message === 'User not found' ? 404 : 400;

        return res.status(statusCode).json({
          error: {
            message: user.error.message,
          },
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error });
    }
  };
}
