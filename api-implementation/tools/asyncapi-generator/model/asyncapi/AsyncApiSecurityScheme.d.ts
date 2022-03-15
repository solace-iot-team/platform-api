import { AsyncApiOAuthFlows } from "./AsyncApiOAuthFlows";
import { AsyncApiReference } from "./AsyncApiReference";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#securitySchemeObject
 */
export interface AsyncApiSecurityScheme {
  type:
  | "userPassword"
  | "apiKey"
  | "X509"
  | "symmetricEncryption"
  | "asymmetricEncryption"
  | "httpApiKey"
  | "http"
  | "oauth2"
  | "openIdConnect"
  | "plain"
  | "scramSha256"
  | "scramSha512"
  | "gssapi";
  description?: string;
  name?: string;
  in?:
  | "user"
  | "password"
  | "apiKey"
  | "query"
  | "header"
  | "cookie"
  | "httpApiKey";
  scheme?: string;
  bearerFormat?: string;
  flows?: AsyncApiOAuthFlows;
  openIdConnectUrl?: string;
}

export type AsyncApiSecuritySchemeLike =
  | AsyncApiSecurityScheme
  | AsyncApiReference;
