import L from '../../../common/logger';
import apisService from '../apis.service';
import apiProductsService from '../apiProducts.service';
import environmentsService from '../environments.service';
import Protocol = Components.Schemas.Protocol;
import Environment = Components.Schemas.Environment;
import Meta = Components.Schemas.Meta;
import MetaEntityStage = Components.Schemas.MetaEntityStage;
import APIProduct = Components.Schemas.APIProduct;
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import { EventAPIAsyncAPIInfo } from '../../../../src/model/eventapiasyncapiinfo';

import cmp from 'semver-compare';
import semver from 'semver';
import _ = require('lodash');
export class EPSystemAttributes {
  public static EP_LIFEFYCLE_STATE: string = 'EP_LIFEFYCLE_STATE';
  public static EP_EAP_OBJECT: string = 'EP_EAP_OBJECT';
}

export type APIProductUpsertAction = 'created' | 'updated' | 'skipped';

export class APIProductUpsertResult {
  action: APIProductUpsertAction;
  success: boolean;
  message: string;
  detail?: any;
}

export class ConnectorFacade {
  constructor() {
  }

  public async upsertAPI(asyncAPI: EventAPIAsyncAPIInfo, version: string, spec: string, attributes: Components.Schemas.Attributes): Promise<void> {
    try {
      const targetAPIRevision = await apisService.revisionByVersion(asyncAPI.name, version);
    } catch (e) {
      if ((e as ErrorResponseInternal).statusCode != 404) {
        throw e;
      }
      // uses api id from ep API Name. Not user friendly, should refactor API import instead to track id but have friendly name
      try {
        const apiInfo = await apisService.infoByName(asyncAPI.name);
        // api exists so we update
        await apisService.update(asyncAPI.name, spec);
      } catch (err) {
        if ((err as ErrorResponseInternal).statusCode != 404) {
          throw err;
        }
        // create API and add attributes
        await apisService.create(asyncAPI.name, spec);
        await apisService.updateInfo(asyncAPI.name, {
          attributes: attributes
        });
      }
    }
  }

  public async upsertEnvironment(solaceMessagingServiceEnvironmentName: string, solaceMessagingServiceId: string): Promise<string> {
    if (!solaceMessagingServiceId) {
      return null;
    }
    const envs = await environmentsService.all();
    //make all protocols of the cloud service available
    if (!envs.find(e => e.serviceId == solaceMessagingServiceId)) {
      const endpoints = (await environmentsService.all())
        .find(s => s.serviceId == solaceMessagingServiceId).messagingProtocols;

      const exposedProtocols: Protocol[] = [];
      for (const endpoint of endpoints) {
        exposedProtocols.push(endpoint.protocol);
      }
      const connectorEnv: Environment = {
        name: solaceMessagingServiceEnvironmentName,
        displayName: solaceMessagingServiceEnvironmentName,
        description: solaceMessagingServiceEnvironmentName,
        serviceId: solaceMessagingServiceId,
        exposedProtocols: exposedProtocols,
      }
      await environmentsService.create(connectorEnv);
      return solaceMessagingServiceEnvironmentName;
    } else {
      return envs.find(e => e.serviceId == solaceMessagingServiceId).name;
    }

  }

  public async upsertAPIProduct(apiProductId: string, apiProduct: APIProduct, apiProductVersion: string, apiProductChangedBy: string, apiProductCreatedBy: string, stage: MetaEntityStage): Promise<APIProductUpsertResult[]> {
    try {
      return await this.updateAPIProduct(apiProductId, apiProduct, apiProductVersion, apiProductChangedBy, apiProductCreatedBy, stage);
    } catch (e) {
      if ((e as ErrorResponseInternal).statusCode != 404) {
        return [{
          action: 'updated',
          message: e.message,
          success: false,
          detail: e
        }];
      }

      // validate APi product
      if (stage == 'retired' || semver.patch(apiProductVersion) > 0) {
        return [{
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
        attributes: [{ name: 'EP_LIFEFYCLE_STATE', value: stage }]
      }

      apiProduct.meta = meta;
      try {
        await apiProductsService.create(apiProduct);
        return [{
          action: 'created',
          message: `API Product ${apiProduct.name} successfully created`,
          success: true,
        }];
      } catch (e) {

        L.error(e);
        return [{
          action: 'created',
          message: e.message,
          success: false,
          detail: e,
        }];
      }
    }

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
      await apiProductsService.update(apiProductId, oldApiProduct);
      return {
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
      const epObjectIndex = oldApiProduct.attributes.findIndex(a => a.name = EPSystemAttributes.EP_EAP_OBJECT);
      const newObjectIndex = apiProduct.attributes.findIndex(a => a.name = EPSystemAttributes.EP_EAP_OBJECT);
      if (epObjectIndex > -1 && newObjectIndex <= 0) {
        oldApiProduct.attributes[epObjectIndex] = { name: EPSystemAttributes.EP_EAP_OBJECT, value: apiProduct.attributes[newObjectIndex].value };
      }
      apiProduct.attributes = oldApiProduct.attributes;
      await apiProductsService.update(apiProductId, apiProduct);
      await apiProductsService.updateMetaAttribute(apiProductId, 'EP_LIFEFYCLE_STATE', stage);
      return {
        action: 'updated',
        message: `API Product ${apiProduct.name} update from EP 2.0 applied`,
        success: true,
      };
    } else {
      return null;
    }
  }
}

export default new ConnectorFacade();
