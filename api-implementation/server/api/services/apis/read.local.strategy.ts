import { ApisReadStrategy } from './read.strategy';
import { APISpecification } from '../apis.service';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import { PersistenceService } from '../persistence.service';
import APIInfo = Components.Schemas.APIInfo;

class ApisReadLocalStrategy implements ApisReadStrategy{
  private persistenceService: PersistenceService;
  private apiInfoPersistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('apis');
    this.apiInfoPersistenceService = new PersistenceService('apisInfo');
  }
  async all(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.persistenceService
        .all()
        .then((all: APISpecification[]) => {
          const names: string[] = [];
          all.forEach((spec: APISpecification) => {
            names.push(spec.name);
          });
          resolve(names);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  byName(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.persistenceService
        .byName(name)
        .then((spec: APISpecification) => {
          if (!spec) {
            reject(
              new ErrorResponseInternal(404, `Async API ${name} not found`)
            );
          } else {
            resolve(spec.specification);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  infoByName(name: string): Promise<APIInfo> {
    return new Promise<APIInfo>((resolve, reject) => {
      this.apiInfoPersistenceService
        .byName(name)
        .then((info: APIInfo) => {
          if (!info) {
            reject(
              new ErrorResponseInternal(404, `API Information  ${name} not found`)
            );
          } else {
            resolve(info);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

}
export default new ApisReadLocalStrategy();