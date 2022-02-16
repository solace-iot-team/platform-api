import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { PersistenceService } from './persistence.service';
import APIProductsService from './apiProducts.service';
import parser from '@asyncapi/parser';
import { AsyncAPIDocument } from '@asyncapi/parser';
import AsyncAPIHelper from '../../../src/asyncapihelper';
import EventPortalFacade from '../../../src/eventportalfacade';
import APIInfo = Components.Schemas.APIInfo;
import { ns } from '../middlewares/context.handler';
import { ContextConstants } from '../../common/constants';
import { ApisReadStrategy } from './apis/read.strategy';
import ApisReadStrategyFactory from './apis/read.strategy.factory';
import ApiListFormat = Components.Parameters.ApiListFormat.Format;
import APIParameter = Components.Schemas.APIParameter;
import CommonEntityNameList = Components.Schemas.CommonEntityNameList;
import CommonEntityNames = Components.Schemas.CommonEntityNames;
import APIProduct = Components.Schemas.APIProduct;
import EventAPIProduct = Components.Schemas.EventAPIProduct;
import {updateProtectionByObject} from './persistence/preconditionhelper';
import asyncapihelper from '../../../src/asyncapihelper';

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

  async all(format?: ApiListFormat): Promise<string[]> {
    return this.readStrategy.all(format);
  }

  byName(name: string): Promise<string> {
    return this.readStrategy.byName(name);
  }

  async infoByName(name: string): Promise<APIInfo> {
    const apiInfo = await this.readStrategy.infoByName(name);
    const spec: string = await this.byName(name);
    const params = await this.getAsyncAPIParameters(spec);
    if (params) {
      apiInfo.apiParameters = params;
    }
    return apiInfo;
  }

  async apiProductsByName(name: string): Promise<CommonEntityNameList> {
    const apiProducts: APIProduct[] = await APIProductsService.all({apis: name});
    const names: CommonEntityNameList = [];
    for (const apiProduct of apiProducts){
      const name: CommonEntityNames = {
        displayName: apiProduct.displayName,
        name: apiProduct.name,
      };
      names.push(name);
    }
    return names;
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
    const canCreate: boolean = await this.readStrategy.canCreate(name);
    if (!canCreate) {
      throw new ErrorResponseInternal(
        422,
        `API ${name} can not be created`
      );
    }
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

    let apiSpec;
    let api: EventAPIProduct;
    try {
      apiSpec = await EventPortalFacade.getEventApiProductAsyncApi(body.id)
      api = await EventPortalFacade.getEventApiProduct(body.id) ;
    } catch (e){
      throw new ErrorResponseInternal(500, `No Event POrtal Connectivity, Entity ${api.name} can not be imported`)
    }
    const canImport = await this.readStrategy.canImport(api.name);
    if (!canImport) {
      throw new ErrorResponseInternal(422, `Entity ${api.name} can not be imported`)
    }
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
      const validationMessage = await this.getAPIValidationError(asyncapi);
      if (validationMessage) {
        reject(new ErrorResponseInternal(400, `Entity ${info.name} is not valid, ${validationMessage}`));
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
    const r: APIInfo = await this.apiInfoPersistenceService.byName(name);
    const a: APISpecification = await this.persistenceService.byName(name);
    try  {
      await updateProtectionByObject(a.specification);
    } catch (e){
      // this will fail if the API was obtained in YAML format - let;s try again with "r" converted to YAML
      await updateProtectionByObject(asyncapihelper.JSONtoYAML(a.specification));
    }
    if (r.source == 'Upload') {
      // for internal APIs increase the version number
      r.version = (Number(r.version) + 1).toString();
    }
    return this.updateInternal(r, body);
  }

  updateInternal(info: APIInfo, body: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const validationMessage = await this.getAPIValidationError(body);
        if (validationMessage) {
          reject(
            new ErrorResponseInternal(400, `AsyncAPI document is not valid, ${validationMessage}`)
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

  private async getAPIValidationError(spec: string): Promise<String> {
    return new Promise<String>((resolve, reject) => {
      L.debug(`validating spec`);
      parser
        .parse(spec)
        .then((d: AsyncAPIDocument) => {
          L.debug('valid spec');
          resolve(null);
        })
        .catch((e) => {
          L.debug(`invalid spec ${JSON.stringify(e)}`);
          resolve(`${e.title}, ${e.detail}`);
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

  private async getAsyncAPIParameters(spec: string): Promise<APIParameter[]> {
    try {
      let parameterNames: APIParameter[] = [];
      const d: AsyncAPIDocument = await parser
        .parse(spec);
      d.channelNames().forEach(s => {
        const c = d.channel(s);
        if (c.hasParameters()) {
          const keys = Object.keys(c.parameters());
          keys.forEach(k => {
            const param: APIParameter = {
              name: k,
              type: (c.parameter(k).schema().type() as string) == "string" ? "string" : "number"
            };
            if (c.parameter(k).schema().enum()) {
              param.enum = c.parameter(k).schema().enum();
            }
            parameterNames.push(param);
          });
        }
      });

      return this.uniqueLastVal(parameterNames, it=>it.name);
    } catch (e) {
      L.fatal(`Unable to parse Async API spec ${name}`)
      throw new ErrorResponseInternal(500, `Unable to parse ${name}`);
    }
  }

  private uniqueLastVal(data: any[], key: any): any[] {
    return [
      ...new Map(
        data.map(x => [key(x), x])
      ).values()
    ]
  }

}

export default new ApisService();
