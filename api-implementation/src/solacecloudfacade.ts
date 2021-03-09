import L from '../server/common/logger';
import C from 'cls-hooked';

import Environment = Components.Schemas.Environment;
import { OpenAPI, Service, ServicesService, ServiceResponse, ServicesResponse, ApiError } from "./clients/solacecloud";

import getToken from './cloudtokenhelper';

class SolaceCloudFacade {
	constructor() {
		OpenAPI.TOKEN = getToken;
	}

	public getServiceByEnvironment(e: Environment): Promise<Service> {
		return new Promise<Service>((resolve, reject) => {
			var result: Promise<any> = ServicesService.getService(e.serviceId);

			result.then((value: ServiceResponse) => {
				if (!value) {
					reject(404);
				} else if (value.data == null) {
					reject(400);
				} else {
					resolve(value.data);
				}
			});
			result.catch((val) => {
				L.error(val);

				reject("API Error" + val)
			});

		});
	}
	public getServices(): Promise<Service[]> {
		return new Promise<Service[]>((resolve, reject) => {
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
			if (x != null) {
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
