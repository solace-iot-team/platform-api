import { Application } from 'express';
import eventPortalApisRouter from './api/controllers/eventPortalApis/router';
import apisRouter from './api/controllers/apis/router';
import apiDomainsRouter from './api/controllers/apiDomains/router';
import apiProductsRouter from './api/controllers/apiProducts/router';
import developersRouter from './api/controllers/developers/router';
import environmentsRouter from './api/controllers/environments/router';
import accountRouter from './api/controllers/account/router';
import organizationsRouter from './api/controllers/organizations/router';
import historyRouter from './api/controllers/history/router';
import OrganizationsService from './api/services/organizations.service';
import HistoryService from './api/services/history.service';
import express from 'express';
import L from './common/logger';
import { Request, Response } from 'express';
import C from 'continuation-local-storage';
import Organization = Components.Schemas.Organization;
import History = Components.Schemas.History;
import * as basicAuth from 'express-basic-auth'
import { ErrorResponseInternal } from './api/middlewares/error.handler';

export default function routes(app: Application, auth: any): void {
  var router = express.Router();

  router.get('/', (req: Request, res: Response) => {
    res.status(404).end();
  });

  router.param('org', function (req, res, next, org) {
    //var org: string = req.params['org'];
    var ns = C.createNamespace('platform-api');
    L.info(`org in namespace is ${ns.get('org')}`);
    L.debug("org param is " + org);
    OrganizationsService.byName(org).then((r: Organization) => {
      //var namespace = C.getNamespace('platform-api');

      ns.run(function () {
        ns.set('org', org);
        ns.set('cloud-token', r["cloud-token"]);
        next();
      });
    }).catch(e => {
      L.debug(`no org matching URI ${req.baseUrl} ${e}`);
      next(new ErrorResponseInternal(404, `Not found`));
      //res.status(404).end();
    });
  });


  const auditableVerbs: string[] = ['POST', 'PUT', 'DELETE', 'PATCH'];
  router.use('/*', auth, function (req: basicAuth.IBasicAuthedRequest, res, next) {
    res.on("finish", function () {
      L.info("after");
      if (auditableVerbs.indexOf(req.method) > -1) {
        var h: History = {
          at: Date.now(),
          operation: req.method,
          requestBody: req.body,
          requestURI: req.baseUrl,
          title: `${req.method} ${req.baseUrl}`,
          user: req.auth.user
        };
        HistoryService.create(h);
        L.debug(`auditable request: ${req.method}, ${req.url}, ${res.statusCode}`);
        C.reset();
      };
    });
    next();
  });




  router.use('/organizations', auth, organizationsRouter);
  router.use('/:org/apis', auth, apisRouter);
  router.use('/:org/event-portal/apis', auth, eventPortalApisRouter);
  router.use('/:org/apiDomains', auth, apiDomainsRouter);
  router.use('/:org/apiProducts', auth, apiProductsRouter);
  router.use('/:org/developers', auth, developersRouter);
  router.use('/:org/environments', auth, environmentsRouter);
  router.use('/:org/services', auth, accountRouter);
  router.use('/:org/history', auth, historyRouter);


  app.use('/v1', router);


}
