import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';

import OIDCDIscoveryRouter from './OIDCDIscoveryRouter';

import l from './logger';

import errorHandler from '../api/middlewares/error.handler';
import * as OpenApiValidator from 'express-openapi-validator';

import cors from 'cors';

import fetch from 'fetch-with-proxy';
import https from 'https';

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: true,
  exposedHeaders: ['ETag'],
};

import { databaseaccess } from '../../src/databaseaccess';

import { createTerminus, TerminusOptions, HealthCheckMap, HealthCheckError } from '@godaddy/terminus';

import audit from 'express-requests-logger';


export default class ExpressServer {
  private routes: (app: Application) => void;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(cors(corsOptions));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));

    const apiSpec = path.join(__dirname, 'api.yml');
    const validateResponses = !!(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );
    app.use(process.env.OPENAPI_SPEC || '/v1/spec', express.static(apiSpec));
    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );
    app.use(audit({
      logger: l,
      excludeURLs: ['liveliness', 'readiness'],
      response: {
        levels: {
          '2xx': 'debug',
          '3xx': 'debug',
          '4xx': 'debug',
          '5xx': 'debug'
        }
      }

    }));
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    app.use('/auth', OIDCDIscoveryRouter);
    app.options('*', cors(corsOptions));
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
  listenWithCallback(port: number, callback: () => void): Application {
    /*const welcome = (p: number) => (): void => {
      l.info(
        `up and running in ${process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );
      callback.apply(callback);
    }*/

    const server = http.createServer(app);
    server.listen(port, callback);
    const hsMap: HealthCheckMap = {
      verbatim: false,
      '/readiness': healthCheck,
      '/liveliness': healthCheck,
    };

    const options: TerminusOptions = {
      // health check options
      healthChecks: hsMap,
      onSignal: shutdown,
      onShutdown: shutdown,
      onSigterm: shutdown
    };
    createTerminus(server, options);
    return app;
  }

}

const checkSolaceCloudAccess = async () => {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  try {
    const response = await fetch('https://api.solace.cloud/api/v0', { agent });
    if (response.status == 401) {
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  try {
    const response = await fetch('https://api.solace.cloud/api/v0/eventPortal/apiProducts', { agent });
    if (response.status == 401) {
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;

}

const shutdown = async () => {
  console.log('server is starting cleanup');
  return databaseaccess.client.close().then(() => console.log('client has disconnected'))
    .catch(err => console.error('error during disconnection', err.stack))
}
export const healthCheck = async () => {

  if (await databaseaccess.isHealthy() && await checkSolaceCloudAccess()) {
    return Promise.resolve(
    );
  } else {
    let errs: Error[] = [];
    if (!(await databaseaccess.isHealthy())) {
      errs.push(new Error('NO_DB_CONNECTION'));
    }
    if (!(await checkSolaceCloudAccess())) {
      errs.push(new Error('NO_OUTBOUND_HTTPS_ACCESS'));
    }
    const error: HealthCheckError = {
      causes: errs,
      message: 'Not ready',
      name: 'NOT_READY'
    }
    return Promise.reject(error);
  }
};
