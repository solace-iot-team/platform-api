import { AsyncApiParameters } from "../model/asyncapi/AsyncApiParameters";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiParameter } from "../model/openapi/OpenApiParameter";
import { OpenApiReference } from "../model/openapi/OpenApiReference";
import { buildParameter } from "./buildParameter";
import { getRef } from "./getRef";

/**
 * Creates a set of AsyncAPI parameters from a list of OpenAPI parameters.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param parameters
 *                The list of OpenAPI parameters.
 * 
 * @returns The created set of AsyncAPI parameters.
 */
export const buildParameters = (openApi: OpenApi, parameters: (OpenApiParameter | OpenApiReference)[]): AsyncApiParameters => {

  let result: AsyncApiParameters;

  if (parameters) {

    result = {};
    parameters.forEach(parameter => {
      const p = getRef(openApi, parameter);
      // keep only "path" parameters
      if (p.name && p.in === "path") {
        result[p.name] = buildParameter(openApi, parameter);
      }
    });
  }

  return result;
}
