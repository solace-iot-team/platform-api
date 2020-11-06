import L from '../../common/logger';
import APIListItem = Components.Schemas.APIListItem;
import API = Components.Schemas.API;
import { EventPortalFacade } from '../../../src/eventportalfacade';


export class ApisService {
  eventPortalFacade = new EventPortalFacade();

  all(): Promise<APIListItem[]> {
    var apis = this.eventPortalFacade.getApis();
    L.info(apis, 'fetch all apis');
    return Promise.resolve(apis);
  }

  byName(name: string): Promise<API> {
    L.info(`fetch api with name "${name}"`);
    var api = this.eventPortalFacade.getApi(name);
    return api;
  }

  specByName(name: string, asyncAPIVersion: string): Promise<string> {
    L.info(`fetch api spec for name "${name}"`);
    return this.eventPortalFacade.getApiSpec(name, asyncAPIVersion);
  }
}

export default new ApisService();
