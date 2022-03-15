import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiExternalDocs } from "../model/openapi/OpenApiExternalDocs";
import { AsyncApiExternalDocs } from "../model/asyncapi/AsyncApiExternalDocs";

/**
 * Creates an AsyncAPI external documentation reference from an OpenAPI external documentation reference.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param externalDocs
 *                The OpenAPI external documentation reference.
 * 
 * @returns The created external documentation reference.
 */
export const buildExternalDocs = (openApi: OpenApi, externalDocs: OpenApiExternalDocs): AsyncApiExternalDocs => {

  let result: AsyncApiExternalDocs;

  if (externalDocs) {
    result = {
      description: externalDocs.description,
      url: externalDocs.url,
    };
  }

  return result;
}
