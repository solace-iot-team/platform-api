import { Dictionary } from "../types";
import { OpenApiExampleLike } from "./OpenApiExample";
import { OpenApiReference } from "./OpenApiReference";
import { OpenApiSchemaLike } from "./OpenApiSchema";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#parameter-object
 */
export interface OpenApiParameter {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: OpenApiSchemaLike;
  example?: any;
  examples?: Dictionary<OpenApiExampleLike>;
}

export type OpenApiParameterLike =
  | OpenApiParameter
  | OpenApiReference;
