import L from '../../../common/logger';
import EventPortalFacade, { ExportableEventApiProductVersion } from '../../../../src/eventportalfacade.2';
import { isString } from '../../../../src/typehelpers';
import parser, { AsyncAPIDocument } from '@asyncapi/parser';
import { SolacePolicy } from '../../../../src/clients/ep.2.0/models/SolacePolicy';
import { SolaceMessagingService } from '../../../../src/clients/ep.2.0/models/SolaceMessagingService';
import ClientOptions = Components.Schemas.ClientOptions;
import Protocol = Components.Schemas.Protocol;
import APIProduct = Components.Schemas.APIProduct;
import connectorFacade, { APIProductUpsertResult, EPSystemAttributes } from './connectorfacade';
import { StatesMapper } from './statesmapper';
import ImporterConfiguration = Components.Schemas.ImporterConfiguration;
import { EventAPIAsyncAPIInfo } from '../../../../src/model/eventapiasyncapiinfo';


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
        let mappedAttributes: Components.Schemas.Attributes = [];
        if (configuration.attributeMap) {
          mappedAttributes = configuration.attributeMap[await EventPortalFacade.getApplicationDomainIdByAPIProductVersion(prodVersion.version)];
        }
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
            await connectorFacade.upsertAPI(api, version, isString(api.apiPayload) ? api.apiPayload : JSON.stringify(api.apiPayload), mappedAttributes);
            apis.push(api);
          } else {
            throw new Error(`No verson could be extracted from AsyncAPI for Event Portal Event API  at version ${apiVersionId}`);
          }
        }
        L.info('APIs processed');

        // check an environment exists in the connector for the cloud service id in the EP API Product
        const solaceMessagingService: SolaceMessagingService = (prodVersion.version.gatewayMessagingServices[0] as SolaceMessagingService);
        ;
        let envName = null;
        const apiProductProtocols: Protocol[] = [];
        if (solaceMessagingService) {
          envName = await connectorFacade.upsertEnvironment(`${solaceMessagingService.environmentName}-${solaceMessagingService.eventMeshName}-${solaceMessagingService.id}`, solaceMessagingService.solaceCloudMessagingServiceId);
          
          for (const supportedProtocol of solaceMessagingService.supportedProtocols) {
            const protName = EventPortalImporterTaskImpl.mapProtocol(supportedProtocol);
            if (protName) {
              const p: Protocol = {
                name: protName
              }
              apiProductProtocols.push(p);
            }
          }        }

        for (const plan of prodVersion.version.plans) {
          const apiProductId = `${prodVersion.version.eventApiProductId}-${plan.name}`;
          const policy = plan.policies[0] as SolacePolicy;
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

          const apiNames: string[] = apis.map(api => { return api.name });
          mappedAttributes.push ({name: EPSystemAttributes.EP_EAP_OBJECT, value: JSON.stringify(prodVersion)});
          const product: APIProduct = {
            apis: apiNames,
            attributes: mappedAttributes,
            displayName: `${prodVersion.product.name} ${plan.name}`,
            environments: envName ? [envName] : [],
            name: apiProductId,
            protocols: apiProductProtocols,
            pubResources: [],
            subResources: [],
            clientOptions: clientOptions,
          }
          const result = await connectorFacade.upsertAPIProduct(apiProductId, product, prodVersion.version.version, prodVersion.version.changedBy, prodVersion.version.createdBy, await StatesMapper.getMetaEntityStageByState(prodVersion.version.stateId));
          results.push({
            eventAPIProductVersion: prodVersion,
            results: result,
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

  private static mapProtocol(epProtocol: any): "amqp" | "amqps" | "http" | "https" | "jms" | "secure-jms" | "mqtt" | "secure-mqtt" | "ws-mqtt" | "wss-mqtt" | "ws" | "wss" | "smf" | "smfs" | "compressed-smf" {
    const prot = epProtocol.toString();
    switch (prot) {
      case 'mqtts':
        return 'secure-mqtt';
      case 'mqttws':
        return 'ws-mqtt';
      case 'mqttwss':
        return 'wss-mqtt';
      case 'rest':
        return 'http';
      case 'rests':
        return 'https';
      case 'web':
        return 'http';
      case 'webs':
        return 'https';
      case 'smfc':
        return 'compressed-smf';
      case 'semps':
        return null;
      case 'ssh':
        return null;
      default:
        return prot;
    }

  }
}