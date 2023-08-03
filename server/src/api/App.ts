import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import usersRouters from '../routes/user.route';
import swaggerDocument from '../docs/swagger.json';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
    this.app.use(helmet());
    this.app.disable('x-powered-by');
    this.app.use(cors());

    this.routes();
  }

  // eslint-disable-next-line class-methods-use-this
  private routes(): void {
    this.app.use('/api/v1/users', usersRouters);
    this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
