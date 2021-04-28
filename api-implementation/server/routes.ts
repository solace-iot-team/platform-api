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
import OrganizationsService from './api/services/organizations.service';
import HistoryService from './api/services/history.service';

import L from './common/logger';
import { ContextConstants } from './common/constants';
import { Request, Response } from 'express';
import Organization = Components.Schemas.Organization;
import History = Components.Schemas.History;
import { ErrorResponseInternal } from './api/middlewares/error.handler';
import pagingHandler from './api/middlewares/paging.handler';
import contextHandler, { ns } from './api/middlewares/context.handler';
import Router from 'express';
import PassportFactory from './api/middlewares/passport.authentication';
import { User } from '../src/model/user';
import authorizedRoles from './api/middlewares/role.authorizer';


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
  router.param(ContextConstants.ORG_NAME, function (req, res, next, org) {
    const url: string = `${req.baseUrl}/${req.url}`.replace('//', '/');
    L.info(`extracting org for ${url}`);
    L.info(`org in namespace is ${ns.getStore().get(ContextConstants.ORG_NAME)}`);
    L.trace("param org is " + org + ' ' + ns.getStore().get(ContextConstants.REQUEST_ID) + ` ${JSON.stringify(ns)}`);
    let user: User = req['user'] as User;
    let err: ErrorResponseInternal = null;
    if (user.groups !== null  && !user.groups.includes(org)) {
      err = new ErrorResponseInternal(401,
        `User ${user.name} is not a member of [${org}]`
      );
      next(err);
      return;
    }
    OrganizationsService.byName(org).then((r: Organization) => {
      L.trace(`router.param org is  ${JSON.stringify(r)}`);
      ns.getStore().set(ContextConstants.ORG_NAME, org);
      ns.getStore().set(ContextConstants.CLOUD_TOKEN, r[ContextConstants.CLOUD_TOKEN]);
      L.trace(`router.param ${url} ns org is ` + ns.getStore().get(ContextConstants.ORG_NAME) + ' ' + ns.getStore().get(ContextConstants.REQUEST_ID) + ` ${JSON.stringify(ns)}`);
      next();
    }).catch(e => {
      L.debug(`no org matching URI ${req.baseUrl} ${e}`);
      next(new ErrorResponseInternal(404, `Not found`));
    });
  });

  const auditableVerbs: string[] = ['POST', 'PUT', 'DELETE', 'PATCH'];
  router.use('/*', function (req, res, next) {
    res.on("finish", function () {
      L.info("finish response");
      if (auditableVerbs.includes(req.method)) {
        let user: User = req['user'] as User;
        const url: string = `${req.baseUrl}/${req.url}`.replace('//', '/');
        var h: History = {
          at: Date.now(),
          operation: req.method,
          requestBody: req.body,
          requestURI: url,
          title: `${req.method} ${url}`,
          user: `${user.name} (${user.sub})`,
          responseCode: res.statusCode
        };
        HistoryService.create(h);
        L.debug(`auditable request: ${req.method}, ${url}, ${res.statusCode}`);
      };

    });
    next();
  });
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
