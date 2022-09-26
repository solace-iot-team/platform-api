import L from '../../../common/logger';
import apisService from '../apis.service';
import apiProductsService from '../apiProducts.service';
import environmentsService from '../environments.service';
import Protocol = Components.Schemas.Protocol;
import Environment = Components.Schemas.Environment;
import Meta = Components.Schemas.Meta;
import MetaEntityStage = Components.Schemas.MetaEntityStage;
import APIProduct = Components.Schemas.APIProduct;
import APIInfo = Components.Schemas.APIInfo;
import Endpoint = Components.Schemas.Endpoint;
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import { EventAPIAsyncAPIInfo } from '../../../../src/model/eventapiasyncapiinfo';
import ServiceRegistryFactory from '../../../../src/serviceregistryfactory';

import cmp from 'semver-compare';
import semver from 'semver';
import _ from 'lodash';
import { ProtocolMapper } from '../../../../src/protocolmapper';

export class EPSystemAttributes {
  public static EP_LIFEFYCLE_STATE: string = '_EP_LIFEFYCLE_STATE_';
  public static IMP_SOURCE_ATTRIBUTE: string = '_AC_IMP_SOURCE_';
  public static EP_SOURCE_INDICATOR: string = 'Solace Event Portal (2)';
  public static EP_EAP_OBJECT: string = '_EP_EAP_OBJECT_';
  public static EP_EAP_ID: string = '_EP_EAP_ID_';
}

export class APIProductAttributes {
  public static EAP_NAME: string = 'Event-API-Product-Name';
  public static APP_DOMAIN: string = 'Application-Domain';
}

export type APIProductUpsertAction = 'created' | 'updated' | 'skipped';
export type ConnectorResource = 'API' | 'Environment' | 'APIProduct';

export interface APIProductUpsertResult {
  resource: ConnectorResource,
  action: APIProductUpsertAction;
  success: boolean;
  message: string;
  detail?: any;
}

export interface APIProductEnvironmentUpsertResult {
  environmentName: string,
  results: APIProductUpsertResult[],
}

export class ConnectorFacade {
  constructor() {
  }

  public async upsertAPI(asyncAPI: EventAPIAsyncAPIInfo, version: string, spec: string, attributes: Components.Schemas.Attributes): Promise<APIProductUpsertResult[]> {
    const apiName = this.createInternalName(asyncAPI.name);

    // check if API already exists, if so update it
    try {
      // attempt to update the APi, if it fails check if it;s due to the API not existing or zome other error
      const targetAPIRevision = await apisService.revisionByVersion(apiName, version);
      return [{
        resource: 'API',
        action: 'skipped',
        message: `API Revision ${asyncAPI.name} ${version} (${apiName}) already exists, skipping import`,
        success: true,
      }];
    } catch (e) {
      // it;s Ok if the API was not found, any other error signals a failed update
      if ((e as ErrorResponseInternal).statusCode != 404) {
        return [{
          resource: 'API',
          action: 'updated',
          message: e.message,
          success: false,
          detail: e
        }];
      }
      try {
        const apiInfo = await apisService.infoByName(apiName);
        // api exists so we update
        await apisService.update(apiName, spec);
        await apisService.updateInfo(apiName, {
          attributes: attributes
        });
        return [{
          resource: 'API',
          action: 'updated',
          message: `API updated ${asyncAPI.name} ${version} (${apiName})`,
          success: true,
          detail: e
        }];
      } catch (err) {
        if ((err as ErrorResponseInternal).statusCode != 404) {
          return [{
            resource: 'API',
            action: 'updated',
            message: err.message,
            success: false,
            detail: err
          }];
        }
        // create API and add attributes
        const info: APIInfo = {
          createdBy: asyncAPI.apiInfo.createdBy,
          createdTime: Date.now(),
          description: `${asyncAPI.name} ${version} (${apiName})`,
          name: apiName,
          source: 'EventAPIProduct',
          sourceId: asyncAPI.apiInfo.id,
          summary: `${asyncAPI.name} ${version} (${apiName})`,
          version: "1",
          deprecated: false,
          attributes: attributes
        }

        await apisService.create(apiName, spec, info);
        return [{
          resource: 'API',
          action: 'created',
          message: `API created ${asyncAPI.name} ${version} (${apiName})`,
          success: true,
        }];
      }
    }
  }

  public async upsertEnvironment(solaceMessagingServiceEnvironmentName: string, solaceMessagingServiceId: string): Promise<APIProductEnvironmentUpsertResult> {
    let envName: string = null;
    const cleanSolaceMessagingServiceEnvironmentName = this.createInternalName(solaceMessagingServiceEnvironmentName);
    const results: APIProductUpsertResult[] = [];
    if (!solaceMessagingServiceId) {
      results.push({
        resource: 'Environment',
        action: 'skipped',
        message: `No solaceMessagingServiceId available`,
        success: true,
      });
      return {
        environmentName: null,
        results: results,
      };
    }
    const envs = await environmentsService.all();
    //make all protocols of the cloud service available
    if (!envs.find(e => e.serviceId == solaceMessagingServiceId)) {
      const cloudService = await ServiceRegistryFactory.getRegistry().getServiceById(solaceMessagingServiceId);
      const endpoints: Endpoint[] = await ProtocolMapper.mapSolaceMessagingProtocolsToAsyncAPI(cloudService, cloudService.messagingProtocols);
      const protocols = endpoints.map(e => e.protocol);
      const connectorEnv: Environment = {
        name: cleanSolaceMessagingServiceEnvironmentName,
        displayName: solaceMessagingServiceEnvironmentName,
        description: solaceMessagingServiceEnvironmentName,
        serviceId: solaceMessagingServiceId,
        exposedProtocols: protocols,
      }
      try {
        await environmentsService.create(connectorEnv);
        envName = cleanSolaceMessagingServiceEnvironmentName;
        results.push({
          resource: 'Environment',
          action: 'created',
          message: `Environment created ${solaceMessagingServiceEnvironmentName}`,
          success: true,
        });
      } catch (e) {
        results.push({
          resource: 'Environment',
          action: 'created',
          message: `Environment creation failed: ${solaceMessagingServiceEnvironmentName} - ${solaceMessagingServiceId} = ${e.message}`,
          success: false,
          detail: e
        });
      }
    } else {
      envName = envs.find(e => e.serviceId == solaceMessagingServiceId).name;
      results.push({
        resource: 'Environment',
        action: 'skipped',
        message: `Found environment ${envName} for service ${solaceMessagingServiceId}`,
        success: true,
      });
    }

    const result: APIProductEnvironmentUpsertResult = {
      environmentName: this.createInternalName(envName),
      results: results,
    }
    return result;


  }

  public async upsertAPIProduct(apiProductId: string, apiProduct: APIProduct, apiProductVersion: string, apiProductChangedBy: string, apiProductCreatedBy: string, stage: MetaEntityStage): Promise<APIProductUpsertResult[]> {
    try {
      return await this.updateAPIProduct(apiProductId, apiProduct, apiProductVersion, apiProductChangedBy, apiProductCreatedBy, stage);
    } catch (e) {
      if ((e as ErrorResponseInternal).statusCode != 404) {
        return [{
          resource: 'APIProduct',
          action: 'updated',
          message: e.message,
          success: false,
          detail: e
        }];
      }

      // validate APi product
      if (stage == 'retired' || semver.patch(apiProductVersion) > 0) {
        return [{
          resource: 'APIProduct',
          action: 'skipped',
          message: `Event API Product is using invalid patch version (${semver.patch(apiProductVersion)}) or is in status retired.`,
          success: true,
        }];
      }
      // not found create
      const meta: Meta = {
        version: apiProductVersion,
        createdBy: apiProductCreatedBy,
        lastModifiedBy: apiProductChangedBy,
        stage: stage,
      }

      apiProduct.meta = meta;
      try {
        await apiProductsService.create(apiProduct);
        await apiProductsService.createMetaAttribute(apiProductId, EPSystemAttributes.EP_LIFEFYCLE_STATE, stage);
        await apiProductsService.createMetaAttribute(apiProductId, EPSystemAttributes.IMP_SOURCE_ATTRIBUTE, EPSystemAttributes.EP_SOURCE_INDICATOR);
        return [{
          resource: 'APIProduct',
          action: 'created',
          message: `API Product ${apiProduct.name} successfully created`,
          success: true,
        }];
      } catch (e) {

        L.error(e);
        return [{
          resource: 'APIProduct',
          action: 'created',
          message: e.message,
          success: false,
          detail: e,
        }];
      }
    }

  }

  public async processDeletedEAProducts(importableEAPIds: string[]): Promise<APIProductUpsertResult[]> {
    const results: APIProductUpsertResult[] = [];

    const apiProductsImportedForDeletedEAP = await apiProductsService.all({ attributes: { $elemMatch: { name: '_EP_EAP_ID_', value: { $nin: importableEAPIds } } } });
    if (apiProductsImportedForDeletedEAP.length > 0) {
      for (const apiProduct of apiProductsImportedForDeletedEAP) {
        if (apiProduct.meta?.stage && apiProduct.meta?.stage != 'retired') {
          apiProduct.meta.stage = 'deprecated';
          apiProduct.meta.version = semver.inc(apiProduct.meta.version, 'patch');
          const firstUpdate = await apiProductsService.update(apiProduct.name, apiProduct);
          firstUpdate.meta.stage = 'retired';
          firstUpdate.meta.version = semver.inc(apiProduct.meta.version, 'patch');
          const r = await apiProductsService.update(firstUpdate.name, firstUpdate);
          results.push({
            action: 'updated',
            message: `Retired API Product ${r.name} based on previously imported EAP ${r.attributes.find(a=>a.name==APIProductAttributes.EAP_NAME)} (${r.attributes.find(a=>a.name==EPSystemAttributes.EP_EAP_ID)}) `,
            resource: 'APIProduct',
            success: true,

          });
        }
      }
    } else {
      results.push({
        action: 'skipped',
        message: 'No previously imported but now missing EAPs found',
        resource: 'APIProduct',
        success: true,
      })
    }
    return results;
  }

  public async updateAPIProduct(apiProductId: string, apiProduct: APIProduct,
    apiProductVersion: string, apiProductChangedBy: string, apiProductCreatedBy: string, stage: MetaEntityStage): Promise<APIProductUpsertResult[]> {
    const results: APIProductUpsertResult[] = [];
    const oldApiProduct = await apiProductsService.byName(apiProductId);
    // check the version change if it's a patch level change we reject the change, minor changes are reserved for the CPnecpt Portal so amendments can be made as required
    const versionDiff = semver.diff(oldApiProduct.meta?.version, apiProductVersion);
    const logMessageSkipped: string = `Old version ${oldApiProduct.meta?.version} new version ${apiProductVersion}, diff ${versionDiff} compare ${cmp(apiProductVersion, oldApiProduct.meta.version)}, old stage ${oldApiProduct.meta.stage} new stage ${stage}, environment changed ${_.isEqual(apiProduct.environments, oldApiProduct.environments)}`;
    L.info(logMessageSkipped);
    if (
      (versionDiff == 'patch' || versionDiff == 'prepatch' || versionDiff == 'prerelease' || stage == 'retired' || semver.patch(apiProductVersion) > 0)
      && (cmp(apiProductVersion, oldApiProduct.meta.version) > 0)
    ) {
      L.info(`update not relevant, will not update AP Product`);
      return [{
        resource: 'APIProduct',
        action: 'skipped',
        message: `API Product ${apiProduct.name} update is not relevant`,
        success: true,
        detail: logMessageSkipped,
      }];
    }
    //version is higher -> patch existing product
    const r = await this.processNewAPIProductVersion(apiProductVersion, stage, apiProductChangedBy, oldApiProduct, apiProduct, apiProductId);
    if (r) {
      results.push(r);
    }
    const stageResult = await this.processStageUpdate(oldApiProduct, stage, apiProductVersion, apiProductId, apiProduct);
    if (stageResult) {
      results.push(stageResult);
    }
    const envResult = await this.processEnvironmentsUpdate(apiProduct, oldApiProduct, apiProductVersion, apiProductId);
    if (envResult) {
      results.push(envResult);
    }

    if (results.length > 0) {
      return results;
    } else {
      return [{
        resource: 'APIProduct',
        action: 'skipped',
        message: `API Product ${apiProduct.name} from EP 2.0 does not require any update`,
        success: true,
      }];
    }
  }

  private async processEnvironmentsUpdate(apiProduct: APIProduct, oldApiProduct: APIProduct, apiProductVersion: string, apiProductId: string): Promise<APIProductUpsertResult> {
    if (!(_.isEqual(apiProduct.environments, oldApiProduct.environments))) {
      const msg: string = `API Product ${apiProduct.name} (${apiProductVersion}) update from EP, environments changed ${JSON.stringify(apiProduct.environments)}, previously ${JSON.stringify(oldApiProduct.environments)}`;
      L.info(msg);
      oldApiProduct.meta.version = semver.inc(oldApiProduct.meta.version, 'patch');
      oldApiProduct.environments = apiProduct.environments;
      oldApiProduct.protocols = apiProduct.protocols;
      await apiProductsService.update(apiProductId, oldApiProduct);
      return {
        resource: 'APIProduct',
        action: 'updated',
        message: msg,
        success: true,
      };
    } else {
      return null;
    }
  }

  private async processStageUpdate(oldApiProduct: APIProduct, stage: MetaEntityStage, apiProductVersion: string, apiProductId: string, apiProduct: APIProduct): Promise<APIProductUpsertResult> {
    let stageResult = null;
    if (oldApiProduct.meta?.stage != stage) {
      L.info(`Patch from EP ${apiProductVersion},  stage ${stage}`);
      // update api product attributes with new state in EP.
      oldApiProduct.meta.version = semver.inc(oldApiProduct.meta.version, 'patch');
      oldApiProduct.meta.stage = stage;
      await apiProductsService.update(apiProductId, oldApiProduct);
      await apiProductsService.updateMetaAttribute(apiProductId, 'EP_LIFEFYCLE_STATE', stage);
      stageResult = ({
        resource: 'APIProduct',
        action: 'updated',
        message: `API Product ${apiProduct.name} update from EP 2.0 resulted in new patch version ${oldApiProduct.meta.version} at stage ${oldApiProduct.meta.stage}`,
        success: true,
      });
    }
    return stageResult;
  }

  private async processNewAPIProductVersion(apiProductVersion: string, stage: MetaEntityStage, apiProductChangedBy: string, oldApiProduct: APIProduct, apiProduct: APIProduct, apiProductId: string): Promise<APIProductUpsertResult> {
    if (cmp(apiProductVersion, oldApiProduct.meta.version) > 0) {
      L.info(`New incremented version number from EP ${apiProductVersion} in stage ${stage}`);
      const meta: Meta = {
        version: apiProductVersion,
        lastModifiedBy: apiProductChangedBy,
        stage: stage,
        attributes: oldApiProduct.meta?.attributes
      };
      apiProduct.meta = meta;
      this.patchAttribute(EPSystemAttributes.EP_EAP_OBJECT, oldApiProduct, apiProduct);
      this.patchAttribute(EPSystemAttributes.EP_EAP_ID, oldApiProduct, apiProduct);
      this.patchAttribute(APIProductAttributes.APP_DOMAIN, oldApiProduct, apiProduct);
      this.patchAttribute(APIProductAttributes.EAP_NAME, oldApiProduct, apiProduct);
      apiProduct.attributes = oldApiProduct.attributes;
      await apiProductsService.update(apiProductId, apiProduct);
      await apiProductsService.updateMetaAttribute(apiProductId, EPSystemAttributes.EP_LIFEFYCLE_STATE, stage);
      return {
        resource: 'APIProduct',
        action: 'updated',
        message: `API Product ${apiProduct.name} update from EP 2.0 applied`,
        success: true,
      };
    } else {
      return null;
    }
  }

  private patchAttribute(attributeName: string, oldApiProduct: APIProduct, apiProduct: APIProduct) {
    const epObjectIndex = oldApiProduct.attributes.findIndex(a => a.name == attributeName);
    const newObjectIndex = apiProduct.attributes.findIndex(a => a.name == attributeName);
    if (epObjectIndex > -1 && newObjectIndex > -1) {
      oldApiProduct.attributes[epObjectIndex] = { name: attributeName, value: apiProduct.attributes[newObjectIndex].value };
    }
  }

  public createInternalName(name: string): string {
    const internalName = name.replace(/[^a-zA-Z0-9_-]+/g, '-');
    L.debug(`Created internal name [${internalName}]`);
    return internalName;
  }
}

export default new ConnectorFacade();
