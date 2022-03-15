import { AsyncApiOAuthFlow } from "./AsyncApiOAuthFlow";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#oauthFlowsObject
 */
export interface AsyncApiOAuthFlows {
  implicit?: AsyncApiOAuthFlow;
  password?: AsyncApiOAuthFlow;
  clientCredentials?: AsyncApiOAuthFlow;
  authorizationCode?: AsyncApiOAuthFlow;
}
