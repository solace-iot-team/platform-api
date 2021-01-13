import L from '../../common/logger';
import Environment = Components.Schemas.Environment;
import EnvironmentPatch = Components.Schemas.EnvironmentPatch;
import { PersistenceService } from './persistence.service';

export class EnvironmentsService {

  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('environments');
  }

  all(query?: object): Promise<Environment[]> {
    return this.persistenceService.all(query);
  }

  byName(name: string): Promise<Environment> {
    return this.persistenceService.byName(name);
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
