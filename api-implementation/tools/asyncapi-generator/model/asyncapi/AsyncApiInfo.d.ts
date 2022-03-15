import { AsyncApiContact } from "./AsyncApiContact";
import { AsyncApiLicense } from "./AsyncApiLicense";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#infoObject
 */
export interface AsyncApiInfo {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: AsyncApiContact;
  license?: AsyncApiLicense;
}
