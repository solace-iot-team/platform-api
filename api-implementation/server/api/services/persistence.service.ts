import L from '../../common/logger';
import { databaseaccess } from '../../../src/databaseaccess';
import mongodb, { DeleteWriteOpResultObject, MongoError, CollectionInsertOneOptions, UpdateOneOptions } from 'mongodb';

import { ErrorResponseInternal } from '../middlewares/error.handler';
import {ns} from '../middlewares/context.handler';
export interface Paging {
  pageNumber: number,
  pageSize: number
}

export class PersistenceService {
  private collection: string;
  private getCollection() {
    var db: string = "platform";
    var org: string = null;
    if (ns != null) {
      L.debug(`PersistenceService: Found namespace ${JSON.stringify(ns.getStore())}`);
      org = ns.getStore().get('org');
    }
    if (org != null) {
      db = org;
    } else if ('organizations' != this.collection && 'history' != this.collection) {
      throw new ErrorResponseInternal(500, `Can't write to  ${this.collection} in tenant ${db}`);
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
      if (ns != null) {
        L.debug(`PersistenceService: Found namespace ${ns}`);
        paging = ns.getStore().get('paging');
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
            reject(this.createPublicErrorMessage(err));
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

  async byName(name: string, query?: any): Promise<any> {
    const collection: mongodb.Collection = this.getCollection();
    var q = query;
    if (q != null) {
      q._id = name;
    } else {
      q = { _id: name };
    }
    L.debug(`PersistenceService.byName the query ${JSON.stringify(q)}, ${collection.collectionName}, ${collection.namespace}`);
    try {
      const item = await collection.findOne(q);
      L.trace(item);
      if (item == null) {
        var msg = `Object ${name} not found`;
        L.debug(msg);
        throw new ErrorResponseInternal(404, msg);
      } else {
        delete item._id;
        return item;
      }
    } catch (e) {
      throw this.createPublicErrorMessage(e);
    }

  }
  async byNameOld(name: string, query?: any): Promise<any> {
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
            var msg = `Object ${name} not found`;
            L.debug(msg);
            reject(new ErrorResponseInternal(404, msg));

          } else {
            delete item._id;
            resolve(item);
          }
        }

      ).catch((e: MongoError) => {
        reject(this.createPublicErrorMessage(e));
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
        reject(this.createPublicErrorMessage(e));
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
        reject(this.createPublicErrorMessage(e));
      });
    });
  }

  update(_id: string, body: any, query?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      L.info(`patching ${this.collection} with _id ${_id}`);
      var id = body.name;
      if (id == null) {
        id = body.id;
      }
      if (id == null) {
        id = body._id;
      }
      if (id != null && id != _id) {
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
        reject(this.createPublicErrorMessage(e));
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

  private createPublicErrorMessage(error: MongoError): ErrorResponseInternal {
    if (error instanceof MongoError) {
      L.debug(`Initial mongo error ${error.message}`);
      var errorCode = "E" + error.code;
      var msg = error.message.replace(errorCode, "");
      var statusCode = 422;
      msg = msg.substring(0, msg.indexOf("error")).trim();
      let hexCode = '';
      if (error.code) {
        hexCode = error.code.toString(16);
      }
      msg = `${msg} ${hexCode}`;
      if (error.code == null) {
        msg = error.message;
        statusCode = 500;
      }
      L.debug(`public error message ${msg}`);
      return new ErrorResponseInternal(statusCode, msg);
    } else {
      return error;
    }
  }

}



//export default new PersistenceService();
