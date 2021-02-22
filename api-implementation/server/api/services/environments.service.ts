import L from '../../common/logger';
import Environment = Components.Schemas.Environment;
import EnvironmentPatch = Components.Schemas.EnvironmentPatch;
import EnvironmentResponse = Components.Schemas.EnvironmentResponse;
import { PersistenceService } from './persistence.service';
import BrokerService from './broker.service';
import SolaceCloudFacade from '../../../src/solacecloudfacade';

export class EnvironmentsService {

  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('environments');
  }

  all(query?: object): Promise<Environment[]> {
    return this.persistenceService.all(query);
  }

  async byName(name: string): Promise<EnvironmentResponse> {
    var env = await this.persistenceService.byName(name);
    var service = await SolaceCloudFacade.getServiceByEnvironment(env);
    var response: EnvironmentResponse = {
        description: env.description,
        name: env.name,
        serviceId: env.serviceId,
        creationState: service.creationState,
        datacenterId: service.datacenterId,
        datacenterProvider: service.datacenterProvider,
        messagingProtocols: await BrokerService.mapMessagingProtocols(service.messagingProtocols),
        msgVpnName: service.msgVpnName,
        serviceClassDisplayedAttributes: service.serviceClassDisplayedAttributes,
        serviceClassId: service.serviceClassId,
        serviceTypeId: service.serviceTypeId
        
    };
    return response;
  }

  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }

  create(body: Environment): Promise<Environment> {
    return new Promise<Environment>((resolve, reject) => {
      var apiReferenceCheck: Promise<boolean> = this.validateReferences(body.serviceId);
      apiReferenceCheck.then((b: boolean) => {
        this.persistenceService.create(body.name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });
      }).catch((e)=>{
        reject(e);
      })

    });
  }

  update(name: string, body: EnvironmentPatch): Promise<Environment> {
   return new Promise<Environment>((resolve, reject) => {
        this.persistenceService.update(name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });
    });
  }

  private validateReferences(name: string): Promise<boolean> {
    //TODO - implement service id check against cloud api
    return new Promise<boolean>((resolve, reject) => {
            resolve(true);
      });
  }
}

export default new EnvironmentsService();
