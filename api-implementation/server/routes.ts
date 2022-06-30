import L from './common/logger';
import { Application } from 'express';
import apisRouter from './api/controllers/apis/router';
import appsRouter from './api/controllers/apps/router';
import apiProductsRouter from './api/controllers/apiProducts/router';
import eventApiProductsRouter from './api/controllers/eventApiProducts/router';
import developersRouter from './api/controllers/developers/router';
import teamsRouter from './api/controllers/teams/router';
import environmentsRouter from './api/controllers/environments/router';
import accountRouter from './api/controllers/account/router';
import organizationsRouter from './api/controllers/organizations/router';
import historyRouter from './api/controllers/history/router';
import jobsRouter from './api/controllers/jobs/router';
import tokenRouter from './api/controllers/token/router';
import aboutRouter from './api/controllers/about/router';
import healthCheckRouter from './api/controllers/healthcheck/router';
import { ContextConstants } from './common/constants';
import { Request, Response } from 'express';
import pagingHandler from './api/middlewares/paging.handler';
import searchHandler from './api/middlewares/search.handler';
import sortHandler from './api/middlewares/sort.handler';
import contextHandler, { ns } from './api/middlewares/context.handler';
import Router from 'express';
import PassportFactory from './api/middlewares/passport.authentication';
import authorizedRoles from './api/middlewares/role.authorizer';
import authorizedOrgs from './api/middlewares/orgs.authorizer';
import auditHandler from './api/middlewares/audit.handler';
import ifMatchHandler from './api/middlewares/ifmatch.handler';
import etagHash from './common/etag';



export default function routes(app: Application): void {
  const router = Router();
  const passport = PassportFactory.build();
  router.use(passport.initialize());
  router.use(contextHandler);
  router.use(pagingHandler);
  router.use(searchHandler);
  router.use(sortHandler);
  router.use(ifMatchHandler);
  router.set('etag', etagHash);
  router.use('/*', passport.authenticate(['provider', 'basic'], PassportFactory.getAuthenticationOptions()));
  router.get('/', (req: Request, res: Response) => {
    L.info('Request to root emit 404');
    res.status(404).end();
  });
  router.param(ContextConstants.ORG_NAME, authorizedOrgs);


  router.use('/*', auditHandler);
  router.use('/about', authorizedRoles(['platform-admin','org-admin']), aboutRouter);
  router.use('/organizations', authorizedRoles(['platform-admin']), organizationsRouter);
  router.use('/:org/apis', authorizedRoles(['org-admin']), apisRouter);
  router.use('/:org/apiProducts', authorizedRoles(['org-admin']), apiProductsRouter);
  router.use('/:org/eventApiProducts', authorizedRoles(['org-admin']), eventApiProductsRouter);
  router.use('/:org/developers', authorizedRoles(['org-admin']), developersRouter);
  router.use('/:org/teams', authorizedRoles(['org-admin']), teamsRouter);
  router.use('/:org/environments', authorizedRoles(['org-admin']), environmentsRouter);
  router.use('/:org/services', authorizedRoles(['org-admin']), accountRouter);
  router.use('/:org/history', authorizedRoles(['org-admin']), historyRouter);
  router.use('/:org/jobs', authorizedRoles(['org-admin']), jobsRouter);
  router.use('/:org/token', authorizedRoles(['org-admin']), tokenRouter);
  router.use('/:org/apps', authorizedRoles(['org-admin']), appsRouter);
  router.use('/healthcheck', healthCheckRouter);
  app.use('/v1', router);
}
