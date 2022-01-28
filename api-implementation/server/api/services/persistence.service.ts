import L from '../../common/logger';
import { PlatformConstants, ContextConstants } from '../../common/constants';
import { databaseaccess } from '../../../src/databaseaccess';
import mongodb, { DeleteWriteOpResultObject, MongoError, CollectionInsertOneOptions, UpdateOneOptions, Collection } from 'mongodb';

import { ErrorResponseInternal } from '../middlewares/error.handler';
import { ns } from '../middlewares/context.handler';
import { Paging } from '../../../src/model/paging';
import { SortInfo } from '../../../src/model/sortinfo';
import { SearchInfo } from '../../../src/model/searchinfo';

import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

const indexCache = new CacheContainer(new MemoryStorage());

export class PersistenceService {
  private collection: string;
  private async createIndex(mongoCollection: Collection, db: string): Promise<void> {
    const cachedCollection = await indexCache.getItem<string>(mongoCollection.collectionName);
    const idxName: string = `idx_text_${db}_${mongoCollection.collectionName}`;
    if (cachedCollection) {
      L.debug(`already in cache  - fulltext index ${mongoCollection.collectionName}`);
      return;
    }
    try {
      const b: boolean = await mongoCollection.indexExists(idxName);
      if (!b) {
        L.info(`creating full text index ${mongoCollection.collectionName}`);
        await mongoCollection.createIndex(
          { '$**': 'text' },
          { name: idxName }
        );
        await mongoCollection.indexExists(idxName);
        //await indexCache.setItem(mongoCollection.collectionName, mongoCollection.collectionName, { ttl: 600 });
      }
    } catch (e) {
      throw e;
    };
  }
  private async getCollection() {
    let db: string = PlatformConstants.PLATFORM_DB;
    let org: string = null;
    if (ns != null && ns.getStore()) {
      L.debug(`PersistenceService: Found namespace ${JSON.stringify(ns.getStore())}`);
      org = ns.getStore().get(ContextConstants.ORG_NAME);
    }
    if (org != null) {
      db = org;
    } else if (!PlatformConstants.PLATFORM_COLLECTIONS.includes(this.collection)) {
      throw new ErrorResponseInternal(500, `Can't write to  ${this.collection} in tenant ${db}`);
    }

    L.info(`db is ${db}`);
    const collNames = await databaseaccess.client.db(db).listCollections({ name: this.collection }).toArray();
    let exists: boolean = false;
    collNames.forEach(c => {
      if (c.name == this.collection) {
        exists = true;
      }
    });
    let mongoCollection: Collection;
    if (exists){
      L.debug(`Collection already exists ${this.collection}`);
      mongoCollection = databaseaccess.client.db(db).collection(this.collection);
    } else {
      L.debug(`Collection required ${this.collection}`);
      mongoCollection = await databaseaccess.client.db(db).createCollection(this.collection);
      
    }
    await this.createIndex(mongoCollection, db);
    // try {
    //   await this.createIndex(mongoCollection);
    // } catch (e) {
    //   L.info(`explicitly creating collection ${this.collection}`);
    //   // this may fail if the collection is not created yet, it seems these are only created on write
    //   mongoCollection = await databaseaccess.client.db(db).createCollection(this.collection);
    //   await this.createIndex(mongoCollection);
    // }

    return mongoCollection;
  }
  constructor(collection: string) {
    this.collection = collection;
  }

  all(query?: object, sort?: object, paging?: Paging): Promise<any[]> {
    
    if (query == null) {
      query = {};
    }
    if (ns != null && ns.getStore() && ns.getStore().get(ContextConstants.FILTER)) {
      const searchInfo: SearchInfo = ns.getStore().get(ContextConstants.FILTER);
      query['$text'] = { '$search': searchInfo.searchWordList }
    }
    if (sort == null) {
      sort = {};
      if (ns != null && ns.getStore() && ns.getStore().get(ContextConstants.SORT)) {
        L.debug(`PersistenceService: Found namespace ${ns}`);
        const sortInfo: SortInfo = ns.getStore().get(ContextConstants.SORT);
        sort[sortInfo.fieldName] = sortInfo.direction;
      }
      L.debug(`PeristanceService.all query ${JSON.stringify(query)}`);
      L.debug(`sort ${JSON.stringify(sort)}`);
    }
    // attempt to retrieve paging from context/namespace
    if (paging == null) {
      if (ns != null && ns.getStore()) {
        L.debug(`PersistenceService: Found namespace ${ns}`);
        paging = ns.getStore().get(ContextConstants.PAGING);
        L.debug(`paging ${paging}`);
      }
    }
    return new Promise<any[]>(async (resolve, reject) => {
      const collection: mongodb.Collection = await this.getCollection();
      let x: mongodb.Cursor<any> = null;
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
    const collection: mongodb.Collection = await this.getCollection();
    let q = query;
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
        const msg = `Object ${name} not found`;
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

  async delete(name: string, query?: any): Promise<number> {
    let retVal: number = 0;
    const collection: mongodb.Collection = await this.getCollection();
    let q = query;
    if (q) {
      q._id = name;
    } else {
      q = { _id: name };
    }
    L.info(q);
    try {
      const item: DeleteWriteOpResultObject = await collection.deleteOne(q);
      L.debug(` deleted count: ${item.deletedCount}`);
      if (item.deletedCount == 1) {
        retVal = 204;
      } else {
        throw (new ErrorResponseInternal(404, `No entity ${name} found `));
      }

    } catch (e) {
      throw this.createPublicErrorMessage(e);
    };
    return retVal;
  }

  async create(_id: string, body: any): Promise<any> {
    L.info(`adding ${this.collection} with _id ${_id}`);
    const collection: mongodb.Collection = await this.getCollection();
    body._id = _id;
    let opts: CollectionInsertOneOptions = {
      w: 1,
      j: true
    };
    try {
      const y: mongodb.InsertOneWriteOpResult<any> = await collection.insertOne(body, opts);
      delete body._id;
      return body;
    } catch (e) {
      throw (this.createPublicErrorMessage(e));
    };
  }

  async update(_id: string, body: any, query?: any): Promise<any> {

    L.info(`patching ${this.collection} with _id ${_id}`);
    let id = body.name;
    if (id == null) {
      id = body.id;
    }
    if (id == null) {
      id = body._id;
    }
    if (id != null && id != _id) {
      throw (new ErrorResponseInternal(400, `Can not change entity identifier `));
    }

    const collection: mongodb.Collection = await this.getCollection();
    let q = query;
    if (q) {
      q._id = _id;
    } else {
      q = { _id: _id };
    }
    const opts: UpdateOneOptions = {
      w: 1,
      j: true
    };
    try {
      const v: mongodb.UpdateWriteOpResult = await collection.updateOne(q, { $set: body }, opts);
      if (v.matchedCount == 0) {
        throw new ErrorResponseInternal(404, `No entity ${_id} found `);
      }
      const p: any = await this.byName(_id);
      return (p);

    } catch (e) {
      throw (this.createPublicErrorMessage(e));
    }
  }

  validateReferences(names: string[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const results: Promise<boolean>[] = [];
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
      const errorCode = 'E' + error.code;
      let msg = error.message.replace(errorCode, '');
      let statusCode = 422;
      msg = msg.substring(0, msg.indexOf('error')).trim();
      let hexCode = '';
      if (error.code) {
        hexCode = error.code.toString(16);
      }
      msg = `${msg} ${hexCode}`;
      if (error.code == null) {
        msg = error.message;
        statusCode = 500;
      }
      L.info(error);
      L.debug(`public error message ${msg}`);
      return new ErrorResponseInternal(statusCode, msg);
    } else {
      return error;
    }
  }

}
