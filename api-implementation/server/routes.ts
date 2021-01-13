import { Application } from 'express';
import eventPortalApisRouter from './api/controllers/eventPortalApis/router';
import apisRouter from './api/controllers/apis/router';
import apiDomainsRouter from './api/controllers/apiDomains/router';
import apiProductsRouter from './api/controllers/apiProducts/router';
import developersRouter from './api/controllers/developers/router';
import environmentsRouter from './api/controllers/environments/router';
import accountRouter from './api/controllers/account/router';
import organizationsRouter from './api/controllers/organizations/router';
import OrganizationsService from './api/services/organizations.service';
import express from 'express';
import L from './common/logger';
import { Request, Response } from 'express';
import C from 'continuation-local-storage';
import Organization = Components.Schemas.Organization;

export default function routes(app: Application, auth: any): void {
  var router = express.Router();
  var ns = C.createNamespace('platform-api');

  router.get('/', (req: Request, res: Response) => {
    res.status(404).end();
  });

  router.param('org', function (req, res, next, org) {
    L.debug("org param is " + org);
    OrganizationsService.byName(org).then((r: Organization) => {
      var namespace = C.getNamespace('platform-api');
      namespace.run(function () {
        namespace.set('org', org);
        namespace.set('cloud-token', r["cloud-token"]);
        next();
      });
    }).catch(e => {
      L.debug(`no org matching URI ${req.url}`);
      res.status(404).end();
    });


  });
  router.use('/:org/apis', auth, apisRouter);
  router.use('/:org/event-portal/apis', auth, eventPortalApisRouter);
  router.use('/:org/apiDomains', auth, apiDomainsRouter);
  router.use('/:org/apiProducts', auth, apiProductsRouter);
  router.use('/:org/developers', auth, developersRouter);
  router.use('/:org/environments', auth, environmentsRouter);
  router.use('/:org/services', auth, accountRouter);
  router.use('/organizations', auth, organizationsRouter);


  app.use('/v1', router);


}
