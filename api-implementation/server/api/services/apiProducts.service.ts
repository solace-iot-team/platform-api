import L from '../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import { PersistenceService } from './persistence.service';
import EventPortalFacade from '../../../src/eventportalfacade';

import EnvironmentsService from './environments.service';

export class ApiProductsService {

  private persistenceService: PersistenceService;
  
  constructor() {
    this.persistenceService = new PersistenceService('api_products');
    
  }

  all(): Promise<APIProduct[]> {
    return this.persistenceService.all();
  }

  byName(name: string): Promise<APIProduct> {
    return this.persistenceService.byName(name);
  }

  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }

  create(body: APIProduct): Promise<APIProduct> {
    return new Promise<APIProduct>((resolve, reject) => {
      var apiReferenceCheck: Promise<boolean> = this.validateReferences(body);
      apiReferenceCheck.then((b: boolean) => {
        this.persistenceService.create(body.name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });
      }).catch((e)=>{
        reject(e);
      })

    });
  }

  update(name: string, body: APIProduct): Promise<APIProduct> {
   return new Promise<APIProduct>((resolve, reject) => {
      var apiReferenceCheck: Promise<boolean> = this.validateReferences(body);
      apiReferenceCheck.then((b: boolean) => {
        this.persistenceService.update(name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });
      }).catch((e)=>{
        reject(e);
      })

    });
  }

  private validateReferences(product: APIProduct): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var results: Promise<boolean>[] = [];
      product.apis.forEach((n) => {
        results.push(new Promise<boolean>((resolve, reject) => {
          EventPortalFacade.getApi(n).then((p) => {
            resolve(true);
          }
          ).catch((e) => {
           L.info(e);
          reject(`Referenced API ${n} does not exist`);
          })
        }));
      });
      product.environments.forEach((envName: string)=>{
        results.push(new Promise<boolean>((resolve, reject) => {
          EnvironmentsService.byName(envName).then((p) => {
            if (p){
            resolve(true);
            } else {
              reject(`Referenced environment ${envName} does not exist`);
            }
          }
          ).catch((e) => {
            L.info(e);
            reject(`Referenced environment ${envName} does not exist`);
          })
        }));
      });

      Promise.all(results).then((r) => { resolve(true) }).catch((e) => {
        L.info(e);
        reject(422);
      });

    }

    );
  }
}

export default new ApiProductsService();
