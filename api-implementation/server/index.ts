import './common/env';
import Server from './common/server';
import L from './common/logger';
import routes from './routes';
import { databaseaccess } from '../src/databaseaccess';

type serverCallback = () => void;

const callback: serverCallback = async () => {
  L.info(`Listening on port ${port}`);
  try {
    await databaseaccess.connect(process.env.DB_URL || `mongodb://localhost:27017/solace-platform?retryWrites=true&w=majority`);
    L.info(`Connected to Mongo!`);
  } catch (err) {
    L.error(`Unable to connect to Mongo, err=${JSON.stringify(err)}`);
  }

};


if (L.isLevelEnabled('debug')) {
  L.info('Activating unhandled promise logger');
  process.on('unhandledRejection', error => {
    L.debug(`unhandled rejection ${JSON.stringify(error)}`);
  });
}

const port = parseInt(process.env.PLATFORM_PORT) || 3000;
var server = new Server().router(routes).listenWithCallback(port, callback);
export default server;
