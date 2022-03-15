import { Dictionary } from "../types";
import { OpenApiCallbackLike } from "./OpenApiCallback";
import { OpenApiExampleLike } from "./OpenApiExample";
import { OpenApiHeaderLike } from "./OpenApiHeader";
import { OpenApiLinkLike } from "./OpenApiLink";
import { OpenApiParameterLike } from "./OpenApiParameter";
import { OpenApiRequestBodyLike } from "./OpenApiRequestBody";
import { OpenApiResponseLike } from "./OpenApiResponse";
import { OpenApiSchemaLike } from "./OpenApiSchema";
import { OpenApiSecuritySchemeLike } from "./OpenApiSecurityScheme";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#components-object
 */
export interface OpenApiComponents {
  schemas?: Dictionary<OpenApiSchemaLike>;
  responses?: Dictionary<OpenApiResponseLike>;
  parameters?: Dictionary<OpenApiParameterLike>;
  examples?: Dictionary<OpenApiExampleLike>;
  requestBodies?: Dictionary<OpenApiRequestBodyLike>;
  headers?: Dictionary<OpenApiHeaderLike>
  securitySchemes?: Dictionary<OpenApiSecuritySchemeLike>;
  links?: Dictionary<OpenApiLinkLike>;
  callbacks?: Dictionary<OpenApiCallbackLike>;
}
