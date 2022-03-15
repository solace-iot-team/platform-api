import { AsyncApiExternalDocs } from "./AsyncApiExternalDocs";

/**
 * https://www.asyncapi.com/docs/specifications/v2.3.0#tagObject
 */
export interface AsyncApiTag {
  name: string;
  description?: string;
  externalDocs?: AsyncApiExternalDocs;
}
