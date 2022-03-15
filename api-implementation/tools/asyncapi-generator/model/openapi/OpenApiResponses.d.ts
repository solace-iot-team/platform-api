import { OpenApiResponseLike } from "./OpenApiResponse";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#responses-object
 */
export interface OpenApiResponses {
  default: OpenApiResponseLike;
  [httpcode: string]: OpenApiResponseLike;
}
