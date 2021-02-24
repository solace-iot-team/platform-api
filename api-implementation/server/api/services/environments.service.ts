import L from '../../common/logger';
import Environment = Components.Schemas.Environment;
import EnvironmentPatch = Components.Schemas.EnvironmentPatch;
import EnvironmentResponse = Components.Schemas.EnvironmentResponse;
import { PersistenceService } from './persistence.service';
import { ProtocolMapper } from '../../../src/protocolmapper';
import SolaceCloudFacade from '../../../src/solacecloudfacade';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import APIProductsService from './apiProducts.service';

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
      messagingProtocols: await ProtocolMapper.mapSolaceMessagingProtocolsToAsyncAPI(service.messagingProtocols),
      msgVpnName: service.msgVpnName,
      serviceClassDisplayedAttributes: service.serviceClassDisplayedAttributes,
      serviceClassId: service.serviceClassId,
      serviceTypeId: service.serviceTypeId

    };
    return response;
  }

  async delete(name: string): Promise<number> {
    if (await this.canDelete(name)) {
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(409, `Can't delete, environment is still referenced`);
    }
  }

  create(body: Environment): Promise<Environment> {
    return new Promise<Environment>(async (resolve, reject) => {
      var apiReferenceCheck: boolean = await this.validateReferences(body);
      if (apiReferenceCheck) {
        this.persistenceService.create(body.name, body).then((p) => {
          resolve(p);
        }).catch((e) => {
          reject(e);
        });
      } else {
        reject(new ErrorResponseInternal(422, ` reference check failed service ${body.serviceId} does not exist`));
      }
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

  private async validateReferences(env: Environment): Promise<boolean> {
    try {
      var svc = await SolaceCloudFacade.getServiceByEnvironment(env);
      if (svc !== null) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  private async canDelete(name: string): Promise<boolean> {
    var q: any = {
      apis: {
        $elemMatch: {
          $eq: `"${name}"`
        }
      }
    };
    var products = await APIProductsService.all(q);
    if (products == null || products.length == 0) {
      return true;
    } else {
      return false;
    }
  }

}

export default new EnvironmentsService();
