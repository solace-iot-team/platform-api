import { Application } from 'express';
import eventPortalApisRouter from './api/controllers/eventPortalApis/router';
import apisRouter from './api/controllers/apis/router';
import apiDomainsRouter from './api/controllers/apiDomains/router';
import apiProductsRouter from './api/controllers/apiProducts/router';
import developersRouter from './api/controllers/developers/router';
import environmentsRouter from './api/controllers/environments/router';
import accountRouter from './api/controllers/account/router';

export default function routes(app: Application, auth : any): void {
  app.use('/v1/apis', auth, apisRouter);
  app.use('/v1/event-portal/apis', auth, eventPortalApisRouter);
  app.use('/v1/apiDomains', auth, apiDomainsRouter);  
  app.use('/v1/apiProducts', auth, apiProductsRouter);  
  app.use('/v1/developers', auth, developersRouter);  
  app.use('/v1/environments', auth, environmentsRouter);  
  app.use('/v1/account', auth, accountRouter);  
}
