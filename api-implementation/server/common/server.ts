import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';

import l from './logger';

import errorHandler from '../api/middlewares/error.handler';
import fileAuthorizer from '../api/middlewares/file.authorizer';
import * as OpenApiValidator from 'express-openapi-validator';

import basicAuth from 'express-basic-auth';
import cors from 'cors';

const app = express();

const corsOptions: cors.CorsOptions = {
 
};

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
  }

  router(routes: (app: Application, auth: any) => void): ExpressServer {

    const auth = basicAuth({
      authorizer: fileAuthorizer,
      challenge: true,
      realm: 'platform-api'
    });
    routes(app, auth);
    app.use(errorHandler);
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

    http.createServer(app).listen(port, callback);

    return app;
  }
}
