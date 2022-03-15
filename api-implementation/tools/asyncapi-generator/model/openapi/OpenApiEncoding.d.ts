import { Dictionary } from "../types";
import { OpenApiHeaderLike } from "./OpenApiHeader";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#encoding-object
 */
export interface OpenApiEncoding {
  contentType?: string;
  headers?: Dictionary<OpenApiHeaderLike>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}
