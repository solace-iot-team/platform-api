import L from '../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import AppListitem = Components.Schemas.AppListItem;
import CommonEntityNameList = Components.Schemas.CommonEntityNameList;
import CommonEntityNames = Components.Schemas.CommonEntityNames;
import { PersistenceService } from './persistence.service';

import EnvironmentsService from './environments.service';
import AppsService from './apps.service';

import ApisService from './apis.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import asyncapigenerator from './asyncapi/asyncapigenerator';
import preconditionCheck from './persistence/preconditionhelper';

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

  async update(name: string, body: APIProduct): Promise<APIProduct> {
    preconditionCheck(this, name);
    try {
      // we need ot load the environment list so we can validate a new protocol that may be added
      if (body.environments == null) {
        const oldProduct = await this.persistenceService.byName(name);
        body.environments = oldProduct.environments;
      }
      const apiReferenceCheck = await this.validateReferences(body);
      L.info(` reference check result ${apiReferenceCheck}`);
      if (!apiReferenceCheck)
        throw new ErrorResponseInternal(422, ` reference check failed ${apiReferenceCheck}`);
      const p = await this.persistenceService.update(name, body);
      if (p != null) {
        return p;
      } else {
        throw new ErrorResponseInternal(500, `Could not update object`);
      }
    } catch (e) {
      L.debug(`apiProducts.update ${JSON.stringify(e)}`);
      throw e;
    }
  }

  async apiList(apiProductName: string): Promise<string[]> {
    const apiProduct: APIProduct = await this.byName(apiProductName);
    return apiProduct.apis;
  }
  async apiByName(apiProductName: string, name: string): Promise<string> {
    const apiProduct = await this.byName(apiProductName);
    return asyncapigenerator.getSpecificationByApiProduct(name, apiProduct);
  }

  async appsByName(name: string): Promise<CommonEntityNameList> {
    const apps: AppListitem[] = await this.listAppsReferencingProduct(name);
    const names: CommonEntityNameList = [];
    for (const app of apps){
      const name: CommonEntityNames = {
        displayName: app.displayName,
        name: app.name,
      };
      names.push(name);
    }
    return names;
  }
  private async canDelete(name: string): Promise<boolean> {
    const apps = await this.listAppsReferencingProduct(name);
    if (apps == null || apps.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  private async listAppsReferencingProduct(name: string): Promise<AppListitem[]> {
    const q: any = {
      apiProducts: {
        $elemMatch: {
          $eq: name
        }
      }
    }
    L.info(q);
    const apps = await AppsService.list(q);
    return apps;
  }

  private async validateReferences(product: APIProduct): Promise<boolean> {

    if (product.apis != null) {
      for (const apiName of product.apis) {
        const errMsg = `Referenced API ${apiName} does not exist`;
        try {
          const api = await ApisService.byName(apiName);
          if (api == null) {
            throw new ErrorResponseInternal(422, errMsg);
          }
        } catch (e) {
          throw new ErrorResponseInternal(422, errMsg);
        }
      }
    }

    // all apis exist, now check environments
    const protocolPresent = {};
    if (product.protocols) {
      for (const protocol of product.protocols) {
        protocolPresent[protocol.name] = false;
      }
    }
    if (product.environments != null && product.protocols) {
      for (const envName of product.environments) {
        const errMsg = `Referenced environment ${envName} does not exist`;
        try {
          const env = await EnvironmentsService.byName(envName);
          if (env == null) {
            throw new ErrorResponseInternal(422, errMsg);
          } else {
            for (const protocol of product.protocols) {
              // check if the protocol was already found before
              if (!protocolPresent[protocol.name]) {
                if (env.exposedProtocols != null && env.exposedProtocols.length > 0) {
                  protocolPresent[protocol.name] = (env.exposedProtocols.find(e => e.name == protocol.name) != null);
                } else {
                  protocolPresent[protocol.name] = (env.messagingProtocols.find(e => e.protocol.name == protocol.name) != null);
                }
              }
            }
          }
        } catch (e) {
          L.error(e);
          throw new ErrorResponseInternal(422, errMsg);
        }
      }
      // throw error if protocol is missing from all environments, can not be used
      Object.keys(protocolPresent).forEach(function (key, index) {
        if (!protocolPresent[key]) {
          throw new ErrorResponseInternal(422, `Referenced protocol ${key} does not exist in any environment`);
        } else {
          L.debug(`protocol is present: ${key}`);
        }
      });
    }
    return true;
  }

}

export default new ApiProductsService();
