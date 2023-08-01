import { Response, Request } from 'express';
import { ZodError } from 'zod';
import { IController, RequestWithBody, ResponseError } from '../interfaces/Controller';
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
      console.log(error);
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

  find = async (_req: Request, res: Response<IUser[] | ResponseError>): Promise<typeof res> => {
    try {
      const users = await this.service.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(this.service);
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
}
