import L from '../server/common/logger';
import { OpenAPI } from './clients/sempv2/core/OpenAPI';
import { ErrorResponseInternal } from '../server/api/middlewares/error.handler';
import { ns } from '../server/api/middlewares/context.handler';

export class Sempv2Client {
  static BASE = 'sempv2BaseUrl';
  static USER = 'sempv2UserName';
  static PASSWORD = 'sempv2Password';

  constructor(
  ) {
    OpenAPI.BASE = getBase;
    OpenAPI.USERNAME = getUser;
    OpenAPI.PASSWORD = getPassword;
  }
}

export async function getBase(): Promise<string> {
  return getValue(Sempv2Client.BASE);
}
export async function getUser(): Promise<string> {
  return getValue(Sempv2Client.USER);
}
export async function getPassword(): Promise<string> {
  return getValue(Sempv2Client.PASSWORD);
}

async function getValue(key: string): Promise<string> {
  const val: string = ns.getStore().get(key);
  if (val == null) {
    throw new ErrorResponseInternal(
      500,
      `${key} is not defined for ${ns.getStore().get('org')}`
    );
  }
  L.trace(`${key} is ${val}`);
  return val;
}
export default new Sempv2Client();