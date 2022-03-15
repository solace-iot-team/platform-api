/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#serverVariableObject
 */
export interface AsyncApiServerVariable {
  enum?: string[];
  default?: string;
  description?: string;
  examples?: string[];
}