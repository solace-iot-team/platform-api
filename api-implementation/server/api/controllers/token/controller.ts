import L from '../../../common/logger';
import { ContextConstants } from '../../../common/constants';
import OrganizationsService from '../../services/organizations.service';
import { NextFunction, Request, Response } from 'express';
import { ns } from '../../middlewares/context.handler';

export class Controller {


  private getOrg(): string {
    var org: string = null;
    if (ns != null) {
      L.debug(`token controller: Found namespace ${JSON.stringify(ns)}`);
      org = ns.getStore().get(ContextConstants.ORG_NAME);

    } else {
      L.error('token controller: no namespace present');
    }
    L.info(`token controller org is ${org}`);
    return org;
  }

  get(req: Request, res: Response, next: NextFunction): void {
    var orgName: string = this.getOrg();
    ns.getStore().set(ContextConstants.ORG_NAME, null);
    OrganizationsService.byName(orgName)
      .then((org) => {
        res.status(200).contentType('text/plain').send(org[ContextConstants.CLOUD_TOKEN]);
      })
      .catch((e) => next(e));

  };

  create(req: Request, res: Response, next: NextFunction): void {
    var orgName: string = this.getOrg();
    L.debug(`token controller org is ${orgName} ${ns.getStore().get(ContextConstants.REQUEST_ID)} ${JSON.stringify(ns)}`);
    ns.getStore().set(ContextConstants.ORG_NAME, null);
    L.trace(`token controller run org is ${ns.getStore().get(ContextConstants.ORG_NAME)} ${ns.getStore().get(ContextConstants.REQUEST_ID)} ${JSON.stringify(ns)}`);
    OrganizationsService.byName(orgName)
      .then((org) => {
        org[ContextConstants.CLOUD_TOKEN] = req.body;
        OrganizationsService.update(org.name, org)
          .then((org) => {
            res.status(201).contentType('text/plain').send(org[ContextConstants.CLOUD_TOKEN]);
          })
          .catch((e) => next(e));
      })
      .catch((e) => next(e));

  }
}
export default new Controller();
