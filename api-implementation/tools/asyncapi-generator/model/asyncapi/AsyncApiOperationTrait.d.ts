import { AsyncApiExternalDocs } from "./AsyncApiExternalDocs";
import { AsyncApiOperationBindingsLike } from "./AsyncApiOperationBindings";
import { AsyncApiReference } from "./AsyncApiReference";
import { AsyncApiTag } from "./AsyncApiTag";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#operationTraitObject
 */
export interface AsyncApiOperationTrait {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: AsyncApiTag[];
  externalDocs?: AsyncApiExternalDocs;
  bindings?: AsyncApiOperationBindingsLike;
}

export type AsyncApiOperationTraitLike =
  | AsyncApiOperationTrait
  | AsyncApiReference;
