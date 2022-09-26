import L from '../../common/logger';
import { ContextConstants, PlatformConstants } from '../../common/constants';
import Organization = Components.Schemas.Organization;
import OrganizationResponse = Components.Schemas.OrganizationResponse;
import OrganizationStatus = Components.Schemas.OrganizationStatus;
import { PersistenceService } from './persistence.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { databaseaccess } from '../../../src/databaseaccess';
import AppsService from './apps.service';
import BrokerFactory from './broker.factory';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import EventPortalFacade from '../../../src/eventportalfacade';
import EventPortal2Facade from '../../../src/eventportalfacade.2';
import { isString } from '../../../src/typehelpers';
import preconditionCheck from './persistence/preconditionhelper';
import DatabaseBootstrapper from './persistence/databasebootstrapper';

import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import ContextRunner from '../../../src/scheduler/contextrunner';
import { EventMeshesServiceDefault } from '../../../src/clients/ep.2.0/services/EventMeshesServiceDefault';

const statusCache = new CacheContainer(new MemoryStorage());

export class OrganizationsService {
  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('organizations');
  }

  all(query?: any): Promise<Organization[]> {
    return this.persistenceService.all(query);
  }

  async byName(name: string): Promise<Organization> {
    L.debug(`Organization.byName ${name}`);
    if (name == null) {
      throw new ErrorResponseInternal(500, `no name parameter provided`);
    }
    const org: OrganizationResponse = await this.persistenceService.byName(name);
    org.status = await this.getOrganizationStatusCached(org['cloud-token']);
    return org;
  }

  async delete(name: string): Promise<number> {
    if (name == PlatformConstants.PLATFORM_DB) {
      throw new ErrorResponseInternal(401, `Access denied, PlatformConstants.PLATFORM_DB name`);
    }
    const org = await this.byName(name);

    if (org == null) {
      throw new ErrorResponseInternal(404, `Organization not found`);
    }


    try {
      await ContextRunner(org, OrganizationsService.onDeleteDeprovisionApps);
      await OrganizationsService.delay(1000);
      await databaseaccess.client
        .db(name)
        .dropDatabase();
      DatabaseBootstrapper.emit('deleted', name);
      return (await this.persistenceService.delete(name));
    } catch (e) {
      L.error(e);
      throw new ErrorResponseInternal(404, `Organization not found`);
    }
  }

  async create(body: Organization): Promise<OrganizationResponse> {
    await this.validateOrganization(body);
    if (body.name == PlatformConstants.PLATFORM_DB) {
      throw (new ErrorResponseInternal(401, `Access denied, PlatformConstants.PLATFORM_DB name`));
    } else {
      if (
        body[ContextConstants.CLOUD_TOKEN] === undefined ||
        body[ContextConstants.CLOUD_TOKEN] === null ||
        (await this.validateCloudToken(body[ContextConstants.CLOUD_TOKEN]))
      ) {
        const org: OrganizationResponse = await this.persistenceService
          .create(body.name, body) as OrganizationResponse;
        org.status = await this.getOrganizationStatus(org['cloud-token']);
        DatabaseBootstrapper.emit('added', org.name);
        return org;
      } else {
        throw (
          new ErrorResponseInternal(400, `Invalid cloud or event portal token provided`)
        );
      }
    }

  }

  async update(name: string, body: Organization): Promise<OrganizationResponse> {
    await this.validateOrganization(body);
    if (body.name == PlatformConstants.PLATFORM_DB) {
      throw (new ErrorResponseInternal(401, `Access denied, PlatformConstants.PLATFORM_DB name`));
    } else {
      await preconditionCheck(this, name);
      // handle case when complex cloud token only contains URLs but not tokens/credentials
      if (body[ContextConstants.CLOUD_TOKEN] && !isString(body[ContextConstants.CLOUD_TOKEN])
        && (!body[ContextConstants.CLOUD_TOKEN].cloud.token || !body[ContextConstants.CLOUD_TOKEN].eventPortal.token)) {
        const orgInDb: Organization = await this.persistenceService.byName(name);
        if (!body[ContextConstants.CLOUD_TOKEN].cloud.token
          && orgInDb[ContextConstants.CLOUD_TOKEN]
          && orgInDb[ContextConstants.CLOUD_TOKEN].cloud
          && orgInDb[ContextConstants.CLOUD_TOKEN].cloud.token) {
          body[ContextConstants.CLOUD_TOKEN].cloud.token = orgInDb[ContextConstants.CLOUD_TOKEN].cloud.token;
        }
        if (
          body[ContextConstants.CLOUD_TOKEN].eventPortal
          && !body[ContextConstants.CLOUD_TOKEN].eventPortal.token
          && orgInDb[ContextConstants.CLOUD_TOKEN]
          && orgInDb[ContextConstants.CLOUD_TOKEN].eventPortal
          && orgInDb[ContextConstants.CLOUD_TOKEN].eventPortal.token) {
          body[ContextConstants.CLOUD_TOKEN].eventPortal.token = orgInDb[ContextConstants.CLOUD_TOKEN].eventPortal.token;
        }
      }
      if (
        body[ContextConstants.CLOUD_TOKEN] === undefined ||
        body[ContextConstants.CLOUD_TOKEN] === null ||
        (await this.validateCloudToken(body[ContextConstants.CLOUD_TOKEN]))
      ) {
        // update protection
        await preconditionCheck(this, name);
        const org: OrganizationResponse = await this.persistenceService
          .update(name, body) as OrganizationResponse;
        org.status = await this.getOrganizationStatus(org['cloud-token']);
        DatabaseBootstrapper.emit('added', org.name);
        return org;
      } else {
        throw (
          new ErrorResponseInternal(400, `Invalid cloud token provided`)
        );
      }
    }
  }

  async validateCloudToken(token: any): Promise<boolean> {
    try {

      if (isString(token)) {
        const isServiceToken: boolean = await SolaceCloudFacade.validate(token);
        const useProxyModeStr = process.env.APIS_PROXY_MODE || 'false';
        const useProxyMode = (useProxyModeStr.toLowerCase() == 'true') || (useProxyModeStr.toLowerCase() == '1');
        if (!useProxyMode) {
          return isServiceToken;
        } else {
          return isServiceToken && (await this.validateEventPortalToken(token));
        }
      } else {
        const isServiceToken: boolean = await SolaceCloudFacade.validate(token.cloud.token, token.cloud.baseUrl);
        let isPortalToken: boolean = true;
        if (token.eventPortal.token) {

          isPortalToken = await this.validateEventPortalToken(token.eventPortal.token, token.eventPortal.baseUrl);
        }
        return isServiceToken && isPortalToken;
      }

    } catch (e) {
      L.warn(e);
      return false;
    }
  }

  private async validateEventPortalToken(token: string, baseUrl?: string): Promise<boolean>{
    const epVersion = process.env.EP_VERSION || '1';
    if (epVersion == '1'){
      return await EventPortalFacade.validate(token, baseUrl);
    } else if (epVersion == '2'){
      return await EventPortal2Facade.validate(token, baseUrl);
    } else {
      return await EventPortalFacade.validate(token, baseUrl);
    }
  }

  private async validateOrganization(newOrg: Organization){
    // validate that if supplied token is valid for event portal if organization's service registry is set to eventportal 
    if (newOrg.serviceRegistry == 'eventportal'){
      const epVersion = process.env.EP_VERSION || '1';
      const orgStatus = await this.getOrganizationStatus(newOrg['cloud-token']);
      if (!orgStatus.eventPortalConnectivity){
        throw new ErrorResponseInternal(400, 'The supplied token is not valid for Event Portal');
      }
      if (epVersion != '2'){
        throw new ErrorResponseInternal(400, 'Event portal 2.0 support is not enabled');
      }
    }
  }

  @Cache(statusCache, { ttl: 240 })
  async getOrganizationStatusCached(token: any): Promise<OrganizationStatus> {
    return this.getOrganizationStatus(token);
  }

  async getOrganizationStatus(token: any): Promise<OrganizationStatus> {
    const status: OrganizationStatus = {

    };
    if (!token) {
      return status;
    }

    if (isString(token)) {
      status.cloudConnectivity = await SolaceCloudFacade.validate(token);
      status.eventPortalConnectivity = await this.validateEventPortalToken(token);
    } else {
      status.cloudConnectivity = await SolaceCloudFacade.validate(token.cloud.token, token.cloud.baseUrl);
      status.eventPortalConnectivity = await this.validateEventPortalToken(token.eventPortal.token, token.eventPortal.baseUrl);
    }

    return status;
  }

  static async onDeleteDeprovisionApps() {
    const apps = await AppsService.all();
    L.info(`cleaning up apps ${apps.length}`);
    for (const app of apps) {
      L.error(`deprovisioning ${app.name}`);
      await BrokerFactory.getBroker().deprovision(app);
    }
  }

  static delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export default new OrganizationsService();
