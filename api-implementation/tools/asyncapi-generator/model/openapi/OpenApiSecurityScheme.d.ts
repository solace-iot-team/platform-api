import { OpenApiOAuthFlows } from "./OpenApiOAuthFlows";
import { OpenApiReference } from "./OpenApiReference";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#security-scheme-object
 */
export interface OpenApiSecurityScheme {
  type: "apiKey" | "http" | "oauth2" | "openIdConnect";
  description?: string;
  name?: string;
  in?: "query" | "header" | "cookie";
  scheme?: string;
  bearerFormat?: string;
  flows?: OpenApiOAuthFlows;
  openIdConnectUrl?: string;
}

export type OpenApiSecuritySchemeLike =
  | OpenApiSecurityScheme
  | OpenApiReference;
