import { AsyncApiChannel } from "./AsyncApiChannel";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#channelsObject
 */
export interface AsyncApiChannels {
  [channel: string]: AsyncApiChannel;
}
