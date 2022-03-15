import { OpenApiPath } from "./OpenApiPath";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#paths-object
 */
export interface OpenApiPaths {
  [path: string]: OpenApiPath;
}