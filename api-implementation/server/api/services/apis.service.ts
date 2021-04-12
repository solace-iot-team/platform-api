import L from '../../common/logger';
import { ErrorResponseInternal } from '../middlewares/error.handler';
import { PersistenceService } from './persistence.service';
import APIProductsService from './apiProducts.service';
import parser from '@asyncapi/parser';
import AsyncAPIHelper from '../../../src/asyncapihelper';

export interface APISpecification {
  name: string;
  specification: string;
}

export class ApisService {
  private persistenceService: PersistenceService;

  constructor() {
    this.persistenceService = new PersistenceService('apis');
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

  async delete(name: string): Promise<number> {
    if (await this.canDelete(name)) {
      return this.persistenceService.delete(name);
    } else {
      throw new ErrorResponseInternal(
        409,
        `Can't delete, API is still referenced`
      );
    }
  }

  async create(name: string, body: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const isValid = await this.isValidSpec(body);
      if (!isValid) {
        reject(new ErrorResponseInternal(400, `Entity ${name} is not valid`));
      } else {
        const spec: APISpecification = {
          name: name,
          specification: this.convertAPISpec(body),
        };
        this.persistenceService
          .create(name, spec)
          .then((spec: APISpecification) => {
            resolve(spec.specification);
          })
          .catch((e) => {
            reject(new ErrorResponseInternal(400, e));
          });
      }
    });
  }

  update(name: string, body: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const isValid = await this.isValidSpec(body);
        if (!isValid) {
          reject(
            new ErrorResponseInternal(400, `AsyncAPI document is not valid`)
          );
        } else {
          const spec: APISpecification = {
            name: name,
            specification: this.convertAPISpec(body),
          };
          this.persistenceService
            .update(name, spec)
            .then((spec: APISpecification) => {
              resolve(spec.specification);
            })
            .catch((e) => {
              reject(e);
            });
        }
      } catch (e) {
        reject(new ErrorResponseInternal(400, e));
      }
    });
  }

  private async canDelete(name: string): Promise<boolean> {
    const q = {
      apis: {
        $elemMatch: {
          $eq: name,
        },
      },
    };
    const products = await APIProductsService.all(q);
    if (products == null || products.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  private async isValidSpec(spec: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      L.debug(`validating spec`);
      parser
        .parse(spec)
        .then(() => {
          L.debug('valid spec');
          resolve(true);
        })
        .catch((e) => {
          L.debug(`invalid spec ${JSON.stringify(e)}`);
          resolve(false);
        });
    });
  }

  private convertAPISpec(spec: string): string {
    const contentType = AsyncAPIHelper.getContentType(spec);
    let parsedSpec = null;
    if (contentType.indexOf('yaml') > -1) {
      parsedSpec = AsyncAPIHelper.YAMLtoObject(spec);
    } else {
      parsedSpec = JSON.parse(spec);
    }
    this.addAsyncAPIExtensionInfo(parsedSpec);
    return JSON.stringify(parsedSpec);
  }

  private addAsyncAPIExtensionInfo(spec: any) {
    if (spec.info['x-origin']){
      return;
    }
    if (spec.info == null) {
      spec.info = {};
    }

    const origin = {
      vendor: 'solace',
      name: 'apim-connector',
    };
    spec.info['x-origin'] = origin;
  }

}

export default new ApisService();
