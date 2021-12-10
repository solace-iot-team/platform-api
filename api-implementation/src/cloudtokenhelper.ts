import L from '../server/common/logger';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { ns } from '../server/api/middlewares/context.handler';
import fetch from 'fetch-with-proxy';
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
  L.info(`url: ${url}, token: [${token}]`);

  const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': `Bearer ${token}`
  }
};
  try {
    const response = await fetch(url, options);
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
    L.trace('using default cloud base url');
    return 'https://api.solace.cloud/api/v0';
  } else {
    return token.cloud.baseUrl;
  }
}

export async function getEventPortalBaseUrl(): Promise<string> {
  var token: any = null;
  token = ns.getStore().get(ContextConstants.CLOUD_TOKEN);
  if (token == null || isString(token)) {
    L.trace('using default event portal base url');
    return 'https://api.solace.cloud/api/v0/eventPortal';
  } else {
    return token.eventPortal.baseUrl;
  }
}

export async function resolve(resolver: any) {
  if (typeof resolver === 'function') {
    L.trace('resolving url');
    return resolver();
  } else {
    return resolver;
  }
}