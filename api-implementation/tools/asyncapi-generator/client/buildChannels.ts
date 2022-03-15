import { AsyncApiChannels } from "../model/asyncapi/AsyncApiChannels";
import { OpenApi } from "../model/openapi/OpenApi";
import { OpenApiOperation } from "../model/openapi/OpenApiOperation";
import { buildOperation } from "./buildOperation";
import { buildParameters } from "./buildParameters";

/** remove duplicate '/' from a path */
const cleanUpPath = (path: string): string => {
  return path.split("/").filter(item => item).join("/");
}

/**
 * A channel operation.
 */
export type ChannelOperation = "publish" | "subscribe";

/**
 * Creates a set of AsyncAPI channels from an OpenAPI specification.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * @param baseUrl
 *                The base URL for the OpenAPI API.
 * @param channelPrefix
 *                The prefix to use for all channel names.
 * @param channelOperation
 *                The operation to create for all channels (publish or subscribe).
 * @param messagePath
 *                A reference to the OpenAPI operation request body or an OpenAPI operation response that should
 *                be used to create the definition of the message that will be published or received.
 * 
 * @returns The created set of AsyncAPI channels.
 */
export const buildChannels = (openApi: OpenApi, baseUrl: string, channelPrefix: string, channelOperation: ChannelOperation, messagePath: string): AsyncApiChannels => {

  const channels: AsyncApiChannels = {};

  for (const url in openApi.paths) {
    if (openApi.paths.hasOwnProperty(url)) {

      const path = openApi.paths[url];

      for (const method in path) {
        if (path.hasOwnProperty(method)) {

          switch (method) {
            case "post":
            case "put":
            case "patch":
            case "delete":

              const operation = path[method] as OpenApiOperation;

              const parameters = path.parameters || [];
              if (operation.parameters) {
                parameters.push(...operation.parameters);
              }

              let name = cleanUpPath(`${channelPrefix}/${method.toUpperCase()}/${baseUrl}/${url}`);
              channels[name] = {
                description: path.description || path.summary,
                [channelOperation]: buildOperation(openApi, operation, messagePath),
                parameters: buildParameters(openApi, parameters),
              }

              break;
          }
        }
      }
    }
  }

  return channels;
}
