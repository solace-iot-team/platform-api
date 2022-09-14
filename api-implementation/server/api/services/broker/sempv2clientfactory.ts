import L from '../../../common/logger';

import { Service } from '../../../../src/clients/solacecloud/models/Service';
import { ns } from '../../middlewares/context.handler';
import { AllServiceDefault } from '../../../../src/clients/sempv2/services/AllServiceDefault';
import { ApiOptions } from '../../../../src/clients/sempv2/core/ApiOptions';

import { ContextConstants } from '../../../common/constants';
import { ApiRequestOptions } from '../../../../src/clients/sempv2/core/ApiRequestOptions';
import Organization = Components.Schemas.Organization;
import { ErrorResponseInternal } from '../../middlewares/error.handler';
import { AboutApiResponse } from '../../../../src/clients/sempv2';

import { Cache, CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'

const sempvVersionCache = new CacheContainer(new MemoryStorage())

type Headers = Record<string, string>;
const SEMPV2_USER = 'sempv2UserName';
const SEMPV2_PASSWORD = 'sempv2Password';
const SEMPV2_BASE = 'sempv2BaseUrl';
export class SempV2ClientFactory {
  getSEMPv2Client(service: Service): AllServiceDefault {
    const sempProtocol = service.managementProtocols.find(i => i.name === "SEMP");
    if (!sempProtocol) {
      L.error(`Could not locate mmanagement protocols in ${service.name} `);
      L.debug(service.managementProtocols);
      throw new ErrorResponseInternal(500, `Could not resolve management endpoint`)
    }

    ns.getStore().set(SEMPV2_BASE, sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0]);
    ns.getStore().set(SEMPV2_USER, sempProtocol.username);
    ns.getStore().set(SEMPV2_PASSWORD, sempProtocol.password);

    const options: ApiOptions = {
      baseUrl: sempProtocol.endPoints.find(j => j.name === "Secured SEMP Config").uris[0],
      username: sempProtocol.username,
      password: sempProtocol.password,
      defaultHeaders: getHeaders
    }
    return new AllServiceDefault(options);
  }
  
  @Cache(sempvVersionCache, { ttl: 120 })
  async getSEMPv2ClientVersion(service: Service): Promise<string> {
    const client = this.getSEMPv2Client(service);
    const r = await client.getAboutApi() as AboutApiResponse;
    return r.data.sempVersion;
  }
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

export default new SempV2ClientFactory();