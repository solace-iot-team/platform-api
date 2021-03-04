import L from '../../common/logger';
import { databaseaccess } from '../../../src/databaseaccess';
import mongodb, { DeleteWriteOpResultObject, MongoError, CollectionInsertOneOptions, UpdateOneOptions } from 'mongodb';
import C from 'cls-hooked';
import { ErrorResponseInternal } from '../middlewares/error.handler';

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
    if (namespace != null) {
      L.debug(`PersistenceService: Found namespace ${namespace}`);
      namespace.run(function () {
        org = namespace.get('org');
      });
    }
    if (org != null) {
      db = org;
    }
    L.info(`db is ${db}`);
    return databaseaccess.client.db(db).collection(this.collection);
  }
  constructor(collection: string) {
    this.collection = collection;
  }

  all(query?: object, sort?: object, paging?: Paging): Promise<any[]> {
    if (query == null) {
      query = {};
    }
    if (sort == null) {
      sort = {};
    }
    // attempt to retrieve paging from context/namespace
    if (paging == null) {
      var namespace = C.getNamespace('platform-api');
      if (namespace != null) {
        L.debug(`PersistenceService: Found namespace ${namespace}`);
        namespace.run(function () {
          paging = namespace.get('paging');
        });
        L.debug(`paging ${paging}`);
      }
    }
    return new Promise<any[]>((resolve, reject) => {
      const collection: mongodb.Collection = this.getCollection();
      var x: mongodb.Cursor<any> = null;
      if (paging !== null && paging !== undefined) {
        x = collection.find(query).sort(sort).skip((paging.pageNumber - 1) * paging.pageSize).limit(paging.pageSize);
      } else {
        x = collection.find(query).sort(sort);
      }
      x.toArray(
        (err: MongoError, items) => {
          if (err) {
            reject(new ErrorResponseInternal(500, this.createPublicErrorMessage(err)));
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
          L.trace(item);
          if (item === null) {
            L.debug(`Object ${name} not found`);
            reject(new ErrorResponseInternal(404, `Object not found`));
          } else {
            delete item._id;
            resolve(item);
          }
        }

      ).catch((e: MongoError) => {
        reject(new ErrorResponseInternal(500, this.createPublicErrorMessage(e)));
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
          L.debug(` deleted count: ${item.deletedCount}`);
          if (item.deletedCount == 1) {
            resolve(204)
          } else {
            reject(new ErrorResponseInternal(404, `No entity ${name} found `));
          }
        }

      ).catch((e: MongoError) => {
        reject(new ErrorResponseInternal(422, this.createPublicErrorMessage(e)));
      });
    });
  }

  create(_id: string, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      L.info(`adding ${this.collection} with _id ${_id}`);
      const collection: mongodb.Collection = this.getCollection();
      body._id = _id;
      var opts: CollectionInsertOneOptions = {
        w: 1,
        j: true
      };
      collection.insertOne(body, opts).then((v: mongodb.InsertOneWriteOpResult<any>) => {
        delete body._id;
        resolve(body);
      }).catch((e: MongoError) => {
        reject(new ErrorResponseInternal(422, this.createPublicErrorMessage(e)));
      });
    });
  }

  update(_id: string, body: any, query?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      L.info(`patching ${this.collection} with _id ${_id}`);
      var id = body.name;
      if (id == null){
        id = body.id;
      }
      if (id == null){
        id = body._id;
      }
      if (id != _id){
          reject(new ErrorResponseInternal(400, `Can not change entity identifier `));
          return;
      }
      
      const collection: mongodb.Collection = this.getCollection();
      var q = query;
      if (q) {
        q._id = _id;
      } else {
        q = { _id: _id };
      }
      var opts: UpdateOneOptions = {
        w: 1,
        j: true
      };      
      collection.updateOne(q, { $set: body }, opts).then((v: mongodb.UpdateWriteOpResult) => {
        //L.info(v);
        if (v.matchedCount == 0) {
          reject(new ErrorResponseInternal(404, `No entity ${_id} found `));
        }
        this.byName(_id).then((p) => {
          delete p._id;
          resolve(p);
        }).catch((e) => {
          L.info(e);
          reject(e);
        });

      }).catch((e: MongoError) => {
        reject(new ErrorResponseInternal(422, this.createPublicErrorMessage(e)));
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
            reject(new ErrorResponseInternal(422, `Referenced name ${n} does not exist`));
          })
        }));
      });
      Promise.all(results).then((r) => { resolve(true) }).catch((e) => {
        L.info(e);
        (new ErrorResponseInternal(422, e));
      });

    }

    );
  }

  private createPublicErrorMessage(error: MongoError): string {
    L.debug(`Initial mongo error ${error.message}`);
    var errorCode = "E" + error.code;
    var msg = error.message.replace(errorCode, "");
    msg = msg.substring(0, msg.indexOf("error")).trim();
    msg = `${msg} (${error.code.toString(16)})`;
    L.debug(`public error message ${msg}`);
    return msg;
  }

}



//export default new PersistenceService();
