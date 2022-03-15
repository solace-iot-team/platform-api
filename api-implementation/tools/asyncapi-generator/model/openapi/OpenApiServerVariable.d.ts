/**
 * https://spec.openapis.org/oas/v3.0.2.html#server-variable-object
 */
export interface OpenApiServerVariable {
  enum?: string[];
  default: string;
  description?: string;
}
