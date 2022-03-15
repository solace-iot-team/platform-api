import { AsyncApiParameterLike } from "../model/asyncapi/AsyncApiParameter";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiParameter, OpenApiParameterLike } from "../model/openapi/OpenApiParameter";
import { OpenApiReference } from "../model/openapi/OpenApiReference";
import { buildReference } from "./buildRefererence";
import { buildSchema } from "./buildSchema";

/**
 * Creates an AsyncAPI parameter from an OpenAPI parameter.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param parameter
 *                The OpenAPI parameter.
 * 
 * @returns The created AsyncAPI parameter.
 */
export const buildParameter = (openApi: OpenApi, parameter: OpenApiParameterLike): AsyncApiParameterLike => {

  let result: AsyncApiParameterLike;

  if (parameter && parameter.hasOwnProperty("$ref")) {
    result = buildReference(openApi, parameter as OpenApiReference);
  } else if (parameter) {
    parameter = parameter as OpenApiParameter;
    result = {
      description: parameter.description,
      schema: buildSchema(openApi, parameter.schema),
    };
  }

  return result;
}
