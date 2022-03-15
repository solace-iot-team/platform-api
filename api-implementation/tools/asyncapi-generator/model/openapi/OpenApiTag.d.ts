import { OpenApiExternalDocs } from "./OpenApiExternalDocs";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#tag-object
 */
export interface OpenApiTag {
  name: string;
  description?: string;
  externalDocs?: OpenApiExternalDocs;
}
