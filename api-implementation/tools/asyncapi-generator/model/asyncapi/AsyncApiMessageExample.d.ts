import { Dictionary } from "../types";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#messageExampleObject
 */
export interface AsyncApiMessageExample {
  headers?: Dictionary;
  payload?: any;
  name?: string;
  summary?: string;
}
