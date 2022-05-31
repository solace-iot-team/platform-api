import L from '../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import AppListitem = Components.Schemas.AppListItem;
import CommonEntityNameList = Components.Schemas.CommonEntityNameList;
import CommonEntityNames = Components.Schemas.CommonEntityNames
import EntityDeriveRequest = Components.Schemas.EntityDeriveRequest;
import MetaEntityReference = Components.Schemas.MetaEntityReference;
import { PersistenceService } from './persistence.service';

import EnvironmentsService from './environments.service';
import AppsService from './apps.service';

import ApisService from './apis.service';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { Versioning } from '../../common/versioning';
import asyncapigenerator from './asyncapi/asyncapigenerator';
import preconditionCheck from './persistence/preconditionhelper';

import AppUpdateEventEmitter from './apiProducts/appUpdateEventEmitter';
import { ns } from '../middlewares/context.handler';
import { ContextConstants } from '../../common/constants';

export class ApiProductsService {

  private persistenceService: PersistenceService;
  private revisionPersistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('api_products');
    this.revisionPersistenceService = new PersistenceService('api_products_revisions');

  }

  async all(query?: any): Promise<APIProduct[]> {
    const results: APIProduct[] = await this.persistenceService.all(query);
    for (const p of results) {
      p.meta = await Versioning.toExternalRepresentation(p.meta, this.revisionPersistenceService);
    }
    return results;
  }

  async byName(name: string): Promise<APIProduct> {
    const p: APIProduct = await this.persistenceService.byName(name);
    p.meta = await Versioning.toExternalRepresentation(p.meta, this.revisionPersistenceService);
    return p;
  }

  async delete(name: string): Promise<number> {
    if (await this.canDelete(name)) {
      const revisions: string[] = await this.revisionList(name);
      for (const r of revisions) {
        await this.revisionPersistenceService.delete(Versioning.createRevisionId(name, r));
      }
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(409, `Can't delete, API Product is still referenced`);
    }
  }

  async create(body: APIProduct): Promise<APIProduct> {
    const apiReferenceCheck: boolean = await this.validateReferences(body);
    L.info(`Reference check result ${apiReferenceCheck}`);
    if (!apiReferenceCheck) {
      L.info(`Reference check failed ${apiReferenceCheck}`);
      throw new ErrorResponseInternal(422, `Reference check failed ${apiReferenceCheck}`);

    }
    try {
      if (!body.meta) {
        body.meta = Versioning.createMeta();
      } else {
        body.meta = Versioning.createMetaFromRequest(body.meta);
      }
      const p = await this.persistenceService.create(body.name, body);
      await this.saveRevision(body);
      return await this.byName(body.name);
    } catch (e) {
      L.error(`APIProductsService.create error ${e}`);
      throw e;
    }
  }

  async update(name: string, body: APIProduct): Promise<APIProduct> {
    await preconditionCheck(this, name);
    try {
      // if the environments are updated, the current protocols must be re-validated
      // if the protocols are updated, they must be validated against the current environments
      if ((body.environments != null && body.protocols == null)
        || (body.environments == null && body.protocols != null)) {
        const oldProduct = await this.persistenceService.byName(name);
        body.environments = body.environments ?? oldProduct.environments;
        body.protocols = body.protocols ?? oldProduct.protocols;
      }
      const apiReferenceCheck = await this.validateReferences(body);
      L.info(`Reference check result ${apiReferenceCheck}`);
      if (!apiReferenceCheck)
        throw new ErrorResponseInternal(422, `Reference check failed ${apiReferenceCheck}`);
      const currentState: APIProduct = await this.persistenceService.byName(name);
      if (!currentState.meta) {
        currentState.meta = Versioning.createMeta();
      }

      if (!Versioning.validateNewStage(body.meta, currentState.meta)) {
        throw new ErrorResponseInternal(409, `Stage transition is not allowed, requested transition: ${currentState.meta.stage}=>${body.meta.stage}`);
      }
      if (!Versioning.validateNewVersion(body.meta, currentState.meta)) {
        throw new ErrorResponseInternal(409, `Version supplied in meta element is not greater than current version`);
      }

      if (!body.meta) {
        body.meta = Versioning.update(currentState.meta);
      } else {
        body.meta = Versioning.update(currentState.meta, body.meta);
      }
      L.info(JSON.stringify(currentState.meta));

      const p = await this.persistenceService.update(name, body);
      if (p != null) {
        await this.saveRevision(p);
        if (ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
          const org = ns.getStore().get(ContextConstants.ORG_NAME);
          AppUpdateEventEmitter.emit('apiProductUpdate', org, name);
        }

        return await this.byName(name);
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
    const apiList = await this.apiList(apiProductName);
    if (apiList.find(n => n == name)) {
      const apiProduct = await this.byName(apiProductName);
      return asyncapigenerator.getSpecificationByApiProduct(name, apiProduct);
    } else {
      throw new ErrorResponseInternal(404, `API [${name}] is not associated with API Product [${apiProductName}]`);
    }
  }

  async appsByName(name: string): Promise<CommonEntityNameList> {
    const apps: AppListitem[] = await this.listAppsReferencingProduct(name);
    const names: CommonEntityNameList = [];
    for (const app of apps) {
      const name: CommonEntityNames = {
        displayName: app.displayName,
        name: app.name,
      };
      names.push(name);
    }
    return names;
  }

  async derivedByName(name: string): Promise<CommonEntityNameList> {
    await this.byName(name);
    const derivedProducts: APIProduct[] = await this.persistenceService.all({
      'meta.derivedFrom.name': name
    });
    const names: CommonEntityNameList = [];
    for (const p of derivedProducts) {
      const name: CommonEntityNames = {
        displayName: p.displayName,
        name: p.name,
      };
      names.push(name);
    }
    return names;
  }

  async createDerived(name: string, body: EntityDeriveRequest): Promise<APIProduct> {
    try {
      const apiProduct: APIProduct = await this.persistenceService.byName(name);
      const derivedFrom: MetaEntityReference = {
        name: apiProduct.name,
        revision: Versioning.toExternalVersion(apiProduct.meta),
      };
      apiProduct.name = body.names.name;
      apiProduct.displayName = body.names.displayName;
      apiProduct.meta = Versioning.createMetaFromRequest(body.meta);
      //apiProduct.meta = Versioning.update(apiProduct.meta, body.meta);
      apiProduct.meta.derivedFrom = derivedFrom;
      apiProduct.meta.stage = 'draft';
      const p = await this.persistenceService.create(body.names.name, apiProduct);
      await this.saveRevision(p);
      return await this.byName(body.names.name);

    } catch (e) {
      L.error(`APIProductsService.create failure  ${e}`);
      throw (e);
    }
  }


  async revisionList(apiProductName: string): Promise<string[]> {
    const products: APIProduct[] = await this.revisionPersistenceService.all({ name: apiProductName });
    const revisions: string[] = [];
    for (const p of products) {
      const m = await Versioning.toExternalRepresentation(p.meta, this.revisionPersistenceService);
      revisions.push(m.version);
    }
    return revisions;
  }

  async revisionByVersion(apiProductName: string, version: string): Promise<APIProduct> {
    const revisionList = await this.revisionList(apiProductName);
    if (revisionList.find(n => n == version)) {
      const id = Versioning.createRevisionId(apiProductName, version);

      const apiProduct = await this.revisionPersistenceService.byName(id);
      if (!apiProduct) {
        throw new ErrorResponseInternal(404, `Version ${version} of API Product [${apiProductName}] does not exist`);
      }
      return apiProduct;
    } else {
      throw new ErrorResponseInternal(404, `Version ${version} of API Product [${apiProductName}] does not exist`);
    }
  }

  async byReference(apiProductRef: string): Promise<APIProduct> {
    let p: APIProduct;
    const ref: string[] = apiProductRef.split('@');
    if (ref.length == 2) {
      p = (await this.revisionByVersion(ref[0], ref[1]));
    } else {
      p = (await this.byName(apiProductRef));
    }
    return p;
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
      $or: [
        {
          apiProducts: {
            $elemMatch: {
              $eq: name
            }
          }
        },
        {
          apiProducts: {
            $elemMatch: {
              apiproduct: name
            }
          }
        }
      ]
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
          const api: string = await ApisService.byApiReference(apiName);
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

  private async saveRevision(product: APIProduct): Promise<void> {
    const meta = await Versioning.toExternalRepresentation(product.meta, this.revisionPersistenceService);
    const id = Versioning.createRevisionId(product.name, meta.version);
    await this.revisionPersistenceService.create(id, product);
  }
}

export default new ApiProductsService();
