import { OpenApi } from "../model/openapi/OpenApi";
import { AsyncApiTag } from "../model/asyncapi/AsyncApiTag";

/**
 * Creates a list of AsyncAPI tags from a list of OpenAPI tag names.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param tags
 *                The list of OpenAPI tags names.
 * 
 * @returns The created list of AsyncAPI tags.
 */
export const buildTags = (openApi: OpenApi, tags: string[]): AsyncApiTag[] => {

  let result: AsyncApiTag[];

  if (tags) {

    result = [];
    for (const tag of tags) {

      const t = openApi.tags.find(item => item.name === tag);
      if (t) {
        result.push({
          name: tag,
          description: t.description,
          externalDocs: t.externalDocs,
        })
      } else {
        result.push({ name: tag });
      }
    }
  }

  return result;
}
