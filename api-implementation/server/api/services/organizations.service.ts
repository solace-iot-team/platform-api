import L from '../../common/logger';
import Organization = Components.Schemas.Organization;
import { PersistenceService } from './persistence.service';
import C from 'continuation-local-storage';

const reserved: string = "platform";

export class OrganizationsService {



  private persistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('organizations');
  }

  all(query?: object): Promise<Organization[]> {
    return this.persistenceService.all(query);
  }

  byName(name: string): Promise<Organization> {
    var namespace = C.getNamespace('platform-api');
    namespace.run(function () {
      namespace.set('org', 'platform');
    });
    return this.persistenceService.byName(name);
  }

  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }

  create(body: Organization): Promise<Organization> {
    return new Promise<Organization>((resolve, reject) => {
      if (body.name == reserved) {
        reject(401);
      }
      this.persistenceService.create(body.name, body).then((p) => {
        resolve(p);
      }).catch((e) => {
        reject(e);
      });

    });
  }

  update(name: string, body: Organization): Promise<Organization> {
    return new Promise<Organization>((resolve, reject) => {
      if (body.name == reserved) {
        reject(401);
      } this.persistenceService.update(name, body).then((p) => {
        resolve(p);
      }).catch((e) => {
        reject(e);
      });
    });
  }

}

export default new OrganizationsService();
