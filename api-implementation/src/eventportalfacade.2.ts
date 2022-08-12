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

const opts: ApiOptions = {
  baseUrl: getEventPortalBaseUrl,
  token: getEventPortalToken,


};

export interface ExportableEventApiProductVersion{
  version: EventApiProductVersion
  product: EventApiProduct
}

export class EventPortalfacade {
  private statesService: StatesServiceDefault;
  private eventApiProductsService: EventApiProductsServiceDefault;
  private eventApIsService: EventApIsServiceDefault;
  constructor(url?: string) {
    if (url) {
      opts.baseUrl = url;  
    }
    this.statesService = new StatesServiceDefault(opts);
    this.eventApiProductsService = new EventApiProductsServiceDefault(opts);
    this.eventApIsService = new EventApIsServiceDefault(opts);
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

  public async getInsertableStates(): Promise<string[]> {
    const states: StatesResponse = await this.statesService.getStates();
    const released = states.data.find(s => s.name.toUpperCase() == 'RELEASED').id;
    return [released];
  }

  public async getState(stateId: string): Promise<StateDTO> {
    const states: StatesResponse = await this.statesService.getStates();
    return states.data.find(s => s.id == stateId);
  }

  public async listSharedEventAPIProducts(applicationDomainIds: string[]): Promise<EventApiProductsResponse> {
    const filter = (applicationDomainIds && applicationDomainIds.length>0)?applicationDomainIds:null;
    const prods = await this.eventApiProductsService.getEventApiProducts(100, 1, null, null, null, null, filter, true);
    return prods;
  }

  public async getLatestExportableAPIProductVersions(productId: string): Promise<EventApiProductVersionsResponse> {
    const draft = await this.getDraftStateId();
    const prodVersion = await this.eventApiProductsService.getEventApiProductVersionsForEventApiProduct(productId);
    prodVersion.data = prodVersion.data.filter(v => v.stateId != draft);
    prodVersion.data.sort((a, b) => cmp(a.version, b.version));
    if (prodVersion.data.length>0){
          prodVersion.data = [prodVersion.data[prodVersion.data.length - 1]];
    }
    return prodVersion;
  }

  public async listExportableAPIProductVersions(applicationDomainIds: string[]): Promise<ExportableEventApiProductVersion[]> {
    const list: ExportableEventApiProductVersion[] = [];
    const prods = await this.listSharedEventAPIProducts(applicationDomainIds);
    for (const prod of prods.data) {
      const versions = await this.getLatestExportableAPIProductVersions(prod.id);
      for (const version of versions.data){
        list.push({
          product: prod,
          version: version,
        })
      }
    }
    return list;
  }

  public async getApplicationDomainIdByAPIProductVersion(apiProductVersion: EventApiProductVersion): Promise<string> {
    const product = await this.eventApiProductsService.getEventApiProducts(100, 1,null, null, [apiProductVersion.eventApiProductId]);
    return product.data.find(p=>p.id==apiProductVersion.eventApiProductId).applicationDomainId;

  }

  public async getAsyncAPI(apiVersionId: string): Promise<EventAPIAsyncAPIInfo> {
    const apiSpec = await this.eventApIsService.getAsyncApiForEventApiVersion(apiVersionId, 'json');
    const apiName = ((await this.eventApIsService.getEventApiVersion(apiVersionId, 'parent')).data as any).parent.name;
    return {
      apiPayload: apiSpec,
      name: apiName
    };
  }
}



export default new EventPortalfacade;