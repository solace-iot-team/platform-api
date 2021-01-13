import { OpenAPI } from './clients/sempv2/core/OpenAPI';
import { encode } from "base-64";
export class Sempv2Client {
	 constructor(public base: string, public username: string , public password: string) {
		 OpenAPI.BASE = base;
		 OpenAPI.TOKEN = encode(`${username}:${password}`);
	  }
	 

}