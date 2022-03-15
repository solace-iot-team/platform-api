import { OpenApiPath } from "./OpenApiPath";
import { OpenApiReference } from "./OpenApiReference";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#callback-object
 */
export interface OpenApiCallback {
  [key: string]: OpenApiPath;
}

export type OpenApiCallbackLike =
  | OpenApiCallback
  | OpenApiReference;
