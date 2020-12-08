import L from '../../common/logger';
import { PersistenceService } from './persistence.service';

const parser = require('@asyncapi/parser');

interface apiSpecification {
  name: string,
  specification: string
}

export class ApisService {

  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('apis');

  }

  async all(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.persistenceService.all().then((all: apiSpecification[]) => {
        var names: string[] = [];
        all.forEach((spec: apiSpecification) => {
          names.push(spec.name);
        });
        resolve(names);
      }).catch((e) => {
        reject(e);
      });
    });
    ;
  }

  byName(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.persistenceService.byName(name).then((spec: apiSpecification) => {
        if (!spec) {
          resolve(null);
        } else
          resolve(spec.specification);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  delete(name: string): Promise<number> {
    return this.persistenceService.delete(name);
  }

  async create(name: string, body: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const isValid = await this.isValidSpec(body);
      if (!isValid){
        reject(400);
      }
      var spec: apiSpecification = {
        name: name,
        specification: body
      };
      this.persistenceService.create(name, spec).then((spec: apiSpecification) => {
        resolve(spec.specification);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  update(name: string, body: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const isValid = await this.isValidSpec(body);
      if (!isValid){
        reject(400);
      }
      var spec: apiSpecification = {
        name: name,
        specification: body
      };
      this.persistenceService.update(name, spec).then((spec: apiSpecification) => {
        resolve(spec.specification);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  private async isValidSpec(spec: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      parser.parse(spec).then((val) => resolve(true)).catch((e) => resolve(false));
    });
  }

}

export default new ApisService();
