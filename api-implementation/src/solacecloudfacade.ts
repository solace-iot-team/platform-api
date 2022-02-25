import L from '../server/common/logger';
import Environment = Components.Schemas.Environment;
import { OpenAPI, Service, ServicesService, ServiceResponse, ServicesResponse } from "./clients/solacecloud";
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { getCloudBaseUrl, getCloudToken, validateToken, resolve } from './cloudtokenhelper';

import { Cache, CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'

const serviceCache = new CacheContainer(new MemoryStorage());
const servicesCache = new CacheContainer(new MemoryStorage());

class SolaceCloudFacade {

  constructor() {
    OpenAPI.TOKEN = getCloudToken;
    OpenAPI.BASE = getCloudBaseUrl;
  }

  public async getServiceByEnvironment(e: Environment): Promise<Service> {
    return this.getServiceById(e.serviceId);
  }

  public async getServiceById(id: string): Promise<Service> {
    const cacheKey: string = await this.calculateCacheKey(id);
    const cachedService: Service = await serviceCache.getItem<Service>(cacheKey);
    if (cachedService) {
      return cachedService;
    }
    try {
      const result: ServiceResponse = await ServicesService.getService(id);
      if (result == null || result.data == null) {
        throw new ErrorResponseInternal(404, `Service ${id} does not exist`);
      } else {
        for (const mp of result.data.messagingProtocols){
          for (const ep of mp.endPoints){
            for (let i = 0; i < ep.uris.length; i++){
              let u = ep.uris[i].replace('smf://', 'tcp://').replace('smfs://', 'tcps://');
              ep.uris[i] = u;
            }
          }
        }
        await serviceCache.setItem(cacheKey, result.data, { ttl: 3600 });
        return result.data;
      }
    }
    catch (err) {
      L.error(`getServiceByEnvironment ${JSON.stringify(err)}`);
      throw new ErrorResponseInternal(500, `API Error ${err}`);
    }
  }

  public async getServices(): Promise<Service[]> {
    const cacheKey = await this.calculateCacheKey();
    const cachedServices = await servicesCache.getItem<Service[]>(cacheKey);
    if (cachedServices) {
      return cachedServices;
    }
    let services: Service[]  = [];
    try {
      const result: ServicesResponse = await ServicesService.listServices();
      if (result == null) {
        throw new ErrorResponseInternal(404, `No services found`);
      } else {
        for (const s of result.data){
          services.push(await this.getServiceById(s.serviceId))
        }
        await servicesCache.setItem(cacheKey, services, { ttl: 3600 });
        return services;
      }
    }
    catch (e) {
      L.error(e);
      throw new ErrorResponseInternal(500, `API Error ${e}`);
    }
  }

  public async validate(token: string, baseUrl?: string): Promise<boolean> {
    let url: string = `${await resolve(OpenAPI.BASE)}/services`;
    if (baseUrl != null) {
      url = `${baseUrl}/services`;
    }
    return validateToken(token, url);
  }

  private async calculateCacheKey(id?: string): Promise<string> {
    let cacheKey: string = await getCloudToken();
    if (id) {
      cacheKey = `${cacheKey}:${id}`;
    }
    return cacheKey;
  }
}

export default new SolaceCloudFacade();
