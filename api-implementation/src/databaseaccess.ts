import mongo from 'mongodb';
import L from '../server/common/logger';

//const uri = "mongodb://api-user:Solace123@localhost:27017/solace-platform?retryWrites=true&w=majority";

export class databaseaccess {
	public static client: mongo.MongoClient;
	constructor() {

	}
	public static connect(url: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			mongo.MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true}, (err, client: mongo.MongoClient) => {
				if (err) {
					reject(err);
				} else {
					databaseaccess.client = client;
					L.info("Connected to database");
					resolve(client);
				}
			});
		});
	}

	public disconnect(): void {
		databaseaccess.client.close();
	}
}




