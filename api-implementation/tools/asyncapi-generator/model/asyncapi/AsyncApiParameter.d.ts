import { AsyncApiReference } from "./AsyncApiReference";
import { AsyncApiSchemaLike } from "./AsyncApiSchema";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#parameterObject
 */
export interface AsyncApiParameter {
  description?: string;
  schema?: AsyncApiSchemaLike;
  location?: string;
}

export type AsyncApiParameterLike =
  | AsyncApiParameter
  | AsyncApiReference;
