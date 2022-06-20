import { MongoClient } from 'mongodb';
import L from '../server/common/logger';

export class databaseaccess {
  private static async reconnect(url: string) {
    let isConnected: boolean = false;
    while (!isConnected) {
      try {
        await databaseaccess.connect(url);
        L.info(`Connected to Mongo!`);
        isConnected = true;
      } catch (err) {
        L.error(err, `Unable to connect to Mongo, err=${JSON.stringify(err)}. Continue retrying`);

      }
    }

  }
  public static client: MongoClient;
  constructor() {

  }
  public static connect(url: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        url = databaseaccess.validateUrl(url);
        L.info(`Attempting to connect to [${url}]`);

        databaseaccess.client = new MongoClient(url, {
          keepAlive: true,
          serverSelectionTimeoutMS: 3000,
          connectTimeoutMS: 1000,
          socketTimeoutMS: 5000,
          minPoolSize: 5,
          maxPoolSize: 20,
        });
        await databaseaccess.client.connect();
        databaseaccess.client.on('timeout', () => {
          L.error('db timeout');
          databaseaccess.reconnect(url);

        });
        databaseaccess.client.on('error', (e) => {
          L.error("mongo error");
          L.error(e);
          databaseaccess.reconnect(url);
        });

        databaseaccess.client.on('serverHeartbeatFailed', (e) => {
          L.error("mongo error");
          L.error(e);
          databaseaccess.reconnect(url);
        });
        resolve("");
      } catch (e) {
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
  }

  private static validateUrl(url: string): string {
    url = url.trim().replace(/^[\'\"]|[\'\"]$/g, '');
    const v = new URL(url);
    return url;
  }
}




