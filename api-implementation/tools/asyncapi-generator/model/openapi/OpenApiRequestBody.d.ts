import { Dictionary } from "../types";
import { OpenApiMediaType } from "./OpenApiMediaType";
import { OpenApiReference } from "./OpenApiReference";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#request-body-object
 */
export interface OpenApiRequestBody {
  description?: string;
  content: Dictionary<OpenApiMediaType>;
  required?: boolean;
}

export type OpenApiRequestBodyLike =
  | OpenApiRequestBody
  | OpenApiReference;
