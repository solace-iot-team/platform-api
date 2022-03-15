import { Dictionary } from "../types";
import { AsyncApiReference } from "./AsyncApiReference";
import { AsyncApiSecurityRequirement } from "./AsyncApiSecurityRequirement";
import { AsyncApiServerBindingsLike } from "./AsyncApiServerBindings";
import { AsyncApiServerVariable } from "./AsyncApiServerVariable";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#serverObject
 */
export interface AsyncApiServer {
  url: string;
  protocol: string;
  protocolVersion?: string;
  description?: string;
  variables?: Dictionary<AsyncApiServerVariable>;
  security?: AsyncApiSecurityRequirement;
  bindings?: AsyncApiServerBindingsLike;
}

export type AsyncApiServerLike =
  | AsyncApiServer
  | AsyncApiReference;
