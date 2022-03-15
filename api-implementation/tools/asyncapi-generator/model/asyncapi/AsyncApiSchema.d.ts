import { Dictionary } from "../types";
import { AsyncApiExternalDocs } from "./AsyncApiExternalDocs";
import { AsyncApiReference } from "./AsyncApiReference";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#schemaObject
 */
export interface AsyncApiSchema {
  title?: string;
  type?: string;
  required?: string[];
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  enum?: string[];
  const?: any;
  examples?: any[];
  if?: AsyncApiSchemaLike;
  then?: AsyncApiSchemaLike;
  else?: AsyncApiSchemaLike;
  readOnly?: boolean;
  writeOnly?: boolean;
  properties?: Dictionary<AsyncApiSchemaLike>;
  patternProperties?: Dictionary<string>;
  additionalProperties?: boolean | AsyncApiSchemaLike;
  additionalItems?: AsyncApiSchemaLike;
  items?: AsyncApiSchemaLike[];
  propertyNames?: AsyncApiSchemaLike;
  contains?: AsyncApiSchemaLike;
  allOf?: AsyncApiSchemaLike[];
  oneOf?: AsyncApiSchemaLike[];
  anyOf?: AsyncApiSchemaLike[];
  not?: AsyncApiSchemaLike[];
  description?: string;
  format?:
  | 'int32'
  | 'int64'
  | 'float'
  | 'double'
  | 'string'
  | 'byte'
  | 'binary'
  | 'boolean'
  | 'date'
  | 'date-time'
  | 'password';
  default?: any;
  discriminator?: string;
  externalDocs?: AsyncApiExternalDocs;
  deprecated?: boolean;
}

export type AsyncApiSchemaLike =
  | AsyncApiSchema
  | AsyncApiReference;
