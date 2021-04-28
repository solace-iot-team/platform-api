import { Application } from 'express';
import eventPortalApisRouter from './api/controllers/eventPortalApis/router';
import apisRouter from './api/controllers/apis/router';
import appsRouter from './api/controllers/apps/router';
import apiDomainsRouter from './api/controllers/apiDomains/router';
import apiProductsRouter from './api/controllers/apiProducts/router';
import developersRouter from './api/controllers/developers/router';
import environmentsRouter from './api/controllers/environments/router';
import accountRouter from './api/controllers/account/router';
import organizationsRouter from './api/controllers/organizations/router';
import historyRouter from './api/controllers/history/router';
import tokenRouter from './api/controllers/token/router';

import { ContextConstants } from './common/constants';
import { Request, Response } from 'express';
import pagingHandler from './api/middlewares/paging.handler';
import contextHandler, { ns } from './api/middlewares/context.handler';
import Router from 'express';
import PassportFactory from './api/middlewares/passport.authentication';
import authorizedRoles from './api/middlewares/role.authorizer';
import authorizedOrgs from './api/middlewares/orgs.authorizer';
import auditHandler from './api/middlewares/audit.handler';

export default function routes(app: Application): void {
  const router = Router();
  const passport = PassportFactory.build();
  router.use(passport.initialize());
  router.use(contextHandler);
  router.use(pagingHandler);
  router.use('/*', passport.authenticate(['provider','basic'], PassportFactory.getAuthenticationOptions()));
  router.get('/', (req: Request, res: Response) => {
    res.status(404).end();
  });
  router.param(ContextConstants.ORG_NAME, authorizedOrgs);

  
  router.use('/*', auditHandler);
  router.use('/organizations', authorizedRoles(['platform-admin']), organizationsRouter);
  router.use('/:org/apis', authorizedRoles(['org-admin']), apisRouter);
  router.use('/:org/event-portal/apis', authorizedRoles(['org-admin']), eventPortalApisRouter);
  router.use('/:org/event-portal/apiDomains', authorizedRoles(['org-admin']), apiDomainsRouter);
  router.use('/:org/apiProducts', authorizedRoles(['org-admin']), apiProductsRouter);
  router.use('/:org/developers', authorizedRoles(['org-admin']), developersRouter);
  router.use('/:org/environments', authorizedRoles(['org-admin']), environmentsRouter);
  router.use('/:org/services', authorizedRoles(['org-admin']), accountRouter);
  router.use('/:org/history', authorizedRoles(['org-admin']), historyRouter);
  router.use('/:org/token', authorizedRoles(['org-admin']), tokenRouter);
  router.use('/:org/apps', authorizedRoles(['org-admin']), appsRouter);

  app.use('/v1', router);
}
