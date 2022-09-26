import L from '../server/common/logger';
import Environment = Components.Schemas.Environment;
//import { OpenAPI, Service, ServicesService, ServiceResponse, ServicesResponse } from "./clients/solacecloud";
import { ServicesServiceDefault } from './clients/solacecloud/services/ServicesServiceDefault';
import { ServicesService } from './clients/solacecloud/services/ServicesService';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { Service } from './clients/solacecloud/models/Service';
import { ServiceResponse } from './clients/solacecloud/models/ServiceResponse';
import { ServicesResponse } from './clients/solacecloud/models/ServicesResponse';
import { ClientProfileRequest } from './clients/solacecloud/models/ClientProfileRequest';
import { MsgVpnClientProfile } from './clients/solacecloud/models/MsgVpnClientProfile';
import { CloudRequestType } from './clients/solacecloud/models/CloudRequestType';
import { ApiOptions } from './clients/solacecloud/core/ApiOptions';
import { getCloudBaseUrl, getCloudToken, validateToken, resolve, getOrg } from './cloudtokenhelper';

import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import {ServiceRegistry} from './serviceregistry';

const serviceCache = new CacheContainer(new MemoryStorage());
const servicesCache = new CacheContainer(new MemoryStorage());

class SolaceCloudFacade implements ServiceRegistry{
  private cloudService: ServicesService;
  private apiOptions: ApiOptions;
  constructor() {
    this.apiOptions = {
      baseUrl: getCloudBaseUrl,
      token: getCloudToken
    };
    this.cloudService = new ServicesServiceDefault(this.apiOptions);
  }

  public async getServiceByEnvironment(e: Environment): Promise<Service> {
    return this.getServiceById(e.serviceId);
  }

  public async getServiceById(id: string): Promise<Service> {
    const cacheKey: string = this.calculateCacheKey(id);
    const cachedService: Service = await serviceCache.getItem<Service>(cacheKey);
    if (cachedService) {
      return cachedService;
    }
    try {
      const result: ServiceResponse = await this.cloudService.getService(id);
      if (result == null || result.data == null) {
        throw new ErrorResponseInternal(404, `Service ${id} does not exist`);
      } else {
        for (const mp of result.data.messagingProtocols) {
          for (const ep of mp.endPoints) {
            for (let i = 0; i < ep.uris.length; i++) {
              let u = ep.uris[i].replace('smf://', 'tcp://').replace('smfs://', 'tcps://');
              ep.uris[i] = u;
            }
          }
        }
        await serviceCache.setItem(cacheKey, result.data, { ttl: 360 });
        return result.data;
      }
    }
    catch (err) {
      L.error(`getServiceByEnvironment ${JSON.stringify(err)}`);
      throw new ErrorResponseInternal(500, `API Error ${err}`);
    }
  }

  public async getServices(): Promise<Service[]> {
    const cacheKey = this.calculateCacheKey();
    const cachedServices = await servicesCache.getItem<Service[]>(cacheKey);
    if (cachedServices) {
      return cachedServices;
    }
    let services: Service[] = [];
    try {
      const result: ServicesResponse = await this.cloudService.listServices();
      if (result == null) {
        throw new ErrorResponseInternal(404, `No services found`);
      } else {
        for (const s of result.data) {
          services.push(await this.getServiceById(s.serviceId))
        }
        await servicesCache.setItem(cacheKey, services, { ttl: 360 });
        return services;
      }
    }
    catch (e) {
      L.error(e);
      throw new ErrorResponseInternal(500, `API Error ${e}`);
    }
  }

  public async createClientProfile(service: Service, clientProfile: MsgVpnClientProfile): Promise<any>{
    const clientProfileRequest: ClientProfileRequest = {
      clientProfile: clientProfile,
      operation: CloudRequestType.create
    };
    L.warn(`create client profile ${clientProfile.clientProfileName} on service ${service.serviceId}`);
    L.warn(await getCloudBaseUrl());
    try {
      let requestStatus = await this.cloudService.sendClientProfileRequest(service.serviceId, clientProfileRequest);
      while (requestStatus.data && (!requestStatus.data.adminProgress || requestStatus.data.adminProgress != 'completed')) {
        L.info(`track client profile ${clientProfile.clientProfileName} progress ${requestStatus.data.adminProgress}`);
        requestStatus = await this.cloudService.trackCloudRequestStatus(service.serviceId, requestStatus.data.id, true);
      }
      L.info(`completed client profile ${clientProfile.clientProfileName} progress ${requestStatus.data.adminProgress}`);
      return requestStatus;
    } catch (e) {
      L.error(`error on client profile ${clientProfile.clientProfileName} on service ${service.serviceId}`, e);
      L.error(e);
      throw e;
    }
  }

  public async validate(token: string, baseUrl?: string): Promise<boolean> {
    let url: string = `${await resolve(this.apiOptions.baseUrl)}/services`;
    if (baseUrl != null) {
      url = `${baseUrl}/services`;
    }
    return validateToken(token, url);
  }

  private calculateCacheKey(id?: string): string {
    let cacheKey: string = getOrg();
    if (id) {
      cacheKey = `${cacheKey}:${id}`;
    }
    return cacheKey;
  }
}

export default new SolaceCloudFacade();
