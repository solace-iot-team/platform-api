import { Dictionary } from "../types";
import { AsyncApiChannelLike } from "./AsyncApiChannel";
import { AsyncApiChannelBindingsLike } from "./AsyncApiChannelBindings";
import { AsyncApiCorrelationIdLike } from "./AsyncApiCorrelationId";
import { AsyncApiMessageLike } from "./AsyncApiMessage";
import { AsyncApiMessageBindingsLike } from "./AsyncApiMessageBindings";
import { AsyncApiMessageTraitLike } from "./AsyncApiMessageTrait";
import { AsyncApiOperationBindingsLike } from "./AsyncApiOperationBindings";
import { AsyncApiOperationTraitLike } from "./AsyncApiOperationTrait";
import { AsyncApiParameterLike } from "./AsyncApiParameter";
import { AsyncApiSchemaLike } from "./AsyncApiSchema";
import { AsyncApiSecuritySchemeLike } from "./AsyncApiSecurityScheme";
import { AsyncApiServerLike } from "./AsyncApiServer";
import { AsyncApiServerBindingsLike } from "./AsyncApiServerBindings";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#componentsObject
 */
export interface AsyncApiComponents {
  schemas?: Dictionary<AsyncApiSchemaLike>;
  servers?: Dictionary<AsyncApiServerLike>;
  channels?: Dictionary<AsyncApiChannelLike>;
  messages?: Dictionary<AsyncApiMessageLike>;
  securitySchemes?: Dictionary<AsyncApiSecuritySchemeLike>;
  parameters?: Dictionary<AsyncApiParameterLike>;
  correlationIds?: Dictionary<AsyncApiCorrelationIdLike>;
  operationTraits?: Dictionary<AsyncApiOperationTraitLike>;
  messageTraits?: Dictionary<AsyncApiMessageTraitLike>;
  serverBindings?: Dictionary<AsyncApiServerBindingsLike>;
  channelBindings?: Dictionary<AsyncApiChannelBindingsLike>;
  operationBindings?: Dictionary<AsyncApiOperationBindingsLike>;
  messageBindings?: Dictionary<AsyncApiMessageBindingsLike>;
}
