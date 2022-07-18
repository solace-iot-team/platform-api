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

var cmp = require('semver-compare');


export class ConnectorFacade {
  constructor() {
  }

  public async upsertAPI(apiId: string, version: string, spec: string, attributes: Components.Schemas.Attributes): Promise<void> {
    try {
      const targetAPIRevision = await apisService.revisionByVersion(apiId, version);
    } catch (e) {
      if ((e as ErrorResponseInternal).statusCode != 404) {
        throw e;
      }
      // uses api id from ep API Name. Not user friendly, should refactor API import instead to track id but have friendly name
      try {
        const apiInfo = await apisService.infoByName(apiId);
        // api exists so we update
        await apisService.update(apiId, spec);
      } catch (err) {
        if ((err as ErrorResponseInternal).statusCode != 404) {
          throw err;
        }
        // create API and add attributes
        await apisService.create(apiId, spec);
        await apisService.updateInfo(apiId, {
          attributes: attributes
        });
      }
    }
  }

  public async upsertEnvironment(solaceMessagingServiceEnvironmentName: string, solaceMessagingServiceId: string): Promise<string> {
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

  public async upsertAPIProduct(apiProductId: string, apiProduct: APIProduct, apiProductVersion: string, apiProductChangedBy: string, apiProductCreatedBy: string, stage: MetaEntityStage): Promise<void> {
    try {
      await this.updateAPIProduct(apiProductId, apiProduct, apiProductVersion, apiProductChangedBy, apiProductCreatedBy, stage);
    } catch (e) {
      // not found create
      const meta: Meta = {
        version: apiProductVersion,
        createdBy: apiProductCreatedBy,
        lastModifiedBy: apiProductChangedBy,
        stage: stage
      }
      apiProduct.meta = meta;
      try {
        await apiProductsService.create(apiProduct);
      } catch (e) {

        L.error(e);
        throw e;
      }
    }

  }
  public async updateAPIProduct(apiProductId: string, apiProduct: APIProduct, apiProductVersion: string, apiProductChangedBy: string, apiProductCreatedBy: string, stage: MetaEntityStage): Promise<void> {
    const oldApiProduct = await apiProductsService.byName(apiProductId);
    //found and version matches do nothing

    //version is higher -> patch existing product todo semver comparison
    if (cmp(apiProductVersion, oldApiProduct.meta.version) > 0) {
      const meta: Meta = {
        version: apiProductVersion,
        lastModifiedBy: apiProductChangedBy,
        stage: stage
      }
      apiProduct.meta = meta;
      apiProduct.attributes = oldApiProduct.attributes;
      await apiProductsService.update(apiProductId, apiProduct);
    }
  }
}

export default new ConnectorFacade();
