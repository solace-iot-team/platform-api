import { OpenApiOperation } from "./OpenApiOperation";
import { OpenApiParameterLike } from "./OpenApiParameter";
import { OpenApiServer } from "./OpenApiServer";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#path-item-object
 */
export interface OpenApiPath {
  summary?: string;
  description?: string;
  get?: OpenApiOperation;
  put?: OpenApiOperation;
  post?: OpenApiOperation;
  delete?: OpenApiOperation;
  options?: OpenApiOperation;
  head?: OpenApiOperation;
  patch?: OpenApiOperation;
  trace?: OpenApiOperation;
  servers?: OpenApiServer[];
  parameters?: OpenApiParameterLike[];
}
