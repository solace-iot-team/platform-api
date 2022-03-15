import { Dictionary } from "../types";
import { OpenApiHeaderLike } from "./OpenApiHeader";
import { OpenApiLinkLike } from "./OpenApiLink";
import { OpenApiMediaType } from "./OpenApiMediaType";
import { OpenApiReference } from "./OpenApiReference";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#response-object
 */
export interface OpenApiResponse {
  description: string;
  headers?: Dictionary<OpenApiHeaderLike>;
  content?: Dictionary<OpenApiMediaType>;
  links?: Dictionary<OpenApiLinkLike>;
}

export type OpenApiResponseLike =
  | OpenApiResponse
  | OpenApiReference;
