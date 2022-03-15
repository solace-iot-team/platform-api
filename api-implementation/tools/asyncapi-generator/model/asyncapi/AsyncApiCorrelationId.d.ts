import { AsyncApiReference } from "./AsyncApiReference";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#correlationIdObject
 */
export interface AsyncApiCorrelationId {
  description?: string;
  location: string;
}

export type AsyncApiCorrelationIdLike =
  | AsyncApiCorrelationId
  | AsyncApiReference;
