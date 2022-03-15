import { OpenApiContact } from "./OpenApiContact";
import { OpenApiLicense } from "./OpenApiLicense";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#info-object
 */
export interface OpenApiInfo {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: OpenApiContact;
  license?: OpenApiLicense;
  version: string;
}
