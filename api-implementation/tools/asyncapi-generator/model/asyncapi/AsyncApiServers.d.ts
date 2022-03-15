import { AsyncApiServer } from "./AsyncApiServer";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#serversObject
 */
export interface AsyncApiServers {
  [server: string]: AsyncApiServer;
}