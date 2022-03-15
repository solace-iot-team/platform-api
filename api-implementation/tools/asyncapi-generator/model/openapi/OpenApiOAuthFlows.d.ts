import { OpenApiOAuthFlow } from "./OpenApiOAuthFlow";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#oauth-flows-object
 */
export interface OpenApiOAuthFlows {
  implicit?: OpenApiOAuthFlow;
  password?: OpenApiOAuthFlow;
  clientCredentials?: OpenApiOAuthFlow;
  authorizationCode?: OpenApiOAuthFlow;
}
