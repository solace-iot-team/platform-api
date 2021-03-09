import C from 'cls-hooked';
import L from '../server/common/logger';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';

export default async function  getToken(): Promise<string> {
	var namespace = C.getNamespace('platform-api');
	var token: string = null;
	namespace.run(function () {
		token = namespace.get('cloud-token');
		if (token == null) {
			throw new ErrorResponseInternal(500, `Token is not defined for ${namespace.get('org')}`);
		}
	});
	L.info(`token is ${token}`);
	return token;
} 