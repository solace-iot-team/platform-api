import L from '../../common/logger';
import { PersistenceService, Paging } from './persistence.service';
import History = Components.Schemas.History;
import { v4 } from 'uuid';

export class ApisService {

  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('history');

  }

  async all(): Promise<History[]> {
    return this.persistenceService.all({}, {at: -1});
  }
  create(body: History): Promise<History> {
    return this.persistenceService.create(v4(), body);
  }
}

export default new ApisService();
