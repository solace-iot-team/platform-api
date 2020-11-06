import L from '../../common/logger';
import APIProduct = Components.Schemas.APIProduct;
import { databaseaccess } from '../../../src/databaseaccess';
import mongodb, { DeleteWriteOpResultObject } from 'mongodb';

interface APIProductPersistent extends APIProduct {
  _id: string
}

export class ApiProductsService {
  static getCollection = () => {
    return databaseaccess.client.db('solace-platform').collection('api_products');
  }

  all(): Promise<APIProduct[]> {
    return new Promise<APIProduct[]>((resolve, reject) => {
      const collection: mongodb.Collection = ApiProductsService.getCollection();
      collection.find({}).toArray(
        (err, items) => {
          if (err) {
            L.error('Caught error', err);

            reject(err);
          } else {
            items.forEach((item) => {
              delete item._id;
            });
            resolve(items);
          }
        }
      );
    });
  }

  byName(name: string): Promise<APIProduct> {
    return new Promise<APIProduct>((resolve, reject) => {
      const collection: mongodb.Collection = ApiProductsService.getCollection();
      collection.findOne({ _id: name }).then(
        (item) => {
          if (!item) {
            reject
          }
          delete item._id;
          resolve(item);
        }

      ).catch((e) => {
        reject(e);
      });
    });
  }

  delete(name: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const collection: mongodb.Collection = ApiProductsService.getCollection();
      collection.deleteOne({ _id: name }).then(
        (item: DeleteWriteOpResultObject) => {
          L.info(` deleted count: ${item.deletedCount}`);
          if (item.deletedCount==1) {
            resolve(204)
          } else {
            reject(404);
          }
        }

      ).catch((e) => {
        reject(e);
      });
    });
  }
 
  create(body: APIProduct): Promise<APIProduct> {
    return new Promise<APIProduct>((resolve, reject) => {
      L.info(`adding API Product`);
      const collection: mongodb.Collection = ApiProductsService.getCollection();
      var persistent: APIProductPersistent = {
        _id: body.name,
        apis: body.apis,
        displayName: body.displayName,
        attributes: body.attributes,
        name: body.name,
        pubResources: body.pubResources,
        subResources: body.subResources,
        approvalType: body.approvalType,
        description: body.description,
        environments: body.environments,
        scopes: body.scopes
      };
      collection.insertOne(persistent).then((v: mongodb.InsertOneWriteOpResult<any>) => {
        resolve(body);
      }).catch((e) => {
        L.error(e);
        reject(422);
      });
    });
  }

  update(name: string, body: APIProduct): Promise<APIProduct> {
    return new Promise<APIProduct>((resolve, reject) => {
      L.info(`adding API Product`);
      const collection: mongodb.Collection = ApiProductsService.getCollection();
      collection.updateOne({ _id: name }, {$set: body}).then((v: mongodb.UpdateWriteOpResult) => {
        this.byName(name).then((p) => {
          resolve(p);
        });

      }).catch((e) => {
        L.error(e);
        reject(422);
      });
    });
  }
}

export default new ApiProductsService();
