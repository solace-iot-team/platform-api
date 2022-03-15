import { Dictionary } from "../types";
import { OpenApiReference } from "./OpenApiReference";
import { OpenApiServer } from "./OpenApiServer";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#link-object
 */
export interface OpenApiLink {
  operationRef?: string;
  operationId?: string;
  parameters?: Dictionary<any>;
  requestBody?: any;
  description?: string;
  server?: OpenApiServer;
}

export type OpenApiLinkLike =
  | OpenApiLink
  | OpenApiReference;
