import L from '../../common/logger';
import Developer = Components.Schemas.Developer;
import { databaseaccess } from '../../../src/databaseaccess';
import mongodb, { DeleteWriteOpResultObject } from 'mongodb';

interface DeveloperPersistent extends Developer {
  _id: string
}

export class DevelopersService {
  static getCollection = () => {
    return databaseaccess.client.db('solace-platform').collection('developers');
  }

  all(): Promise<Developer[]> {
    return new Promise<Developer[]>((resolve, reject) => {
      const collection: mongodb.Collection = DevelopersService.getCollection();
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

  byName(name: string): Promise<Developer> {
    return new Promise<Developer>((resolve, reject) => {
      const collection: mongodb.Collection = DevelopersService.getCollection();
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
      const collection: mongodb.Collection = DevelopersService.getCollection();
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
 
  create(body: Developer): Promise<Developer> {
    return new Promise<Developer>((resolve, reject) => {
      L.info(`adding API Product`);
      const collection: mongodb.Collection = DevelopersService.getCollection();
      var persistent: DeveloperPersistent = {
        _id: body.userName,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        attributes: body.attributes
      };
      collection.insertOne(persistent).then((v: mongodb.InsertOneWriteOpResult<any>) => {
        resolve(body);
      }).catch((e) => {
        L.error(e);
        reject(422);
      });
    });
  }

  update(name: string, body: Developer): Promise<Developer> {
    return new Promise<Developer>((resolve, reject) => {
      L.info(`adding API Product`);
      const collection: mongodb.Collection = DevelopersService.getCollection();
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

export default new DevelopersService();
