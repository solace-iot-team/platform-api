import L from '../../common/logger';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { Service } from '../../../src/clients/solacecloud';
import {ProtocolMapper} from '../../../src/protocolmapper';
export class SolaceCloudService {

  constructor() {
  }

  async all(): Promise<Components.Schemas.Service[]> {
    const response: Components.Schemas.Service[] = [];
    const cloudServices: Service[] = await SolaceCloudFacade.getServices();
    for (const cloudService of cloudServices) {
      const newMsgVpnAttributes = {
        authenticationClientCertEnabled: cloudService.msgVpnAttributes.authenticationClientCertEnabled,
        authenticationBasicEnabled: cloudService.msgVpnAttributes.authenticationBasicEnabled,
      };
      const service: Components.Schemas.Service = {
        accountingLimits : cloudService.accountingLimits,
        adminProgress :  cloudService.adminProgress,
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
        serviceClassDisplayedAttributes: cloudService.serviceClassDisplayedAttributes,
        serviceClassId: cloudService.serviceClassId,
        serviceId: cloudService.serviceId,
        servicePackageId: cloudService.servicePackageId,
        serviceStage: cloudService.serviceStage,
        serviceTypeId: cloudService.serviceTypeId,

      }; 
      response.push(service);
    }
    return response;
  }
}

export default new SolaceCloudService();
