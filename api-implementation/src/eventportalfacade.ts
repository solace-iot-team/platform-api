import L from '../server/common/logger';

import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';

import { getEventPortalBaseUrl, getEventPortalToken, validateToken, resolve } from './cloudtokenhelper';

import { EventAPIProductResponse, EventAPIProductListResponse, EventApiProductService, OpenAPI, EventAPIProduct } from './clients/eventportal/index';


class EventPortalFacade {
  constructor() {
    OpenAPI.TOKEN = getEventPortalToken;
    OpenAPI.BASE = getEventPortalBaseUrl;
  }

  public async validate(token: string, baseUrl?: string): Promise<boolean> {
    let url: string = `${await resolve(OpenAPI.BASE)}/apiProducts`;
    if (baseUrl != null) {
      url = `${baseUrl}/apiProducts`;
    }
    return validateToken(token, url);
  }


  public async getEventApiProducts(): Promise<Components.Schemas.EventAPIProductList> {
    try {
      const list: EventAPIProduct[] = (await EventApiProductService.getapiproducts()).data;
      for (const l of list) {
        delete l['hosted'];
      }
      return list;
    } catch (error) {
      L.error(error);
      throw new ErrorResponseInternal(error.status, error.message);
    }
  }

  public async getEventApiProduct(id: string): Promise<Components.Schemas.EventAPIProduct> {
    try {
      const product: EventAPIProduct = (await EventApiProductService.getapiproduct(id)).data;
      delete product['hosted'];
      delete product['externalEvents'];
      return product;
    } catch (error) {
      L.error(error);
      throw new ErrorResponseInternal(error.status, error.message);
    }
  }

  public async getEventApiProductByName(name: string): Promise<Components.Schemas.EventAPIProduct> {
    try {
      const products = await this.getEventApiProducts();
      const api = products.find(p => p.name == name);
      const product: EventAPIProduct = (await this.getEventApiProduct(api.id) as EventAPIProduct);
      return product;
    } catch (error) {
      L.error(error);
      throw new ErrorResponseInternal(error.status, error.message);
    }
  }

  public async getEventApiProductAsyncApi(id: string): Promise<any> {
    const apiSpec = await EventApiProductService.getasyncapiJson(id);
    L.debug(`Parsing API spec `);
    this.addAsyncAPIExtensionInfo(apiSpec.info);

    return JSON.stringify(apiSpec);
  }

  private addAsyncAPIExtensionInfo(info: any) {
    const origin = {
      vendor: 'solace',
      name: 'event-portal',
    };
    info['x-origin'] = origin;
  }
}

export default new EventPortalFacade();
