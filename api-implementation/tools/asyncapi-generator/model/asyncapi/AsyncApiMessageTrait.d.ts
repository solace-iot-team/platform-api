import { AsyncApiCorrelationId } from "./AsyncApiCorrelationId";
import { AsyncApiExternalDocs } from "./AsyncApiExternalDocs";
import { AsyncApiMessageBindingsLike } from "./AsyncApiMessageBindings";
import { AsyncApiMessageExample } from "./AsyncApiMessageExample";
import { AsyncApiReference } from "./AsyncApiReference";
import { AsyncApiSchema } from "./AsyncApiSchema";
import { AsyncApiTag } from "./AsyncApiTag";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#messageObject
 */
export interface AsyncApiMessageTrait {
  headers?: AsyncApiSchema | AsyncApiReference;
  correlationId?: AsyncApiCorrelationId | AsyncApiReference;
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
}

export type AsyncApiMessageTraitLike =
  | AsyncApiMessageTrait
  | AsyncApiReference;
