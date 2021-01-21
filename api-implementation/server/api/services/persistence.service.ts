import L from '../../common/logger';
import { databaseaccess } from '../../../src/databaseaccess';
import mongodb, { DeleteWriteOpResultObject } from 'mongodb';
import C from 'continuation-local-storage';

export interface Paging {
  pageNumber: number,
  pageSize: number
}

export class PersistenceService {
  private collection: string;
  getCollection = () => {
    var namespace = C.getNamespace('platform-api');
    var db: string = "platform";
    var org: string = null;
    namespace.run(function () {
      org = namespace.get('org');
    });
    if (org) {
      db = org;
    }
    L.info(`db is ${db}`);
    return databaseaccess.client.db(db).collection(this.collection);
  }
  constructor(collection: string) {
    this.collection = collection;
  }

  all(query?: object, sort?: object, paging?: Paging): Promise<any[]> {
    if (!query) {
      query = {};
    }
    if (!sort) {
      sort = {};
    }
    return new Promise<any[]>((resolve, reject) => {
      const collection: mongodb.Collection = this.getCollection();
      var x: mongodb.Cursor<any> = null;
      if (paging) {
        x = collection.find(query).sort(sort).skip((paging.pageNumber-1)* paging.pageSize).limit(paging.pageSize);
      } else {
        x = collection.find(query).sort(sort);
      }
      x.toArray(
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

  byName(name: string, query?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const collection: mongodb.Collection = this.getCollection();
      var q = query;
      if (q) {
        q._id = name;
      } else {
        q = { _id: name };
      }
      L.debug(`PersistenceService.byName the query ${JSON.stringify(q)}, ${collection.collectionName}, ${collection.namespace}`);
      collection.findOne(q).then(
        (item) => {
          L.debug(item);
          if (!item) {
            resolve(null);
          }
          delete item._id;
          resolve(item);
        }

      ).catch((e) => {
        L.warn(`PersistenceService.byName ${e}`);
        reject(e);
      });
    });
  }

  delete(name: string, query?: any): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const collection: mongodb.Collection = this.getCollection();
      var q = query;
      if (q) {
        q._id = name;
      } else {
        q = { _id: name };
      }
      L.info(q);
      collection.deleteOne(q).then(
        (item: DeleteWriteOpResultObject) => {
          L.info(` deleted count: ${item.deletedCount}`);
          if (item.deletedCount == 1) {
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

  create(_id: string, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      L.info(`adding ${this.collection} with _id ${_id}`);
      const collection: mongodb.Collection = this.getCollection();
      body._id = _id;
      collection.insertOne(body).then((v: mongodb.InsertOneWriteOpResult<any>) => {
        delete body._id;
        resolve(body);
      }).catch((e) => {
        L.error(e);
        reject(422);
      });
    });
  }

  update(_id: string, body: any, query?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      L.info(`patching ${this.collection} with _id ${_id}`);
      const collection: mongodb.Collection = this.getCollection();
      var q = query;
      if (q) {
        q._id = _id;
      } else {
        q = { _id: _id };
      }
      collection.updateOne(q, { $set: body }).then((v: mongodb.UpdateWriteOpResult) => {
        //L.info(v);
        if (v.matchedCount == 0) {
          reject(404);
        }
        this.byName(_id).then((p) => {
          delete p._id;
          resolve(p);
        }).catch((e) => {
          L.info(e);
          reject(e);
        });

      }).catch((e) => {
        reject(422);
      });
    });
  }



  validateReferences(names: string[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      var isApproved: boolean = true;
      var results: Promise<boolean>[] = [];
      names.forEach((n) => {
        results.push(new Promise<boolean>((resolve, reject) => {
          this.byName(n).then((p) => {
            resolve(true);
          }
          ).catch((e) => {
            reject(`Referenced name ${n} does not exist`);
          })
        }));
      });
      Promise.all(results).then((r) => { resolve(true) }).catch((e) => {
        L.info(e);
        reject(422);
      });

    }

    );
  }

}



//export default new PersistenceService();
