import { OpenApiReference } from "./OpenApiReference";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#example-object
 */
export interface OpenApiExample {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

export type OpenApiExampleLike =
  | OpenApiExample
  | OpenApiReference;
