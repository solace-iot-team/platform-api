import { AsyncApiReference } from "../model/asyncapi/AsyncApiReference";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiReference } from "../model/openapi/OpenApiReference";
import { getRef } from "./getRef";

/**
 * Creates an AsyncAPI reference from an OpenAPI reference.
 * 
 * @param reference
 *                The OpenAPI reference.
 * 
 * @returns The created AsyncAPI reference.
 */
export const buildReference = (openApi: OpenApi, reference: OpenApiReference): AsyncApiReference => {

  // validate ref
  const item = getRef<any>(openApi, reference);
  if (item === undefined || item === null) {
    throw new Error(`Reference "${reference.$ref}" is not valid`);
  }

  return { $ref: reference.$ref };
}
