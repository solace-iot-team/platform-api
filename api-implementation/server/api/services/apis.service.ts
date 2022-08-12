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
import APIInfoPatch = Components.Schemas.APIInfoPatch;
import APIVersionInfoPatch = Components.Schemas.APIVersionInfoPatch;
import { updateProtectionByObject } from './persistence/preconditionhelper';
import asyncapihelper from '../../../src/asyncapihelper';
import { Versioning } from '../../common/versioning';
import AppUpdateEventEmitter from './apiProducts/appUpdateEventEmitter';
import { cloneDeep, parseInt } from 'lodash';
import Meta = Components.Schemas.Meta;
import jsonPath from 'jsonpath';

const DEPRECATED_TAG = 'deprecated';

export interface APISpecification {
  name: string;
  specification: string;
}

export class ApisService {
  private persistenceService: PersistenceService;
  private apiInfoPersistenceService: PersistenceService;
  private apiInfoRevisionPersistenceService: PersistenceService;
  private revisionPersistenceService: PersistenceService;
  private readStrategy: ApisReadStrategy;

  constructor() {
    this.persistenceService = new PersistenceService('apis');
    this.revisionPersistenceService = new PersistenceService('apis_revisions');
    this.apiInfoPersistenceService = new PersistenceService('apisInfo');
    this.apiInfoRevisionPersistenceService = new PersistenceService('apisInfo_revisions')
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
    try {
      const params = await AsyncAPIHelper.getAsyncAPIParameters(spec);
      if (params) {
        apiInfo.apiParameters = params;
      }
    } catch (e) {
      L.debug(e);
      // do nothing, Async API may be broken but we still want to return a valid APIInfo
    }
    if (apiInfo.meta) {
      apiInfo.meta = await Versioning.toExternalRepresentation(apiInfo.meta, null);
    }
    return await this.apiInfoToExternalRepresentation(apiInfo, spec);
  }

  async updateInfo(name: string, info: APIInfoPatch) {
    const oldInfo: APIInfo = await this.apiInfoPersistenceService.byName(name);
    if (info.attributes) {
      oldInfo.attributes = info.attributes;
    }
    if (info.meta) {
      delete info.meta.version;
      delete info.meta.stage;
      const metaUpdate = Versioning.update(oldInfo.meta, info.meta);
      if (oldInfo.meta && oldInfo.meta.version) {
        metaUpdate.version = oldInfo.meta.version;
      }
      oldInfo.meta = metaUpdate;
      if (info.meta?.attributes){
        oldInfo.meta.attributes = info.meta.attributes;
      }
    }
    if (info.deprecated) {
      oldInfo.deprecated = true;
      oldInfo.deprecatedDescription = info.deprecatedDescription;
    } else {
      oldInfo.deprecated = false;
    }
    const updatedInfo = await this.apiInfoPersistenceService.update(name, oldInfo);
    if (updatedInfo.meta) {
      delete updatedInfo.meta['internalRevision'];
    }
    return updatedInfo;
  }

  async updateVersionInfo(apiName: string, version: string, info: APIVersionInfoPatch) {
    const oldInfo: APIInfo = await this.apiInfoRevisionPersistenceService.byName(Versioning.createRevisionId(apiName, version));
    if (info.deprecated) {
      oldInfo.deprecated = info.deprecated;
      oldInfo.deprecatedDescription = info.deprecatedDescription;
    }
    if (info.meta) {
      delete info.meta.version;
      delete info.meta.stage;
      const metaUpdate = Versioning.update(oldInfo.meta, info.meta);
      metaUpdate.version = oldInfo.meta.version;
      oldInfo.meta = metaUpdate;
    }
    delete oldInfo.name;
    const updatedInfo = await this.apiInfoRevisionPersistenceService.update(Versioning.createRevisionId(apiName, version), oldInfo);
    if (updatedInfo.meta) {
      delete updatedInfo.meta['internalRevision'];
    }
    return updatedInfo;
  }

  async apiProductsByVersion(apiName: string, version: string): Promise<CommonEntityNameList> {
    const re = `${apiName}@${version}`;
    const apiProducts: APIProduct[] = await APIProductsService.all({ apis: re });
    //const apiProducts: APIProduct[] = await APIProductsService.all({ apis: name });
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

  async apiProductsByName(name: string): Promise<CommonEntityNameList> {
    const re = `^${name}.*`;
    const apiProducts: APIProduct[] = await APIProductsService.all({ apis: { "$regex": re } });
    //const apiProducts: APIProduct[] = await APIProductsService.all({ apis: name });
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
      for (const r of revisions) {
        await this.revisionPersistenceService.delete(Versioning.createRevisionId(name, r));
        await this.apiInfoRevisionPersistenceService.delete(Versioning.createRevisionId(name, r));
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
      deprecated: false,
    }
    return await this.createInternal(info, body);
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
      createdTime: api.publishedTime,
      description: api.description,
      name: apiName,
      source: 'EventAPIProduct',
      sourceId: api.id,
      sourceMetadata: api,
      summary: api.summary,
      updatedTime: api.publishedTime,
      version: api.version,
      deprecated: false,
      deprecatedDescription: '',
    }
    if (!body.overwrite) {
      return await this.createInternal(info, apiSpec, true);
    } else {
      try {
        const response = await this.createInternal(info, apiSpec, true);
        return response;
      } catch (e) {
        return await this.updateInternal(info, apiSpec, true);
      }
    }
  }

  async createInternal(info: APIInfo, asyncapi: string, isImport: boolean = false): Promise<string> {
    const validationMessage = await this.getAPIValidationError(asyncapi);
    if (validationMessage) {
      throw new ErrorResponseInternal(400, `${validationMessage}`);
    } else {
      const d: AsyncAPIDocument = await parser.parse(asyncapi);

      info.apiParameters = await AsyncAPIHelper.getAsyncAPIParameters(asyncapi);
      const version = (await this.getVersionFromApiSpec(asyncapi, info));

      if (d.hasTag(DEPRECATED_TAG)) {
        info.deprecated = true;
        info.deprecatedDescription = d.tag(DEPRECATED_TAG).description();
      } else {
        info.deprecated = false;
      }
      info.meta = Versioning.createMeta(version, 'released');
      info.meta.version = version;
      const spec: APISpecification = {
        name: info.name,
        specification: await this.convertAPISpec(asyncapi),
      };
      try {
        const r = await this.apiInfoPersistenceService.create(info.name, info);
        const newSpec: APISpecification = await this.persistenceService
          .create(info.name, spec);

        await this.saveRevision(newSpec, r, isImport);
        return newSpec.specification;
      } catch (e) {
        throw new ErrorResponseInternal(400, e);
      };
    }

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
    const validationMessage = await this.getAPIValidationError(body);
    if (validationMessage) {
      throw new ErrorResponseInternal(400, `AsyncAPI document is not valid, ${validationMessage}`);
    }
    const d: AsyncAPIDocument = await parser.parse(body);
    const version = await this.getSemVerFromApiSpec(body, r);
    const previousSpecVersion = await this.getSemVerFromApiSpec(a.specification, r);
    L.debug(`${version} - ${previousSpecVersion}`);
    const previousVersion = previousSpecVersion;
    if (d.hasTag(DEPRECATED_TAG)) {
      r.deprecated = true;
      r.deprecatedDescription = d.tag(DEPRECATED_TAG).description();
    } else {
      r.deprecated = false;
    }

    if (!Versioning.validateNewVersionString(version, previousVersion)) {
      throw new ErrorResponseInternal(409, `Version supplied in specification is not greater than current version`);
    }
    if (r.source != 'EventPortalLink') {
      // always increase the version number - once imported from Event POrtal API can still be modified
      if (Versioning.isRecognizedVersion(await this.getVersionFromApiSpec(body, r))) {
        r.version = await this.getVersionFromApiSpec(body, r);
      } else {
        r.version = Versioning.nextRevision(Number(r.version)).toString();
      }
    }
    return await this.updateInternal(r, body);
  }

  async updateInternal(info: APIInfo, body: string, isImport: boolean = false): Promise<string> {
    const validationMessage = await this.getAPIValidationError(body);
    if (validationMessage) {
      throw new ErrorResponseInternal(400, `AsyncAPI document is not valid, ${validationMessage}`);
    } else {
      const spec: APISpecification = {
        name: info.name,
        specification: await this.convertAPISpec(body),
      };
      info.apiParameters = await AsyncAPIHelper.getAsyncAPIParameters(body);
      info.meta = Versioning.createMetaFromRequest(info.meta);
      info.meta.version = (await this.getSemVerFromApiSpec(body, info));
      const r = await this.apiInfoPersistenceService.update(info.name, info);
      const updatedSpec: APISpecification = await this.persistenceService.update(info.name, spec);
      await this.saveRevision(updatedSpec, info, isImport);
      if (ns != null && ns.getStore() && ns.getStore().get(ContextConstants.ORG_NAME)) {
        const org = ns.getStore().get(ContextConstants.ORG_NAME);
        AppUpdateEventEmitter.emit('apiUpdate', org, updatedSpec.name);
      }
      return (this.byName(info.name));
    }
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
        throw new ErrorResponseInternal(404, `Version ${version} of API [${apiName}] does not exist (byQuery)`);
      }

      return api.specification;
    } else {
      const latestApi = await this.byName(apiName);
      const latestApiInfo = await this.infoByName(apiName);

      if ((latestApiInfo.meta && latestApiInfo.meta.version == version) ||
        version == (await this.getSemVerFromApiSpec(latestApi, latestApiInfo))
      ) {
        await this.saveRevision({ name: apiName, specification: latestApi }, latestApiInfo);
        return latestApi;
      } else {
        throw new ErrorResponseInternal(404, `Version ${version} of API [${apiName}] does not exist`);
      }
    }
  }

  async infoByVersion(apiName: string, version: string): Promise<APIInfo> {
    const revisionList = await this.revisionList(apiName);
    if (revisionList.find(n => n == version)) {
      const id = Versioning.createRevisionId(apiName, version);

      let apiInfo: APIInfo = await this.apiInfoRevisionPersistenceService.byName(id);
      let api: string = await this.revisionPersistenceService.byName(id);
      if (!apiInfo) {
        // fall back to main object - backwards compatibility
        const latestApiInfo = await this.infoByName(apiName);
        const latestApi = await this.byName(apiName);
        if ((latestApiInfo.meta && latestApiInfo.meta.version == version) ||
          version == (await this.getSemVerFromApiSpec(latestApi, latestApiInfo))) {
          apiInfo = latestApiInfo;
          api = latestApi;
          try {
            await this.saveRevision({ name: apiName, specification: latestApi }, latestApiInfo);
          } catch (e) {
            // possible race condition leads to saveRevision call failing with a 422 
            // (call to this method is made in parallel to updating or inserting the API)
            if (422 != (e as ErrorResponseInternal).statusCode) {
              throw e;
            }
          }
        } else {
          throw new ErrorResponseInternal(404, `Version ${version} of API [${apiName}] does not exist`);
        }
      }
      if (apiInfo.meta) {
        delete apiInfo.meta['internalRevision'];
      }
      return await this.apiInfoToExternalRepresentation(apiInfo, api);
    } else {
      const latestApiInfo = await this.infoByName(apiName);
      const latestApi = await this.byName(apiName);
      L.debug(`${latestApiInfo.meta.version} = ${version}`);
      if ((latestApiInfo.meta && latestApiInfo.meta.version == version) ||
        version == (await this.getSemVerFromApiSpec(latestApi, latestApiInfo))
      ) {
        try {
          await this.saveRevision({ name: apiName, specification: latestApi }, latestApiInfo);
        } catch (e) {
          // possible race condition leads to saveRevision call failing with a 422 
          // (call to this method is made in parallel to updating or inserting the API)
          if (422 != (e as ErrorResponseInternal).statusCode) {
            throw e;
          }
        }
        return await this.apiInfoToExternalRepresentation(latestApiInfo, latestApi);
      } else {
        throw new ErrorResponseInternal(404, `Version ${version} of API [${apiName}] does not exist`);
      }
    }
  }
  async byApiReference(apiReference: string): Promise<string> {
    let spec: string;
    const ref: string[] = apiReference.split('@');
    if (ref.length == 2) {
      spec = (await this.revisionByVersion(ref[0], ref[1]));
    } else {
      spec = (await this.byName(apiReference));
    }
    return spec;

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
    L.debug(`validating spec`);
    try {
      await parser
        .parse(spec);
      L.debug('valid spec');
      return null;
    } catch (e) {
      L.debug(`invalid spec ${JSON.stringify(e)}`);
      if (e.validationErrors){
        return JSON.stringify(e.validationErrors);
      } else {
        return `${e.title}, ${e.message}`;
      }
    };
  }

  private async convertAPISpec(spec: string): Promise<string> {
    const contentType = AsyncAPIHelper.getContentType(spec);
    let parsedSpec = null;
    if (contentType.indexOf('yaml') > -1) {
      parsedSpec = AsyncAPIHelper.YAMLtoObject(spec);
    } else {
      parsedSpec = JSON.parse(spec);
    }
    this.addAsyncAPIExtensionInfo(parsedSpec);
    let newSpec: string = JSON.stringify(parsedSpec);
    const refs: string[] = jsonPath.query(parsedSpec, `$..['$ref']`);
    let hasExternalRef: boolean = false;
    for (const uid of refs) {
      let isUrl: boolean = false;
      try {
        const url = new URL(uid);
        if (url) {
          isUrl = true;
        }

      } catch (e) {
        isUrl = false;

      }
      if (!uid.startsWith('#') && isUrl) {
        L.debug(`Async API contains external schema references [${uid}]`);
        hasExternalRef = true;
      }
    }
    if (hasExternalRef) {
      L.info(`Async API contains external schema references`);
      try {
        const d: AsyncAPIDocument = await parser.parse(newSpec);
        newSpec = d['_json'] ? JSON.stringify(d['_json']) : newSpec;
      } catch (e) {
        L.error(e);
        L.warn(`Not a valid AsyncAPI document, this shouldnt really happen here`);
      }
    }
    return newSpec;
  }

  private addAsyncAPIExtensionInfo(spec: any) {
    L.error(JSON.stringify(spec));
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
  private async saveRevision(spec: APISpecification, info: APIInfo, isImport: boolean = false): Promise<void> {
    let version: string = await this.getSemVerFromApiSpec(spec.specification, info);
    //version = (await Versioning.toExternalRepresentation(info.meta)).version;
    const id = Versioning.createRevisionId(spec.name, version);
    try {
      await this.revisionPersistenceService.create(id, spec);
      await this.apiInfoRevisionPersistenceService.create(id, info);
    } catch (e) {
      if (!isImport || (e as ErrorResponseInternal).statusCode != 422) {
        throw e;
      }
    }

  }

  private async getSemVerFromApiSpec(asyncapi: string, info: APIInfo): Promise<string> {
    try {
      const d: AsyncAPIDocument = await parser.parse(asyncapi);
      const version = d.info().version();
      const internalRevision = info.meta ? info.meta[Versioning.INTERNAL_REVISION] : 1;
      return Versioning.createSemver(version, internalRevision);
    } catch (e) {
      L.error(`${e.title}, ${e.detail}`);
      return null;
    }
  }

  private async getVersionFromApiSpec(asyncapi: string, info: APIInfo): Promise<string> {
    try {
      const d: AsyncAPIDocument = await parser.parse(asyncapi);
      const version = d.info() ? d.info().version() : null;
      return version;
    } catch (e) {
      L.error(`${e.title}, ${e.detail}`);
      return null;
    }
  }

  private async apiInfoToExternalRepresentation(info: APIInfo, asyncapi?: string): Promise<APIInfo> {
    const externalInfo = cloneDeep(info);
    if (!externalInfo.meta) {
      const apiVersion = (asyncapi ? (await this.getSemVerFromApiSpec(asyncapi, info)) : null);
      const m: Meta = {
        created: info.createdTime,
        createdBy: info.createdBy,
        lastModified: info.updatedTime,
        lastModifiedBy: info.createdBy,
        stage: 'released',
        version: apiVersion ? apiVersion : (Versioning.createSemver(info.version, isNaN(info.version as any) ? parseInt(info.version) : 1)),
      };
      externalInfo.meta = m;
    }
    return externalInfo;

  }


    /**
   * Attributes methods
   * 
   */
  async attributeByName(apiName: string, name: string): Promise<string> {
    const info: APIInfo = await this.apiInfoPersistenceService.byName(apiName);
    if (!info.attributes){
      throw new ErrorResponseInternal(404, `Attribute [${name}] is not set for API  [${apiName}]`); 
    }
    const attr = info.attributes.find(n => n.name == name);
    if (attr) {
      return attr.value;
    } else {
      throw new ErrorResponseInternal(404, `Attribute [${name}] is not set for API [${apiName}]`);
    }
  }

  async createAttribute(apiName: string, name: string, value: string): Promise<string> {
    const info: APIInfo = await this.apiInfoPersistenceService.byName(apiName);
    if (!info.attributes){
      info.attributes = [];
    }
    const attr = info.attributes.find(n => n.name == name);
    if (!attr) {
      info.attributes.push({
        name: name,
        value: value
      });
      await this.updateAPIAttributes(apiName, info);
      return value;
    } else {
      throw new ErrorResponseInternal(422, `Attribute [${name}] is already set for API  [${apiName}]`);
    }
  }  

  async updateAttribute(apiName: string, attributeName: string, attributeValue: string): Promise<string> {
    const info: APIInfo = await this.apiInfoPersistenceService.byName(apiName);
    if (!info.attributes){
      info.attributes = [];
    }
    const attr = info.attributes.find(n => n.name == attributeName);
    if (attr) {
      attr.value = attributeValue;
      info.attributes[info.attributes.findIndex(n => n.name == attributeName)] = attr;
      await this.updateAPIAttributes(apiName, info);
      return attributeValue;
    } else {
      throw new ErrorResponseInternal(404, `Attribute [${attributeName}] is not set for API  [${apiName}]`);
    }
  }  

  async deleteAttribute(apiName: string, attributeName: string): Promise<number> {
    const info: APIInfo  = await this.apiInfoPersistenceService.byName(apiName);
    if (!info.attributes){
      info.attributes = [];
    }
    const attr = info.attributes.find(n => n.name == attributeName);
    if (attr) {
      const newAttributes = info.attributes.filter(n => n.name != attributeName);
      info.attributes = newAttributes;
      await this.updateAPIAttributes(apiName, info);
      return 204;
    } else {
      throw new ErrorResponseInternal(404, `Attribute [${attributeName}] is not set for API  [${apiName}]`);
    }
  } 
  /**
   * Update an API Info after an attribute has been updated. 
   * @param apiInfo 
   */
  private async updateAPIAttributes (apiName: string, apiInfo: APIInfo) : Promise<APIInfo>{

      return this.updateInfo(apiName, apiInfo);
  }

    /**
   * Meta Attributes methods
   * 
   */
     async metaAttributeByName(apiName: string, name: string): Promise<string> {
      const info: APIInfo = await this.apiInfoPersistenceService.byName(apiName);
      if (!info.meta?.attributes){
        throw new ErrorResponseInternal(404, `Attribute [${name}] is not set for API  [${apiName}]`); 
      }
      const attr = info.meta?.attributes.find(n => n.name == name);
      if (attr) {
        return attr.value;
      } else {
        throw new ErrorResponseInternal(404, `Attribute [${name}] is not set for API [${apiName}]`);
      }
    }
  
    async createMetaAttribute(apiName: string, name: string, value: string): Promise<string> {
      const info: APIInfo = await this.apiInfoPersistenceService.byName(apiName);
      if (!info.meta?.attributes){
        info.meta.attributes = [];
      }
      const attr = info.meta.attributes.find(n => n.name == name);
      if (!attr && info.meta?.attributes) {
        info.meta.attributes.push({
          name: name,
          value: value
        });
        await this.updateAPIAttributes(apiName, info);
        return value;
      } else {
        throw new ErrorResponseInternal(422, `Attribute [${name}] is already set for API  [${apiName}]`);
      }
    }  
  
    async updateMetaAttribute(apiName: string, attributeName: string, attributeValue: string): Promise<string> {
      const info: APIInfo = await this.apiInfoPersistenceService.byName(apiName);
      if (!info.meta?.attributes){
        info.meta.attributes = [];
      }
      const attr = info.meta?.attributes.find(n => n.name == attributeName);
      if (attr && info.meta?.attributes) {
        attr.value = attributeValue;
        info.meta.attributes[info.meta.attributes.findIndex(n => n.name == attributeName)] = attr;
        await this.updateAPIAttributes(apiName, info);
        return attributeValue;
      } else {
        throw new ErrorResponseInternal(404, `Attribute [${attributeName}] is not set for API  [${apiName}]`);
      }
    }  
  
    async deleteMetaAttribute(apiName: string, attributeName: string): Promise<number> {
      const info: APIInfo  = await this.apiInfoPersistenceService.byName(apiName);
      if (!info.meta?.attributes){
        info.meta.attributes = [];
      }
      const attr = info.meta.attributes.find(n => n.name == attributeName);
      if (attr) {
        const newAttributes = info.meta?.attributes.filter(n => n.name != attributeName);
        info.meta.attributes = newAttributes;
        await this.updateAPIAttributes(apiName, info);
        return 204;
      } else {
        throw new ErrorResponseInternal(404, `Attribute [${attributeName}] is not set for API  [${apiName}]`);
      }
    } 
  
}

export default new ApisService();
