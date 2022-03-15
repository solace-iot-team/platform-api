import { AsyncApiExternalDocs } from "./AsyncApiExternalDocs";
import { AsyncApiMessageLike } from "./AsyncApiMessage";
import { AsyncApiOperationBindingsLike } from "./AsyncApiOperationBindings";
import { AsyncApiOperationTraitLike } from "./AsyncApiOperationTrait";
import { AsyncApiTag } from "./AsyncApiTag";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#operationObject
 */
export interface AsyncApiOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: AsyncApiTag[];
  externalDocs?: AsyncApiExternalDocs;
  bindings?: AsyncApiOperationBindingsLike;
  traits?: AsyncApiOperationTraitLike[];
  message?:
  | AsyncApiMessageLike
  | { oneOf: AsyncApiMessageLike[]; };
}
