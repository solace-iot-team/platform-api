import type { OpenApi } from '../model/openapi/OpenApi';
import type { OpenApiReference } from '../model/openapi/OpenApiReference';

/**
 * Returns the actual OpenAPI object.
 * 
 * @param openApi 
 *                The OpenAPI specification.
 * @param item 
 *                An OpenAPI object or a reference to an OpenAPI object.
 * 
 * @returns The actual OpenAPI object.
 */
export const getRef = <T>(openApi: OpenApi, item: T | OpenApiReference): T => {

  if (item.hasOwnProperty("$ref")) {

    const reference = item["$ref"] as string;
    if (!reference) {
      throw new Error(`Could not resolve reference: "${reference}"`);
    }

    let result: any = openApi;

    const paths = reference.replace(/^#/g, "").split("/").filter(item => item);
    paths.forEach(path => {

      const decodedPath = decodeURIComponent(path.replace(/~1/g, "/").replace(/~0/g, "~"));
      if (result.hasOwnProperty(decodedPath)) {
        result = result[decodedPath];
      } else {
        throw new Error(`Could not resolve reference: "${reference}"`);
      }
    });

    return result as T;
  }

  return item as T;
}
