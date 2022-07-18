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
import { EventApiProductVersion, eventApiVersion } from './clients/ep.2.0';

var cmp = require('semver-compare');

const opts: ApiOptions = {
  baseUrl: 'https://ep-mock.mocklab.io',

};
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

  public async getDraftStateId(): Promise<string> {
    const states: StatesResponse = await this.statesService.listStates();
    const DRAFT = states.data.find(s => s.name.toUpperCase() == 'DRAFT').id;
    return DRAFT;
  }

  public async getInsertableStates(): Promise<string[]> {
    const states: StatesResponse = await this.statesService.listStates();
    const released = states.data.find(s => s.name.toUpperCase() == 'RELEASED').id;
    return [released];
  }

  public async getState(stateId: string): Promise<StateDTO> {
    const states: StatesResponse = await this.statesService.listStates();
    return states.data.find(s => s.id == stateId);
  }

  public async listSharedEventAPIProducts(applicationDomainIds: string[]): Promise<EventApiProductsResponse> {
    const filter = (applicationDomainIds && applicationDomainIds.length>0)?applicationDomainIds:null;
    const prods = await this.eventApiProductsService.listEventApiProducts(999, 1, null, null, null, filter, true);
    return prods;
  }

  public async getLatestExportableAPIProductVersions(productId: string): Promise<EventApiProductVersionsResponse> {
    const draft = await this.getDraftStateId();
    const prodVersion = await this.eventApiProductsService.listApiProductVersion(productId);
    prodVersion.data = prodVersion.data.filter(v => v.stateId != draft);
    prodVersion.data.sort((a, b) => cmp(a.version, b.version));
    prodVersion.data = [prodVersion.data[prodVersion.data.length - 1]];
    return prodVersion;
  }

  public async listExportableAPIProductVersions(applicationDomainIds: string[]): Promise<EventApiProductVersionsResponse> {
    const list: EventApiProductVersionsResponse = {
      data: [],
    }
    const prods = await this.listSharedEventAPIProducts(applicationDomainIds);
    for (const prod of prods.data) {
      const versions = await this.getLatestExportableAPIProductVersions(prod.id);
      list.data.push(...versions.data);
    }
    return list;
  }

  public async getApplicationDomainIdByAPIProductVersion(apiProductVersion: EventApiProductVersion): Promise<string> {
    const product = await this.eventApiProductsService.listEventApiProducts(1, 999,null, [apiProductVersion.eventApiProductId]);
    return product.data.find(p=>p.id==apiProductVersion.eventApiProductId).applicationDomainId;

  }

  public async getAsyncAPI(apiId: string, apiVersionId: string): Promise<EventAPIAsyncAPIInfo> {
    const apiSpec = await this.eventApIsService.generateAsyncApi(apiId, apiVersionId, '', 'json');
    const apiName = (await this.eventApIsService.getEventApiVersionInfo(apiId, apiVersionId)).parent.name;
    return {
      apiPayload: apiSpec,
      name: apiName
    };
  }
}



export default new EventPortalfacade;