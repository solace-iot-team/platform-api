import { ApisReadStrategy } from './read.strategy';
import { APISpecification } from '../apis.service';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import { PersistenceService } from '../persistence.service';
import APIInfo = Components.Schemas.APIInfo;
import EventPortalFacade from '../../../../src/eventportalfacade';
import { ns } from '../../middlewares/context.handler';
import { Paging } from '../../../../src/model/paging';
import { ContextConstants } from '../../../common/constants';

class ApisReadProxyStrategy implements ApisReadStrategy {
  private persistenceService: PersistenceService;
  private apiInfoPersistenceService: PersistenceService;
  private p: Paging = {
    pageNumber: 1,
    pageSize: 999,
  };
  constructor() {
    this.persistenceService = new PersistenceService('apis');
    this.apiInfoPersistenceService = new PersistenceService('apisInfo');
  }
  async all(): Promise<string[]> {
    ns.getStore().set('paging', this.p);
    return new Promise<string[]>(async (resolve, reject) => {
      const products = await EventPortalFacade.getEventApiProducts();
      const names: string[] = [];
      products.forEach(p => names.push(p.name));
      this.persistenceService
        .all()
        .then((all: APISpecification[]) => {

          all.forEach((spec: APISpecification) => {
            names.push(spec.name);
          });
          names.sort((a, b) => a.localeCompare(b));
          resolve(names);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async byName(name: string): Promise<string> {
    try {
      const spec: APISpecification = await this.persistenceService.byName(name);
      return spec.specification;
    } catch (e) {
      // if not found we look it up in event portal
      const products = await EventPortalFacade.getEventApiProducts();
      const product = products.find(p => p.name == name);
      if (product === undefined) {
        throw new ErrorResponseInternal(404, `Async API ${name} not found`);
      } else {
        const asyncAPI = await EventPortalFacade.getEventApiProductAsyncApi(product.id);
        return asyncAPI;
      }
    }
  }

  infoByName(name: string): Promise<APIInfo> {
    return new Promise<APIInfo>((resolve, reject) => {
      this.apiInfoPersistenceService
        .byName(name)
        .then((info: APIInfo) => {
          if (!info) {
            reject(
              new ErrorResponseInternal(404, `API Information  ${name} not found`)
            );
          } else {
            resolve(info);
          }
        })
        .catch(async (e) => {
          try {
            const products = await EventPortalFacade.getEventApiProducts();
            const product = products.find(p => p.name == name);
            const api = await EventPortalFacade.getEventApiProduct(product.id);
            const info: APIInfo = {
              createdBy: ns.getStore().get(ContextConstants.AUTHENTICATED_USER),
              createdTime: api.createdTime,
              description: api.description,
              name: api.name,
              source: 'EventAPIProduct',
              sourceId: api.id,
              sourceMetadata: api,
              summary: api.summary,
              updatedTime: api.updatedTime,
              version: api.version,
            }
            resolve(info);
          } catch (e) {
            reject(e);
          }
        });
    });
  }

}
export default new ApisReadProxyStrategy();