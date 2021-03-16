import L from '../server/common/logger';

import Environment = Components.Schemas.Environment;
import { OpenAPI, Service, ServicesService, ServiceResponse, ServicesResponse } from "./clients/solacecloud";

import getToken from './cloudtokenhelper';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';

class SolaceCloudFacade {
	constructor() {
		OpenAPI.TOKEN = getToken;
	}

	public async getServiceByEnvironment(e: Environment): Promise<Service> {
		try {
			var result: ServiceResponse = await ServicesService.getService(e.serviceId);
			if (result == null || result.data == null) {
				throw new ErrorResponseInternal(404, `Service ${e.serviceId} does not exist`);
			} else {
				return result.data;
			}
		}
		catch (err) {
			L.error(`getServiceByEnvironment ${JSON.stringify(err)}`);
			throw new ErrorResponseInternal(500, `API Error ${err}`);
		}
	}

	public async getServices(): Promise<Service[]> {
				try {
			var result: ServicesResponse = await ServicesService.listServices();
			if (result == null) {
				throw new ErrorResponseInternal(404, `No services found`);
			} else {
				return result.data;
			}
		}
		catch (e) {
			L.error(e);
			throw new ErrorResponseInternal(500, `API Error ${e}`);
		}
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
