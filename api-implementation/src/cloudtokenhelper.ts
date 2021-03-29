import L from '../server/common/logger';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { ns } from '../server/api/middlewares/context.handler';
import axios, { AxiosRequestConfig } from 'axios';
import { ContextConstants } from '../server/common/constants';
import { isString } from './typehelpers';

export async function getCloudToken(): Promise<string> {
  var token: any = null;
  token = ns.getStore().get(ContextConstants.CLOUD_TOKEN);
  if (token == null) {
    throw new ErrorResponseInternal(500, `Token is not defined for ${ns.getStore().get(ContextConstants.ORG_NAME)}`);
  }
  L.trace(`token is ${token}`);
  if (isString(token)) {
    return token;
  } else {
    return token.cloud.token;
  }
}

export async function getEventPortalToken(): Promise<string> {
  var token: any = null;
  token = ns.getStore().get(ContextConstants.CLOUD_TOKEN);
  if (token == null) {
    throw new ErrorResponseInternal(500, `Token is not defined for ${ns.getStore().get(ContextConstants.ORG_NAME)}`);
  }
  L.trace(`token is ${token}`);
  if (isString(token)) {
    return token;
  } else {
    return token.eventPortal.token;
  }
}
export async function validateToken(token: string, url: string): Promise<boolean> {
  L.debug(`url: ${url}, token: [${token}]`);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(url, config);
    if (response.status > 299) {
      return false;
    } else {
      return true;
    }
  }
  catch (e) {
    L.warn('validateToken');
    L.warn(e);
    return false;
  }
}

export async function getCloudBaseUrl(): Promise<string> {
  var token: any = null;
  token = ns.getStore().get(ContextConstants.CLOUD_TOKEN);

  if (token == null || isString(token)) {
    L.debug('using default cloud base url');
    return 'https://api.solace.cloud/api/v0';
  } else {
    return token.cloud.baseUrl;
  }
}

export async function getEventPortalBaseUrl(): Promise<string> {
  var token: any = null;
  token = ns.getStore().get(ContextConstants.CLOUD_TOKEN);
  if (token  == null || isString(token)) {
    L.debug('using default event portal base url');
    return 'https://solace.cloud';
  } else {
    return token.eventPortal.baseUrl;
  }
}

export async function resolve(resolver: any) {
  if (typeof resolver === 'function') {
    L.debug('resolving url');
    return resolver();
  } else {
    return resolver;
  }
}