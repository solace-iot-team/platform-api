import L from '../../common/logger';
import Developer = Components.Schemas.Developer;
import App = Components.Schemas.App;
import AppPatch = Components.Schemas.AppPatch;
import Credentials = Components.Schemas.Credentials;
import { PersistenceService } from './persistence.service';


interface DeveloperApp extends App {
  appType: string,
  ownerId: string

}

export class DevelopersService {
  private persistenceService: PersistenceService;
  private appPersistenceService: PersistenceService;
  constructor() {
    this.persistenceService = new PersistenceService('developers');
    this.appPersistenceService = new PersistenceService('apps');
  }

  all(): Promise<Developer[]> {
    return this.persistenceService.all();
  }

  allDevelopersApps(name: string): Promise<App[]> {
    return this.appPersistenceService.all({ ownerId: name, appType: 'developer' });
  }

  byName(name: string): Promise<Developer> {
    return this.persistenceService.byName(name);
  }

  appByName(developer: string, name: string): Promise<Developer> {
    return this.appPersistenceService.byName(name, {ownerId: developer});
  }
 
  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }  
  
  deleteApp(developer: string, name: string): Promise<number> {
    return this.appPersistenceService.delete(name, {ownerId: developer});
  }

  create(body: Developer): Promise<Developer> {
    return this.persistenceService.create(body.userName, body);
  }

  createApp(developer: string, body: App): Promise<App> {
    return new Promise<App>((resolve, reject) => {
      this.byName(developer).then((d) => {
        L.info(d);
        if (!d){
          reject(404);
        }
        var app: DeveloperApp = {
          appType: 'developer',
          ownerId: developer,
          apiProducts: body.apiProducts,
          name: body.name,
          attributes: body.attributes,
          callbackUrl: body.callbackUrl,
          expiresIn: body.expiresIn,
          scopes: body.scopes,
          credentials: body. credentials

        };
        resolve (this.appPersistenceService.create(body.name, app));

      }).catch((e) => {
        reject(e);
      });
 
    });
  }

  update(name: string, body: Developer): Promise<Developer> {
    return this.persistenceService.update(name, body);
  }
  updateApp(developer: string, name: string, body: AppPatch): Promise<AppPatch> {
        var app: DeveloperApp = {
          appType: 'developer',
          ownerId: developer,
          apiProducts: body.apiProducts,
          name: body.name,
          attributes: body.attributes,
          callbackUrl: body.callbackUrl,
          scopes: body.scopes,
          credentials: body. credentials

        };
    return this.appPersistenceService.update(name, app);
  }
}

export default new DevelopersService();
