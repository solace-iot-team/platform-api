import L from '../server/common/logger';
import { ApiOptions } from './clients/sempv2/core/ApiOptions';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { ns } from '../server/api/middlewares/context.handler';
import { ContextConstants } from '../server/common/constants';
import { ApiRequestOptions } from './clients/sempv2/core/ApiRequestOptions';
import Organization = Components.Schemas.Organization;
import { AllServiceDefault } from './clients/sempv2/services/AllServiceDefault';

type Headers = Record<string, string>;
const SEMPV2_BASE = 'sempv2BaseUrl';
const SEMPV2_USER = 'sempv2UserName';
const SEMPV2_PASSWORD = 'sempv2Password';

export class Sempv2Client {
  BASE = SEMPV2_BASE;
  USER = SEMPV2_USER;
  PASSWORD = SEMPV2_PASSWORD;

  private options: ApiOptions;
  constructor() {
    this.options = {
      baseUrl: getBase(),
      username: getUser,
      password: getPassword,
      defaultHeaders: getHeaders

    };
  }

  public getAPIClient(): AllServiceDefault{
    return new AllServiceDefault(this.options);
  }
}

//export default new Sempv2Client();

export function getBase(): string {
  return getValue(SEMPV2_BASE);
}
export async function getUser(): Promise<string> {
  return getBasicAuthValue(SEMPV2_USER);
}
export async function getPassword(): Promise<string> {
  return getBasicAuthValue(SEMPV2_PASSWORD);
}

export async function getHeaders(options: ApiRequestOptions): Promise<Headers> {
  const org: Organization = ns.getStore().get(ContextConstants.ORG_OBJECT);
  if (org.sempV2Authentication == null || org.sempV2Authentication.authType != 'APIKey') {
    return null;
  }
  let h: Record<string, string> = null;
  if (org.sempV2Authentication.apiKeyLocation == 'header') {
    h = {};
    h[org.sempV2Authentication.apiKeyName] = getValue(SEMPV2_USER);
  }
  if (org.sempV2Authentication.apiKeyLocation == 'query') {
    options.query.append(org.sempV2Authentication.apiKeyName, getValue(SEMPV2_PASSWORD));
  }
  return h;
}

function getBasicAuthValue(key: string): string {
  const org: Organization = ns.getStore().get(ContextConstants.ORG_OBJECT);
  if (org.sempV2Authentication == null || org.sempV2Authentication.authType == 'BasicAuth') {
    return getValue(key);
  } else {
    return null;
  }

}


function getValue(key: string): string {
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