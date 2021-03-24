import L from '../../common/logger';
import Organization = Components.Schemas.Organization;
import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { databaseaccess } from '../../../src/databaseaccess';
import AppsService from './apps.service';
import BrokerService from './broker.service';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import EventPortalFacade from '../../../src/eventportalfacade';
import { ns } from '../middlewares/context.handler';
const reserved = 'platform';

export class OrganizationsService {
  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('organizations');
  }

  all(query?: any): Promise<Organization[]> {
    return this.persistenceService.all(query);
  }

  byName(name: string): Promise<Organization> {
    L.debug(`Organization.byName ${name}`);
    if (name == null) {
      //console.trace();
      throw new ErrorResponseInternal(500, `no name parameter provided`);
    }
    return this.persistenceService.byName(name);
  }

  async delete(name: string): Promise<number> {
    if (name == reserved) {
      throw new ErrorResponseInternal(401, `Access denied, reserved name`);
    }
    const org = await this.byName(name);

    if (org == null) {
      throw new ErrorResponseInternal(404, `Organization not found`);
    }

    const p = new Promise<number>((resolve, reject) => {
      //const ns = C.createNamespace('platform-api');
      ns.getStore().set('org', name);
      ns.getStore().set('cloud-token', org['cloud-token']);
      AppsService.all()
        .then((apps) => {
          const deprovisionPromises: Promise<any>[] = [];
          L.info(`cleaning up apps ${apps.length}`);
          apps.forEach(async (app) => {
            L.info(app);
            deprovisionPromises.push(BrokerService.deprovisionApp(app));
          });
          Promise.all(deprovisionPromises)
            .then((res) => {
              ns.getStore().set('org', null);
              databaseaccess.client
                .db(name)
                .dropDatabase()
                .then((r) => {
                  resolve(this.persistenceService.delete(name));
                })
                .catch((e) => {
                  L.error(e);
                  reject(
                    new ErrorResponseInternal(404, `Organization not found`)
                  );
                });
            })
            .catch((e) => {
              L.info(e);
              reject(e);
            });
        })
        .catch((e) => {
          L.info(e);
          reject(e);
        });

    });
    return p;
  }

  create(body: Organization): Promise<Organization> {
    return new Promise<Organization>(async (resolve, reject) => {
      if (body.name == reserved) {
        reject(new ErrorResponseInternal(401, `Access denied, reserved name`));
      } else {
        if (
          body['cloud-token'] === undefined ||
          body['cloud-token'] === null ||
          (await this.validateCloudToken(body['cloud-token']))
        ) {
          this.persistenceService
            .create(body.name, body)
            .then((p) => {
              resolve(p);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          reject(
            new ErrorResponseInternal(400, `Invalid cloud token provided`)
          );
        }
      }
    });
  }

  update(name: string, body: Organization): Promise<Organization> {
    return new Promise<Organization>(async (resolve, reject) => {
      if (body.name == reserved) {
        reject(new ErrorResponseInternal(401, `Access denied, reserved name`));
      } else {
        if (
          body['cloud-token'] === undefined ||
          body['cloud-token'] === null ||
          (await this.validateCloudToken(body['cloud-token']))
        ) {
          this.persistenceService
            .update(name, body)
            .then((p) => {
              resolve(p);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          reject(
            new ErrorResponseInternal(400, `Invalid cloud token provided`)
          );
        }
      }
    });
  }

  async validateCloudToken(token: string): Promise<boolean> {
    try {
      const isServiceToken: boolean = await SolaceCloudFacade.validate(token);
      const isPortalToken: boolean = await EventPortalFacade.validate(token);
      return isServiceToken && isPortalToken;
    } catch (e) {
      L.warn(e);
      return false;
    }
  }
}

export default new OrganizationsService();
