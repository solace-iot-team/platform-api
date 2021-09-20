import './common/env';
import Server from './common/server';
import L from './common/logger';
import routes from './routes';
import { databaseaccess } from '../src/databaseaccess';
import printEnv from 'print-env';
import { loadUserRegistry } from './api/middlewares/file.authorizer';

type serverCallback = () => void;

const callback: serverCallback = async () => {
  L.info(`Listening on port ${port}`);
  printEnv(function (s: string) {
    L.info.apply(L, [s]);
  });
  if (L.isLevelEnabled('debug') || L.isLevelEnabled('trace')) {
    L.info('Activating unhandled promise logger');
    process.on('unhandledRejection', error => {
      L.error(error, `unhandled rejection ${JSON.stringify(error)}`);
    });
  }
  loadUserRegistry();
  const dbURL = process.env.DB_URL || `mongodb://@localhost:27017/solace-platform?retryWrites=true&w=majority`;
  let isConnected = false;
  while (!isConnected) {
    try {
      await databaseaccess.connect(dbURL);
      L.info(`Connected to Mongo!`);
      isConnected = true;
    } catch (err) {
      L.error(err, `Unable to connect to Mongo, err=${JSON.stringify(err)}. Continue retrying`);

    }
  }
};

export const port = parseInt(process.env.PLATFORM_PORT) || 3000;
var server = new Server().router(routes).listenWithCallback(port, callback);
export default server;
