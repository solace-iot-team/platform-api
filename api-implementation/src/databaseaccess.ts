import mongo from 'mongodb';
import L from '../server/common/logger';

export class databaseaccess {
  public static client: mongo.MongoClient;
  constructor() {

  }
  public static connect(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        url = databaseaccess.validateUrl(url);
        L.info(`Attempting to connect to [${url}]`);
        mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client: mongo.MongoClient) => {
          if (err) {
            L.error(`Not connected to database`);
            reject(err);
          } else {
            databaseaccess.client = client;
            L.info(`Connected to database ${url}`);
            resolve(client);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
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




