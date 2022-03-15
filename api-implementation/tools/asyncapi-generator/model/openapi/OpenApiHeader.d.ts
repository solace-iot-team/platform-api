import { Dictionary } from "../types";
import { OpenApiExample } from "./OpenApiExample";
import { OpenApiReference } from "./OpenApiReference";
import { OpenApiSchema } from "./OpenApiSchema";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#header-object
 */
export interface OpenApiHeader {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: OpenApiSchema;
  example?: any;
  examples?: Dictionary<OpenApiExample>;
}

export type OpenApiHeaderLike =
  | OpenApiHeader
  | OpenApiReference;
