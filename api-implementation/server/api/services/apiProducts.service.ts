import L from '../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import { PersistenceService } from './persistence.service';

import EnvironmentsService from './environments.service';
import ApisService from './apis.service';

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
    return new Promise<APIProduct>(async (resolve, reject) => {
      try {
        const apiReferenceCheck: boolean = await this.validateReferences(body);
        L.info(` reference check result ${apiReferenceCheck}`);
        if (!apiReferenceCheck)
          L.info(` reference check failed ${apiReferenceCheck}`);
          reject(422);
        this.persistenceService.create(body.name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });

      } catch (e){
        L.info(` reference check failed ${e}`);
        reject(422);
      }
    });

  }

  update(name: string, body: APIProduct): Promise<APIProduct> {
    return new Promise<APIProduct>(async (resolve, reject) => {
      try {
        const apiReferenceCheck = await this.validateReferences(body);
        L.info(` reference check result ${apiReferenceCheck}`);
        if (!apiReferenceCheck)
          reject(422);
        this.persistenceService.update(name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });

      } catch {
        reject(422);
      }
    });
  }

  private validateReferences(product: APIProduct): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var results: Promise<boolean>[] = [];
      product.apis.forEach((n) => {
        results.push(new Promise<boolean>((resolve1, reject1) => {
          ApisService.byName(n).then((p) => {
            if (!p) {
              reject1(`Referenced API ${n} does not exist`)
            }
            resolve1(true);
          }
          ).catch((e) => {
            L.info(`validateReferences ${e} Referenced API ${n} does not exist`);
            reject1(`Referenced API ${n} does not exist`);
          })
        }));
      });
      product.environments.forEach((envName: string) => {
        results.push(new Promise<boolean>((resolve, reject) => {
          EnvironmentsService.byName(envName).then((p) => {
            if (p) {
              resolve(true);
            } else {
              reject(`Referenced environment ${envName} does not exist`);
            }
          }
          ).catch((e) => {
            L.info(`validateReferences ${e} Referenced env ${envName} does not exist`);
            reject(`Referenced environment ${envName} does not exist`);
          })
        }));
      });

      Promise.all(results).then((r) => { resolve(true) }).catch((e) => {
        L.info(`validateReferences a rejection occurred ${e}`);
        reject(422);
      });

    }

    );
  }
}

export default new ApiProductsService();
