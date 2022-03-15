/**
 * https://spec.openapis.org/oas/v3.0.2.html#security-requirement-object
 */
export interface OpenApiSecurityRequirement {
  [name: string]: string[];
}
