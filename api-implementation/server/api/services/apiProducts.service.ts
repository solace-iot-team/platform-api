import L from '../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import {PersistenceService} from './persistence.service';

export class ApiProductsService {

  private persistenceService: PersistenceService;
  constructor(){
    this.persistenceService = new PersistenceService('api_products');
  }

  all(): Promise<APIProduct[]> {
    return this.persistenceService.all();
  }

  byName(name: string): Promise<APIProduct> {
    return this.persistenceService.byName(name);
  }

  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }
 
  create(body: APIProduct): Promise<APIProduct> {
    return this.persistenceService.create(body.name, body);
  }

  update(name: string, body: APIProduct): Promise<APIProduct> {
    return this.persistenceService.update(name, body);
  }
}

export default new ApiProductsService();
