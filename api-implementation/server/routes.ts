import { Application } from 'express';
import eventPortalApisRouter from './api/controllers/eventPortalApis/router';
import apisRouter from './api/controllers/apis/router';
import apiDomainsRouter from './api/controllers/apiDomains/router';
import apiProductsRouter from './api/controllers/apiProducts/router';
import developersRouter from './api/controllers/developers/router';
import environmentsRouter from './api/controllers/environments/router';

export default function routes(app: Application): void {
  app.use('/v1/apis', apisRouter);
  app.use('/v1/event-portal/apis', eventPortalApisRouter);
  app.use('/v1/apiDomains', apiDomainsRouter);  
  app.use('/v1/apiProducts', apiProductsRouter);  
  app.use('/v1/developers', developersRouter);  
  app.use('/v1/environments', environmentsRouter);  
}
