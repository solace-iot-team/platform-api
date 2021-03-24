import L from '../server/common/logger';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import {ns} from '../server/api/middlewares/context.handler';
import axios, { AxiosRequestConfig } from 'axios';
import { ContextConstants } from '../server/common/constants';

export default async function getToken(): Promise<string> {
  var token: string = null;
    token = ns.getStore().get(ContextConstants.CLOUD_TOKEN);
    if (token == null) {
      throw new ErrorResponseInternal(500, `Token is not defined for ${ns.getStore().get(ContextConstants.ORG_NAME)}`);
    }
  L.trace(`token is ${token}`);
  return token;
}

export async function validateToken(token: string, url: string): Promise<boolean> {
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

