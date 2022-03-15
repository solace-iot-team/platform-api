import { Dictionary } from "../types";
import { OpenApiCallbackLike } from "./OpenApiCallback";
import { OpenApiExternalDocs } from "./OpenApiExternalDocs";
import { OpenApiParameterLike } from "./OpenApiParameter";
import { OpenApiRequestBodyLike } from "./OpenApiRequestBody";
import { OpenApiResponses } from "./OpenApiResponses";
import { OpenApiSecurityRequirement } from "./OpenApiSecurityRequirement";
import { OpenApiServer } from "./OpenApiServer";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#operation-object
 */
export interface OpenApiOperation {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: OpenApiExternalDocs;
  operationId?: string;
  parameters?: OpenApiParameterLike[];
  requestBody?: OpenApiRequestBodyLike;
  responses: OpenApiResponses;
  callbacks?: Dictionary<OpenApiCallbackLike>;
  deprecated?: boolean;
  security?: OpenApiSecurityRequirement;
  servers?: OpenApiServer[];
}
