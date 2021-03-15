import { OpenAPI } from './clients/sempv2/core/OpenAPI';

export class Sempv2Client {
  constructor(public base: string, public username: string, public password: string) {
    OpenAPI.BASE = base;
    OpenAPI.USERNAME = username;
    OpenAPI.PASSWORD = password;
  }
}