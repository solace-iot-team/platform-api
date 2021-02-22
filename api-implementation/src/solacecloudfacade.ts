import L from '../server/common/logger';

import Environment = Components.Schemas.Environment;
import { OpenAPI, Service, ServicesService, ServiceResponse, ServicesResponse, ApiError } from "./clients/solacecloud";

import C from 'cls-hooked';

class SolaceCloudFacade {
	constructor() {
		//OpenAPI.TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Im1hYXNfcHJvZF8yMDIwMDMyNiIsInR5cCI6IkpXVCJ9.eyJvcmciOiJzb2xhY2Vpb3R0ZWFtIiwib3JnVHlwZSI6IkVOVEVSUFJJU0UiLCJzdWIiOiIzZTJvY214MTA1IiwicGVybWlzc2lvbnMiOiJBQUFBQUlBRUFBQUFBd0FBWUFBQUFBQUFBQUFBQUFBQUFBQVFBZ0U9IiwiYXBpVG9rZW5JZCI6IjEzOW11MndqMjNnNyIsImlzcyI6IlNvbGFjZSBDb3Jwb3JhdGlvbiIsImlhdCI6MTYwNTUyODc3MH0.IT099ow1UlKSK75wEMMb_GtufxqRfgwIx_lRBhMj3qoGNhOqtEH0G0XGFIFmlzMOCDVfX14F__YQE29o2NwQ_gfuyYF73Om0uHmvJkpWnEIbAzNgGyJFK4DUa8mx603GPgMHcwu0b9iJ70qoagI2-YNVtxF_gVBv51Bc4mPaFZmzGeRc23ZfK_oW8uvjayX1-cgDG1LJy17M3x-X2G1ezJhwvaL9BX2HMGyjYiTrWMPleseLcgEBhmSoqCzvhOTFmIfNJIwA_upovkurEHe0VtT1QA8PrebUdl85pEw0RpSjTiFdeNf2MWw1wOnCSRmJ5zoj-ASkVWye5sHFDqM0sg';
	}

	private getToken(): string {
		var namespace = C.getNamespace('platform-api');
		var token: string = null;
		namespace.run(function () {
			token = namespace.get('cloud-token');
		});
		L.info(`token is ${token}`);
		return token;
	}

	public getServiceByEnvironment(e: Environment): Promise<Service> {
		return new Promise<Service>((resolve, reject) => {
			OpenAPI.TOKEN = this.getToken();
			var result: Promise<any> = ServicesService.getService(e.serviceId);

			result.then((value: ServiceResponse) => {
				if (!value)
					reject(404);
				resolve(value.data);
			});
			result.catch((val) => {
				L.error(val);

				reject("API Error" + val)
			});

		});
	}
	public getServices(): Promise<Service[]> {
		return new Promise<Service[]>((resolve, reject) => {
			OpenAPI.TOKEN = this.getToken();
			ServicesService.listServices().then((value: ServicesResponse) => {
				if (!value)
					reject(404);
				resolve(value.data);
			}).catch((val: ApiError) => {
				L.error(val);
				reject(val)
			});

		});
	}
	public async validate(token: string): Promise<boolean> {

		OpenAPI.TOKEN = token;
		try {
			var x = await ServicesService.listServices();
			if (x != null){
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}


	}
}

export default new SolaceCloudFacade();
