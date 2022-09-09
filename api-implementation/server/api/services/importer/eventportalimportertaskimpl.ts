import L from '../../../common/logger';
import EventPortalFacade, { ExportableEventApiProductVersion } from '../../../../src/eventportalfacade.2';
import { isString } from '../../../../src/typehelpers';
import parser, { AsyncAPIDocument } from '@asyncapi/parser';
import { SolaceMessagingService } from '../../../../src/clients/ep.2.0/models/SolaceMessagingService';
import ClientOptions = Components.Schemas.ClientOptions;
import Protocol = Components.Schemas.Protocol;
import APIProduct = Components.Schemas.APIProduct;
import connectorFacade, { APIProductUpsertResult, EPSystemAttributes, APIProductAttributes } from './connectorfacade';
import { StatesMapper } from './statesmapper';
import ImporterConfiguration = Components.Schemas.ImporterConfiguration;
import { EventAPIAsyncAPIInfo } from '../../../../src/model/eventapiasyncapiinfo';
import { ProtocolMapper } from '../../../../src/protocolmapper';


export interface APIProductVersionImportResult {
  results: APIProductUpsertResult[]
  eventAPIProductVersion: ExportableEventApiProductVersion,
}

export default class EventPortalImporterTaskImpl {
  public static async doImport(configuration: ImporterConfiguration): Promise<APIProductVersionImportResult[]> {
    try {
      const results: APIProductVersionImportResult[] = [];
      const prodVersions = await EventPortalFacade.listExportableAPIProductVersions(configuration.filter);

      for (const prodVersion of prodVersions) {
        const versionResults: APIProductUpsertResult[] = []
        const mappedAttributes: Components.Schemas.Attributes = [];
        if (configuration.attributeMap) {
          const configuredMappedAttributes = configuration.attributeMap.find(m => m.name == prodVersion.product.applicationDomainId);
          if (configuredMappedAttributes) {
            for (const att of configuredMappedAttributes.attributes) {
              mappedAttributes.push({
                name: att.name,
                value: att.value
              });
            }
          }
        }
        mappedAttributes.push({ name: EPSystemAttributes.EP_EAP_OBJECT, value: JSON.stringify(prodVersion) });
        mappedAttributes.push({ name: APIProductAttributes.EAP_NAME, value: prodVersion.product.name });
        mappedAttributes.push({ name: APIProductAttributes.APP_DOMAIN, value: (await EventPortalFacade.getApplicationDomain(prodVersion.product.applicationDomainId)).name });

        // check referenced API version presence in Connector, Create if missing 
        const apis: EventAPIAsyncAPIInfo[] = [];
        for (const apiVersionId of prodVersion.version.eventApiVersionIds) {
          const api = await EventPortalFacade.getAsyncAPI(apiVersionId);
          let version: string = null;
          if (isString(api.apiPayload)) {
            const d: AsyncAPIDocument = await parser.parse(api.apiPayload);
            version = d.info().version();
          } else {
            version = api.apiPayload.info.version;
          }
          L.debug(version);
          if (version != null) {
            const apiResults = await connectorFacade.upsertAPI(api, version, isString(api.apiPayload) ? api.apiPayload : JSON.stringify(api.apiPayload), mappedAttributes);
            versionResults.push(...apiResults);
            apis.push(api);
          } else {
            versionResults.push({
              resource: 'API',
              action: 'skipped',
              message: `No verson could be extracted from AsyncAPI for Event Portal Event API  at version ${apiVersionId}`,
              success: false,
            });
          }
        }
        L.info('APIs processed');

        // check an environment exists in the connector for the cloud service id in the EP API Product
        const envNames: string[] = [];
        const apiProductProtocols: Protocol[] = [];
        if (prodVersion.version?.solaceMessagingServices && prodVersion.version?.solaceMessagingServices?.length > 0) {
          for (const solaceMessagingService of prodVersion.version.solaceMessagingServices) {
            //const solaceMessagingService: SolaceMessagingService = prodVersion.version.solaceMessagingService;
            for (const supportedProtocol of solaceMessagingService.supportedProtocols) {
              const protocol = ProtocolMapper.findAsyncAPIProtocolByEventPortalProtocol(supportedProtocol);
              if (protocol) {
                if (!apiProductProtocols.find(apiProtocol => protocol.name == apiProtocol.name)) {
                  apiProductProtocols.push(protocol);
                }
              }
              const envResult = await connectorFacade.upsertEnvironment(`${solaceMessagingService.environmentName}-${solaceMessagingService.eventMeshName}-${solaceMessagingService.id}`, solaceMessagingService.solaceCloudMessagingServiceId);
              if (!envNames.find(s => s == envResult.environmentName)) {
                envNames.push(envResult.environmentName);
              }
              versionResults.push(...envResult.results);
            }
          }
        }

        for (const plan of prodVersion.version.plans) {
          const apiProductId = connectorFacade.createInternalName(`${prodVersion.version.eventApiProductId}-${plan.name}`);
          const policy = plan.solaceClassOfServicePolicy;
          const clientOptions: ClientOptions = {
            guaranteedMessagingEnabled: policy.guaranteedMessaging,
          };
          if (policy.guaranteedMessaging) {
            clientOptions.guaranteedMessaging = {
              accessType: policy.accessType,
              maxMsgSpoolUsage: policy.spoolSize,
              maxTtl: policy.maximumTimeToLive,
              requireQueue: policy.queuePerEventApi ? true : false,
              queueGranularity:
                policy.queuePerEventApi ? 'api' : 'apiProduct'

            }
          }

          const apiNames: string[] = apis.map(api => { return connectorFacade.createInternalName(api.name) });

          const product: APIProduct = {
            apis: apiNames,
            attributes: mappedAttributes,
            displayName: `${prodVersion.product.name} ${plan.name}`,
            environments: envNames,
            name: apiProductId,
            protocols: apiProductProtocols,
            pubResources: [],
            subResources: [],
            clientOptions: clientOptions,
          }
          const result: APIProductUpsertResult[] = await connectorFacade.upsertAPIProduct(apiProductId, product, prodVersion.version.version, prodVersion.version.changedBy, prodVersion.version.createdBy, await StatesMapper.getMetaEntityStageByState(prodVersion.version.stateId));
          versionResults.push(...result);
          results.push({
            eventAPIProductVersion: prodVersion,
            results: versionResults,
          })
        }
      }
      L.info(`Job ${configuration.name} of ${configuration.importerType} executed`);
      return results;
    } catch (e) {
      L.error(e);
      return e;

    }

  }

}