import './common/env';
import Server from './common/server';
import L from './common/logger';
import routes from './routes';
import { databaseaccess } from '../src/databaseaccess';
import printEnv from 'print-env';
import { loadUserRegistry } from './api/middlewares/file.authorizer';

import TaskScheduler from '../src/scheduler/taskscheduler';
import AppUpdateHandler from './api/services/apiProducts/appupdatehandler';

export const scheduler: TaskScheduler = new TaskScheduler();
export const appUpdateHandler: AppUpdateHandler = new AppUpdateHandler();

type serverCallback = () => void;

const callback: serverCallback = async () => {
  L.info(`Listening on port ${port}`);
  printEnv(function (s: string) {
    L.info.apply(L, [s]);
  });
  if (L.isLevelEnabled('debug') || L.isLevelEnabled('trace') || process.env.NODE_ENV == 'development') {
    L.warn('Activating unhandled promise logger');
    process.on('unhandledRejection', error => {
      L.error(error, `unhandled rejection ${JSON.stringify(error)}`);
    });
    process.on('uncaughtException', error => {
      L.error(error, `uncaughtException ${JSON.stringify(error)}`);
    });
  }
  loadUserRegistry();
  const dbURL = process.env.DB_URL || `mongodb://@localhost:27017/solace-platform?retryWrites=true&w=majority`;
  let isConnected = false;
  while (!isConnected) {
    try {
      await databaseaccess.reconnect(dbURL);
      L.info(`Connected to Mongo!`);
      scheduler.enable();
      isConnected = true;
    } catch (err) {
      L.fatal(err, `Unable to connect to Mongo, err=${JSON.stringify(err)}. Shutting down.`);
      process.exit(1);
    }
  }
};

export const port = parseInt(process.env.PLATFORM_PORT) || 3000;
var server = new Server().router(routes).listenWithCallback(port, callback);
export default server;
