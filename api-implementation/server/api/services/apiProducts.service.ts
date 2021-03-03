import L from '../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import { PersistenceService } from './persistence.service';

import EnvironmentsService from './environments.service';
import AppsService from './apps.service';

import ApisService from './apis.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { ApiError } from '../../../src/clients/eventportal';

export class ApiProductsService {

  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('api_products');

  }

  all(query?: any): Promise<APIProduct[]> {
    return this.persistenceService.all(query);
  }

  byName(name: string): Promise<APIProduct> {
    return this.persistenceService.byName(name);
  }

  async delete(name: string): Promise<number> {
    if (await this.canDelete(name)) {
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(409, `Can't delete, API Product is still referenced`);
    }
  }

  create(body: APIProduct): Promise<APIProduct> {
    return new Promise<APIProduct>(async (resolve, reject) => {
      try {
        const apiReferenceCheck: boolean = await this.validateReferences(body);
        L.info(` reference check result ${apiReferenceCheck}`);
        if (!apiReferenceCheck) {
          L.info(` reference check failed ${apiReferenceCheck}`);
          reject(new ErrorResponseInternal(422, ` reference check failed ${apiReferenceCheck}`));

        }
        this.persistenceService.create(body.name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          L.error(`APIProductsService.create error ${e}`);
          reject(e);
        });

      } catch (e) {
        L.error(`APIProductsService.create failure  ${e}`);
        reject(e);
      }
    });

  }

  update(name: string, body: APIProduct): Promise<APIProduct> {
    return new Promise<APIProduct>(async (resolve, reject) => {
      try {
        if(name != body.name){
          reject(new ErrorResponseInternal(400, ` Can not rename an API product ${name}`));
        }
        const apiReferenceCheck = await this.validateReferences(body);
        L.info(` reference check result ${apiReferenceCheck}`);
        if (!apiReferenceCheck)
          reject(new ErrorResponseInternal(422, ` reference check failed ${apiReferenceCheck}`));
        this.persistenceService.update(name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });

      } catch (e) {
        reject(e);
      }
    });
  }

  private async canDelete(name: string): Promise<boolean> {
    var q: any = {
      apiProducts: {
        $elemMatch: {
          $eq: name
        }
      }
    }
    L.info(q);
    var apps = await AppsService.list(q);
    if (apps == null || apps.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  private async validateReferences(product: APIProduct): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var protocolPresent = {};
      for (var protocol of product.protocols) {
        protocolPresent[protocol.name] = false;
      }
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
            reject1(new ErrorResponseInternal(422, `Referenced API ${n} does not exist`));
          })
        }));
      });
      product.environments.forEach((envName: string) => {
        results.push(new Promise<boolean>((resolve, reject) => {
          EnvironmentsService.byName(envName).then((p) => {
            if (p != null) {
              for (var protocol of product.protocols) {
                protocolPresent[protocol.name] = (p.messagingProtocols.find(e => e.protocol.name == protocol.name) != null);
              }
              resolve(true);
            } else {
              reject(new ErrorResponseInternal(422, `Referenced environment ${envName} does not exist`));
            }
          }
          ).catch((e) => {
            var s: string = null;
            if (typeof s === 'string') {
              s = e as string;
            } else if (e.message !== null && e.message !== undefined) {
              s = e.message;
            }

            L.info(`validateReferences ${e} Referenced env ${envName} does not exist`);
            if (s.toUpperCase().includes("Not Found".toUpperCase())) {
              reject(new ErrorResponseInternal(422, `Referenced environment ${envName} does not exist`));
            } else {
              reject(new ErrorResponseInternal(422, e));
            }


          })
        }));
      });
      Promise.all(results).then((r) => {
        Object.keys(protocolPresent).forEach(function (key, index) {
          if (!protocolPresent[key]) {
            reject(new ErrorResponseInternal(422, `Referenced protocol ${key} does not exist`));
          }
        });
        resolve(true)
      }).catch((e) => {
        L.info(`validateReferences a rejection occurred ${e}`);
        reject(e);
      });




    }

    );
  }
}

export default new ApiProductsService();
