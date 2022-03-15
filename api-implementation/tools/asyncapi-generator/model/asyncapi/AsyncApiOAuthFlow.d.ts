import { Dictionary } from "../types";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#oauthFlowObject
 */
export interface AsyncApiOAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Dictionary<string>;
}