import L from '../../../common/logger';
import EventPortalFacade from '../../../../src/eventportalfacade.2';
import { isString } from '../../../../src/typehelpers';
import parser, { AsyncAPIDocument } from '@asyncapi/parser';
import { SolacePolicy } from '../../../../src/clients/ep.2.0/models/SolacePolicy';
import { SolaceMessagingService } from '../../../../src/clients/ep.2.0/models/SolaceMessagingService';
import ClientOptions = Components.Schemas.ClientOptions;
import Protocol = Components.Schemas.Protocol;
import APIProduct = Components.Schemas.APIProduct;
import connectorFacade from './connectorfacade';
import { StatesMapper } from './statesmapper';
import ImporterConfiguration = Components.Schemas.ImporterConfiguration;

const FAKE_API_ID = '123456';

export default class EventPortalImporterTaskImpl {
  public static async doImport(configuration: ImporterConfiguration) {
    try {
      const prodVersions = await EventPortalFacade.listExportableAPIProductVersions(configuration.filter);

      for (const prodVersion of prodVersions.data) {
        const mappedAttributes = configuration.attributeMap[await EventPortalFacade.getApplicationDomainIdByAPIProductVersion(prodVersion)];
        // check referenced API version presence in Connector, Create if missing 
        for (const apiVersionId of prodVersion.eventApiVersionIds) {
          const api = await EventPortalFacade.getAsyncAPI(FAKE_API_ID, apiVersionId);
          let version: string = null;
          if (isString(api.apiPayload)) {
            const d: AsyncAPIDocument = await parser.parse(api.apiPayload);
            version = d.info().version();
          } else {
            version = api.apiPayload.info.version;
          }
          L.debug(version);
          if (version != null) {
            await connectorFacade.upsertAPI(FAKE_API_ID, version, isString(api.apiPayload)?api.apiPayload:JSON.stringify(api.apiPayload), mappedAttributes);
          } else {
            throw new Error(`No verson could be extracted from AsyncAPI for Event Portal Event API ${FAKE_API_ID} at version ${apiVersionId}`);
          }
        }
        L.info('APIs processed');

        // check an environment exists in the connector for the cloud service id in the EP API Product
        const solaceMessagingService: SolaceMessagingService = (prodVersion.gatewayMessagingServices[0] as SolaceMessagingService);
        ;

        const envName = await connectorFacade.upsertEnvironment(`${solaceMessagingService.environmentName}-${solaceMessagingService.id}`, solaceMessagingService.solaceCloudMessagingServiceId)

        for (const plan of prodVersion.plans) {
          const apiProductId = plan.id + 'xyz';
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
          const apiProductProtocols: Protocol[] = []
          for (const supportedProtocol of solaceMessagingService.supportedProtocols) {
            const protName = EventPortalImporterTaskImpl.mapProtocol(supportedProtocol);
            if (protName) {
              const p: Protocol = {
                name: protName
              }
              apiProductProtocols.push(p);
            }
          }
          const product: APIProduct = {
            apis: [FAKE_API_ID],
            attributes: mappedAttributes?mappedAttributes:[],
            displayName: `${prodVersion.displayName} ${plan.name}`,
            environments: [envName],
            name: apiProductId,
            protocols: apiProductProtocols,
            pubResources: [],
            subResources: [],
            clientOptions: clientOptions,
          }
          await connectorFacade.upsertAPIProduct(apiProductId, product, prodVersion.version, prodVersion.changedBy, prodVersion.createdBy, await StatesMapper.getMetaEntityStageByState(prodVersion.stateId));

        }

      }
      L.info(`Job ${configuration.name} of ${configuration.importerType} executed`);
      return prodVersions;
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