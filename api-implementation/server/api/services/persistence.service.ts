import L from '../../common/logger';
import { PlatformConstants, ContextConstants } from '../../common/constants';
import { databaseaccess } from '../../../src/databaseaccess';
import mongodb, { MongoError, Collection, Sort, DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';

import { ErrorResponseInternal } from '../middlewares/error.handler';
import { ns } from '../middlewares/context.handler';
import { Paging } from '../../../src/model/paging';
import { SortInfo } from '../../../src/model/sortinfo';
import { SearchInfo } from '../../../src/model/searchinfo';

import DatabaseBootstrapper from './persistence/databasebootstrapper';

export class PersistenceService {
  private collection: string;

  private createCollection(db: string) {
    if (!PlatformConstants.PLATFORM_COLLECTIONS.includes(this.collection) && PlatformConstants.PLATFORM_DB == db) {
      L.warn('Attempt to create platform collections');
      //throw new ErrorResponseInternal(500, `Can't write to  ${this.collection} in tenant ${db}`);
      return;
    }

    L.debug(`db is ${db}, creating collection ${this.collection}`);
    const persistenceSvc = this;
    databaseaccess.client.db(db).createCollection(this.collection, function (err, collection: Collection) {

      if (err) {
        // sometimes the colleciton already exists. it's due to the fact that multipe instances of a persistence service for a specific collection may  exist
        L.warn(JSON.stringify(err));
        if (err.code == 48 && err.codeName == 'NamespaceExists') {
          collection = databaseaccess.client.db(db).collection(persistenceSvc.collection);
          const idxName: string = `idx_text_${db}_${collection.collectionName}`;
          L.info(`creating full text index ${collection.collectionName}`);
          collection.createIndex(
            { '$**': 'text' },
            { name: idxName },
            function (err, s) {
              L.trace(s);
              L.trace(err);
              L.info(`Created index ${idxName}`);
            }
          );

        }

      } else {
        const idxName: string = `idx_text_${db}_${collection.collectionName}`;
        L.info(`creating full text index ${collection.collectionName}`);
        collection.createIndex(
          { '$**': 'text' },
          { name: idxName },
          function (err, s) {
            L.trace(s);
            L.trace(err);
            L.info(`Created index ${idxName}`);
          }
        );
      }

    }.bind(this));

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
    const client = databaseaccess.client;
    const mongoCollection: Collection = client.db(db).collection(this.collection);
    return mongoCollection;
  }
  constructor(collection: string) {
    this.collection = collection;
    DatabaseBootstrapper.on('added', this.createCollection.bind(this));
  }

  async all(query?: object, sort?: object, paging?: Paging, returnIds: boolean = false): Promise<any[]> {

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

    const collection: mongodb.Collection = await this.getCollection();
    let x: mongodb.FindCursor<any> = null;
    if (paging !== null && paging !== undefined) {
      x = collection.find(query).sort(sort as Sort).skip((paging.pageNumber - 1) * paging.pageSize).limit(paging.pageSize);
    } else {
      x = collection.find(query).sort(sort as Sort);
    }
    L.trace(`executed find on mongodb`);
    let retVal = await x.toArray();

    retVal.forEach((item) => {
      if (!returnIds) {
        delete item._id;
      }
    });
    L.trace(`found ${retVal.length} results`);
    return retVal;
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
      const item = (await collection.findOne(q)) as any;
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
      const item: DeleteResult = await collection.deleteOne(q);
      L.debug(`Deleted count: ${item.deletedCount}`);
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
    // let opts: CollectionInsertOneOptions = {
    //   w: 1,
    //   j: true
    // };
    try {
      const y: InsertOneResult = await collection.insertOne(body);
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
    // const opts: UpdateOneOptions = {
    //   w: 1,
    //   j: true
    // };
    try {
      const v = await collection.updateOne(q, { $set: body });
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
        reject(new ErrorResponseInternal(422, e));
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
