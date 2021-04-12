import './common/env';
import Server from './common/server';
import L from './common/logger';
import routes from './routes';
import { databaseaccess } from '../src/databaseaccess';
import { loadUserRegistry } from './api/middlewares/file.authorizer';
import printEnv from 'print-env';
import basicAuth from 'express-basic-auth';

const adminUser = {};
adminUser[process.env.ADMIN_USER || 'admin'] = process.env.ADMIN_PASSWORD || 'p3zvZFF7ka4Wrj4p';
adminUser;
export const authAdmin = basicAuth({
  users: adminUser,
  challenge: true,
});
type serverCallback = () => void;

const callback: serverCallback = async () => {
  L.info(`Listening on port ${port}`);
  printEnv(function (s: string) {
    L.info.apply(L, [s]);
  });
  const dbURL = process.env.DB_URL || `mongodb://@localhost:27017/solace-platform?retryWrites=true&w=majority`;
  try {
    await databaseaccess.connect(dbURL);
    L.info(`Connected to Mongo!`);
  } catch (err) {
    L.error(err, `Unable to connect to Mongo, err=${JSON.stringify(err)}`);
  }
  loadUserRegistry();
  if (L.isLevelEnabled('debug') || L.isLevelEnabled('trace')) {
    L.info('Activating unhandled promise logger');
    process.on('unhandledRejection', error => {
      L.error(error, `unhandled rejection ${JSON.stringify(error)}`);
    });
  }
};

const port = parseInt(process.env.PLATFORM_PORT) || 3000;
var server = new Server().router(routes).listenWithCallback(port, callback);
export default server;
