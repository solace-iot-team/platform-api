import { Dictionary } from "../model/types";
import { AsyncApiMessageExample } from "../model/asyncapi/AsyncApiMessageExample";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiExample } from "../model/openapi/OpenApiExample";
import { OpenApiReference } from "../model/openapi/OpenApiReference";
import { getRef } from "./getRef";

/**
 * Creates a list of AsyncAPI examples from a set of OpenAPI examples.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param examples
 *                A set of OpenAPI examples.
 * 
 * @returns The created list of AsyncAPI examples.
 */
export const buildMessageExamples = (openApi: OpenApi, examples: Dictionary<OpenApiExample | OpenApiReference>): AsyncApiMessageExample[] => {

  let result: AsyncApiMessageExample[];

  if (examples) {

    result = [];
    for (const name in examples) {
      if (examples.hasOwnProperty(name)) {

        const example = getRef(openApi, examples[name]);
        result.push({
          name: name,
          summary: example.summary || example.description,
          payload: example.value,
        });
      }
    }
  }

  return result;
}
