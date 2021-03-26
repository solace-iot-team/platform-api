import L from '../../common/logger';
import APIListItem = Components.Schemas.APIListItem;
import API = Components.Schemas.API;
import EventPortalFacade from '../../../src/eventportalfacade';


export class EventPortalApisService {

  all(tags: string[], apiDomain: string): Promise<APIListItem[]> {
    var apis = EventPortalFacade.getApis(tags, apiDomain);
    L.info(apis, 'fetch all apis');
    return Promise.resolve(apis);
  }

  byName(name: string): Promise<API> {
    L.info(`fetch api with name "${name}"`);
    var api = EventPortalFacade.getApi(name);
    return api;
  }

  specByName(name: string, asyncAPIVersion: string): Promise<string> {
    L.info(`fetch api spec for name "${name}"`);
    return EventPortalFacade.getApiSpec(name, asyncAPIVersion);
  }
}

export default new EventPortalApisService();
