import { AsyncApiServers } from "../model/asyncapi/AsyncApiServers";
import { OpenApi } from "../model/openapi/OpenApi";


/**
 * Creates AsyncAPI server connection details from an OpenAPI specification.
 * 
 * Note: For now, this function creates an empty list.
 * 
 * @param openApi
 *                The OpenAPI specification.
 * 
 * @returns The created AsyncAPI server connection details.
 */
export const buildServers = (openApi: OpenApi): AsyncApiServers => {

  const servers: AsyncApiServers = {};
  return servers;
}
