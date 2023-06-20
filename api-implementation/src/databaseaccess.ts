import { database } from 'agenda/dist/agenda/database';
import { MongoClient } from 'mongodb';
import L from '../server/common/logger';

export class databaseaccess {
  private static delayInterval: number = 0;
  private static dbUrl: string;
  
  public static async reconnect(url: string) {
    this.dbUrl = url;
    let isConnected: boolean = false;
    L.info(`Attempting to reconnect to MongoDB`);
    L.info(`delay ${databaseaccess.delayInterval}`);
    if (databaseaccess.client) {
      try {
        await databaseaccess.client.close();
        databaseaccess.client = null;
      } catch (e) {
        L.error(e);
      }
      databaseaccess.client = null;
    }
    while (!isConnected) {
      try {
        await databaseaccess.connect(url);
        L.info(`Connected to Mongo!`);
        isConnected = true;
        databaseaccess.delayInterval = 0;
      } catch (err) {
        L.error(err, `Unable to connect to Mongo, err=${JSON.stringify(err)}. Continue retrying`);
        await databaseaccess.delay();
      }
    }

  }
  private static client: MongoClient;
  constructor() {

  }

  public static async getClient(): Promise<MongoClient>{
    if (databaseaccess.client){
      await databaseaccess.client.connect();
    } else {
      await databaseaccess.connect(databaseaccess.dbUrl);
    }
    return databaseaccess.client;
  } 

  public static connect(url: string): Promise<any> {
    this.dbUrl = url;
    return new Promise<any>(async (resolve, reject) => {
      try {
        url = databaseaccess.validateUrl(url);
        L.info(`Attempting to connect to [${url}]`);

        databaseaccess.client = new MongoClient(url, {
          keepAlive: true,
          keepAliveInitialDelay: 20000,
          heartbeatFrequencyMS: 5000,
          serverSelectionTimeoutMS: 3000,
          connectTimeoutMS: 2000,
          socketTimeoutMS: 30000,
          minPoolSize: 5,
          maxPoolSize: 20,
          maxIdleTimeMS: 60000,
          maxStalenessSeconds: 20,
          minHeartbeatFrequencyMS: 5000,
          waitQueueTimeoutMS: 1000
        });
        await databaseaccess.client.connect();
        databaseaccess.client.removeAllListeners('timeout');
        databaseaccess.client.on('timeout', () => {
          L.error('db timeout');
          databaseaccess.reconnect(url);

        });
        databaseaccess.client.removeAllListeners('error');
        databaseaccess.client.on('error', async (e) => {
          L.error("mongo error");
          L.error(e);
          await databaseaccess.reconnect(url);
        });

        databaseaccess.client.removeAllListeners('serverHeartbeatFailed');
        databaseaccess.client.on('serverHeartbeatFailed', async (e) => {
          L.error("mongo error");
          L.error(e);
          await databaseaccess.reconnect(url);
        });
        resolve("");
      } catch (e) {
        if (databaseaccess.client) {
          try {
            await databaseaccess.client.close();
          } catch (e) {
            L.error(e);
          }
          databaseaccess.client = null;
        }
        reject(e);
      }
    });
  }

  public static async isHealthy(): Promise<boolean> {
    if (!databaseaccess.client) {
      return false;
    }
    try {
      await databaseaccess.client.db('platform').collection('organizations').find({}).maxTimeMS(100).toArray();
      return true;
    } catch (e) {
      L.error(`database probe timed out`)
      return false;
    }
  }

  public disconnect(): void {
    databaseaccess.client.close();
    databaseaccess.client = null;
  }

  private static validateUrl(url: string): string {
    url = url.trim().replace(/^[\'\"]|[\'\"]$/g, '');
    const v = new URL(url);
    return url;
  }

  static delay(): Promise<void> {
    const increment = 2000;
    if (databaseaccess.delayInterval > 60000) {
      databaseaccess.delayInterval = 1000;
    } else {
      databaseaccess.delayInterval = databaseaccess.delayInterval + increment;
    }
    return new Promise((resolve) => {
      L.info(`delay ${databaseaccess.delayInterval}`);
      setTimeout(resolve, databaseaccess.delayInterval);
    });
  }

}