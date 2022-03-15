import { OpenApiComponents } from './OpenApiComponents';
import { OpenApiExternalDocs } from './OpenApiExternalDocs';
import { OpenApiInfo } from './OpenApiInfo';
import { OpenApiPaths } from './OpenApiPaths';
import { OpenApiSecurityRequirement } from './OpenApiSecurityRequirement';
import { OpenApiServer } from './OpenApiServer';
import { OpenApiTag } from './OpenApiTag';

/**
 * https://spec.openapis.org/oas/v3.0.2.html#openapi-object
 */
export interface OpenApi {
  openapi: string;
  info: OpenApiInfo;
  servers?: OpenApiServer[];
  paths: OpenApiPaths;
  components?: OpenApiComponents;
  security?: OpenApiSecurityRequirement[];
  tags?: OpenApiTag[];
  externalDocs: OpenApiExternalDocs;
}
