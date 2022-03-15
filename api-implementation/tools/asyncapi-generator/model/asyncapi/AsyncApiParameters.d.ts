import { AsyncApiParameterLike } from "./AsyncApiParameter";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#parametersObject
 */
export interface AsyncApiParameters {
  [key: string]: AsyncApiParameterLike;
}
