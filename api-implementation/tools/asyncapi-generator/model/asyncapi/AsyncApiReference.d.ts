/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject
 */
export interface AsyncApiReference {
  // The AsyncApiReference interface is used as base interface for all
  // objects that can be referenced. Therefore, the $ref property must
  // be optional.
  $ref?: string;
}
