import { Dictionary } from "../types";

/**
 * https://spec.openapis.org/oas/v3.0.2.html#discriminator-object
 */
export interface OpenApiDiscriminator {
  propertyName: string;
  mapping?: Dictionary<string>;
}
