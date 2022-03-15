import { Dictionary } from "../types";
import { OpenApiEncoding } from "./OpenApiEncoding";
import { OpenApiExampleLike } from "./OpenApiExample";
import { OpenApiSchemaLike } from "./OpenApiSchema";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#media-type-object
 */
export interface OpenApiMediaType {
  schema?: OpenApiSchemaLike;
  example?: any;
  examples?: Dictionary<OpenApiExampleLike>;
  encoding?: Dictionary<OpenApiEncoding>;
}
