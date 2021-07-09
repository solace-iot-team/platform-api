import L from '../../common/logger';
import Environment = Components.Schemas.Environment;
import EnvironmentListItem = Components.Schemas.EnvironmentListItem;
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

  async all(query?: any, format?: string): Promise<EnvironmentListItem[]> {

    if (format == 'full') {
      const envs: EnvironmentListItem[] = await this.persistenceService.all(query);
      for (const env of envs) {
        const service = await SolaceCloudFacade.getServiceByEnvironment(env);
        let messagingProtocols: Components.Schemas.Endpoint[] = [];
        if (service.creationState == 'completed') {
          messagingProtocols = await ProtocolMapper.mapSolaceMessagingProtocolsToAsyncAPI(
            service.messagingProtocols
          );
          env.msgVpnName = service.msgVpnName;
        }
        env.messagingProtocols = messagingProtocols;

      }
      return envs;
    } else {
      return this.persistenceService.all(query);
    }
  }

  async byName(name: string): Promise<EnvironmentResponse> {
    const env = await this.persistenceService.byName(name);
    const service = await SolaceCloudFacade.getServiceByEnvironment(env);
    let messagingProtocols: Components.Schemas.Endpoint[] = [];
    if (service.creationState == 'completed') {
      messagingProtocols = await ProtocolMapper.mapSolaceMessagingProtocolsToAsyncAPI(
        service.messagingProtocols
      );
    }
    const response: EnvironmentResponse = {
      description: env.description,
      name: env.name,
      serviceId: env.serviceId,
      creationState: service.creationState,
      datacenterId: service.datacenterId,
      datacenterProvider: service.datacenterProvider,
      msgVpnName: service.msgVpnName,
      serviceClassDisplayedAttributes: service.serviceClassDisplayedAttributes,
      serviceClassId: service.serviceClassId,
      serviceTypeId: service.serviceTypeId,
      exposedProtocols: env.exposedProtocols,
      messagingProtocols: messagingProtocols,
    };
    return response;
  }

  async delete(name: string): Promise<number> {
    if (await this.canDelete(name)) {
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(
        409,
        `Can't delete, environment is still referenced`
      );
    }
  }

  create(body: Environment): Promise<Environment> {
    return new Promise<Environment>(async (resolve, reject) => {
      const envReferenceCheck: ErrorResponseInternal = await this.validateReferences(body);
      if (envReferenceCheck == null) {
        this.persistenceService
          .create(body.name, body)
          .then((p) => {
            resolve(p);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject(
          envReferenceCheck
        );
      }
    });
  }

  update(name: string, body: EnvironmentPatch): Promise<Environment> {
    return new Promise<Environment>(async (resolve, reject) => {
      const envOriginal: Environment = (await this.byName(name) as Environment);
      if (body.description) {
        envOriginal.description = body.description;
      }
      if (body.exposedProtocols) {
        envOriginal.exposedProtocols = body.exposedProtocols;
      }
      if (body.serviceId) {
        envOriginal.serviceId = body.serviceId;
      }
      const envRefCheck: ErrorResponseInternal = await this.validateReferences(envOriginal);
      if (envRefCheck == null) {
        this.persistenceService
          .update(name, body)
          .then((p) => {
            resolve(p);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject(
          envRefCheck
        );
      }
    });
  }

  private async validateReferences(env: Environment): Promise<ErrorResponseInternal> {
    try {
      L.debug(`Validating env ${env.name}`);
      const svc = await SolaceCloudFacade.getServiceByEnvironment(env);
      if (svc == null) {
        return new ErrorResponseInternal(
          422,
          ` reference check failed service ${env.serviceId} does not exist`
        );
      } else {
        // check the exposed protocols against the actual protocols supported by the service
        if (env.exposedProtocols == null || env.exposedProtocols.length == 0) {
          return new ErrorResponseInternal(
            422,
            ` no protocols exposed for service ${env.serviceId}`
          );
        }
        const serverProtocols: Components.Schemas.Endpoint[] = await ProtocolMapper.mapSolaceMessagingProtocolsToAsyncAPI(svc.messagingProtocols);
        for (const exposedProtocol of env.exposedProtocols) {
          const matchingSP = serverProtocols.find(serverProtocol => (exposedProtocol.name == serverProtocol.protocol.name && exposedProtocol.version == serverProtocol.protocol.version));
          L.info(`SP ${matchingSP}`);

          if (matchingSP === undefined) {
            return new ErrorResponseInternal(
              422,
              ` reference check failed protocol ${exposedProtocol.name} ${exposedProtocol.version} does not exist on service ${env.serviceId}`
            );
          }
        }
        return null;
      }
    } catch (e) {
      return new ErrorResponseInternal(
        422,
        ` reference check failed service ${env.serviceId} does not exist (error ${e})`
      );
    }
  }

  private async canDelete(name: string): Promise<boolean> {
    const q = {
      environments: {
        $elemMatch: {
          $eq: name,
        },
      },
    };
    const products = await APIProductsService.all(q);
    if (products == null || products.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default new EnvironmentsService();
