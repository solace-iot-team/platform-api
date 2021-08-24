import L from '../../common/logger';
import { ContextConstants, PlatformConstants } from '../../common/constants';
import Organization = Components.Schemas.Organization;
import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { databaseaccess } from '../../../src/databaseaccess';
import AppsService from './apps.service';
import BrokerService from './broker.service';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { ns } from '../middlewares/context.handler';
import { isString } from '../../../src/typehelpers';

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
      throw new ErrorResponseInternal(500, `no name parameter provided`);
    }
    return this.persistenceService.byName(name);
  }

  async delete(name: string): Promise<number> {
    if (name == PlatformConstants.PLATFORM_DB) {
      throw new ErrorResponseInternal(401, `Access denied, PlatformConstants.PLATFORM_DB name`);
    }
    const org = await this.byName(name);

    if (org == null) {
      throw new ErrorResponseInternal(404, `Organization not found`);
    }

    const p = new Promise<number>((resolve, reject) => {
      ns.getStore().set(ContextConstants.ORG_OBJECT, org);
      ns.getStore().set(ContextConstants.ORG_NAME, name);
      ns.getStore().set(ContextConstants.CLOUD_TOKEN, org[ContextConstants.CLOUD_TOKEN]);
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
              ns.getStore().set(ContextConstants.ORG_NAME, null);
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
      if (body.name == PlatformConstants.PLATFORM_DB) {
        reject(new ErrorResponseInternal(401, `Access denied, PlatformConstants.PLATFORM_DB name`));
      } else {
        if (
          body[ContextConstants.CLOUD_TOKEN] === undefined ||
          body[ContextConstants.CLOUD_TOKEN] === null ||
          (await this.validateCloudToken(body[ContextConstants.CLOUD_TOKEN]))
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
      if (body.name == PlatformConstants.PLATFORM_DB) {
        reject(new ErrorResponseInternal(401, `Access denied, PlatformConstants.PLATFORM_DB name`));
      } else {
        if (
          body[ContextConstants.CLOUD_TOKEN] === undefined ||
          body[ContextConstants.CLOUD_TOKEN] === null ||
          (await this.validateCloudToken(body[ContextConstants.CLOUD_TOKEN]))
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

  async validateCloudToken(token: any): Promise<boolean> {
    try {

      // TODO - reinstate the event portal token check once new event portal facade is added in
      if (isString(token)) {
        const isServiceToken: boolean = await SolaceCloudFacade.validate(token);
        //const isPortalToken: boolean = await EventPortalFacade.validate(token);
        return isServiceToken;
      } else {
        const isServiceToken: boolean = await SolaceCloudFacade.validate(token.cloud.token, token.cloud.baseUrl);
        //const isPortalToken: boolean = await EventPortalFacade.validate(token.eventPortal.token, token.eventPortal.baseUrl);
        return isServiceToken;
      }
      
    } catch (e) {
      L.warn(e);
      return false;
    }
  }
}

export default new OrganizationsService();
