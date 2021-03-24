import L from '../../../common/logger';
import OrganizationsService from '../../services/organizations.service';
import { NextFunction, Request, Response } from 'express';
import { ns } from '../../middlewares/context.handler';

export class Controller {


  private getOrg(): string {
    var org: string = null;
    if (ns != null) {
      L.debug(`token controller: Found namespace ${JSON.stringify(ns)}`);
      org = ns.getStore().get('org');

    } else {
      L.error('token controller: no namespace present');
    }
    L.info(`token controller org is ${org}`);
    return org;
  }

  get(req: Request, res: Response, next: NextFunction): void {
    var orgName: string = this.getOrg();
    ns.getStore().set('org', null);
    OrganizationsService.byName(orgName)
      .then((org) => {
        res.status(200).contentType("text/plain").send(org["cloud-token"]);
      })
      .catch((e) => next(e));

  };

  create(req: Request, res: Response, next: NextFunction): void {
    var orgName: string = this.getOrg();
    L.debug(`token controller org is ${orgName} ${ns.getStore().get('requestId')} ${JSON.stringify(ns)}`);
    ns.getStore().set('org', null);
    L.trace(`token controller run org is ${ns.getStore().get('org')} ${ns.getStore().get('requestId')} ${JSON.stringify(ns)}`);
    OrganizationsService.byName(orgName)
      .then((org) => {
        org["cloud-token"] = req.body;
        OrganizationsService.update(org.name, org)
          .then((org) => {
            res.status(201).contentType("text/plain").send(org["cloud-token"]);
          })
          .catch((e) => next(e));
      })
      .catch((e) => next(e));

  }
}
export default new Controller();
