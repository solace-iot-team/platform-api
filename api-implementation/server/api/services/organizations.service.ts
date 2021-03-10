import L from '../../common/logger';
import Organization = Components.Schemas.Organization;
import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { databaseaccess } from '../../../src/databaseaccess';
import AppsService from './apps.service';
import BrokerService from './broker.service';
import C from 'cls-hooked';
import App = Components.Schemas.App;
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import EventPortalFacade from '../../../src/eventportalfacade';

const reserved: string = "platform";

export class OrganizationsService {



  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('organizations');
  }

  all(query?: object): Promise<Organization[]> {
    return this.persistenceService.all(query);
  }

  byName(name: string): Promise<Organization> {
    return this.persistenceService.byName(name);
  }

  async delete(name: string): Promise<number> {

    if (name == reserved) {
      throw new ErrorResponseInternal(401, `Access denied, reserved name`);
    }
    var org = await this.byName(name);

    if (org == null) {
      throw new ErrorResponseInternal(404, `Organization not found`);
    }

    var p = new Promise<number>((resolve, reject) => {
      var ns = C.createNamespace('platform-api');
      var x = ns.run(function () {
        ns.set('org', name);
        ns.set('cloud-token', org["cloud-token"]);
        AppsService.all().then(apps => {
          var deprovisionPromises: Promise<any>[] = [];
          L.info(`cleaning up apps ${apps.length}`);
          apps.forEach(async app => {
            L.info(app);
            deprovisionPromises.push(BrokerService.deprovisionApp(app));
          });
          Promise.all(deprovisionPromises).then(res => {
            ns.set('org', null);
            databaseaccess.client.db(name).dropDatabase().then((r) => {
              resolve(this.persistenceService.delete(name));
            }).catch((e) => {
              L.error(e);
              reject(new ErrorResponseInternal(404, `Organization not found`));
            });
          }).catch(e => {
            L.info(e);
            reject(e);
          });
        }).catch(e => {
          L.info(e);
          reject(e);
        });
      }.bind(this));
    });
    return p;

  }

  create(body: Organization): Promise<Organization> {
    return new Promise<Organization>(async (resolve, reject) => {
      if (body.name == reserved) {
        reject(new ErrorResponseInternal(401, `Access denied, reserved name`));
      } else {
        if (body["cloud-token"] === undefined || body["cloud-token"] === null || await this.validateCloudToken(body["cloud-token"])) {
          this.persistenceService.create(body.name, body).then((p) => {
            resolve(p);
          }).catch((e) => {
            reject(e);
          });
        } else {
          reject(new ErrorResponseInternal(400, `Invalid cloud token provided`));
        }
      }

    });
  }

  update(name: string, body: Organization): Promise<Organization> {
    return new Promise<Organization>(async (resolve, reject) => {
      if (body.name == reserved) {
        reject(new ErrorResponseInternal(401, `Access denied, reserved name`))
      } else {
        if (body["cloud-token"] === undefined || body["cloud-token"] === null || await this.validateCloudToken(body["cloud-token"])) {
          this.persistenceService.update(name, body).then((p) => {
            resolve(p);
          }).catch((e) => {
            reject(e);
          });
        } else {
          reject(new ErrorResponseInternal(400, `Invalid cloud token provided`));
        }
      }
    });
  }


  async validateCloudToken(token: string): Promise<boolean> {
    try {
      var isServiceToken: boolean = await SolaceCloudFacade.validate(token);
      var isPortalToken: boolean = await EventPortalFacade.validate(token);
      return isServiceToken && isPortalToken;
    } catch (e) {
      L.warn(e);
      return false;
    }
  }
}

export default new OrganizationsService();
