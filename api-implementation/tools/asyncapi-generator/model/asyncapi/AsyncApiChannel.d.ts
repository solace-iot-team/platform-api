import { AsyncApiChannelBindingsLike } from "./AsyncApiChannelBindings";
import { AsyncApiOperation } from "./AsyncApiOperation";
import { AsyncApiParameters } from "./AsyncApiParameters";
import { AsyncApiReference } from "./AsyncApiReference";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#channelItemObject
 */
export interface AsyncApiChannel {
  $ref?: string; // deprecated
  description?: string;
  servers?: string[];
  subscribe?: AsyncApiOperation;
  publish?: AsyncApiOperation;
  parameters?: AsyncApiParameters;
  bindings?: AsyncApiChannelBindingsLike;
}

export type AsyncApiChannelLike =
  | AsyncApiChannel
  | AsyncApiReference;
