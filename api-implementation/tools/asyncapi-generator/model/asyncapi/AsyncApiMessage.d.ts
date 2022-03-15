import { Dictionary } from "../types";
import { AsyncApiCorrelationIdLike } from "./AsyncApiCorrelationId";
import { AsyncApiExternalDocs } from "./AsyncApiExternalDocs";
import { AsyncApiMessageBindingsLike } from "./AsyncApiMessageBindings";
import { AsyncApiMessageExample } from "./AsyncApiMessageExample";
import { AsyncApiMessageTraitLike } from "./AsyncApiMessageTrait";
import { AsyncApiReference } from "./AsyncApiReference";
import { AsyncApiSchemaLike } from "./AsyncApiSchema";
import { AsyncApiTag } from "./AsyncApiTag";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject
 */
export interface AsyncApiMessage {
  headers?: AsyncApiSchemaLike;
  payload?: any;
  correlationId?: AsyncApiCorrelationIdLike;
  schemaFormat?: string;
  contentType?: string;
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  tags?: AsyncApiTag[];
  externalDocs?: AsyncApiExternalDocs;
  bindings?: AsyncApiMessageBindingsLike;
  examples?: AsyncApiMessageExample[];
  traits?: AsyncApiMessageTraitLike[];
}

export type AsyncApiMessageLike =
  | AsyncApiMessage
  | AsyncApiReference;
