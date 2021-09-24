import { ApisReadStrategy } from './read.strategy';
import { APISpecification } from '../apis.service';
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import { PersistenceService } from '../persistence.service';
import APIInfo = Components.Schemas.APIInfo;
import Format = Components.Parameters.ApiListFormat.Format;
import L from '../../../common/logger';

class ApisReadLocalStrategy implements ApisReadStrategy {
  private persistenceService: PersistenceService;
  private apiInfoPersistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('apis');
    this.apiInfoPersistenceService = new PersistenceService('apisInfo');
  }
  async all(format?: Format): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.persistenceService
        .all()
        .then(async (all: APISpecification[]) => {
          const names: string[] = [];
          all.forEach((spec: APISpecification) => {
            names.push(spec.name);
          });
          L.debug(`requested format is ${format}`);
          if (format as string == 'compact' || !format) {
            resolve(names);
          } else if (format as string == 'summary') {
            const apiInfos: APIInfo[] = await this.apiInfoPersistenceService.all();
            apiInfos.forEach(apiInfo => {
              delete apiInfo.sourceId;
              delete apiInfo.sourceMetadata;
              delete apiInfo.createdTime;
              delete apiInfo.summary;
              delete apiInfo.updatedTime;
              delete apiInfo.version;
            });
            resolve(apiInfos);
          } else {
            const apiInfos: APIInfo[] = await this.apiInfoPersistenceService.all();
            resolve(apiInfos);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  byName(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      L.info('read local strategy byName');
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

  async canCreate(name: string): Promise<boolean> {
    return true;
  }
  async canImport(name: string): Promise<boolean> {
    return true;
  }

}
export default new ApisReadLocalStrategy();