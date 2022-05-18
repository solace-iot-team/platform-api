import { MongoClient } from 'mongodb';
import L from '../server/common/logger';

export class databaseaccess {
  public static client: MongoClient;
  constructor() {

  }
  public static connect(url: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        url = databaseaccess.validateUrl(url);
        L.info(`Attempting to connect to [${url}]`);
        
        databaseaccess.client = new MongoClient(url, {
          serverSelectionTimeoutMS: 3000,
          connectTimeoutMS: 1000, 
          socketTimeoutMS: 5000,
          minPoolSize: 5,
        });
        await databaseaccess.client.connect();
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




