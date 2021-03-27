import L from '../../common/logger';
import APIDomain = Components.Schemas.APIDomain;
import EventPortalFacade from '../../../src/eventportalfacade';


export class ApisService {

  all(): Promise<APIDomain[]> {
    var apiDomains = EventPortalFacade.getApiDomains();
    return apiDomains;
  }

  byName(name: string): Promise<APIDomain> {
    L.info(`fetch apiDomain with name "${name}"`);
    return new Promise<APIDomain>((resolve, reject) => {
      var apiDomainPromise: Promise<APIDomain[]> = EventPortalFacade.getApiDomains(name);
      apiDomainPromise.then((apiDomains) => {
        if (apiDomains != null && apiDomains.length == 1)
          resolve(apiDomains[0]);
        else 
          resolve(null);

      }).catch((error) => {
        reject(error);
      });
    });
  }

}

export default new ApisService();
