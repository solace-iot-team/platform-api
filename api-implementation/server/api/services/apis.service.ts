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
import CommonEntityNameList = Components.Schemas.CommonEntityNameList;
import CommonEntityNames = Components.Schemas.CommonEntityNames;
import APIProduct = Components.Schemas.APIProduct;
import EventAPIProduct = Components.Schemas.EventAPIProduct;
import { updateProtectionByObject } from './persistence/preconditionhelper';
import asyncapihelper from '../../../src/asyncapihelper';
import { Versioning } from '../../common/versioning';

export interface APISpecification {
  name: string;
  specification: string;
}

export class ApisService {
  private persistenceService: PersistenceService;
  private apiInfoPersistenceService: PersistenceService;
  private revisionPersistenceService: PersistenceService;
  private readStrategy: ApisReadStrategy;

  constructor() {
    this.persistenceService = new PersistenceService('apis');
    this.revisionPersistenceService = new PersistenceService('apis_revisions');
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
    const params = await AsyncAPIHelper.getAsyncAPIParameters(spec);
    if (params) {
      apiInfo.apiParameters = params;
    }
    return apiInfo;
  }

  async apiProductsByName(name: string): Promise<CommonEntityNameList> {
    const apiProducts: APIProduct[] = await APIProductsService.all({ apis: name });
    const names: CommonEntityNameList = [];
    for (const apiProduct of apiProducts) {
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
      const revisions: string[] = await this.revisionList(name);
      for (const r of revisions){
        await this.revisionPersistenceService.delete(Versioning.createRevisionId(name, r));
      }
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
      api = await EventPortalFacade.getEventApiProduct(body.id);
    } catch (e) {
      throw new ErrorResponseInternal(500, `No Event Portal Connectivity, Entity ${api.name} can not be imported`)
    }
    const apiName = api.name.replace(/[^a-zA-Z0-9_-]+/g, '-');
    const canImport = await this.readStrategy.canImport(apiName);
    if (!canImport) {
      throw new ErrorResponseInternal(422, `Entity ${apiName} (${api.name}) can not be imported`)
    }
    const info: APIInfo = {
      createdBy: ns.getStore().get(ContextConstants.AUTHENTICATED_USER),
      createdTime: api.createdTime,
      description: api.description,
      name: apiName,
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
        info.apiParameters = await AsyncAPIHelper.getAsyncAPIParameters(asyncapi);
		const d: AsyncAPIDocument = await parser.parse(asyncapi);
        const version = d.info().version();
        if (Versioning.isRecognizedVersion(version)) {
          info.version = version;
        }
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
          .then(async (spec: APISpecification) => {
            await this.saveRevision(spec, info);
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
    try {
      await updateProtectionByObject(a.specification);
    } catch (e) {
      // this will fail if the API was obtained in YAML format - let;s try again with "r" converted to YAML
      await updateProtectionByObject(asyncapihelper.JSONtoYAML(a.specification));
    }
    const d: AsyncAPIDocument = await parser.parse(body);
    const version = d.info().version();
    const previousSpec: AsyncAPIDocument = await parser.parse(a.specification);
    const previousSpecVersion = previousSpec.info().version();
    const previousVersion = Versioning.isRecognizedVersion(version) ? r.version : previousSpecVersion;

    if (!Versioning.validateNewVersionString(version, previousVersion)) {
      throw new ErrorResponseInternal(409, `Version supplied in specification is not greater than current version`);
    }
    if (r.source == 'Upload') {
      // for internal APIs increase the version number
      if (Versioning.isRecognizedVersion(version)) {
        r.version = version;
      } else {
        r.version = Versioning.nextRevision(Number(r.version)).toString();
      }
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
          info.apiParameters = await AsyncAPIHelper.getAsyncAPIParameters(body);
          try {
            const r = await this.apiInfoPersistenceService.update(info.name, info);
          } catch (e) {
            reject(new ErrorResponseInternal(400, e));
          }

          this.persistenceService
            .update(info.name, spec)
            .then(async (spec: APISpecification) => {
              await this.saveRevision(spec, info);
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

  async revisionList(apiName: string): Promise<string[]> {
    const apis: APISpecification[] = await this.revisionPersistenceService.all({ name: apiName }, null, null, true);
    const revisions: string[] = [];
    for (const a of apis) {
      const version: string = (a['_id'] as string).replace(`${apiName}-`, '');
      revisions.push(version);
    }
    return revisions;
  }

  async revisionByVersion(apiName: string, version: string): Promise<string> {
    const revisionList = await this.revisionList(apiName);
    if (revisionList.find(n => n == version)) {
      const id = Versioning.createRevisionId(apiName, version);

      const api: APISpecification = await this.revisionPersistenceService.byName(id);
      if (!api) {
        throw new ErrorResponseInternal(404, `Version ${version} of API [${apiName}] does not exist`);
      }
      return api.specification;
    } else {
      throw new ErrorResponseInternal(404, `Version ${version} of API [${apiName}] does not exist`);
    }
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

}

export default new ApisService();
