import { Service } from '../../../../src/clients/solacecloud';
import { Sempv2Client } from '../../../../src/sempv2-client';
import { ns } from '../../middlewares/context.handler';

export class SempV2ClientFactory {
  getSEMPv2Client(service: Service): Sempv2Client {
    var sempProtocol = service.managementProtocols.find(i => i.name === "SEMP");
    ns.getStore().set(Sempv2Client.BASE, sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0]);
    ns.getStore().set(Sempv2Client.USER, sempProtocol.username);
    ns.getStore().set(Sempv2Client.PASSWORD, sempProtocol.password);

    return Sempv2Client;
  }
}

export default new SempV2ClientFactory();