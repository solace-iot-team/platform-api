/**
 * https://spec.openapis.org/oas/v3.0.2.html#xml-object
 */
export interface OpenApiXml {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}
