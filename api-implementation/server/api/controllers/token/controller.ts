import L from '../../../common/logger';
import OrganizationsService from '../../services/organizations.service';
import { NextFunction, Request, Response } from 'express';
import C from 'cls-hooked';
export class Controller {


  static getOrg = () => {
    var namespace = C.getNamespace('platform-api');
    var org: string = null;
    if (namespace != null) {
      L.debug(`PersistenceService: Found namespace ${namespace}`);
      namespace.run(function () {
        org = namespace.get('org');
      });
    }
    L.info(`org is ${org}`);
    return org;
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      var orgName: string = Controller.getOrg();
      var ns = C.getNamespace('platform-api');
      var x = ns.run(async function () {
        ns.set('org', null);
        var org = await OrganizationsService.byName(orgName);
        res.status(200).contentType("text/plain").send(org["cloud-token"]);
      });
    } catch (e) {
      next(e);
    }
  };


  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    var orgName: string = Controller.getOrg();
    var ns = C.getNamespace('platform-api');
    var x = ns.run(async function () {
      try {
        ns.set('org', null);
        var org = await OrganizationsService.byName(orgName);
        org["cloud-token"] = req.body;
        org = await OrganizationsService.update(org.name, org);
        res.status(201).contentType("text/plain").send(org["cloud-token"]);
      } catch (e) {
        next(e);
      }
    });
  }




}
export default new Controller();
