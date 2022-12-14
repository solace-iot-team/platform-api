// ep 2.0 imports
import { StatesServiceDefault } from './clients/ep.2.0/services/StatesServiceDefault';
import { EventApiProductsServiceDefault } from './clients/ep.2.0/services/EventApiProductsServiceDefault';
import { EventApIsServiceDefault } from './clients/ep.2.0/services/EventApIsServiceDefault';
import { ApiOptions } from './clients/ep.2.0/core/ApiOptions';

import { EventApiProductVersionsResponse } from './clients/ep.2.0/models/EventApiProductVersionsResponse';
import { StatesResponse } from './clients/ep.2.0/models/StatesResponse';
import { EventApiProductsResponse } from './clients/ep.2.0/models/EventApiProductsResponse';
import { StateDTO } from './clients/ep.2.0/models/StateDTO';
import { EventAPIAsyncAPIInfo } from './model/eventapiasyncapiinfo';
import { EventApiProductVersion } from './clients/ep.2.0/models/EventApiProductVersion';

import cmp from 'semver-compare';
import { getEventPortalToken, getEventPortalBaseUrl, validateToken, resolve } from './cloudtokenhelper';
import { EventApiProduct } from './clients/ep.2.0/models/EventApiProduct';
import { ApplicationDomainsServiceDefault } from './clients/ep.2.0/services/ApplicationDomainsServiceDefault';
import { ApplicationDomainsResponse } from './clients/ep.2.0/models/ApplicationDomainsResponse';

import ApplicationDomainList = Components.Schemas.ApplicationDomainList;
import ApplicationDomain = Components.Schemas.ApplicationDomain;
import { ApplicationDomainResponse } from './clients/ep.2.0/models/ApplicationDomainResponse';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';

import { Cache, CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'

const appDomainCache = new CacheContainer(new MemoryStorage())
const stateCache = new CacheContainer(new MemoryStorage())

const opts: ApiOptions = {
  baseUrl: getEventPortalBaseUrl,
  token: getEventPortalToken,


};

export interface ExportableEventApiProductVersion {
  version: EventApiProductVersion
  product: EventApiProduct
}

export class EventPortalfacade {
  private statesService: StatesServiceDefault;
  private eventApiProductsService: EventApiProductsServiceDefault;
  private eventApIsService: EventApIsServiceDefault;
  private applicationDomainsService: ApplicationDomainsServiceDefault;
  constructor(url?: string) {
    if (url) {
      opts.baseUrl = url;
    }
    this.statesService = new StatesServiceDefault(opts);
    this.eventApiProductsService = new EventApiProductsServiceDefault(opts);
    this.eventApIsService = new EventApIsServiceDefault(opts);
    this.applicationDomainsService = new ApplicationDomainsServiceDefault(opts);
  }

  public async validate(token: string, baseUrl?: string): Promise<boolean> {
    let url: string = `${await resolve(opts.baseUrl)}/api/v2/architecture/applicationDomains`;
    if (baseUrl != null) {
      url = `${baseUrl}/api/v2/architecture/applicationDomains`;
    }
    return validateToken(token, url);
  }

  public async getDraftStateId(): Promise<string> {
    const states: StatesResponse = await this.statesService.getStates();
    const DRAFT = states.data.find(s => s.name.toUpperCase() == 'DRAFT').id;
    return DRAFT;
  }

  @Cache(stateCache, { ttl: 120 })
  public async getState(stateId: string): Promise<StateDTO> {
    const states: StatesResponse = await this.statesService.getStates();
    return states.data.find(s => s.id == stateId);
  }

  public async listSharedEventAPIProducts(applicationDomainIds: string[]): Promise<EventApiProductsResponse> {
    const filter = (applicationDomainIds && applicationDomainIds.length > 0) ? applicationDomainIds : null;
    const prods = await this.eventApiProductsService.getEventApiProducts(100, 1, null, null, null, null, filter, true);
    return prods;
  }

  public async getLatestExportableAPIProductVersions(productId: string): Promise<EventApiProductVersionsResponse> {
    const draft = await this.getDraftStateId();
    const prodVersion = await this.eventApiProductsService.getEventApiProductVersionsForEventApiProduct(productId);
    prodVersion.data = prodVersion.data.filter(v => v.stateId != draft);
    prodVersion.data.sort((a, b) => cmp(a.version, b.version));
    if (prodVersion.data.length > 0) {
      prodVersion.data = [prodVersion.data[prodVersion.data.length - 1]];
    }
    return prodVersion;
  }

  public async listExportableAPIProductVersions(applicationDomainIds: string[]): Promise<ExportableEventApiProductVersion[]> {
    const list: ExportableEventApiProductVersion[] = [];
    const draftState = await this.getDraftStateId();
    const versions: EventApiProductVersionsResponse = await this.eventApiProductsService.getEventApiProductVersions(99, 1, null, null, 'parent', null, null, null, true, true)
    for (const version of versions.data) {
      const include: boolean = (applicationDomainIds == null
        || applicationDomainIds.length == 0
        || applicationDomainIds.find(a => a == version['parent'].applicationDomainId) != undefined);
      if (include && version.stateId != draftState) {
        list.push({
          product: version['parent'],
          version: version,
        })
      }
    }
    return list;
  }

  public async getAsyncAPI(apiVersionId: string): Promise<EventAPIAsyncAPIInfo> {
    const apiSpec = await this.eventApIsService.getAsyncApiForEventApiVersion(
      apiVersionId, false, 'json');
    const apiVersion = (await this.eventApIsService.getEventApiVersion(apiVersionId, 'parent'));
    const apiName = `${apiVersion.data['parent'].name}-${apiVersion.data['parent'].applicationDomainId}`;
    return {
      apiPayload: apiSpec,
      name: apiName,
      apiInfo: apiVersion.data['parent'],
    };
  }

  public async getApplicationDomains(pageSize: number, pageNumber: number): Promise<ApplicationDomainList> {
    const domains: ApplicationDomainList = [];
    try {
      const applicationDomains: ApplicationDomainsResponse = await this.applicationDomainsService.getApplicationDomains(isNaN(pageSize) ? 100 : pageSize, isNaN(pageNumber) ? 1 : pageNumber); if (applicationDomains.data && applicationDomains.data.length > 0) {
        for (const appDomain of applicationDomains.data) {
          domains.push(appDomain);
        }
      }
      return domains;
    } catch (e) {
      throw e;
    }

  }
  @Cache(appDomainCache, { ttl: 120 })
  public async getApplicationDomain(applicationDomainId: string): Promise<ApplicationDomain> {
    const domains: ApplicationDomainList = [];
    const applicationDomain: ApplicationDomainResponse = await this.applicationDomainsService.getApplicationDomain(applicationDomainId);
    if (applicationDomain.data) {
      return applicationDomain.data;
    } else {
      throw new ErrorResponseInternal(404, `Application Domain ${applicationDomainId} does not exist`);
    }
  }
}



export default new EventPortalfacade;