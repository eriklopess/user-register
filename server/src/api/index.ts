import server from './server';
import { PORT } from '../enviroment';

const port = Number(PORT) || 3000;

server.start(port);
