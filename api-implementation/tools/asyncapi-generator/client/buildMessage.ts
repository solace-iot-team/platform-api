import { AsyncApiMessage } from "../model/asyncapi/AsyncApiMessage";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiRequestBody } from "../model/openapi/OpenApiRequestBody";
import { OpenApiResponse } from "../model/openapi/OpenApiResponse";
import { buildMessageExamples } from "./buildMessageExamples";
import { buildSchema } from "./buildSchema";

/**
 * The list of supported media types (limited to JSON and JSON-like).
 */
const SUPPORTED_MEDIA_TYPES = [
  "application/json-patch+json",
  "application/json",
  "text/json",
  "text/plain",
];

/**
 * Creates an AsyncAPI message from the content of an OpenAPI request or response.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param requestResponse
 *                The OpenAPI request or response.
 * 
 * @returns The created AsyncAPI message.
 */
export const buildMessage = (openApi: OpenApi, requestResponse: OpenApiRequestBody | OpenApiResponse): AsyncApiMessage => {

  let message: AsyncApiMessage;

  const description = requestResponse?.description;
  const content = requestResponse?.content || {};

  const mediaType = Object.keys(content).filter(mediaType => {
    const trimmedMediaType = mediaType.split(";")[0].trim();
    return SUPPORTED_MEDIA_TYPES.includes(trimmedMediaType);
  }).find(mediaType => content[mediaType]?.schema);

  if (mediaType) {

    message = {
      payload: {
        type: "object",
        required: ["header", "payload"],
        properties: {
          header: {
            "$ref": "#/components/schemas/NotificationHeader"
          },
          payload: buildSchema(openApi, content[mediaType].schema),
        }
      },
      contentType: "application/json",
      description: description,
      examples: buildMessageExamples(openApi, content[mediaType].examples),
    }
  }

  return message;
}
