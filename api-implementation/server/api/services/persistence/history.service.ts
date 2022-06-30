import L from '../../common/logger';
import { PersistenceService } from './persistence.service';
import History = Components.Schemas.History;
import { v4 } from 'uuid';

export class HistoryService {

  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('history');

  }

  async all(): Promise<History[]> {
    return await this.persistenceService.all({}, {at: -1});
  }
  async create(body: History): Promise<History> {
    return await this.persistenceService.create(v4(), body);
  }
}

export default new HistoryService();
