import { Dictionary } from "../types";
import { OpenApiDiscriminator } from "./OpenApiDiscriminator";
import { OpenApiExternalDocs } from "./OpenApiExternalDocs";
import { OpenApiReference } from "./OpenApiReference";
import { OpenApiXml } from "./OpenApiXml";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#schema-object
 */
export interface OpenApiSchema {
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: string[];
  type?: string;
  allOf?: OpenApiSchemaLike[];
  oneOf?: OpenApiSchemaLike[];
  anyOf?: OpenApiSchemaLike[];
  not?: OpenApiSchemaLike[];
  items?: OpenApiSchemaLike;
  properties?: Dictionary<OpenApiSchemaLike>;
  additionalProperties?: boolean | OpenApiSchemaLike;
  description?: string;
  format?:
  | 'int32'
  | 'int64'
  | 'float'
  | 'double'
  | 'string'
  | 'boolean'
  | 'byte'
  | 'binary'
  | 'date'
  | 'date-time'
  | 'password';
  default?: any;
  nullable?: boolean;
  discriminator?: OpenApiDiscriminator;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: OpenApiXml;
  externalDocs?: OpenApiExternalDocs;
  example?: any;
  deprecated?: boolean;
}

export type OpenApiSchemaLike =
  | OpenApiSchema
  | OpenApiReference;
