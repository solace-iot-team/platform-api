import { AsyncApiOperation } from "../model/asyncapi/AsyncApiOperation";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiOperation } from "../model/openapi/OpenApiOperation";
import { OpenApiResponse } from "../model/openapi/OpenApiResponse";
import { buildMessage } from "./buildMessage";
import { buildTags } from "./buildTags";
import { getRef } from "./getRef";

/**
 * Creates an AsyncAPI operation from an OpenAPI operation.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param operation
 *                The OpenAPI operation.
 * @param messagePath
 *                A reference to the OpenAPI operation request body or an OpenAPI operation response that should
 *                be used to create the definition of the message that will be published or received.
 * 
 * @returns The created AsyncAPI operation.
 */
export const buildOperation = (openApi: OpenApi, operation: OpenApiOperation, messagePath: string): AsyncApiOperation => {

  // As the OpenAPI operation and the AsyncAPI operation describe different operations, the summary, description
  // an external documentation of the OpenAPI operation will not be used in the AsyncAPI operation.
  const asyncApiOperation: AsyncApiOperation = {
    operationId: operation.operationId,
    // summary: operation.summary,
    // description: operation.description,
    tags: buildTags(openApi, operation.tags),
    // externalDocs: buildExternalDocs(openApi, operation.externalDocs),
  }

  if (messagePath === "requestBody" && operation.requestBody) {
    const request = getRef(openApi, operation.requestBody);
    asyncApiOperation.message = buildMessage(openApi, request);
  }

  if (messagePath.startsWith("responses") && operation.responses) {

    const httpcode = messagePath.split("/")[1].replace(/X/g, "");

    let response: OpenApiResponse;
    if (operation.responses.default) {
      response = getRef(openApi, operation.responses.default);
    }

    // TODO: The OpenAPI spec allows to use a range key (for example: 2XX).
    for (const key in operation.responses) {
      if (key.startsWith(httpcode)) {
        response = getRef(openApi, operation.responses[key]);
      }
    }
    asyncApiOperation.message = buildMessage(openApi, response);
  }

  return asyncApiOperation;
}
