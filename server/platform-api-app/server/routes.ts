import { Application } from 'express';
import apisRouter from './api/controllers/apis/router';
export default function routes(app: Application): void {
  app.use('/v1/apis', apisRouter);
}
