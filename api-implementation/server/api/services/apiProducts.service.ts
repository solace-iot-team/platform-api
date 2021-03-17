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
    var protocolPresent = {};
    for (var protocol of product.protocols) {
      protocolPresent[protocol.name] = false;
    }
    for (var apiName of product.apis) {
      const errMsg = `Referenced API ${apiName} does not exist`;
      try {
        var api = await ApisService.byName(apiName);
        if (api == null) {
          throw new ErrorResponseInternal(422, errMsg);
        }
      } catch (e) {
        throw new ErrorResponseInternal(422, errMsg);
      }
    }

    // all apis exist, now check environments
    for (var envName of product.environments) {
      const errMsg = `Referenced environment ${envName} does not exist`;
      try {
        var env = await EnvironmentsService.byName(envName);
        if (env == null) {
          throw new ErrorResponseInternal(422, errMsg);
        } else {
          for (var protocol of product.protocols) {
            protocolPresent[protocol.name] = (env.messagingProtocols.find(e => e.protocol.name == protocol.name) != null);
          }
        }
      } catch (e) {
        throw new ErrorResponseInternal(422, errMsg);
      }
    }

    // throw error if protocol is missing from all environments, can not be used
    Object.keys(protocolPresent).forEach(function (key, index) {
      if (!protocolPresent[key]) {
        throw new ErrorResponseInternal(422, `Referenced protocol ${key} does not exist in any environment`);
      }
    });
    return true;
  }

}

export default new ApiProductsService();
