import { Dictionary } from "../types";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#oauth-flow-object
 */
export interface OpenApiOAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Dictionary<string>;
}
