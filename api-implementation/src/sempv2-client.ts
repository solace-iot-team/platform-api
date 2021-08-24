import L from '../server/common/logger';
import { OpenAPI } from './clients/sempv2/core/OpenAPI';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { ns } from '../server/api/middlewares/context.handler';
import { ContextConstants } from '../server/common/constants';
import { ApiRequestOptions } from './clients/sempv2/core/ApiRequestOptions';
import Organization = Components.Schemas.Organization;

type Headers = Record<string, string>;

export class Sempv2Client {
  static BASE = 'sempv2BaseUrl';
  static USER = 'sempv2UserName';
  static PASSWORD = 'sempv2Password';

  constructor(
  ) {
    OpenAPI.BASE = getBase;
    OpenAPI.USERNAME = getUser;
    OpenAPI.PASSWORD = getPassword;
    OpenAPI.HEADERS = getHeaders;
  }
}

export async function getBase(): Promise<string> {
  return getValue(Sempv2Client.BASE);
}
export async function getUser(): Promise<string> {
  return getBasicAuthValue(Sempv2Client.USER);
}
export async function getPassword(): Promise<string> {
  return getBasicAuthValue(Sempv2Client.PASSWORD);
}

export async function getHeaders(options: ApiRequestOptions): Promise<Headers> {
  const org: Organization = ns.getStore().get(ContextConstants.ORG_OBJECT);
  if (org.sempV2Authentication == null || org.sempV2Authentication.authType != 'APIKey'){
    return null;
  }
  let h: Record<string, string> = null;
  if (org.sempV2Authentication.apiKeyLocation == 'header') {
    h = {};
    h[org.sempV2Authentication.apiKeyName] = await getValue(Sempv2Client.USER);
  }
  if (org.sempV2Authentication.apiKeyLocation == 'query') {
    options.query.append(org.sempV2Authentication.apiKeyName, await getValue(Sempv2Client.USER));
  }
  return h;
}

async function  getBasicAuthValue(key: string): Promise<string>{
  const org: Organization = ns.getStore().get(ContextConstants.ORG_OBJECT);
  if (org.sempV2Authentication == null || org.sempV2Authentication.authType == 'BasicAuth'){
    return this.getValue(key);
  } else {
    return null;
  }

}


async function getValue(key: string): Promise<string> {
  const val: string = ns.getStore().get(key);
  if (val == null) {
    throw new ErrorResponseInternal(
      500,
      `${key} is not defined for ${ns.getStore().get(ContextConstants.ORG_NAME)}`
    );
  }
  L.trace(`${key} is ${val}`);
  return val;
}
export default new Sempv2Client();