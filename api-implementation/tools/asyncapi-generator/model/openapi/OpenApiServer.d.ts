import { Dictionary } from "../types";
import { OpenApiServerVariable } from "./OpenApiServerVariable";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#server-object
 */
export interface OpenApiServer {
  url: string;
  description?: string;
  variables?: Dictionary<OpenApiServerVariable>;
}
