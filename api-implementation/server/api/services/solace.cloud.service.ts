import L from '../../common/logger';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { Service } from '../../../src/clients/solacecloud/models/Service';
import { ProtocolMapper } from '../../../src/protocolmapper';
import AccountingLimit = Components.Schemas.AccountingLimit;
import ServiceClassDisplayedAttributes = Components.Schemas.ServiceClassDisplayedAttributes;
import Threshold = Components.Schemas.Threshold;

export class SolaceCloudService {

  constructor() {
  }

  async all(): Promise<Components.Schemas.Service[]> {
    const response: Components.Schemas.Service[] = [];
    const cloudServices: Service[] = await SolaceCloudFacade.getServices();
    for (const cloudService of cloudServices) {
      // only add active, working services
      if (cloudService.creationState == 'completed') {
        const newMsgVpnAttributes = {
          authenticationClientCertEnabled: cloudService.msgVpnAttributes.authenticationClientCertEnabled,
          authenticationBasicEnabled: cloudService.msgVpnAttributes.authenticationBasicEnabled,
        };
        const accountingLimits: AccountingLimit[] = [];
        if (cloudService.accountingLimits) {
          cloudService.accountingLimits.forEach(a => {
            const thresholds: Threshold[] = [];
            a.thresholds.forEach(t => {
              thresholds.push({
                type: t.type,
                value: t.value
              });
            });
            accountingLimits.push({
              id: a.id,
              thresholds: thresholds,
              unit: a.unit,
              value: a.value
            });

          });
        }
        const service: Components.Schemas.Service = {
          accountingLimits: (cloudService.accountingLimits as AccountingLimit[]),
          adminProgress: cloudService.adminProgress,
          adminState: cloudService.adminState,
          created: cloudService.created,
          creationState: cloudService.creationState,
          datacenterId: cloudService.datacenterId,
          datacenterProvider: cloudService.datacenterProvider,
          infrastructureId: cloudService.infrastructureId,
          locked: cloudService.locked,
          messagingProtocols: await ProtocolMapper.mapSolaceMessagingProtocolsToAsyncAPI(cloudService.messagingProtocols),
          messagingStorage: cloudService.messagingStorage,
          msgVpnAttributes: newMsgVpnAttributes,
          msgVpnName: cloudService.msgVpnName,
          name: cloudService.name,
          serviceClassDisplayedAttributes: (cloudService.serviceClassDisplayedAttributes as ServiceClassDisplayedAttributes),
          serviceClassId: cloudService.serviceClassId,
          serviceId: cloudService.serviceId,
          servicePackageId: cloudService.servicePackageId,
          serviceStage: cloudService.serviceStage,
          serviceTypeId: cloudService.serviceTypeId,

        };

        response.push(service);
      }
    }
    return response;
  }
}

export default new SolaceCloudService();
