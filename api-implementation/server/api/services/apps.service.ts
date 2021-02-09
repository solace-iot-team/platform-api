import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { PersistenceService } from './persistence.service';
import App = Components.Schemas.App;


export interface APISpecification {
  name: string,
  specification: string
}

export class AppsService {

  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('apps');

  }

  async all(): Promise<App[]> {
    return this.persistenceService.all();
  }

  byName(name: string): Promise<App> {
    return this.persistenceService.byName(name);
  }

  delete(name: string): Promise<any> {
    return this.persistenceService.delete(name);
  }

  async create(name: string, body: App): Promise<string> {
    return this.persistenceService.create(name, body);
  }

  update(name: string, body: App): Promise<string> {
    return this.persistenceService.update(name, body);
  }


}

export default new AppsService();
