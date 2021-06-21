import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { PersistenceService } from './persistence.service';
import APIProductsService from './apiProducts.service';
import parser from '@asyncapi/parser';
import AsyncAPIHelper from '../../../src/asyncapihelper';
import EventPortalFacade from '../../../src/eventportalfacade';
import APIInfo = Components.Schemas.APIInfo;
import {ns} from '../middlewares/context.handler';
import { ContextConstants } from '../../common/constants';
import { ApisReadStrategy } from './apis/read.strategy';
import ApisReadStrategyFactory from './apis/read.strategy.factory';
export interface APISpecification {
  name: string;
  specification: string;
}

export class ApisService {
  private persistenceService: PersistenceService;
  private apiInfoPersistenceService: PersistenceService;
  private readStrategy: ApisReadStrategy;

  constructor() {
    this.persistenceService = new PersistenceService('apis');
    this.apiInfoPersistenceService = new PersistenceService('apisInfo');
    this.readStrategy = ApisReadStrategyFactory.getReadStrategy();
  }

  async all(): Promise<string[]> {
    return this.readStrategy.all();
  }

  byName(name: string): Promise<string> {
    return this.readStrategy.byName(name);
  }

  infoByName(name: string): Promise<APIInfo> {
   return this.readStrategy.infoByName(name);
}

  async delete(name: string): Promise<number> {
    if (await this.canDelete(name)) {
      await this.apiInfoPersistenceService.delete(name);
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(
        409,
        `Can't delete, API is still referenced`
      );
    }
  }

  async create(name: string, body: string): Promise<string> {
    const info: APIInfo = {
      createdBy: ns.getStore().get(ContextConstants.AUTHENTICATED_USER),
      createdTime: Date.now(),
      description: name,
      name: name,
      source: 'Upload',
      summary: name,
      version: "1",
    }
    return this.createInternal(info, body);
  }

  async import(body: Components.Schemas.APIImport): Promise<string> {

    const apiSpec = await EventPortalFacade.getEventApiProductAsyncApi(body.id);
    const api = await EventPortalFacade.getEventApiProduct(body.id);
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
    if (!body.overwrite) {
      return this.createInternal(info, apiSpec);
    } else {
      try {
        const response = await this.createInternal(info, apiSpec);
        return response;
      } catch (e) {
        return this.updateInternal(info, apiSpec);
      }
    }
  }

  createInternal(info: APIInfo, asyncapi: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const isValid = await this.isValidSpec(asyncapi);
      if (!isValid) {
        reject(new ErrorResponseInternal(400, `Entity ${info.name} is not valid`));
      } else {
        const spec: APISpecification = {
          name: info.name,
          specification: this.convertAPISpec(asyncapi),
        };
        try {
          const r = await this.apiInfoPersistenceService.create(info.name, info);
        } catch (e) {
          reject(new ErrorResponseInternal(400, e));
        }
        this.persistenceService
          .create(info.name, spec)
          .then((spec: APISpecification) => {
            resolve(spec.specification);
          })
          .catch((e) => {
            reject(new ErrorResponseInternal(400, e));
          });
      }
    });

  }

  async update(name: string, body: string): Promise<string> {
    const r = await this.apiInfoPersistenceService.byName(name);
    if (r.source == 'Upload'){
        // for internal APIs increase the version number
        r.version = (Number(r.version)+1).toString();
    }
    return this.updateInternal(r, body);
  }

  updateInternal(info: APIInfo, body: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const isValid = await this.isValidSpec(body);
        if (!isValid) {
          reject(
            new ErrorResponseInternal(400, `AsyncAPI document is not valid`)
          );
        } else {
          const spec: APISpecification = {
            name: info.name,
            specification: this.convertAPISpec(body),
          };
          try {
            const r = await this.apiInfoPersistenceService.update(info.name, info);
          } catch (e) {
            reject(new ErrorResponseInternal(400, e));
          }

          this.persistenceService
            .update(info.name, spec)
            .then((spec: APISpecification) => {
              resolve(spec.specification);
            })
            .catch((e) => {
              reject(e);
            });
        }
      } catch (e) {
        reject(new ErrorResponseInternal(400, e));
      }
    });
  }

  private async canDelete(name: string): Promise<boolean> {
    const q = {
      apis: {
        $elemMatch: {
          $eq: name,
        },
      },
    };
    const products = await APIProductsService.all(q);
    if (products == null || products.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  private async isValidSpec(spec: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      L.debug(`validating spec`);
      parser
        .parse(spec)
        .then(() => {
          L.debug('valid spec');
          resolve(true);
        })
        .catch((e) => {
          L.debug(`invalid spec ${JSON.stringify(e)}`);
          resolve(false);
        });
    });
  }

  private convertAPISpec(spec: string): string {
    const contentType = AsyncAPIHelper.getContentType(spec);
    let parsedSpec = null;
    if (contentType.indexOf('yaml') > -1) {
      parsedSpec = AsyncAPIHelper.YAMLtoObject(spec);
    } else {
      parsedSpec = JSON.parse(spec);
    }
    this.addAsyncAPIExtensionInfo(parsedSpec);
    return JSON.stringify(parsedSpec);
  }

  private addAsyncAPIExtensionInfo(spec: any) {
    if (spec.info['x-origin']) {
      return;
    }
    if (spec.info == null) {
      spec.info = {};
    }

    const origin = {
      vendor: 'solace',
      name: 'apim-connector',
    };
    spec.info['x-origin'] = origin;
  }

}

export default new ApisService();
